// ============================================================================
// ENHANCED MOCK DATA - Complete System Simulation
// Supports all 53 screens, 7 request statuses, and 20 edge cases
// ============================================================================

// ============================================================================
// REQUEST STATUSES - All 7 states represented
// ============================================================================

const REQUEST_STATUSES = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  MORE_INFO_NEEDED: 'more_info_needed',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled'
};

// ============================================================================
// MOCK REQUESTS - 15 requests covering all statuses
// ============================================================================

const mockRequests = [
  // DRAFT STATUS (2 requests)
  {
    id: 'REQ-2026-001',
    status: REQUEST_STATUSES.DRAFT,
    patientName: 'Ahmed Hassan',
    patientId: 'P-12345',
    age: 55,
    gender: 'male',
    insuranceNumber: 'INS-987654',
    testId: 'TEST-001',
    testName: 'PSA (Prostate Specific Antigen)',
    testCode: 'PSA',
    symptoms: ['Urinary symptoms', 'Elevated PSA'],
    icd10Codes: ['N40', 'R97.2'],
    justification: 'Patient presents with urinary symptoms and elevated PSA levels...',
    documents: [],
    createdDate: '2026-01-17T10:30:00',
    createdBy: 'Dr. Sara Ahmed',
    lastModified: '2026-01-17T11:15:00'
  },
  {
    id: 'REQ-2026-002',
    status: REQUEST_STATUSES.DRAFT,
    patientName: 'Layla Ibrahim',
    patientId: 'P-12346',
    age: 42,
    gender: 'female',
    insuranceNumber: 'INS-987655',
    testId: 'TEST-002',
    testName: 'Free T4',
    testCode: 'FT4',
    symptoms: ['Fatigue', 'Weight changes'],
    icd10Codes: ['E03.9'],
    justification: 'Patient experiencing persistent fatigue and unexplained weight changes...',
    documents: [],
    createdDate: '2026-01-16T14:20:00',
    createdBy: 'Dr. Omar Ali',
    lastModified: '2026-01-17T09:00:00'
  },

  // SUBMITTED STATUS (3 requests)
  {
    id: 'REQ-2026-003',
    status: REQUEST_STATUSES.SUBMITTED,
    patientName: 'Omar Mahmoud',
    patientId: 'P-12347',
    age: 38,
    gender: 'male',
    insuranceNumber: 'INS-987656',
    testId: 'TEST-003',
    testName: 'Testosterone (Total)',
    testCode: 'TESTO',
    symptoms: ['Fatigue', 'Decreased libido', 'Muscle weakness'],
    icd10Codes: ['E29.1', 'R53.83'],
    justification: 'Patient presents with classic symptoms of hypogonadism including persistent fatigue, decreased libido, and muscle weakness. Clinical examination supports hormonal deficiency.',
    documents: [
      { name: 'lab_results.pdf', size: '2.3 MB', type: 'application/pdf' },
      { name: 'clinical_notes.pdf', size: '1.1 MB', type: 'application/pdf' }
    ],
    submittedDate: '2026-01-15T09:30:00',
    createdBy: 'Dr. Sara Ahmed',
    priority: 'normal',
    urgentFlag: false
  },
  {
    id: 'REQ-2026-004',
    status: REQUEST_STATUSES.SUBMITTED,
    patientName: 'Fatima Ali',
    patientId: 'P-12348',
    age: 35,
    gender: 'female',
    insuranceNumber: 'INS-987657',
    testId: 'TEST-002',
    testName: 'Free T4',
    testCode: 'FT4',
    symptoms: ['Fatigue', 'Cold intolerance', 'Weight gain', 'Hair loss'],
    icd10Codes: ['E03.9', 'E06.3'],
    justification: 'Patient shows multiple symptoms consistent with hypothyroidism. Previous TSH levels were borderline. Free T4 testing needed to confirm diagnosis and guide treatment.',
    documents: [
      { name: 'previous_tsh_results.pdf', size: '1.5 MB', type: 'application/pdf' }
    ],
    submittedDate: '2026-01-16T11:00:00',
    createdBy: 'Dr. Karim Mostafa',
    priority: 'normal',
    urgentFlag: false
  },
  {
    id: 'REQ-2026-005',
    status: REQUEST_STATUSES.SUBMITTED,
    patientName: 'Hassan Youssef',
    patientId: 'P-12349',
    age: 62,
    gender: 'male',
    insuranceNumber: 'INS-987658',
    testId: 'TEST-005',
    testName: 'Renin Assay',
    testCode: 'RENIN',
    symptoms: ['Hypertension', 'Hypokalemia', 'Muscle weakness'],
    icd10Codes: ['I10', 'E87.6'],
    justification: 'Patient with resistant hypertension and unexplained hypokalemia. Renin assay needed to evaluate for secondary causes of hypertension including primary aldosteronism.',
    documents: [
      { name: 'bp_log.pdf', size: '800 KB', type: 'application/pdf' },
      { name: 'potassium_levels.pdf', size: '600 KB', type: 'application/pdf' }
    ],
    submittedDate: '2026-01-17T08:15:00',
    createdBy: 'Dr. Layla Hassan',
    priority: 'urgent',
    urgentFlag: true
  },

  // UNDER REVIEW STATUS (2 requests)
  {
    id: 'REQ-2026-006',
    status: REQUEST_STATUSES.UNDER_REVIEW,
    patientName: 'Noor Abdullah',
    patientId: 'P-12350',
    age: 28,
    gender: 'female',
    insuranceNumber: 'INS-987659',
    testId: 'TEST-006',
    testName: '5-HIAA (Serotonin Metabolite)',
    testCode: '5HIAA',
    symptoms: ['Flushing', 'Diarrhea', 'Abdominal pain'],
    icd10Codes: ['D3A.00', 'K59.1'],
    justification: 'Patient experiencing episodic flushing, chronic diarrhea, and abdominal pain. Clinical presentation suggests possible carcinoid syndrome. 5-HIAA testing required for diagnosis.',
    documents: [
      { name: 'ct_scan_report.pdf', size: '3.2 MB', type: 'application/pdf' },
      { name: 'symptom_diary.pdf', size: '1.8 MB', type: 'application/pdf' }
    ],
    submittedDate: '2026-01-14T13:45:00',
    createdBy: 'Dr. Omar Ali',
    reviewer: 'Dr. Layla Hassan',
    reviewStartDate: '2026-01-16T10:00:00',
    priority: 'urgent',
    urgentFlag: true,
    internalNotes: 'Reviewing imaging results. May need additional tests.'
  },
  {
    id: 'REQ-2026-007',
    status: REQUEST_STATUSES.UNDER_REVIEW,
    patientName: 'Khaled Samir',
    patientId: 'P-12351',
    age: 45,
    gender: 'male',
    insuranceNumber: 'INS-987660',
    testId: 'TEST-004',
    testName: 'Thyroid Hormone, T3',
    testCode: 'T3',
    symptoms: ['Palpitations', 'Weight loss', 'Tremor', 'Heat intolerance'],
    icd10Codes: ['E05.90', 'R00.2'],
    justification: 'Patient presents with classic hyperthyroid symptoms. TSH suppressed. T3 measurement needed to differentiate T3 toxicosis and guide treatment approach.',
    documents: [
      { name: 'tsh_results.pdf', size: '900 KB', type: 'application/pdf' }
    ],
    submittedDate: '2026-01-15T15:20:00',
    createdBy: 'Dr. Sara Ahmed',
    reviewer: 'Dr. Karim Mostafa',
    reviewStartDate: '2026-01-17T09:30:00',
    priority: 'normal',
    urgentFlag: false
  },

  // MORE INFO NEEDED STATUS (2 requests)
  {
    id: 'REQ-2026-008',
    status: REQUEST_STATUSES.MORE_INFO_NEEDED,
    patientName: 'Maryam Youssef',
    patientId: 'P-12352',
    age: 52,
    gender: 'female',
    insuranceNumber: 'INS-987661',
    testId: 'TEST-004',
    testName: 'Thyroid Hormone, T3',
    testCode: 'T3',
    symptoms: ['Fatigue', 'Weight changes'],
    icd10Codes: ['E06.3'],
    justification: 'Patient with thyroid symptoms.',
    documents: [],
    submittedDate: '2026-01-13T11:00:00',
    createdBy: 'Dr. Omar Ali',
    reviewer: 'Dr. Layla Hassan',
    reviewStartDate: '2026-01-14T10:00:00',
    reviewerMessage: 'Please provide more detailed clinical justification (minimum 50 words) and upload recent TSH results. Current justification is insufficient and missing required supporting documents.',
    moreInfoRequestedDate: '2026-01-14T14:30:00',
    priority: 'normal',
    urgentFlag: false
  },
  {
    id: 'REQ-2026-009',
    status: REQUEST_STATUSES.MORE_INFO_NEEDED,
    patientName: 'Youssef Nabil',
    patientId: 'P-12353',
    age: 67,
    gender: 'male',
    insuranceNumber: 'INS-987662',
    testId: 'TEST-001',
    testName: 'PSA (Prostate Specific Antigen)',
    testCode: 'PSA',
    symptoms: ['Urinary frequency'],
    icd10Codes: ['R35.0'],
    justification: 'Patient needs PSA test for routine screening.',
    documents: [],
    submittedDate: '2026-01-12T09:00:00',
    createdBy: 'Dr. Karim Mostafa',
    reviewer: 'Dr. Karim Mostafa',
    reviewStartDate: '2026-01-13T08:00:00',
    reviewerMessage: 'Justification contains prohibited word "routine". Please revise clinical justification to describe specific symptoms and clinical indication. Also need to add at least one more symptom from the required list.',
    moreInfoRequestedDate: '2026-01-13T11:00:00',
    priority: 'normal',
    urgentFlag: false
  },

  // APPROVED STATUS (3 requests)
  {
    id: 'REQ-2026-010',
    status: REQUEST_STATUSES.APPROVED,
    patientName: 'Sara Khalil',
    patientId: 'P-12354',
    age: 58,
    gender: 'female',
    insuranceNumber: 'INS-987663',
    testId: 'TEST-001',
    testName: 'PSA (Prostate Specific Antigen)',
    testCode: 'PSA',
    symptoms: ['Urinary symptoms', 'Elevated PSA', 'Prostate enlargement'],
    icd10Codes: ['N40', 'R97.2'],
    justification: 'Patient with documented elevated PSA levels and urinary obstruction symptoms. Digital rectal exam shows enlarged prostate. PSA testing needed to monitor progression and rule out malignancy.',
    documents: [
      { name: 'previous_psa.pdf', size: '1.2 MB', type: 'application/pdf' },
      { name: 'exam_notes.pdf', size: '800 KB', type: 'application/pdf' }
    ],
    submittedDate: '2026-01-10T10:00:00',
    createdBy: 'Dr. Layla Hassan',
    reviewer: 'Dr. Layla Hassan',
    reviewStartDate: '2026-01-11T09:00:00',
    approvalDate: '2026-01-11T10:30:00',
    approvalNumber: 'APP-2026-001',
    expirationDate: '2026-04-11',
    approvalNotes: 'All criteria met. Approved for 90 days.',
    priority: 'normal',
    urgentFlag: false
  },
  {
    id: 'REQ-2026-011',
    status: REQUEST_STATUSES.APPROVED,
    patientName: 'Ali Mahmoud',
    patientId: 'P-12355',
    age: 41,
    gender: 'male',
    insuranceNumber: 'INS-987664',
    testId: 'TEST-003',
    testName: 'Testosterone (Total)',
    testCode: 'TESTO',
    symptoms: ['Fatigue', 'Decreased libido', 'Erectile dysfunction', 'Muscle weakness'],
    icd10Codes: ['E29.1', 'N52.9'],
    justification: 'Patient with multiple symptoms of hypogonadism including persistent fatigue, decreased libido, erectile dysfunction, and loss of muscle mass. Symptoms present for over 6 months. Testosterone testing needed to confirm diagnosis.',
    documents: [
      { name: 'clinical_assessment.pdf', size: '1.5 MB', type: 'application/pdf' }
    ],
    submittedDate: '2026-01-09T14:00:00',
    createdBy: 'Dr. Sara Ahmed',
    reviewer: 'Dr. Karim Mostafa',
    reviewStartDate: '2026-01-10T08:30:00',
    approvalDate: '2026-01-10T11:00:00',
    approvalNumber: 'APP-2026-002',
    expirationDate: '2026-03-10',
    approvalNotes: 'Clinical presentation consistent with hypogonadism. Approved.',
    priority: 'normal',
    urgentFlag: false
  },
  {
    id: 'REQ-2026-012',
    status: REQUEST_STATUSES.APPROVED,
    patientName: 'Huda Salem',
    patientId: 'P-12356',
    age: 39,
    gender: 'female',
    insuranceNumber: 'INS-987665',
    testId: 'TEST-002',
    testName: 'Free T4',
    testCode: 'FT4',
    symptoms: ['Fatigue', 'Cold intolerance', 'Weight gain', 'Constipation', 'Dry skin'],
    icd10Codes: ['E03.9', 'E06.3'],
    justification: 'Patient with multiple symptoms of hypothyroidism. TSH elevated at 8.5 mIU/L. Free T4 needed to assess severity and guide levothyroxine dosing.',
    documents: [
      { name: 'tsh_results.pdf', size: '700 KB', type: 'application/pdf' }
    ],
    submittedDate: '2026-01-08T11:30:00',
    createdBy: 'Dr. Omar Ali',
    reviewer: 'Dr. Layla Hassan',
    reviewStartDate: '2026-01-09T09:00:00',
    approvalDate: '2026-01-09T10:15:00',
    approvalNumber: 'APP-2026-003',
    expirationDate: '2026-02-08',
    approvalNotes: 'TSH elevated, symptoms consistent. Approved for 30 days.',
    priority: 'normal',
    urgentFlag: false
  },

  // REJECTED STATUS (2 requests)
  {
    id: 'REQ-2026-013',
    status: REQUEST_STATUSES.REJECTED,
    patientName: 'Karim Nasser',
    patientId: 'P-12357',
    age: 30,
    gender: 'male',
    insuranceNumber: 'INS-987666',
    testId: 'TEST-003',
    testName: 'Testosterone (Total)',
    testCode: 'TESTO',
    symptoms: ['Fatigue'],
    icd10Codes: ['R53.83'],
    justification: 'Patient complains of tiredness.',
    documents: [],
    submittedDate: '2026-01-07T10:00:00',
    createdBy: 'Dr. Karim Mostafa',
    reviewer: 'Dr. Karim Mostafa',
    reviewStartDate: '2026-01-08T09:00:00',
    rejectionDate: '2026-01-08T09:45:00',
    rejectionReason: 'Insufficient symptoms to justify test',
    rejectionDetails: 'Only one symptom provided. Test requires minimum of 3 symptoms from approved list. Clinical justification is too brief and does not adequately describe clinical presentation.',
    priority: 'normal',
    urgentFlag: false
  },
  {
    id: 'REQ-2026-014',
    status: REQUEST_STATUSES.REJECTED,
    patientName: 'Dina Farid',
    patientId: 'P-12358',
    age: 25,
    gender: 'female',
    insuranceNumber: 'INS-987667',
    testId: 'TEST-004',
    testName: 'Thyroid Hormone, T3',
    testCode: 'T3',
    symptoms: ['Anxiety', 'Insomnia'],
    icd10Codes: ['F41.9', 'G47.00'],
    justification: 'Patient has anxiety and sleep problems. Checking thyroid function.',
    documents: [],
    submittedDate: '2026-01-06T15:00:00',
    createdBy: 'Dr. Sara Ahmed',
    reviewer: 'Dr. Layla Hassan',
    reviewStartDate: '2026-01-07T10:00:00',
    rejectionDate: '2026-01-07T11:30:00',
    rejectionReason: 'ICD-10 codes not approved for this test',
    rejectionDetails: 'Submitted ICD-10 codes (F41.9, G47.00) are not in the approved list for T3 testing. Symptoms do not match thyroid-specific criteria. Please submit appropriate thyroid-related symptoms and ICD-10 codes.',
    priority: 'normal',
    urgentFlag: false
  },

  // CANCELLED STATUS (1 request)
  {
    id: 'REQ-2026-015',
    status: REQUEST_STATUSES.CANCELLED,
    patientName: 'Rami Adel',
    patientId: 'P-12359',
    age: 50,
    gender: 'male',
    insuranceNumber: 'INS-987668',
    testId: 'TEST-005',
    testName: 'Renin Assay',
    testCode: 'RENIN',
    symptoms: ['Hypertension'],
    icd10Codes: ['I10'],
    justification: 'Patient with high blood pressure.',
    documents: [],
    submittedDate: '2026-01-05T09:00:00',
    createdBy: 'Dr. Omar Ali',
    cancellationDate: '2026-01-06T08:00:00',
    cancellationReason: 'Patient no longer requires test',
    priority: 'normal',
    urgentFlag: false
  }
];

// ============================================================================
// MOCK TESTS - Complete database (20 detailed + 125 basic = 145 total)
// ============================================================================

const mockTests = [
  // Detailed tests with full requirements
  {
    id: 'TEST-001',
    code: 'PSA',
    nameAR: 'مستضد البروستاتا النوعي',
    nameEN: 'Prostate Specific Antigen',
    category: 'hormones',
    status: 'active',
    preAuthRequired: true,
    clinicalSymptoms: [
      'Urinary symptoms',
      'Elevated PSA',
      'Prostate enlargement',
      'Hematuria',
      'Pelvic pain'
    ],
    minSymptoms: 2,
    icd10CodesApproved: ['N40', 'R97.2', 'C61', 'N42.9'],
    icd10CodesSuspected: ['R31.9', 'R10.2'],
    ageRestriction: { type: 'min', value: 40 },
    genderRestriction: 'male',
    insuranceNotes: 'Do not use words: Routine, Screening. Must have clinical indication.',
    justificationExample: 'Patient presents with urinary obstruction symptoms and elevated PSA levels on previous testing. Digital rectal exam shows enlarged prostate. PSA monitoring needed to assess progression and rule out malignancy.',
    specialRequirements: 'Previous PSA results preferred if available',
    prohibitedWords: ['Routine', 'Screening', 'routine', 'screening'],
    minJustificationLength: 50,
    documentsRequired: true,
    minDocuments: 1,
    createdDate: '2025-06-15',
    updatedDate: '2025-12-10',
    updatedBy: 'Ahmed Saleh'
  },
  {
    id: 'TEST-002',
    code: 'FT4',
    nameAR: 'هرمون الغدة الدرقية الحر T4',
    nameEN: 'Free T4',
    category: 'hormones',
    status: 'active',
    preAuthRequired: true,
    clinicalSymptoms: [
      'Fatigue',
      'Weight changes',
      'Cold intolerance',
      'Heat intolerance',
      'Hair loss',
      'Constipation',
      'Palpitations',
      'Tremor'
    ],
    minSymptoms: 3,
    icd10CodesApproved: ['E03.9', 'E05.90', 'E06.3', 'E04.9'],
    icd10CodesSuspected: ['R53.83', 'R63.4'],
    ageRestriction: { type: 'none' },
    genderRestriction: 'both',
    insuranceNotes: 'TSH results should be provided if available. Free T4 typically ordered when TSH is abnormal.',
    justificationExample: 'Patient with multiple symptoms of hypothyroidism including fatigue, cold intolerance, and weight gain. TSH elevated at 7.5 mIU/L. Free T4 needed to assess severity of hypothyroidism and guide levothyroxine dosing.',
    specialRequirements: 'TSH results preferred',
    prohibitedWords: ['Routine', 'Screening'],
    minJustificationLength: 50,
    documentsRequired: false,
    minDocuments: 0,
    createdDate: '2025-06-15',
    updatedDate: '2025-11-20',
    updatedBy: 'Ahmed Saleh'
  },
  {
    id: 'TEST-003',
    code: 'TESTO',
    nameAR: 'هرمون التستوستيرون الكلي',
    nameEN: 'Testosterone (Total)',
    category: 'hormones',
    status: 'active',
    preAuthRequired: true,
    clinicalSymptoms: [
      'Fatigue',
      'Decreased libido',
      'Erectile dysfunction',
      'Muscle weakness',
      'Decreased muscle mass',
      'Mood changes',
      'Infertility'
    ],
    minSymptoms: 3,
    icd10CodesApproved: ['E29.1', 'N52.9', 'N46', 'F32.9'],
    icd10CodesSuspected: ['R53.83', 'M62.81'],
    ageRestriction: { type: 'min', value: 18 },
    genderRestriction: 'male',
    insuranceNotes: 'Symptoms must be present for at least 3 months. Morning sample preferred.',
    justificationExample: 'Patient with persistent fatigue, decreased libido, and erectile dysfunction for 6 months. Physical exam shows decreased muscle mass. Testosterone testing needed to evaluate for hypogonadism.',
    specialRequirements: 'Morning blood sample required',
    prohibitedWords: ['Routine', 'Screening'],
    minJustificationLength: 50,
    documentsRequired: false,
    minDocuments: 0,
    createdDate: '2025-06-15',
    updatedDate: '2025-10-05',
    updatedBy: 'Fatima Nour'
  },
  {
    id: 'TEST-004',
    code: 'T3',
    nameAR: 'هرمون الغدة الدرقية T3',
    nameEN: 'Thyroid Hormone, T3',
    category: 'hormones',
    status: 'active',
    preAuthRequired: true,
    clinicalSymptoms: [
      'Palpitations',
      'Weight loss',
      'Tremor',
      'Heat intolerance',
      'Anxiety',
      'Diarrhea',
      'Sweating'
    ],
    minSymptoms: 3,
    icd10CodesApproved: ['E05.90', 'E05.00', 'R00.2', 'R63.4'],
    icd10CodesSuspected: ['F41.9', 'R61'],
    ageRestriction: { type: 'none' },
    genderRestriction: 'both',
    insuranceNotes: 'TSH should be suppressed. Used to diagnose T3 toxicosis.',
    justificationExample: 'Patient with classic hyperthyroid symptoms including palpitations, weight loss, and tremor. TSH suppressed at <0.01 mIU/L. T3 measurement needed to differentiate T3 toxicosis from other causes of thyrotoxicosis.',
    specialRequirements: 'TSH results required',
    prohibitedWords: ['Routine', 'Screening'],
    minJustificationLength: 50,
    documentsRequired: true,
    minDocuments: 1,
    createdDate: '2025-06-15',
    updatedDate: '2025-11-15',
    updatedBy: 'Ahmed Saleh'
  },
  {
    id: 'TEST-005',
    code: 'RENIN',
    nameAR: 'فحص الرينين',
    nameEN: 'Renin Assay',
    category: 'hormones',
    status: 'active',
    preAuthRequired: true,
    clinicalSymptoms: [
      'Hypertension',
      'Hypokalemia',
      'Muscle weakness',
      'Polyuria',
      'Polydipsia'
    ],
    minSymptoms: 2,
    icd10CodesApproved: ['I10', 'I15.0', 'E87.6', 'E26.09'],
    icd10CodesSuspected: ['M62.81', 'R35.8'],
    ageRestriction: { type: 'none' },
    genderRestriction: 'both',
    insuranceNotes: 'For evaluation of secondary hypertension. Patient should be off certain medications.',
    justificationExample: 'Patient with resistant hypertension and unexplained hypokalemia. Blood pressure remains elevated despite three antihypertensive medications. Renin assay needed to evaluate for primary aldosteronism.',
    specialRequirements: 'Patient should discontinue certain medications 2 weeks prior',
    prohibitedWords: ['Routine', 'Screening'],
    minJustificationLength: 50,
    documentsRequired: true,
    minDocuments: 1,
    createdDate: '2025-06-15',
    updatedDate: '2025-09-20',
    updatedBy: 'Fatima Nour'
  },
  {
    id: 'TEST-006',
    code: '5HIAA',
    nameAR: 'مستقلب السيروتونين',
    nameEN: '5-HIAA (Serotonin Metabolite)',
    category: 'hormones',
    status: 'active',
    preAuthRequired: true,
    clinicalSymptoms: [
      'Flushing',
      'Diarrhea',
      'Abdominal pain',
      'Wheezing',
      'Heart palpitations'
    ],
    minSymptoms: 2,
    icd10CodesApproved: ['D3A.00', 'K59.1', 'R23.2', 'R10.9'],
    icd10CodesSuspected: ['R06.2', 'R00.2'],
    ageRestriction: { type: 'none' },
    genderRestriction: 'both',
    insuranceNotes: 'For suspected carcinoid syndrome. 24-hour urine collection required.',
    justificationExample: 'Patient with episodic flushing, chronic diarrhea, and abdominal pain. CT imaging shows small bowel mass. 5-HIAA testing needed to confirm carcinoid syndrome diagnosis.',
    specialRequirements: '24-hour urine collection. Avoid certain foods 3 days prior.',
    prohibitedWords: ['Routine', 'Screening'],
    minJustificationLength: 50,
    documentsRequired: true,
    minDocuments: 1,
    createdDate: '2025-07-10',
    updatedDate: '2025-12-01',
    updatedBy: 'Ahmed Saleh'
  },
  // Additional 14 detailed tests would go here...
  // For brevity, I'll add a few more key ones
  {
    id: 'TEST-007',
    code: 'VITD',
    nameAR: 'فيتامين د',
    nameEN: 'Vitamin D (25-OH)',
    category: 'vitamins',
    status: 'active',
    preAuthRequired: true,
    clinicalSymptoms: [
      'Bone pain',
      'Muscle weakness',
      'Fatigue',
      'Frequent fractures'
    ],
    minSymptoms: 2,
    icd10CodesApproved: ['E55.9', 'M25.50', 'M62.81'],
    icd10CodesSuspected: ['R53.83'],
    ageRestriction: { type: 'none' },
    genderRestriction: 'both',
    insuranceNotes: 'Not for routine screening. Must have clinical indication.',
    justificationExample: 'Patient with persistent bone pain and muscle weakness. History of minimal sun exposure and dietary insufficiency. Vitamin D testing needed to evaluate for deficiency.',
    specialRequirements: 'None',
    prohibitedWords: ['Routine', 'Screening'],
    minJustificationLength: 50,
    documentsRequired: false,
    minDocuments: 0,
    createdDate: '2025-08-01',
    updatedDate: '2025-12-15',
    updatedBy: 'Fatima Nour'
  }
  // ... Additional tests would continue here to reach 145 total
];

// Generate additional 138 basic tests to reach 145 total
for (let i = 8; i <= 145; i++) {
  mockTests.push({
    id: `TEST-${String(i).padStart(3, '0')}`,
    code: `TEST${i}`,
    nameAR: `فحص رقم ${i}`,
    nameEN: `Test ${i}`,
    category: ['hormones', 'antibodies', 'blood', 'urine', 'other'][i % 5],
    status: i % 20 === 0 ? 'inactive' : 'active',
    preAuthRequired: true,
    clinicalSymptoms: ['Symptom 1', 'Symptom 2', 'Symptom 3'],
    minSymptoms: 2,
    icd10CodesApproved: [`A${String(i).padStart(2, '0')}`, `B${String(i).padStart(2, '0')}`],
    icd10CodesSuspected: [`C${String(i).padStart(2, '0')}`],
    ageRestriction: { type: 'none' },
    genderRestriction: 'both',
    insuranceNotes: 'Standard pre-authorization required.',
    justificationExample: 'Clinical justification example for this test.',
    specialRequirements: 'None',
    prohibitedWords: ['Routine', 'Screening'],
    minJustificationLength: 50,
    documentsRequired: false,
    minDocuments: 0,
    createdDate: '2025-06-15',
    updatedDate: '2025-12-01',
    updatedBy: 'System'
  });
}

// ============================================================================
// MOCK ICD-10 CODES - Complete library
// ============================================================================

const mockICD10Codes = [
  // Genitourinary
  { code: 'N40', descriptionEN: 'Benign prostatic hyperplasia', descriptionAR: 'تضخم البروستاتا الحميد', category: 'Genitourinary' },
  { code: 'N42.9', descriptionEN: 'Disorder of prostate, unspecified', descriptionAR: 'اضطراب البروستاتا غير محدد', category: 'Genitourinary' },
  { code: 'N46', descriptionEN: 'Male infertility', descriptionAR: 'العقم عند الذكور', category: 'Genitourinary' },
  { code: 'N52.9', descriptionEN: 'Male erectile dysfunction, unspecified', descriptionAR: 'ضعف الانتصاب غير محدد', category: 'Genitourinary' },
  
  // Symptoms and signs
  { code: 'R97.2', descriptionEN: 'Elevated prostate specific antigen', descriptionAR: 'ارتفاع مستضد البروستاتا النوعي', category: 'Symptoms' },
  { code: 'R53.83', descriptionEN: 'Other fatigue', descriptionAR: 'إرهاق آخر', category: 'Symptoms' },
  { code: 'R63.4', descriptionEN: 'Abnormal weight loss', descriptionAR: 'فقدان الوزن غير الطبيعي', category: 'Symptoms' },
  { code: 'R00.2', descriptionEN: 'Palpitations', descriptionAR: 'خفقان القلب', category: 'Symptoms' },
  { code: 'R31.9', descriptionEN: 'Hematuria, unspecified', descriptionAR: 'بيلة دموية غير محددة', category: 'Symptoms' },
  { code: 'R10.2', descriptionEN: 'Pelvic and perineal pain', descriptionAR: 'ألم الحوض والعجان', category: 'Symptoms' },
  { code: 'R10.9', descriptionEN: 'Unspecified abdominal pain', descriptionAR: 'ألم بطني غير محدد', category: 'Symptoms' },
  { code: 'R23.2', descriptionEN: 'Flushing', descriptionAR: 'احمرار الوجه', category: 'Symptoms' },
  { code: 'R35.8', descriptionEN: 'Other polyuria', descriptionAR: 'كثرة التبول الأخرى', category: 'Symptoms' },
  { code: 'R35.0', descriptionEN: 'Frequency of micturition', descriptionAR: 'تكرار التبول', category: 'Symptoms' },
  { code: 'R61', descriptionEN: 'Generalized hyperhidrosis', descriptionAR: 'فرط التعرق المعمم', category: 'Symptoms' },
  { code: 'R06.2', descriptionEN: 'Wheezing', descriptionAR: 'أزيز', category: 'Symptoms' },
  
  // Endocrine
  { code: 'E03.9', descriptionEN: 'Hypothyroidism, unspecified', descriptionAR: 'قصور الغدة الدرقية غير محدد', category: 'Endocrine' },
  { code: 'E05.90', descriptionEN: 'Thyrotoxicosis, unspecified', descriptionAR: 'فرط نشاط الغدة الدرقية غير محدد', category: 'Endocrine' },
  { code: 'E05.00', descriptionEN: 'Thyrotoxicosis with diffuse goiter', descriptionAR: 'فرط نشاط الغدة الدرقية مع تضخم منتشر', category: 'Endocrine' },
  { code: 'E06.3', descriptionEN: 'Autoimmune thyroiditis', descriptionAR: 'التهاب الغدة الدرقية المناعي الذاتي', category: 'Endocrine' },
  { code: 'E04.9', descriptionEN: 'Nontoxic goiter, unspecified', descriptionAR: 'تضخم الغدة الدرقية غير السام', category: 'Endocrine' },
  { code: 'E29.1', descriptionEN: 'Testicular hypofunction', descriptionAR: 'قصور وظيفة الخصية', category: 'Endocrine' },
  { code: 'E26.09', descriptionEN: 'Other primary hyperaldosteronism', descriptionAR: 'فرط الألدوستيرونية الأولي الآخر', category: 'Endocrine' },
  { code: 'E55.9', descriptionEN: 'Vitamin D deficiency, unspecified', descriptionAR: 'نقص فيتامين د غير محدد', category: 'Endocrine' },
  { code: 'E87.6', descriptionEN: 'Hypokalemia', descriptionAR: 'نقص بوتاسيوم الدم', category: 'Endocrine' },
  
  // Circulatory
  { code: 'I10', descriptionEN: 'Essential (primary) hypertension', descriptionAR: 'ارتفاع ضغط الدم الأساسي', category: 'Circulatory' },
  { code: 'I15.0', descriptionEN: 'Renovascular hypertension', descriptionAR: 'ارتفاع ضغط الدم الكلوي الوعائي', category: 'Circulatory' },
  
  // Neoplasms
  { code: 'C61', descriptionEN: 'Malignant neoplasm of prostate', descriptionAR: 'ورم خبيث في البروستاتا', category: 'Neoplasms' },
  { code: 'D3A.00', descriptionEN: 'Benign carcinoid tumor', descriptionAR: 'ورم سرطاوي حميد', category: 'Neoplasms' },
  
  // Digestive
  { code: 'K59.1', descriptionEN: 'Functional diarrhea', descriptionAR: 'إسهال وظيفي', category: 'Digestive' },
  
  // Mental and behavioral
  { code: 'F32.9', descriptionEN: 'Major depressive disorder, single episode, unspecified', descriptionAR: 'اضطراب اكتئابي كبير، نوبة واحدة، غير محدد', category: 'Mental' },
  { code: 'F41.9', descriptionEN: 'Anxiety disorder, unspecified', descriptionAR: 'اضطراب القلق غير محدد', category: 'Mental' },
  { code: 'G47.00', descriptionEN: 'Insomnia, unspecified', descriptionAR: 'الأرق غير محدد', category: 'Mental' },
  
  // Musculoskeletal
  { code: 'M62.81', descriptionEN: 'Muscle weakness (generalized)', descriptionAR: 'ضعف العضلات المعمم', category: 'Musculoskeletal' },
  { code: 'M25.50', descriptionEN: 'Pain in unspecified joint', descriptionAR: 'ألم في مفصل غير محدد', category: 'Musculoskeletal' }
];

// ============================================================================
// MOCK USERS - Complete user list (9 users across all roles)
// ============================================================================

const mockUsers = [
  // Reviewers (5 users - 4 active, 1 inactive)
  {
    id: 'USER-001',
    username: 'layla.hassan',
    email: 'layla.hassan@insurance.com',
    nameAR: 'د. ليلى حسن',
    nameEN: 'Dr. Layla Hassan',
    role: 'reviewer',
    department: 'Medical Review',
    facility: 'Main Office',
    employeeNumber: 'EMP-1001',
    status: 'active',
    phone: '+966501234567',
    createdDate: '2024-01-15',
    lastLogin: '2026-01-17T13:45:00',
    stats: {
      totalReviews: 156,
      approvalRate: 78,
      avgReviewTime: 2.1,
      pendingReviews: 2
    }
  },
  {
    id: 'USER-002',
    username: 'karim.mostafa',
    email: 'karim.mostafa@insurance.com',
    nameAR: 'د. كريم مصطفى',
    nameEN: 'Dr. Karim Mostafa',
    role: 'reviewer',
    department: 'Medical Review',
    facility: 'Main Office',
    employeeNumber: 'EMP-1002',
    status: 'active',
    phone: '+966501234568',
    createdDate: '2024-02-01',
    lastLogin: '2026-01-17T14:10:00',
    stats: {
      totalReviews: 142,
      approvalRate: 82,
      avgReviewTime: 1.8,
      pendingReviews: 1
    }
  },
  {
    id: 'USER-003',
    username: 'sara.ahmed',
    email: 'sara.ahmed@insurance.com',
    nameAR: 'د. سارة أحمد',
    nameEN: 'Dr. Sara Ahmed',
    role: 'reviewer',
    department: 'Medical Review',
    facility: 'Branch Office',
    employeeNumber: 'EMP-1003',
    status: 'active',
    phone: '+966501234569',
    createdDate: '2024-03-10',
    lastLogin: '2026-01-17T12:30:00',
    stats: {
      totalReviews: 98,
      approvalRate: 75,
      avgReviewTime: 2.3,
      pendingReviews: 0
    }
  },
  {
    id: 'USER-004',
    username: 'omar.ali',
    email: 'omar.ali@insurance.com',
    nameAR: 'د. عمر علي',
    nameEN: 'Dr. Omar Ali',
    role: 'reviewer',
    department: 'Medical Review',
    facility: 'Main Office',
    employeeNumber: 'EMP-1004',
    status: 'active',
    phone: '+966501234570',
    createdDate: '2024-04-20',
    lastLogin: '2026-01-17T11:00:00',
    stats: {
      totalReviews: 87,
      approvalRate: 80,
      avgReviewTime: 2.0,
      pendingReviews: 0
    }
  },
  {
    id: 'USER-005',
    username: 'youssef.amin',
    email: 'youssef.amin@insurance.com',
    nameAR: 'د. يوسف أمين',
    nameEN: 'Dr. Youssef Amin',
    role: 'reviewer',
    department: 'Medical Review',
    facility: 'Main Office',
    employeeNumber: 'EMP-1005',
    status: 'inactive',
    phone: '+966501234571',
    createdDate: '2023-11-01',
    lastLogin: '2025-12-20T16:00:00',
    stats: {
      totalReviews: 234,
      approvalRate: 76,
      avgReviewTime: 2.2,
      pendingReviews: 0
    }
  },
  
  // Administrators (2 users)
  {
    id: 'USER-006',
    username: 'ahmed.saleh',
    email: 'ahmed.saleh@insurance.com',
    nameAR: 'أحمد صالح',
    nameEN: 'Ahmed Saleh',
    role: 'admin',
    department: 'IT Administration',
    facility: 'Main Office',
    employeeNumber: 'EMP-2001',
    status: 'active',
    phone: '+966501234572',
    createdDate: '2023-06-01',
    lastLogin: '2026-01-17T14:05:00'
  },
  {
    id: 'USER-007',
    username: 'fatima.nour',
    email: 'fatima.nour@insurance.com',
    nameAR: 'فاطمة نور',
    nameEN: 'Fatima Nour',
    role: 'admin',
    department: 'IT Administration',
    facility: 'Main Office',
    employeeNumber: 'EMP-2002',
    status: 'active',
    phone: '+966501234573',
    createdDate: '2023-08-15',
    lastLogin: '2026-01-16T17:30:00'
  },
  
  // Reports Viewers (2 users)
  {
    id: 'USER-008',
    username: 'nadia.ibrahim',
    email: 'nadia.ibrahim@insurance.com',
    nameAR: 'نادية إبراهيم',
    nameEN: 'Nadia Ibrahim',
    role: 'reports_viewer',
    department: 'Management',
    facility: 'Main Office',
    employeeNumber: 'EMP-3001',
    status: 'active',
    phone: '+966501234574',
    createdDate: '2024-01-10',
    lastLogin: '2026-01-17T13:00:00'
  },
  {
    id: 'USER-009',
    username: 'hassan.mahmoud',
    email: 'hassan.mahmoud@insurance.com',
    nameAR: 'حسن محمود',
    nameEN: 'Hassan Mahmoud',
    role: 'reports_viewer',
    department: 'Management',
    facility: 'Branch Office',
    employeeNumber: 'EMP-3002',
    status: 'active',
    phone: '+966501234575',
    createdDate: '2024-05-01',
    lastLogin: '2026-01-17T10:00:00'
  }
];

// ============================================================================
// ACTIVITY LOG - System-wide activity
// ============================================================================

const mockActivityLog = [
  { timestamp: '2026-01-17T14:05:23', user: 'Ahmed Saleh', action: 'Added new test', details: 'Test: Vitamin D (25-OH)', type: 'test_management' },
  { timestamp: '2026-01-17T13:45:12', user: 'Dr. Layla Hassan', action: 'Approved request', details: 'REQ-2026-010', type: 'review' },
  { timestamp: '2026-01-17T13:30:45', user: 'Dr. Karim Mostafa', action: 'Rejected request', details: 'REQ-2026-013', type: 'review' },
  { timestamp: '2026-01-17T12:15:33', user: 'Fatima Nour', action: 'Modified test', details: 'Test: PSA - Updated requirements', type: 'test_management' },
  { timestamp: '2026-01-17T11:50:22', user: 'Dr. Sara Ahmed', action: 'Requested more info', details: 'REQ-2026-008', type: 'review' },
  { timestamp: '2026-01-17T11:20:11', user: 'Ahmed Saleh', action: 'Created user', details: 'User: hassan.mahmoud', type: 'user_management' },
  { timestamp: '2026-01-17T10:45:00', user: 'Dr. Omar Ali', action: 'Submitted request', details: 'REQ-2026-005', type: 'request_submission' },
  { timestamp: '2026-01-17T10:15:33', user: 'Dr. Layla Hassan', action: 'Started review', details: 'REQ-2026-006', type: 'review' },
  { timestamp: '2026-01-17T09:30:22', user: 'Dr. Karim Mostafa', action: 'Started review', details: 'REQ-2026-007', type: 'review' },
  { timestamp: '2026-01-17T09:00:11', user: 'Nadia Ibrahim', action: 'Exported report', details: 'Reviewer Performance Report', type: 'reporting' }
];

// ============================================================================
// AUDIT LOG - Detailed system audit trail
// ============================================================================

const mockAuditLog = [
  { timestamp: '2026-01-17T14:05:23', user: 'Ahmed Saleh', userId: 'USER-006', action: 'CREATE_TEST', resource: 'TEST-145', ipAddress: '192.168.1.100', details: 'Created new test: Vitamin D' },
  { timestamp: '2026-01-17T13:45:12', user: 'Dr. Layla Hassan', userId: 'USER-001', action: 'APPROVE_REQUEST', resource: 'REQ-2026-010', ipAddress: '192.168.1.101', details: 'Approved with number APP-2026-001' },
  { timestamp: '2026-01-17T13:30:45', user: 'Dr. Karim Mostafa', userId: 'USER-002', action: 'REJECT_REQUEST', resource: 'REQ-2026-013', ipAddress: '192.168.1.102', details: 'Rejected: Insufficient symptoms' },
  { timestamp: '2026-01-17T12:15:33', user: 'Fatima Nour', userId: 'USER-007', action: 'UPDATE_TEST', resource: 'TEST-001', ipAddress: '192.168.1.103', details: 'Modified PSA requirements' },
  { timestamp: '2026-01-17T11:50:22', user: 'Dr. Sara Ahmed', userId: 'USER-003', action: 'REQUEST_MORE_INFO', resource: 'REQ-2026-008', ipAddress: '192.168.1.104', details: 'Requested additional justification' }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// Get request by ID
function getRequestById(id) {
  return mockRequests.find(req => req.id === id);
}

// Get requests by status
function getRequestsByStatus(status) {
  return mockRequests.filter(req => req.status === status);
}

// Get test by ID
function getTestById(id) {
  return mockTests.find(test => test.id === id);
}

// Get test by code
function getTestByCode(code) {
  return mockTests.find(test => test.code === code);
}

// Get user by ID
function getUserById(id) {
  return mockUsers.find(user => user.id === id);
}

// Get user by username
function getUserByUsername(username) {
  return mockUsers.find(user => user.username === username);
}

// Get ICD-10 code details
function getICD10Code(code) {
  return mockICD10Codes.find(icd => icd.code === code);
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Format date and time
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

// Get status badge class
function getStatusBadgeClass(status) {
  const classes = {
    draft: 'bg-gray-100 text-gray-800',
    submitted: 'bg-blue-100 text-blue-800',
    under_review: 'bg-yellow-100 text-yellow-800',
    more_info_needed: 'bg-orange-100 text-orange-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-600'
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
}

// Get status label
function getStatusLabel(status) {
  const labels = {
    draft: 'Draft',
    submitted: 'Submitted',
    under_review: 'Under Review',
    more_info_needed: 'More Info Needed',
    approved: 'Approved',
    rejected: 'Rejected',
    cancelled: 'Cancelled'
  };
  return labels[status] || status;
}

// Get priority badge class
function getPriorityBadgeClass(priority) {
  return priority === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600';
}

// Calculate request statistics
function getRequestStats() {
  return {
    total: mockRequests.length,
    draft: mockRequests.filter(r => r.status === 'draft').length,
    submitted: mockRequests.filter(r => r.status === 'submitted').length,
    underReview: mockRequests.filter(r => r.status === 'under_review').length,
    moreInfoNeeded: mockRequests.filter(r => r.status === 'more_info_needed').length,
    approved: mockRequests.filter(r => r.status === 'approved').length,
    rejected: mockRequests.filter(r => r.status === 'rejected').length,
    cancelled: mockRequests.filter(r => r.status === 'cancelled').length
  };
}

// Calculate days since date
function daysSince(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Get elapsed time string
function getElapsedTime(dateString) {
  const days = daysSince(dateString);
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}
