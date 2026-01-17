// ============================================================================
// EDGE CASE HANDLERS - Handle all 20 documented edge cases
// ============================================================================

// Edge Case 1: Missing or Incomplete Data
function handleMissingData(formData, requiredFields) {
  const missing = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');
  
  if (missing.length > 0) {
    showToast(`Missing required fields: ${missing.join(', ')}`, 'error');
    
    // Highlight missing fields
    missing.forEach(fieldName => {
      const field = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);
      if (field) {
        field.classList.add('border-red-500');
        field.focus();
      }
    });
    
    return false;
  }
  
  return true;
}

// Edge Case 2: Prohibited Words in Justification
function checkProhibitedWords(text, prohibitedWords = ['Routine', 'routine', 'Screening', 'screening']) {
  const found = findProhibitedWords(text, prohibitedWords);
  
  if (found.length > 0) {
    showModal('prohibited-words-warning', {
      title: 'Prohibited Words Detected',
      message: `Your justification contains prohibited words: <strong>${found.join(', ')}</strong>`,
      details: 'These words may result in automatic rejection. Please revise your clinical justification.',
      actions: [
        { label: 'Revise', class: 'btn-primary', callback: () => closeModal() },
        { label: 'Proceed Anyway', class: 'btn-secondary', callback: () => { closeModal(); return true; } }
      ]
    });
    return false;
  }
  
  return true;
}

// Edge Case 3: File Upload Failures
function handleFileUploadError(file, errorType) {
  let message = '';
  let suggestion = '';
  
  switch (errorType) {
    case 'size':
      message = `File "${file.name}" exceeds maximum size of 10 MB`;
      suggestion = 'Please compress the file or upload a smaller version.';
      break;
    case 'type':
      message = `File type "${file.type}" not supported`;
      suggestion = 'Please upload PDF, JPEG, or PNG files only.';
      break;
    case 'network':
      message = `Upload failed for "${file.name}"`;
      suggestion = 'Please check your connection and try again.';
      break;
    default:
      message = `Error uploading "${file.name}"`;
      suggestion = 'Please try again.';
  }
  
  showToast(message, 'error');
  
  // Show detailed error modal
  showModal('file-upload-error', {
    title: 'File Upload Error',
    message: message,
    details: suggestion,
    actions: [
      { label: 'Try Again', class: 'btn-primary', callback: () => closeModal() }
    ]
  });
}

// Edge Case 4: Insufficient Symptoms Selected
function checkMinimumSymptoms(selectedSymptoms, requiredMin) {
  if (selectedSymptoms.length < requiredMin) {
    showToast(`Please select at least ${requiredMin} symptoms. Currently selected: ${selectedSymptoms.length}`, 'error');
    
    // Highlight symptom section
    const symptomSection = document.getElementById('symptoms-section');
    if (symptomSection) {
      symptomSection.classList.add('border-2', 'border-red-500');
      symptomSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        symptomSection.classList.remove('border-2', 'border-red-500');
      }, 3000);
    }
    
    return false;
  }
  
  return true;
}

// Edge Case 5: ICD-10 Code Not in Approved List
function checkICD10Codes(selectedCodes, approvedCodes) {
  const nonApproved = selectedCodes.filter(code => !approvedCodes.includes(code));
  
  if (nonApproved.length > 0) {
    showModal('icd10-warning', {
      title: 'Non-Approved ICD-10 Codes',
      message: `The following codes are not in the approved list for this test:`,
      details: `<ul class="list-disc pl-5">${nonApproved.map(code => `<li class="text-yellow-800">${code}</li>`).join('')}</ul>`,
      warning: 'This may result in rejection during review.',
      actions: [
        { label: 'Remove Non-Approved Codes', class: 'btn-primary', callback: () => { removeNonApprovedCodes(nonApproved); closeModal(); } },
        { label: 'Proceed with Warning', class: 'btn-secondary', callback: () => { closeModal(); return true; } }
      ]
    });
    
    // Highlight non-approved codes
    nonApproved.forEach(code => {
      const codeElement = document.querySelector(`[data-code="${code}"]`);
      if (codeElement) {
        codeElement.classList.add('bg-yellow-100', 'border-yellow-500');
      }
    });
    
    return { hasNonApproved: true, nonApproved };
  }
  
  return { hasNonApproved: false, nonApproved: [] };
}

// Edge Case 6: Request Rejection
function handleRequestRejection(requestId, reason, details) {
  const request = getRequestById(requestId);
  
  showModal('request-rejected', {
    title: 'Request Rejected',
    message: `Request ${requestId} has been rejected.`,
    reason: reason,
    details: details,
    actions: [
      { label: 'View Request', class: 'btn-secondary', callback: () => { navigateTo(`/simulation-complete/requests/view.html?id=${requestId}`); } },
      { label: 'Create New Request', class: 'btn-primary', callback: () => { navigateTo('/simulation-complete/requests/create/step1-select-test.html'); } }
    ]
  });
}

// Edge Case 7: Request for More Information
function handleMoreInfoNeeded(requestId, reviewerMessage) {
  showModal('more-info-needed', {
    title: 'More Information Needed',
    message: `The reviewer has requested additional information for request ${requestId}:`,
    reviewerMessage: reviewerMessage,
    actions: [
      { label: 'View Request', class: 'btn-secondary', callback: () => { navigateTo(`/simulation-complete/requests/view.html?id=${requestId}`); } },
      { label: 'Update Request', class: 'btn-primary', callback: () => { navigateTo(`/simulation-complete/requests/resubmit.html?id=${requestId}`); } }
    ]
  });
}

// Edge Case 8: Duplicate Request Submission
function checkDuplicateRequest(patientId, testId) {
  const existing = mockRequests.find(req => 
    req.patientId === patientId &&
    req.testId === testId &&
    ['submitted', 'under_review', 'approved'].includes(req.status) &&
    daysSince(req.submittedDate) <= 30
  );
  
  if (existing) {
    return new Promise((resolve) => {
      showModal('duplicate-request-warning', {
        title: 'Duplicate Request Warning',
        message: `A request for this test and patient already exists:`,
        details: `
          <div class="bg-gray-50 p-4 rounded">
            <p><strong>Request ID:</strong> ${existing.id}</p>
            <p><strong>Test:</strong> ${existing.testName}</p>
            <p><strong>Patient:</strong> ${existing.patientName}</p>
            <p><strong>Status:</strong> <span class="px-2 py-1 rounded ${getStatusBadgeClass(existing.status)}">${getStatusLabel(existing.status)}</span></p>
            <p><strong>Submitted:</strong> ${formatDate(existing.submittedDate)}</p>
          </div>
        `,
        actions: [
          { label: 'View Existing Request', class: 'btn-secondary', callback: () => { navigateTo(`/simulation-complete/requests/view.html?id=${existing.id}`); resolve('view'); } },
          { label: 'Proceed Anyway', class: 'btn-warning', callback: () => { closeModal(); resolve('proceed'); } },
          { label: 'Cancel', class: 'btn-ghost', callback: () => { closeModal(); resolve('cancel'); } }
        ]
      });
    });
  }
  
  return Promise.resolve('proceed');
}

// Edge Case 9: Session Timeout During Request Creation
function handleSessionTimeout() {
  // Auto-save is already handled by state-management.js
  showModal('session-expired', {
    title: 'Session Expired',
    message: 'Your session has expired due to inactivity.',
    details: 'Your work has been automatically saved as a draft. Please log in again to continue.',
    actions: [
      { label: 'Login', class: 'btn-primary', callback: () => { logout(); } }
    ]
  });
}

// Edge Case 10: Reviewer Transfers Request
function handleRequestTransfer(requestId, newReviewerId, reason) {
  const request = getRequestById(requestId);
  const newReviewer = getUserById(newReviewerId);
  
  transitionRequest(requestId, 'submitted', {
    transferReason: reason,
    newReviewer: newReviewer.nameEN
  });
  
  showToast(`Request ${requestId} transferred to ${newReviewer.nameEN}`, 'success');
  
  // Log transfer
  logActivity({
    timestamp: new Date().toISOString(),
    user: getCurrentUser()?.nameEN,
    action: 'Transferred request',
    details: `${requestId} to ${newReviewer.nameEN}`,
    type: 'transfer'
  });
}

// Edge Case 11: Test Deactivated After Request Submitted
function checkTestStatus(testId) {
  const test = getTestById(testId);
  
  if (test && test.status === 'inactive') {
    showModal('test-inactive-warning', {
      title: 'Test Currently Inactive',
      message: `The test "${test.nameEN}" is currently inactive.`,
      details: 'This test has been deactivated by administrators but existing requests will still be processed.',
      warning: 'New requests for this test cannot be created.',
      actions: [
        { label: 'OK', class: 'btn-primary', callback: () => closeModal() }
      ]
    });
    return false;
  }
  
  return true;
}

// Edge Case 12: User Account Deactivated
function checkUserStatus() {
  const user = getCurrentUser();
  
  if (user && user.status === 'inactive') {
    showModal('account-deactivated', {
      title: 'Account Deactivated',
      message: 'Your account has been deactivated.',
      details: 'Please contact your administrator for assistance.',
      actions: [
        { label: 'Logout', class: 'btn-primary', callback: () => logout() }
      ]
    });
    return false;
  }
  
  return true;
}

// Edge Case 13: Reviewer Workload Overload
function checkReviewerWorkload() {
  const reviewers = mockUsers.filter(u => u.role === 'reviewer' && u.status === 'active');
  const workloads = reviewers.map(r => ({
    reviewer: r,
    pending: mockRequests.filter(req => req.reviewer === r.nameEN && req.status === 'under_review').length
  }));
  
  const avgWorkload = workloads.reduce((sum, w) => sum + w.pending, 0) / workloads.length;
  const overloaded = workloads.filter(w => w.pending > avgWorkload * 1.5);
  
  if (overloaded.length > 0) {
    console.warn('[WORKLOAD WARNING] Some reviewers are overloaded:', overloaded);
    // Admin would see this in their dashboard
  }
  
  return overloaded;
}

// Edge Case 14: Approval Expiration
function checkApprovalExpiration(approvalDate, expirationDate) {
  const expiry = new Date(expirationDate);
  const now = new Date();
  const daysUntilExpiry = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
  
  if (daysUntilExpiry <= 7 && daysUntilExpiry > 0) {
    showToast(`Approval expires in ${daysUntilExpiry} days`, 'warning');
  } else if (daysUntilExpiry <= 0) {
    showToast('Approval has expired', 'error');
    return { expired: true, daysUntilExpiry };
  }
  
  return { expired: false, daysUntilExpiry };
}

// Edge Case 15: Concurrent Editing
function handleConcurrentEdit(requestId) {
  if (!checkRequestLock(requestId)) {
    return false;
  }
  
  // Set up lock release on page unload
  window.addEventListener('beforeunload', () => {
    releaseRequestLock(requestId);
  });
  
  return true;
}

// Edge Case 16: System Backup During Active Use
function handleSystemBackup() {
  showToast('System backup in progress. Performance may be slightly affected.', 'info');
  
  // Increase auto-save frequency during backup
  const originalInterval = AUTOSAVE_INTERVAL;
  AUTOSAVE_INTERVAL = 15 * 1000; // 15 seconds
  
  // Restore original interval after backup (simulated 5 minutes)
  setTimeout(() => {
    AUTOSAVE_INTERVAL = originalInterval;
    showToast('System backup completed', 'success');
  }, 5 * 60 * 1000);
}

// Edge Case 17: Invalid Date Ranges in Reports
function validateDateRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (start > end) {
    showToast('End date must be after start date', 'error');
    return false;
  }
  
  // Check if range is too large (more than 1 year)
  const daysDiff = (end - start) / (1000 * 60 * 60 * 24);
  if (daysDiff > 365) {
    showToast('Date range must not exceed 1 year', 'error');
    return false;
  }
  
  return true;
}

// Edge Case 18: Export Failure
function handleExportFailure(error) {
  showModal('export-failed', {
    title: 'Export Failed',
    message: 'Failed to generate export file.',
    details: 'This may be due to large data size or a temporary system error.',
    suggestions: [
      'Try reducing the date range',
      'Apply more filters to reduce data size',
      'Export in smaller batches',
      'Try again in a few moments'
    ],
    actions: [
      { label: 'Try Again', class: 'btn-primary', callback: () => { closeModal(); } },
      { label: 'Adjust Filters', class: 'btn-secondary', callback: () => { closeModal(); } }
    ]
  });
}

// Edge Case 19: Password Reset for Inactive User
function handleInactiveUserPasswordReset(userId) {
  const user = getUserById(userId);
  
  if (user.status === 'inactive') {
    return new Promise((resolve) => {
      showModal('inactive-user-password-reset', {
        title: 'Inactive User Account',
        message: `User "${user.nameEN}" is currently inactive.`,
        details: 'Do you want to reset the password only, or also activate the account?',
        actions: [
          { label: 'Reset Password Only', class: 'btn-secondary', callback: () => { closeModal(); resolve('reset_only'); } },
          { label: 'Reset Password & Activate', class: 'btn-primary', callback: () => { closeModal(); resolve('reset_and_activate'); } },
          { label: 'Cancel', class: 'btn-ghost', callback: () => { closeModal(); resolve('cancel'); } }
        ]
      });
    });
  }
  
  return Promise.resolve('reset_only');
}

// Edge Case 20: Bulk Import Errors
function handleBulkImportErrors(successCount, errorCount, errors) {
  const errorDetails = errors.map(err => 
    `<li class="text-sm"><strong>Row ${err.row}:</strong> ${err.error}</li>`
  ).join('');
  
  showModal('bulk-import-results', {
    title: 'Import Results',
    message: `Import completed with ${successCount} successful and ${errorCount} failed rows.`,
    details: errorCount > 0 ? `
      <div class="mt-4">
        <p class="font-semibold mb-2">Errors:</p>
        <ul class="list-disc pl-5 max-h-60 overflow-y-auto">${errorDetails}</ul>
      </div>
    ` : '',
    actions: [
      { label: 'Download Error Report', class: 'btn-secondary', callback: () => { downloadErrorReport(errors); closeModal(); } },
      { label: 'Close', class: 'btn-primary', callback: () => closeModal() }
    ]
  });
}

function downloadErrorReport(errors) {
  const csv = 'Row,Error\n' + errors.map(err => `${err.row},"${err.error}"`).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `import_errors_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ============================================================================
// HELPER FUNCTIONS FOR EDGE CASES
// ============================================================================

function removeNonApprovedCodes(codes) {
  codes.forEach(code => {
    const codeElement = document.querySelector(`[data-code="${code}"]`);
    if (codeElement) {
      codeElement.remove();
    }
  });
  showToast('Non-approved codes removed', 'success');
}
