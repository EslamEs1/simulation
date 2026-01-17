// Mock Data for Frontend Simulation
// Pre-Authorization Management System

// Mock Requests
const mockRequests = [
  {
    id: "REQ-2026-001",
    patientName: "Ahmed Hassan",
    patientId: "MRN-123456",
    age: 55,
    gender: "Male",
    insuranceNumber: "INS-789012",
    testName: "PSA (Prostate Specific Antigen)",
    testCode: "PSA-001",
    category: "Hormones",
    status: "pending",
    submittedDate: "2026-01-15T10:30:00",
    submittedBy: "Dr. Sarah Ahmed",
    priority: "normal",
    reviewer: null,
    symptoms: ["Urinary frequency", "Nocturia", "Weak urinary stream", "Incomplete bladder emptying"],
    icd10Codes: [
      { code: "N40.0", description: "Benign prostatic hyperplasia" },
      { code: "R33.8", description: "Other retention of urine" }
    ],
    justification: "Patient is a 55-year-old male presenting with lower urinary tract symptoms including increased frequency, nocturia (3-4 times per night), weak stream, and sensation of incomplete emptying. Digital rectal examination reveals enlarged prostate. Family history of prostate cancer. PSA test requested to rule out malignancy and establish baseline.",
    documents: [
      { name: "clinical-notes.pdf", size: "245 KB", type: "Clinical Notes" },
      { name: "dre-findings.pdf", size: "180 KB", type: "Examination Report" }
    ],
    validationResults: {
      symptoms: { status: "pass", message: "4 of 3 required symptoms present" },
      icd10: { status: "pass", message: "2 approved ICD-10 codes" },
      age: { status: "pass", message: "Patient 55 years (required >40)" },
      gender: { status: "pass", message: "Male (required)" },
      prohibitedWords: { status: "pass", message: "No prohibited words found" },
      justification: { status: "warning", message: "Present (120 words - good)" }
    }
  },
  {
    id: "REQ-2026-002",
    patientName: "Fatima Ali",
    patientId: "MRN-234567",
    age: 42,
    gender: "Female",
    insuranceNumber: "INS-890123",
    testName: "Free T4",
    testCode: "T4-002",
    category: "Hormones",
    status: "under_review",
    submittedDate: "2026-01-14T14:20:00",
    submittedBy: "Dr. Mohammed Khalil",
    priority: "normal",
    reviewer: "Dr. Layla Hassan",
    symptoms: ["Fatigue", "Weight gain", "Cold intolerance", "Dry skin"],
    icd10Codes: [
      { code: "E03.9", description: "Hypothyroidism, unspecified" }
    ],
    justification: "42-year-old female with 6-month history of progressive fatigue, unexplained weight gain of 8kg, cold intolerance, and dry skin. Previous TSH result 6.8 mIU/L (elevated). Free T4 requested to confirm hypothyroidism diagnosis and guide treatment.",
    documents: [
      { name: "previous-tsh.pdf", size: "156 KB", type: "Lab Report" }
    ],
    validationResults: {
      symptoms: { status: "pass", message: "4 of 3 required symptoms present" },
      icd10: { status: "pass", message: "1 approved ICD-10 code" },
      age: { status: "pass", message: "No age restriction" },
      gender: { status: "pass", message: "No gender restriction" },
      prohibitedWords: { status: "pass", message: "No prohibited words found" },
      justification: { status: "pass", message: "Present (85 words - adequate)" }
    }
  },
  {
    id: "REQ-2026-003",
    patientName: "Omar Mahmoud",
    patientId: "MRN-345678",
    age: 35,
    gender: "Male",
    insuranceNumber: "INS-901234",
    testName: "Testosterone (Total)",
    testCode: "TEST-003",
    category: "Hormones",
    status: "need_more_info",
    submittedDate: "2026-01-13T09:15:00",
    submittedBy: "Dr. Nadia Ibrahim",
    priority: "normal",
    reviewer: "Dr. Karim Mostafa",
    reviewerNote: "Please provide more details about the duration of symptoms and any previous hormone testing results.",
    symptoms: ["Decreased libido", "Fatigue"],
    icd10Codes: [
      { code: "E29.1", description: "Testicular hypofunction" }
    ],
    justification: "Patient reports decreased libido and fatigue. Testosterone test requested.",
    documents: [],
    validationResults: {
      symptoms: { status: "warning", message: "2 of 3 required symptoms (need 1 more)" },
      icd10: { status: "pass", message: "1 approved ICD-10 code" },
      age: { status: "pass", message: "No age restriction" },
      gender: { status: "pass", message: "Male (appropriate)" },
      prohibitedWords: { status: "pass", message: "No prohibited words found" },
      justification: { status: "fail", message: "Too brief (12 words - need 50+)" }
    }
  },
  {
    id: "REQ-2026-004",
    patientName: "Maryam Youssef",
    patientId: "MRN-456789",
    age: 28,
    gender: "Female",
    insuranceNumber: "INS-012345",
    testName: "Thyroid Hormone, T3",
    testCode: "T3-001",
    category: "Hormones",
    status: "approved",
    submittedDate: "2026-01-12T11:45:00",
    submittedBy: "Dr. Hassan Farid",
    priority: "normal",
    reviewer: "Dr. Layla Hassan",
    approvalNumber: "APP-2026-0012",
    approvalDate: "2026-01-13T10:30:00",
    expirationDate: "2026-02-12",
    symptoms: ["Palpitations", "Weight loss", "Heat intolerance", "Tremor", "Anxiety"],
    icd10Codes: [
      { code: "E05.90", description: "Thyrotoxicosis, unspecified" }
    ],
    justification: "28-year-old female presenting with classic hyperthyroid symptoms: palpitations, unintentional weight loss of 5kg over 2 months, heat intolerance, fine tremor, and anxiety. TSH suppressed at 0.1 mIU/L. Free T4 elevated at 2.8 ng/dL. T3 test requested to complete thyroid function assessment and confirm T3 toxicosis.",
    documents: [
      { name: "tsh-ft4-results.pdf", size: "198 KB", type: "Lab Report" },
      { name: "clinical-assessment.pdf", size: "220 KB", type: "Clinical Notes" }
    ],
    validationResults: {
      symptoms: { status: "pass", message: "5 of 3 required symptoms present" },
      icd10: { status: "pass", message: "1 approved ICD-10 code" },
      age: { status: "pass", message: "No age restriction" },
      gender: { status: "pass", message: "No gender restriction" },
      prohibitedWords: { status: "pass", message: "No prohibited words found" },
      justification: { status: "pass", message: "Excellent (95 words)" }
    }
  },
  {
    id: "REQ-2026-005",
    patientName: "Khaled Samir",
    patientId: "MRN-567890",
    age: 62,
    gender: "Male",
    insuranceNumber: "INS-123456",
    testName: "Renin Assay",
    testCode: "REN-001",
    category: "Hormones",
    status: "rejected",
    submittedDate: "2026-01-11T15:00:00",
    submittedBy: "Dr. Amira Zaki",
    priority: "normal",
    reviewer: "Dr. Karim Mostafa",
    rejectionReason: "Insufficient clinical justification. Patient does not meet criteria for resistant hypertension (not on 3+ antihypertensive medications). Please optimize current therapy first.",
    rejectionDate: "2026-01-12T09:20:00",
    symptoms: ["Hypertension"],
    icd10Codes: [
      { code: "I10", description: "Essential hypertension" }
    ],
    justification: "Patient has high blood pressure. On one medication. Renin test requested for screening.",
    documents: [],
    validationResults: {
      symptoms: { status: "fail", message: "1 of 3 required symptoms (need 2 more)" },
      icd10: { status: "warning", message: "Code present but not in approved list" },
      age: { status: "pass", message: "No age restriction" },
      gender: { status: "pass", message: "No gender restriction" },
      prohibitedWords: { status: "fail", message: "Prohibited word found: 'screening'" },
      justification: { status: "fail", message: "Too brief (14 words - need 50+)" }
    }
  },
  {
    id: "REQ-2026-006",
    patientName: "Nour Abdallah",
    patientId: "MRN-678901",
    age: 45,
    gender: "Female",
    insuranceNumber: "INS-234567",
    testName: "5HIAA",
    testCode: "5HI-001",
    category: "Hormones",
    status: "pending",
    submittedDate: "2026-01-16T08:30:00",
    submittedBy: "Dr. Tarek Mansour",
    priority: "urgent",
    reviewer: null,
    symptoms: ["Flushing", "Diarrhea", "Wheezing", "Abdominal pain"],
    icd10Codes: [
      { code: "D3A.00", description: "Benign carcinoid tumor, unspecified site" },
      { code: "E34.0", description: "Carcinoid syndrome" }
    ],
    justification: "45-year-old female with recurrent episodes of facial flushing, chronic diarrhea (6+ months), intermittent wheezing, and crampy abdominal pain. Episodes occur 3-4 times weekly. CT abdomen shows 2cm mass in terminal ileum. Strong suspicion of carcinoid tumor. 5-HIAA test requested to confirm diagnosis of carcinoid syndrome.",
    documents: [
      { name: "ct-abdomen.pdf", size: "1.2 MB", type: "Imaging Report" },
      { name: "symptom-diary.pdf", size: "340 KB", type: "Clinical Notes" }
    ],
    validationResults: {
      symptoms: { status: "pass", message: "4 of 4 required symptoms present" },
      icd10: { status: "pass", message: "2 approved ICD-10 codes" },
      age: { status: "pass", message: "No age restriction" },
      gender: { status: "pass", message: "No gender restriction" },
      prohibitedWords: { status: "pass", message: "No prohibited words found" },
      justification: { status: "pass", message: "Excellent (98 words)" }
    }
  }
];

// Mock Tests Database
const mockTests = [
  {
    id: "TEST-001",
    nameAr: "مستضد البروستاتا النوعي",
    nameEn: "PSA (Prostate Specific Antigen)",
    code: "PSA-001",
    category: "Hormones",
    status: "active",
    preAuthRequired: true,
    requiredSymptoms: ["Urinary frequency", "Nocturia", "Weak stream"],
    minSymptoms: 3,
    approvedICD10: ["N40.0", "N40.1", "C61", "R33.8"],
    suspectedICD10: ["R39.14", "R39.15"],
    ageRestriction: "≥40 years",
    genderRestriction: "Male only",
    insuranceNotes: "Do not use 'Routine' or 'Screening' in justification. Must have clinical symptoms.",
    justificationExample: "Patient presents with LUTS including frequency, nocturia, and weak stream. DRE shows enlarged prostate. Family history of prostate cancer.",
    lastUpdated: "2026-01-10"
  },
  {
    id: "TEST-002",
    nameAr: "هرمون الثيروكسين الحر",
    nameEn: "Free T4",
    code: "T4-002",
    category: "Hormones",
    status: "active",
    preAuthRequired: true,
    requiredSymptoms: ["Fatigue", "Weight changes", "Temperature intolerance"],
    minSymptoms: 3,
    approvedICD10: ["E03.9", "E05.90", "E06.3"],
    suspectedICD10: ["E07.9"],
    ageRestriction: "None",
    genderRestriction: "Both",
    insuranceNotes: "Usually ordered with TSH. Provide TSH result if available.",
    justificationExample: "Patient with symptoms of hypothyroidism. TSH elevated at 6.8 mIU/L. Free T4 needed to confirm diagnosis.",
    lastUpdated: "2026-01-08"
  },
  {
    id: "TEST-003",
    nameAr: "هرمون التستوستيرون الكلي",
    nameEn: "Testosterone (Total)",
    code: "TEST-003",
    category: "Hormones",
    status: "active",
    preAuthRequired: true,
    requiredSymptoms: ["Decreased libido", "Fatigue", "Erectile dysfunction"],
    minSymptoms: 3,
    approvedICD10: ["E29.1", "E89.5", "N46"],
    suspectedICD10: ["F52.0"],
    ageRestriction: "None",
    genderRestriction: "Both",
    insuranceNotes: "For males: need symptoms of hypogonadism. For females: need symptoms of androgen excess.",
    justificationExample: "Male patient with decreased libido, fatigue, and erectile dysfunction for 6 months. No improvement with lifestyle changes.",
    lastUpdated: "2026-01-05"
  },
  {
    id: "TEST-004",
    nameAr: "هرمون الغدة الدرقية T3",
    nameEn: "Thyroid Hormone, T3",
    code: "T3-001",
    category: "Hormones",
    status: "active",
    preAuthRequired: true,
    requiredSymptoms: ["Palpitations", "Weight loss", "Heat intolerance"],
    minSymptoms: 3,
    approvedICD10: ["E05.90", "E05.00", "E05.10"],
    suspectedICD10: ["E07.0"],
    ageRestriction: "None",
    genderRestriction: "Both",
    insuranceNotes: "Usually for suspected hyperthyroidism. Provide TSH and Free T4 if available.",
    justificationExample: "Patient with hyperthyroid symptoms. TSH suppressed, Free T4 elevated. T3 needed to complete assessment.",
    lastUpdated: "2026-01-07"
  },
  {
    id: "TEST-005",
    nameAr: "فحص الرينين",
    nameEn: "Renin Assay",
    code: "REN-001",
    category: "Hormones",
    status: "active",
    preAuthRequired: true,
    requiredSymptoms: ["Resistant hypertension", "Hypokalemia", "Adrenal mass"],
    minSymptoms: 2,
    approvedICD10: ["I15.0", "I15.2", "E26.09"],
    suspectedICD10: ["I15.9"],
    ageRestriction: "None",
    genderRestriction: "Both",
    insuranceNotes: "Only for resistant hypertension (on 3+ medications) or suspected secondary causes. Not for routine screening.",
    justificationExample: "Patient with resistant hypertension on 3 antihypertensives. Persistent hypokalemia. Suspected primary aldosteronism.",
    lastUpdated: "2026-01-06"
  }
];

// Mock Users
const mockUsers = [
  {
    id: "USER-001",
    fullName: "Dr. Layla Hassan",
    email: "layla.hassan@insurance.com",
    role: "reviewer",
    department: "Medical Review",
    status: "active",
    lastLogin: "2026-01-17T09:15:00",
    createdDate: "2025-11-01",
    reviewCount: 156,
    approvalRate: 78
  },
  {
    id: "USER-002",
    fullName: "Dr. Karim Mostafa",
    email: "karim.mostafa@insurance.com",
    role: "reviewer",
    department: "Medical Review",
    status: "active",
    lastLogin: "2026-01-17T08:30:00",
    createdDate: "2025-11-01",
    reviewCount: 142,
    approvalRate: 72
  },
  {
    id: "USER-003",
    fullName: "Ahmed Saleh",
    email: "ahmed.saleh@insurance.com",
    role: "admin",
    department: "IT Administration",
    status: "active",
    lastLogin: "2026-01-16T16:45:00",
    createdDate: "2025-10-15"
  },
  {
    id: "USER-004",
    fullName: "Nadia Ibrahim",
    email: "nadia.ibrahim@insurance.com",
    role: "reports_viewer",
    department: "Management",
    status: "active",
    lastLogin: "2026-01-17T07:00:00",
    createdDate: "2025-12-01"
  },
  {
    id: "USER-005",
    fullName: "Dr. Youssef Amin",
    email: "youssef.amin@insurance.com",
    role: "reviewer",
    department: "Medical Review",
    status: "inactive",
    lastLogin: "2025-12-20T14:20:00",
    createdDate: "2025-09-01",
    reviewCount: 89,
    approvalRate: 81
  }
];

// Mock Activity Log
const mockActivityLog = [
  {
    timestamp: "2026-01-17T10:30:00",
    user: "Dr. Layla Hassan",
    action: "Approved request",
    details: "REQ-2026-004 - Thyroid Hormone, T3"
  },
  {
    timestamp: "2026-01-17T09:45:00",
    user: "Dr. Karim Mostafa",
    action: "Requested more info",
    details: "REQ-2026-003 - Testosterone (Total)"
  },
  {
    timestamp: "2026-01-17T09:20:00",
    user: "Ahmed Saleh",
    action: "Added new test",
    details: "Vitamin D, 25-Hydroxy"
  },
  {
    timestamp: "2026-01-16T15:30:00",
    user: "Dr. Karim Mostafa",
    action: "Rejected request",
    details: "REQ-2026-005 - Renin Assay"
  },
  {
    timestamp: "2026-01-16T14:15:00",
    user: "Ahmed Saleh",
    action: "Updated user",
    details: "Deactivated USER-005"
  }
];

// Helper Functions
function getRequestById(id) {
  return mockRequests.find(req => req.id === id);
}

function getRequestsByStatus(status) {
  return mockRequests.filter(req => req.status === status);
}

function getTestById(id) {
  return mockTests.find(test => test.id === id);
}

function getUserById(id) {
  return mockUsers.find(user => user.id === id);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function getStatusBadgeClass(status) {
  const badges = {
    'pending': 'bg-gray-100 text-gray-800',
    'under_review': 'bg-blue-100 text-blue-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
    'need_more_info': 'bg-yellow-100 text-yellow-800'
  };
  return badges[status] || 'bg-gray-100 text-gray-800';
}

function getStatusLabel(status) {
  const labels = {
    'pending': 'Pending',
    'under_review': 'Under Review',
    'approved': 'Approved',
    'rejected': 'Rejected',
    'need_more_info': 'Need More Info'
  };
  return labels[status] || status;
}

function getPriorityBadgeClass(priority) {
  const badges = {
    'urgent': 'bg-red-100 text-red-800',
    'normal': 'bg-gray-100 text-gray-800'
  };
  return badges[priority] || 'bg-gray-100 text-gray-800';
}

// Statistics Calculations
function getRequestStats() {
  const total = mockRequests.length;
  const pending = mockRequests.filter(r => r.status === 'pending').length;
  const underReview = mockRequests.filter(r => r.status === 'under_review').length;
  const approved = mockRequests.filter(r => r.status === 'approved').length;
  const rejected = mockRequests.filter(r => r.status === 'rejected').length;
  const needMoreInfo = mockRequests.filter(r => r.status === 'need_more_info').length;
  
  return {
    total,
    pending,
    underReview,
    approved,
    rejected,
    needMoreInfo,
    approvalRate: total > 0 ? Math.round((approved / total) * 100) : 0
  };
}
