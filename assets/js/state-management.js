// ============================================================================
// STATE MANAGEMENT - Request status transitions and system state
// ============================================================================

// Status transition rules
const statusTransitions = {
  draft: ['submitted', 'cancelled'],
  submitted: ['under_review', 'cancelled'],
  under_review: ['approved', 'rejected', 'more_info_needed', 'submitted'], // submitted for transfer
  more_info_needed: ['submitted'],
  approved: [], // Terminal state
  rejected: [], // Terminal state
  cancelled: [] // Terminal state
};

/**
 * Check if status transition is allowed
 * @param {string} currentStatus - Current request status
 * @param {string} newStatus - Desired new status
 * @returns {boolean} True if transition is allowed
 */
function canTransition(currentStatus, newStatus) {
  return statusTransitions[currentStatus]?.includes(newStatus) || false;
}

/**
 * Transition request to new status
 * @param {string} requestId - Request ID
 * @param {string} newStatus - New status
 * @param {object} metadata - Additional metadata for the transition
 * @returns {object} Updated request object
 */
function transitionRequest(requestId, newStatus, metadata = {}) {
  const request = getRequestById(requestId);
  
  if (!request) {
    throw new Error(`Request ${requestId} not found`);
  }
  
  if (!canTransition(request.status, newStatus)) {
    throw new Error(`Cannot transition from ${request.status} to ${newStatus}`);
  }
  
  // Initialize status history if not exists
  if (!request.statusHistory) {
    request.statusHistory = [];
  }
  
  // Add current status to history
  request.statusHistory.push({
    status: newStatus,
    timestamp: new Date().toISOString(),
    user: getCurrentUser()?.nameEN || 'System',
    metadata: metadata
  });
  
  // Update status
  const oldStatus = request.status;
  request.status = newStatus;
  
  // Status-specific actions
  switch (newStatus) {
    case 'submitted':
      if (oldStatus === 'draft') {
        request.submittedDate = new Date().toISOString();
        sendNotification('reviewers', `New request ${requestId} submitted`);
      } else if (oldStatus === 'more_info_needed') {
        request.resubmittedDate = new Date().toISOString();
        sendNotification(request.reviewer, `Request ${requestId} resubmitted with additional information`);
      } else if (oldStatus === 'under_review') {
        // Transfer case
        request.transferredDate = new Date().toISOString();
        request.transferReason = metadata.transferReason;
        request.previousReviewer = request.reviewer;
        request.reviewer = null;
        sendNotification(metadata.newReviewer, `Request ${requestId} transferred to you`);
      }
      break;
      
    case 'under_review':
      request.reviewer = getCurrentUser()?.nameEN;
      request.reviewStartDate = new Date().toISOString();
      break;
      
    case 'approved':
      request.approvalNumber = metadata.approvalNumber;
      request.expirationDate = metadata.expirationDate;
      request.approvalDate = new Date().toISOString();
      request.approvalNotes = metadata.notes;
      sendNotification(request.createdBy, `Request ${requestId} approved`);
      updateReviewerStats(request.reviewer, 'approved');
      break;
      
    case 'rejected':
      request.rejectionReason = metadata.reason;
      request.rejectionDetails = metadata.details;
      request.rejectionDate = new Date().toISOString();
      sendNotification(request.createdBy, `Request ${requestId} rejected`);
      updateReviewerStats(request.reviewer, 'rejected');
      break;
      
    case 'more_info_needed':
      request.reviewerMessage = metadata.message;
      request.moreInfoRequestedDate = new Date().toISOString();
      sendNotification(request.createdBy, `More information needed for ${requestId}`);
      break;
      
    case 'cancelled':
      request.cancellationDate = new Date().toISOString();
      request.cancellationReason = metadata.reason;
      break;
  }
  
  // Update statistics
  updateSystemStats();
  
  // Log activity
  logActivity({
    timestamp: new Date().toISOString(),
    user: getCurrentUser()?.nameEN || 'System',
    action: `Changed status to ${newStatus}`,
    details: `Request ${requestId}`,
    type: 'status_change'
  });
  
  return request;
}

/**
 * Update reviewer statistics
 * @param {string} reviewerName - Reviewer name
 * @param {string} decision - Decision type (approved/rejected)
 */
function updateReviewerStats(reviewerName, decision) {
  const reviewer = mockUsers.find(u => u.nameEN === reviewerName);
  if (reviewer && reviewer.stats) {
    reviewer.stats.totalReviews++;
    if (decision === 'approved') {
      const approvedCount = Math.round(reviewer.stats.totalReviews * reviewer.stats.approvalRate / 100) + 1;
      reviewer.stats.approvalRate = Math.round((approvedCount / reviewer.stats.totalReviews) * 100);
    } else if (decision === 'rejected') {
      const approvedCount = Math.round(reviewer.stats.totalReviews * reviewer.stats.approvalRate / 100);
      reviewer.stats.approvalRate = Math.round((approvedCount / reviewer.stats.totalReviews) * 100);
    }
  }
}

/**
 * Update system statistics
 */
function updateSystemStats() {
  // This would update global statistics
  // For now, it's a placeholder
}

/**
 * Send notification (simulated)
 * @param {string} recipient - Recipient identifier
 * @param {string} message - Notification message
 */
function sendNotification(recipient, message) {
  console.log(`[NOTIFICATION] To: ${recipient}, Message: ${message}`);
  // In a real system, this would send email/push notification
}

/**
 * Log activity
 * @param {object} activity - Activity object
 */
function logActivity(activity) {
  mockActivityLog.unshift(activity);
  // Keep only last 100 activities
  if (mockActivityLog.length > 100) {
    mockActivityLog.pop();
  }
}

// ============================================================================
// SESSION MANAGEMENT
// ============================================================================

let currentUser = null;
let sessionTimeout = null;
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Get current logged-in user
 * @returns {object|null} Current user object or null
 */
function getCurrentUser() {
  if (!currentUser) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      currentUser = JSON.parse(storedUser);
    }
  }
  return currentUser;
}

/**
 * Set current user and start session
 * @param {object} user - User object
 */
function setCurrentUser(user) {
  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(user));
  resetSessionTimeout();
}

/**
 * Logout current user
 */
function logout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  clearTimeout(sessionTimeout);
  
  // Get the base path by going up from current location
  const pathParts = window.location.pathname.split('/');
  const depth = pathParts.filter(p => p && p !== 'simulation-complete').length - 1;
  const basePath = '../'.repeat(depth) + 'index.html';
  
  window.location.href = basePath;
}

/**
 * Reset session timeout
 */
function resetSessionTimeout() {
  clearTimeout(sessionTimeout);
  sessionTimeout = setTimeout(() => {
    // Auto-save any draft work
    autoSaveDraft();
    // Show session expired message
    showModal('session-expired', {
      message: 'Your session has expired. Please log in again.',
      draftSaved: true
    });
    // Redirect to login after 3 seconds
    setTimeout(() => {
      logout();
    }, 3000);
  }, SESSION_DURATION);
}

// Reset session timeout on user activity
document.addEventListener('mousemove', resetSessionTimeout);
document.addEventListener('keypress', resetSessionTimeout);
document.addEventListener('click', resetSessionTimeout);

/**
 * Auto-save draft (placeholder)
 */
function autoSaveDraft() {
  // Would save current form data to localStorage
  console.log('[AUTO-SAVE] Draft saved');
}

// ============================================================================
// REQUEST LOCKING (Prevent concurrent editing)
// ============================================================================

const requestLocks = {};
const LOCK_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Check if request is locked
 * @param {string} requestId - Request ID
 * @returns {boolean} True if can acquire lock, false if locked by another user
 */
function checkRequestLock(requestId) {
  const lock = requestLocks[requestId];
  const currentUserId = getCurrentUser()?.id;
  
  // Check if locked by another user
  if (lock && lock.userId !== currentUserId) {
    const now = new Date();
    const lockExpiry = new Date(lock.expiresAt);
    
    // Check if lock has expired
    if (now < lockExpiry) {
      showModal('request-locked', {
        message: `This request is currently being reviewed by ${lock.userName}. Please try again later.`,
        lockedUntil: lock.expiresAt
      });
      return false;
    }
  }
  
  // Acquire or refresh lock
  requestLocks[requestId] = {
    userId: currentUserId,
    userName: getCurrentUser()?.nameEN,
    acquiredAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + LOCK_DURATION).toISOString()
  };
  
  return true;
}

/**
 * Release request lock
 * @param {string} requestId - Request ID
 */
function releaseRequestLock(requestId) {
  delete requestLocks[requestId];
}

// ============================================================================
// DRAFT MANAGEMENT
// ============================================================================

const AUTOSAVE_INTERVAL = 30 * 1000; // 30 seconds
let autosaveTimer = null;

/**
 * Start auto-save for current form
 * @param {string} formId - Form identifier
 */
function startAutoSave(formId) {
  stopAutoSave(); // Clear any existing timer
  
  autosaveTimer = setInterval(() => {
    const form = document.getElementById(formId);
    if (form) {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      saveDraft(formId, data);
    }
  }, AUTOSAVE_INTERVAL);
}

/**
 * Stop auto-save
 */
function stopAutoSave() {
  if (autosaveTimer) {
    clearInterval(autosaveTimer);
    autosaveTimer = null;
  }
}

/**
 * Save draft to localStorage
 * @param {string} draftId - Draft identifier
 * @param {object} data - Draft data
 */
function saveDraft(draftId, data) {
  const drafts = JSON.parse(localStorage.getItem('drafts') || '{}');
  drafts[draftId] = {
    data,
    savedAt: new Date().toISOString()
  };
  localStorage.setItem('drafts', JSON.stringify(drafts));
  showToast('Draft saved', 'success');
}

/**
 * Load draft from localStorage
 * @param {string} draftId - Draft identifier
 * @returns {object|null} Draft data or null
 */
function loadDraft(draftId) {
  const drafts = JSON.parse(localStorage.getItem('drafts') || '{}');
  return drafts[draftId] || null;
}

/**
 * Delete draft from localStorage
 * @param {string} draftId - Draft identifier
 */
function deleteDraft(draftId) {
  const drafts = JSON.parse(localStorage.getItem('drafts') || '{}');
  delete drafts[draftId];
  localStorage.setItem('drafts', JSON.stringify(drafts));
}

// ============================================================================
// NAVIGATION HELPERS
// ============================================================================

/**
 * Navigate to page
 * @param {string} path - Relative path to navigate to
 */
function navigateTo(path) {
  window.location.href = path;
}

/**
 * Go back to previous page
 */
function goBack() {
  window.history.back();
}

/**
 * Check if user has permission
 * @param {string} permission - Permission to check
 * @returns {boolean} True if user has permission
 */
function hasPermission(permission) {
  const user = getCurrentUser();
  if (!user) return false;
  
  const permissions = {
    reviewer: ['view_requests', 'review_requests', 'approve_reject', 'view_test_database'],
    admin: ['manage_tests', 'manage_users', 'system_settings', 'view_all_reports', 'view_audit_log'],
    reports_viewer: ['view_reports', 'export_reports']
  };
  
  return permissions[user.role]?.includes(permission) || false;
}

/**
 * Require permission (redirect if not authorized)
 * @param {string} permission - Required permission
 */
function requirePermission(permission) {
  if (!hasPermission(permission)) {
    showToast('You do not have permission to access this page', 'error');
    setTimeout(() => {
      // Get the base path by going up from current location
      const pathParts = window.location.pathname.split('/');
      const depth = pathParts.filter(p => p && p !== 'simulation-complete').length - 1;
      const basePath = '../'.repeat(depth) + 'index.html';
      
      window.location.href = basePath;
    }, 2000);
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize page on load
 */
function initializePage() {
  // Check if user is logged in
  const user = getCurrentUser();
  if (!user && !window.location.pathname.includes('index.html') && !window.location.pathname.includes('tests/')) {
    // Get the base path by going up from current location
    const pathParts = window.location.pathname.split('/');
    const depth = pathParts.filter(p => p && p !== 'simulation-complete').length - 1;
    const basePath = '../'.repeat(depth) + 'index.html';
    
    window.location.href = basePath;
    return;
  }
  
  // Reset session timeout
  if (user) {
    resetSessionTimeout();
  }
  
  // Initialize page-specific functionality
  const pageName = document.body.dataset.page;
  if (pageName && typeof window[`init${pageName}`] === 'function') {
    window[`init${pageName}`]();
  }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePage);
} else {
  initializePage();
}
