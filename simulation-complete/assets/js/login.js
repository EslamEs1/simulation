// ============================================================================
// LOGIN PAGE FUNCTIONALITY
// ============================================================================

function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
        `;
    } else {
        passwordField.type = 'password';
        eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        `;
    }
}

function quickLogin(role) {
    // Find a user with the specified role
    const user = mockUsers.find(u => u.role === role && u.status === 'active');
    
    if (user) {
        performLogin(user);
    } else {
        showToast('No active user found for this role', 'error');
    }
}

function performLogin(user) {
    // Set current user
    setCurrentUser(user);
    
    // Show success message
    showToast(`Welcome, ${user.nameEN}!`, 'success');
    
    // Redirect based on role
    setTimeout(() => {
        switch (user.role) {
            case 'reviewer':
                window.location.href = 'reviewer/dashboard.html';
                break;
            case 'admin':
                window.location.href = 'admin/dashboard.html';
                break;
            case 'reports_viewer':
                window.location.href = 'reports/dashboard.html';
                break;
            default:
                showToast('Unknown role', 'error');
        }
    }, 1000);
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const colors = {
        success: 'bg-green-600 text-white',
        error: 'bg-red-600 text-white',
        warning: 'bg-yellow-600 text-white',
        info: 'bg-blue-600 text-white'
    };
    
    toast.className = `fixed bottom-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 ${colors[type]}`;
    toast.textContent = message;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.toLowerCase();
            const password = document.getElementById('password').value;
            
            // Find user by username or email
            const user = mockUsers.find(u => 
                (u.username.toLowerCase() === username || u.email.toLowerCase() === username) &&
                u.status === 'active'
            );
            
            if (user) {
                // In real system, would verify password
                // For demo, any password works
                performLogin(user);
            } else {
                showToast('Invalid username or password', 'error');
            }
        });
    }

    // Check if already logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
        // Already logged in, redirect to appropriate dashboard
        switch (currentUser.role) {
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
});
