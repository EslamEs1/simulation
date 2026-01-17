// ============================================================================
// VALIDATION RULES - Complete validation system for all forms
// ============================================================================

const validationRules = {
  // Login validation
  login: {
    username: {
      required: true,
      maxLength: 50,
      pattern: /^[a-zA-Z0-9_.-]+$/,
      message: 'Username must contain only letters, numbers, dots, dashes, and underscores'
    },
    password: {
      required: true,
      maxLength: 100,
      minLength: 8,
      message: 'Password must be at least 8 characters'
    }
  },

  // Patient information validation
  patientInfo: {
    fullName: {
      required: true,
      maxLength: 100,
      pattern: /^[a-zA-Z\s]+$/,
      message: 'Name must contain only letters and spaces'
    },
    patientId: {
      required: true,
      maxLength: 50,
      pattern: /^[a-zA-Z0-9-]+$/,
      message: 'Patient ID must contain only letters, numbers, and dashes'
    },
    age: {
      required: true,
      min: 0,
      max: 150,
      type: 'number',
      message: 'Age must be between 0 and 150'
    },
    gender: {
      required: true,
      enum: ['male', 'female'],
      message: 'Please select a gender'
    },
    insuranceNumber: {
      required: true,
      maxLength: 50,
      pattern: /^[a-zA-Z0-9-]+$/,
      message: 'Insurance number must contain only letters, numbers, and dashes'
    },
    email: {
      required: false,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    },
    phone: {
      required: false,
      pattern: /^[+]?[\d\s-()]+$/,
      message: 'Please enter a valid phone number'
    }
  },

  // Clinical justification validation
  justification: {
    text: {
      required: true,
      minWords: 50,
      maxWords: 1000,
      prohibitedWords: ['Routine', 'routine', 'Screening', 'screening'],
      message: 'Justification must be between 50 and 1000 words and cannot contain prohibited words (Routine, Screening)'
    }
  },

  // File upload validation
  fileUpload: {
    allowedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
    allowedExtensions: ['.pdf', '.jpg', '.jpeg', '.png'],
    maxSize: 10 * 1024 * 1024, // 10 MB in bytes
    maxFiles: 10,
    messages: {
      invalidType: 'Only PDF, JPEG, and PNG files are allowed',
      tooLarge: 'File size must not exceed 10 MB',
      tooMany: 'Maximum 10 files allowed'
    }
  },

  // Test form validation
  testForm: {
    testCode: {
      required: true,
      maxLength: 20,
      pattern: /^[A-Z0-9-]+$/,
      unique: true,
      message: 'Test code must be uppercase letters, numbers, and dashes only'
    },
    testNameEN: {
      required: true,
      maxLength: 100,
      message: 'English name is required (max 100 characters)'
    },
    testNameAR: {
      required: true,
      maxLength: 100,
      message: 'Arabic name is required (max 100 characters)'
    },
    category: {
      required: true,
      enum: ['hormones', 'antibodies', 'blood', 'urine', 'vitamins', 'other'],
      message: 'Please select a category'
    },
    minSymptoms: {
      required: true,
      min: 1,
      max: 20,
      type: 'number',
      message: 'Minimum symptoms must be between 1 and 20'
    },
    minJustificationLength: {
      required: false,
      min: 10,
      max: 500,
      type: 'number',
      message: 'Minimum justification length must be between 10 and 500 words'
    }
  },

  // User form validation
  userForm: {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      unique: true,
      message: 'Please enter a valid, unique email address'
    },
    username: {
      required: true,
      minLength: 3,
      maxLength: 50,
      pattern: /^[a-zA-Z0-9_.-]+$/,
      unique: true,
      message: 'Username must be 3-50 characters, letters, numbers, dots, dashes, underscores only'
    },
    password: {
      required: true,
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: 'Password must be at least 8 characters with 1 lowercase, 1 uppercase, and 1 digit'
    },
    nameEN: {
      required: true,
      maxLength: 100,
      message: 'English name is required (max 100 characters)'
    },
    nameAR: {
      required: true,
      maxLength: 100,
      message: 'Arabic name is required (max 100 characters)'
    },
    role: {
      required: true,
      enum: ['reviewer', 'admin', 'reports_viewer'],
      message: 'Please select a valid role'
    },
    phone: {
      required: false,
      pattern: /^[+]?[\d\s-()]+$/,
      message: 'Please enter a valid phone number'
    },
    employeeNumber: {
      required: false,
      pattern: /^[A-Z0-9-]+$/,
      unique: true,
      message: 'Employee number must be uppercase letters, numbers, and dashes'
    }
  },

  // Approval form validation
  approvalForm: {
    approvalNumber: {
      required: true,
      maxLength: 50,
      pattern: /^[A-Z0-9-]+$/,
      message: 'Approval number must be uppercase letters, numbers, and dashes'
    },
    expirationDate: {
      required: true,
      type: 'date',
      futureDate: true,
      message: 'Expiration date must be a future date'
    },
    notes: {
      required: false,
      maxLength: 500,
      message: 'Notes must not exceed 500 characters'
    }
  },

  // Rejection form validation
  rejectionForm: {
    reason: {
      required: true,
      maxLength: 200,
      message: 'Rejection reason is required (max 200 characters)'
    },
    details: {
      required: false,
      maxLength: 500,
      message: 'Additional details must not exceed 500 characters'
    }
  },

  // Request more info form validation
  requestInfoForm: {
    message: {
      required: true,
      minLength: 10,
      maxLength: 500,
      message: 'Message must be between 10 and 500 characters'
    }
  }
};

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate a single field against its rules
 * @param {string} fieldName - Name of the field
 * @param {any} value - Value to validate
 * @param {object} rules - Validation rules for the field
 * @param {object} allData - All form data (for unique checks)
 * @returns {array} Array of error messages (empty if valid)
 */
function validateField(fieldName, value, rules, allData = {}) {
  const errors = [];

  // Required check
  if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    errors.push(rules.message || `${fieldName} is required`);
    return errors; // Return early if required field is empty
  }

  // Skip other validations if field is empty and not required
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return errors;
  }

  // Type check
  if (rules.type === 'number' && isNaN(value)) {
    errors.push(rules.message || `${fieldName} must be a number`);
    return errors;
  }

  // Min/Max length for strings
  if (typeof value === 'string') {
    if (rules.minLength && value.length < rules.minLength) {
      errors.push(rules.message || `${fieldName} must be at least ${rules.minLength} characters`);
    }
    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push(rules.message || `${fieldName} must not exceed ${rules.maxLength} characters`);
    }
  }

  // Min/Max for numbers
  if (rules.type === 'number' || typeof value === 'number') {
    const numValue = parseFloat(value);
    if (rules.min !== undefined && numValue < rules.min) {
      errors.push(rules.message || `${fieldName} must be at least ${rules.min}`);
    }
    if (rules.max !== undefined && numValue > rules.max) {
      errors.push(rules.message || `${fieldName} must not exceed ${rules.max}`);
    }
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(value)) {
    errors.push(rules.message || `${fieldName} format is invalid`);
  }

  // Enum validation
  if (rules.enum && !rules.enum.includes(value)) {
    errors.push(rules.message || `${fieldName} must be one of: ${rules.enum.join(', ')}`);
  }

  // Word count validation
  if (rules.minWords || rules.maxWords) {
    const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (rules.minWords && wordCount < rules.minWords) {
      errors.push(rules.message || `${fieldName} must have at least ${rules.minWords} words (currently ${wordCount})`);
    }
    if (rules.maxWords && wordCount > rules.maxWords) {
      errors.push(rules.message || `${fieldName} must not exceed ${rules.maxWords} words (currently ${wordCount})`);
    }
  }

  // Prohibited words validation
  if (rules.prohibitedWords && Array.isArray(rules.prohibitedWords)) {
    const found = rules.prohibitedWords.filter(word => 
      value.toLowerCase().includes(word.toLowerCase())
    );
    if (found.length > 0) {
      errors.push(rules.message || `${fieldName} contains prohibited words: ${found.join(', ')}`);
    }
  }

  // Future date validation
  if (rules.futureDate && rules.type === 'date') {
    const inputDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (inputDate <= today) {
      errors.push(rules.message || `${fieldName} must be a future date`);
    }
  }

  // Unique validation (requires checking against existing data)
  if (rules.unique) {
    // This would need to be implemented based on the specific context
    // For now, we'll skip this in the validation function
    // and handle it separately in form submission
  }

  return errors;
}

/**
 * Validate an entire form
 * @param {object} formData - Form data to validate
 * @param {object} formRules - Validation rules for the form
 * @returns {object} Object with isValid boolean and errors object
 */
function validateForm(formData, formRules) {
  const errors = {};
  let isValid = true;

  for (const [fieldName, rules] of Object.entries(formRules)) {
    const fieldErrors = validateField(fieldName, formData[fieldName], rules, formData);
    if (fieldErrors.length > 0) {
      errors[fieldName] = fieldErrors;
      isValid = false;
    }
  }

  return { isValid, errors };
}

/**
 * Validate file upload
 * @param {File} file - File object to validate
 * @returns {object} Object with isValid boolean and error message
 */
function validateFile(file) {
  const rules = validationRules.fileUpload;

  // Check file type
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
  if (!rules.allowedExtensions.includes(fileExtension) && !rules.allowedTypes.includes(file.type)) {
    return { isValid: false, error: rules.messages.invalidType };
  }

  // Check file size
  if (file.size > rules.maxSize) {
    return { isValid: false, error: rules.messages.tooLarge };
  }

  return { isValid: true, error: null };
}

/**
 * Validate multiple files
 * @param {FileList|Array} files - Files to validate
 * @returns {object} Object with isValid boolean, errors array, and validFiles array
 */
function validateFiles(files) {
  const rules = validationRules.fileUpload;
  const errors = [];
  const validFiles = [];

  // Check total number of files
  if (files.length > rules.maxFiles) {
    return { 
      isValid: false, 
      errors: [rules.messages.tooMany],
      validFiles: []
    };
  }

  // Validate each file
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const validation = validateFile(file);
    if (validation.isValid) {
      validFiles.push(file);
    } else {
      errors.push(`${file.name}: ${validation.error}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    validFiles
  };
}

/**
 * Count words in text
 * @param {string} text - Text to count words in
 * @returns {number} Word count
 */
function countWords(text) {
  if (!text || typeof text !== 'string') return 0;
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Check for prohibited words
 * @param {string} text - Text to check
 * @param {array} prohibitedWords - Array of prohibited words
 * @returns {array} Array of found prohibited words
 */
function findProhibitedWords(text, prohibitedWords) {
  if (!text || !Array.isArray(prohibitedWords)) return [];
  return prohibitedWords.filter(word => 
    text.toLowerCase().includes(word.toLowerCase())
  );
}

/**
 * Highlight prohibited words in text
 * @param {string} text - Text to process
 * @param {array} prohibitedWords - Array of prohibited words
 * @returns {string} HTML string with highlighted words
 */
function highlightProhibitedWords(text, prohibitedWords) {
  if (!text || !Array.isArray(prohibitedWords)) return text;
  
  let highlightedText = text;
  prohibitedWords.forEach(word => {
    const regex = new RegExp(`(${word})`, 'gi');
    highlightedText = highlightedText.replace(regex, '<span class="bg-red-200 text-red-900 font-semibold">$1</span>');
  });
  
  return highlightedText;
}

/**
 * Check if test code is unique
 * @param {string} code - Test code to check
 * @param {string} excludeId - Test ID to exclude from check (for editing)
 * @returns {boolean} True if unique, false if duplicate
 */
function isTestCodeUnique(code, excludeId = null) {
  return !mockTests.some(test => 
    test.code.toLowerCase() === code.toLowerCase() && test.id !== excludeId
  );
}

/**
 * Check if username is unique
 * @param {string} username - Username to check
 * @param {string} excludeId - User ID to exclude from check (for editing)
 * @returns {boolean} True if unique, false if duplicate
 */
function isUsernameUnique(username, excludeId = null) {
  return !mockUsers.some(user => 
    user.username.toLowerCase() === username.toLowerCase() && user.id !== excludeId
  );
}

/**
 * Check if email is unique
 * @param {string} email - Email to check
 * @param {string} excludeId - User ID to exclude from check (for editing)
 * @returns {boolean} True if unique, false if duplicate
 */
function isEmailUnique(email, excludeId = null) {
  return !mockUsers.some(user => 
    user.email.toLowerCase() === email.toLowerCase() && user.id !== excludeId
  );
}

/**
 * Check if employee number is unique
 * @param {string} empNumber - Employee number to check
 * @param {string} excludeId - User ID to exclude from check (for editing)
 * @returns {boolean} True if unique, false if duplicate
 */
function isEmployeeNumberUnique(empNumber, excludeId = null) {
  if (!empNumber) return true; // Optional field
  return !mockUsers.some(user => 
    user.employeeNumber === empNumber && user.id !== excludeId
  );
}

/**
 * Display validation errors on form
 * @param {object} errors - Errors object from validateForm
 */
function displayFormErrors(errors) {
  // Clear previous errors
  document.querySelectorAll('.error-message').forEach(el => el.remove());
  document.querySelectorAll('.border-red-500').forEach(el => {
    el.classList.remove('border-red-500');
  });

  // Display new errors
  for (const [fieldName, fieldErrors] of Object.entries(errors)) {
    const field = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);
    if (field) {
      // Add error border
      field.classList.add('border-red-500');
      
      // Add error message
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message text-red-600 text-sm mt-1';
      errorDiv.textContent = fieldErrors[0]; // Show first error
      field.parentElement.appendChild(errorDiv);
    }
  }
}

/**
 * Clear validation errors from form
 */
function clearFormErrors() {
  document.querySelectorAll('.error-message').forEach(el => el.remove());
  document.querySelectorAll('.border-red-500').forEach(el => {
    el.classList.remove('border-red-500');
  });
}

/**
 * Real-time field validation
 * @param {HTMLElement} field - Input field element
 * @param {object} rules - Validation rules for the field
 */
function setupFieldValidation(field, rules) {
  field.addEventListener('blur', function() {
    const errors = validateField(field.name, field.value, rules);
    
    // Clear previous errors for this field
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    field.classList.remove('border-red-500');
    
    // Display new errors
    if (errors.length > 0) {
      field.classList.add('border-red-500');
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message text-red-600 text-sm mt-1';
      errorDiv.textContent = errors[0];
      field.parentElement.appendChild(errorDiv);
    } else {
      field.classList.add('border-green-500');
      setTimeout(() => field.classList.remove('border-green-500'), 2000);
    }
  });
}
