// Main JavaScript for Frontend Simulation
// Pre-Authorization Management System

// Global state
let currentUser = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // Check if user is logged in
  currentUser = localStorage.getItem('currentUser');
  
  // Update UI based on login state
  updateNavigation();
  
  // Initialize page-specific functionality
  const page = document.body.dataset.page;
  if (page) {
    initializePage(page);
  }
}

function initializePage(page) {
  switch(page) {
    case 'reviewer-dashboard':
      initializeReviewerDashboard();
      break;
    case 'review-request':
      initializeReviewRequest();
      break;
    case 'admin-dashboard':
      initializeAdminDashboard();
      break;
    case 'test-database':
      initializeTestDatabase();
      break;
    case 'reports-dashboard':
      initializeReportsDashboard();
      break;
  }
}

// Navigation functions
function updateNavigation() {
  const userInfo = document.getElementById('user-info');
  if (userInfo && currentUser) {
    const user = JSON.parse(currentUser);
    userInfo.innerHTML = `
      <span class="text-sm text-gray-700">${user.fullName}</span>
      <button onclick="logout()" class="ml-4 text-sm text-red-600 hover:text-red-800">Logout</button>
    `;
  }
}

function login(role) {
  // Find a user with this role
  const user = mockUsers.find(u => u.role === role && u.status === 'active');
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Redirect to appropriate dashboard
    switch(role) {
      case 'reviewer':
        window.location.href = 'reviewer/dashboard.html';
        break;
      case 'admin':
        window.location.href = 'admin/dashboard.html';
        break;
      case 'reports_viewer':
        window.location.href = 'reports/dashboard.html';
        break;
    }
  }
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = '../index.html';
}

// Modal functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

// Toast notification
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  
  toast.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('animate-fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Form validation
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;
  
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add('border-red-500');
    } else {
      field.classList.remove('border-red-500');
    }
  });
  
  return isValid;
}

// Reviewer Dashboard
function initializeReviewerDashboard() {
  loadRequestsTable();
  updateStats();
  initializeFilters();
}

function loadRequestsTable(filter = 'all') {
  const tbody = document.getElementById('requests-tbody');
  if (!tbody) return;
  
  let requests = mockRequests;
  
  // Apply filter
  if (filter !== 'all') {
    requests = requests.filter(r => r.status === filter);
  }
  
  // Sort by date (newest first)
  requests.sort((a, b) => new Date(b.submittedDate) - new Date(a.submittedDate));
  
  tbody.innerHTML = requests.map(req => `
    <tr class="hover:bg-gray-50">
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${req.id}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${req.patientName}</td>
      <td class="px-6 py-4 text-sm text-gray-900">${req.testName}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${formatDate(req.submittedDate)}</td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(req.status)}">
          ${getStatusLabel(req.status)}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        ${req.priority === 'urgent' ? '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Urgent</span>' : ''}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${req.reviewer || '-'}</td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <a href="review-request.html?id=${req.id}" class="text-blue-600 hover:text-blue-900">Review</a>
      </td>
    </tr>
  `).join('');
}

function updateStats() {
  const stats = getRequestStats();
  
  const elements = {
    'stat-pending': stats.pending,
    'stat-under-review': stats.underReview,
    'stat-approved': stats.approved,
    'stat-rejected': stats.rejected
  };
  
  Object.entries(elements).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  });
}

function initializeFilters() {
  const filterButtons = document.querySelectorAll('[data-filter]');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.dataset.filter;
      loadRequestsTable(filter);
      
      // Update active state
      filterButtons.forEach(b => b.classList.remove('bg-blue-100', 'text-blue-700'));
      this.classList.add('bg-blue-100', 'text-blue-700');
    });
  });
}

// Review Request Page
function initializeReviewRequest() {
  const urlParams = new URLSearchParams(window.location.search);
  const requestId = urlParams.get('id');
  
  if (requestId) {
    loadRequestDetails(requestId);
  }
}

function loadRequestDetails(requestId) {
  const request = getRequestById(requestId);
  if (!request) return;
  
  // Update page title
  document.getElementById('request-id').textContent = request.id;
  
  // Load patient info
  document.getElementById('patient-name').textContent = request.patientName;
  document.getElementById('patient-id').textContent = request.patientId;
  document.getElementById('patient-age').textContent = request.age;
  document.getElementById('patient-gender').textContent = request.gender;
  document.getElementById('insurance-number').textContent = request.insuranceNumber;
  
  // Load test info
  document.getElementById('test-name').textContent = request.testName;
  document.getElementById('test-code').textContent = request.testCode;
  document.getElementById('submitted-date').textContent = formatDateTime(request.submittedDate);
  document.getElementById('submitted-by').textContent = request.submittedBy;
  
  // Load symptoms
  const symptomsList = document.getElementById('symptoms-list');
  symptomsList.innerHTML = request.symptoms.map(s => `<li class="flex items-center"><svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>${s}</li>`).join('');
  
  // Load ICD-10 codes
  const icdList = document.getElementById('icd10-list');
  icdList.innerHTML = request.icd10Codes.map(c => `<li><span class="font-semibold">${c.code}</span> - ${c.description}</li>`).join('');
  
  // Load justification
  document.getElementById('justification-text').textContent = request.justification;
  
  // Load documents
  const docsList = document.getElementById('documents-list');
  if (request.documents.length > 0) {
    docsList.innerHTML = request.documents.map(d => `
      <li class="flex items-center justify-between py-2">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/></svg>
          <span class="text-sm">${d.name}</span>
          <span class="ml-2 text-xs text-gray-500">(${d.size})</span>
        </div>
        <button class="text-blue-600 hover:text-blue-800 text-sm">View</button>
      </li>
    `).join('');
  } else {
    docsList.innerHTML = '<li class="text-gray-500 text-sm">No documents uploaded</li>';
  }
  
  // Load validation results
  loadValidationResults(request.validationResults);
}

function loadValidationResults(results) {
  const tbody = document.getElementById('validation-tbody');
  if (!tbody) return;
  
  const criteria = [
    { key: 'symptoms', label: 'Clinical Symptoms' },
    { key: 'icd10', label: 'ICD-10 Codes' },
    { key: 'age', label: 'Age Restriction' },
    { key: 'gender', label: 'Gender Restriction' },
    { key: 'prohibitedWords', label: 'Prohibited Words' },
    { key: 'justification', label: 'Clinical Justification' }
  ];
  
  tbody.innerHTML = criteria.map(c => {
    const result = results[c.key];
    const icon = result.status === 'pass' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';
    const textColor = result.status === 'pass' ? 'text-green-700' : result.status === 'warning' ? 'text-yellow-700' : 'text-red-700';
    
    return `
      <tr>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${c.label}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">${icon}</td>
        <td class="px-6 py-4 text-sm ${textColor}">${result.message}</td>
      </tr>
    `;
  }).join('');
}

function approveRequest() {
  openModal('approve-modal');
}

function rejectRequest() {
  openModal('reject-modal');
}

function requestMoreInfo() {
  openModal('more-info-modal');
}

function submitApproval() {
  const approvalNumber = document.getElementById('approval-number').value;
  if (!approvalNumber) {
    showToast('Please enter approval number', 'error');
    return;
  }
  
  closeModal('approve-modal');
  showToast('Request approved successfully!', 'success');
  
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1500);
}

function submitRejection() {
  const reason = document.getElementById('rejection-reason').value;
  if (!reason) {
    showToast('Please provide a rejection reason', 'error');
    return;
  }
  
  closeModal('reject-modal');
  showToast('Request rejected', 'error');
  
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1500);
}

function submitMoreInfo() {
  const message = document.getElementById('more-info-message').value;
  if (!message) {
    showToast('Please enter your message', 'error');
    return;
  }
  
  closeModal('more-info-modal');
  showToast('Request sent back for more information', 'info');
  
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1500);
}

// Admin Dashboard
function initializeAdminDashboard() {
  updateAdminStats();
  loadActivityLog();
}

function updateAdminStats() {
  const stats = getRequestStats();
  
  document.getElementById('total-tests').textContent = mockTests.length;
  document.getElementById('active-users').textContent = mockUsers.filter(u => u.status === 'active').length;
  document.getElementById('pending-requests').textContent = stats.pending;
}

function loadActivityLog() {
  const tbody = document.getElementById('activity-tbody');
  if (!tbody) return;
  
  tbody.innerHTML = mockActivityLog.map(log => `
    <tr class="hover:bg-gray-50">
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${formatDateTime(log.timestamp)}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${log.user}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${log.action}</td>
      <td class="px-6 py-4 text-sm text-gray-500">${log.details}</td>
    </tr>
  `).join('');
}

// Tests List
function initializeTestDatabase() {
  loadTestsTable();
}

function loadTestsTable(searchTerm = '') {
  const tbody = document.getElementById('tests-tbody');
  if (!tbody) return;
  
  let tests = mockTests;
  
  // Apply search filter
  if (searchTerm) {
    tests = tests.filter(t => 
      t.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.nameAr.includes(searchTerm) ||
      t.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  tbody.innerHTML = tests.map(test => `
    <tr class="hover:bg-gray-50">
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${test.code}</td>
      <td class="px-6 py-4 text-sm text-gray-900">${test.nameEn}</td>
      <td class="px-6 py-4 text-sm text-gray-700">${test.nameAr}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${test.category}</td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${test.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
          ${test.status}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button onclick="editTest('${test.id}')" class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
        <button onclick="toggleTestStatus('${test.id}')" class="text-gray-600 hover:text-gray-900">Deactivate</button>
      </td>
    </tr>
  `).join('');
}

function searchTests() {
  const searchInput = document.getElementById('test-search');
  if (searchInput) {
    loadTestsTable(searchInput.value);
  }
}

function editTest(testId) {
  window.location.href = `test-details.html?id=${testId}`;
}

function toggleTestStatus(testId) {
  showToast('Test status updated', 'success');
  // In real app, would update the status
}

// Reports Dashboard
function initializeReportsDashboard() {
  updateReportStats();
  loadCharts();
}

function updateReportStats() {
  const stats = getRequestStats();
  
  document.getElementById('total-requests').textContent = stats.total;
  document.getElementById('approval-rate').textContent = stats.approvalRate + '%';
  document.getElementById('avg-review-time').textContent = '2.3 days';
  document.getElementById('pending-count').textContent = stats.pending;
}

function loadCharts() {
  // Placeholder for chart initialization
  // In a real implementation, would use Chart.js or similar
  console.log('Charts would be loaded here');
}
