/**
 * Role-Based Sidebar Navigation Component
 * Provides consistent navigation across all screens based on user role
 */

const SidebarComponent = {
    /**
     * Initialize sidebar for current page
     */
    init() {
        const user = getCurrentUser();
        if (!user) return;
        
        const sidebarHTML = this.generateSidebar(user.role);
        const container = document.getElementById('sidebarContainer');
        if (container) {
            container.innerHTML = sidebarHTML;
            this.setActiveLink();
            this.setupEventListeners();
        }
    },

    /**
     * Generate sidebar HTML based on user role
     */
    generateSidebar(role) {
        const sidebarConfig = this.getSidebarConfig(role);
        
        return `
            <aside id="sidebar" class="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto transition-transform duration-300 ease-in-out z-40">
                <nav class="p-4">
                    ${sidebarConfig.map(section => this.renderSection(section)).join('')}
                </nav>
            </aside>
            
            <!-- Mobile Toggle Button -->
            <button id="sidebarToggle" class="lg:hidden fixed bottom-4 left-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            </button>
        `;
    },

    /**
     * Render a sidebar section
     */
    renderSection(section) {
        if (section.items) {
            // Collapsible section
            return `
                <div class="mb-4">
                    <button class="sidebar-section-toggle w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg">
                        <span>${section.title}</span>
                        <svg class="h-4 w-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>
                    <div class="sidebar-section-content mt-1 space-y-1">
                        ${section.items.map(item => this.renderLink(item)).join('')}
                    </div>
                </div>
            `;
        } else {
            // Single link
            return this.renderLink(section);
        }
    },

    /**
     * Render a single navigation link
     */
    renderLink(item) {
        const icon = item.icon || this.getDefaultIcon();
        return `
            <a href="${item.href}" class="sidebar-link flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors" data-path="${item.href}">
                ${icon}
                <span class="ml-3">${item.title}</span>
                ${item.badge ? `<span class="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full ${item.badgeClass}">${item.badge}</span>` : ''}
            </a>
        `;
    },

    /**
     * Get sidebar configuration based on role
     */
    getSidebarConfig(role) {
        // Map reports_viewer role to reports configuration
        if (role === 'reports_viewer') {
            role = 'reports';
        }
        
        // Calculate base path from current location
        const pathParts = window.location.pathname.split('/').filter(p => p);
        
        // Determine depth: how many levels deep from root
        // For GitHub Pages: /simulation/admin/dashboard.html -> depth = 2 (simulation, admin)
        // For local: /admin/dashboard.html -> depth = 1 (admin)
        
        // Find if we're in a subdirectory
        let depth = 0;
        const currentFile = pathParts[pathParts.length - 1];
        
        // If current file is index.html or we're at root, depth = 0
        if (currentFile === 'index.html' && pathParts.length === 1) {
            depth = 0;
        } else {
            // Count directories (exclude the filename)
            depth = pathParts.length - 1;
            
            // If on GitHub Pages, subtract 1 for the repo name
            if (pathParts[0] === 'simulation' || pathParts[0].includes('github.io')) {
                depth = Math.max(0, depth - 1);
            }
        }
        
        const basePath = depth > 0 ? '../'.repeat(depth) : './';
        
        const configs = {
            admin: [
                {
                    title: 'Dashboard',
                    href: basePath + 'admin/dashboard.html',
                    icon: '<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>'
                },
                {
                    title: 'Test Management',
                    items: [
                        { title: 'Tests List', href: basePath + 'admin/tests/list.html' },
                        { title: 'Add New Test', href: basePath + 'admin/tests/add.html' },
                        { title: 'Import Tests', href: basePath + 'admin/tests/import.html' },
                        { title: 'ICD-10 Library', href: basePath + 'admin/icd10/list.html' }
                    ]
                },
                {
                    title: 'User Management',
                    items: [
                        { title: 'User List', href: basePath + 'admin/users/list.html' },
                        { title: 'Add New User', href: basePath + 'admin/users/add.html' },
                        { title: 'Role Management', href: basePath + 'admin/roles/manage.html' }
                    ]
                },
                {
                    title: 'System Settings',
                    items: [
                        { title: 'General', href: basePath + 'admin/settings/general.html' },
                        { title: 'Security', href: basePath + 'admin/settings/security.html' },
                        { title: 'Notifications', href: basePath + 'admin/settings/notifications.html' },
                        { title: 'Review Settings', href: basePath + 'admin/settings/review.html' },
                        { title: 'Backup & Restore', href: basePath + 'admin/settings/backup.html' },
                        { title: 'Validation Rules', href: basePath + 'admin/settings/validation.html' },
                        { title: 'Audit Log', href: basePath + 'admin/settings/audit.html' }
                    ]
                },
                {
                    title: 'Profile',
                    href: basePath + 'profile/view.html',
                    icon: '<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>'
                }
            ],
            reviewer: [
                {
                    title: 'Dashboard',
                    href: basePath + 'reviewer/dashboard.html',
                    icon: '<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>'
                },
                {
                    title: 'Review Queue',
                    href: basePath + 'reviewer/review-queue.html',
                    icon: '<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>'
                },
                {
                    title: 'My Reviews',
                    href: basePath + 'reviewer/my-reviews.html',
                    icon: '<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
                },
                {
                    title: 'Requests',
                    items: [
                        { title: 'Create New Request', href: basePath + 'requests/create-step1.html' },
                        { title: 'My Requests', href: basePath + 'requests/my-requests.html' }
                    ]
                },
                {
                    title: 'Tests List',
                    href: basePath + 'tests/list.html',
                    icon: '<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>'
                },
                {
                    title: 'Profile',
                    href: basePath + 'profile/view.html',
                    icon: '<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>'
                }
            ],
            reports: [
                {
                    title: 'Dashboard',
                    href: basePath + 'reports/dashboard.html',
                    icon: '<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>'
                },
                {
                    title: 'Reports',
                    items: [
                        { title: 'Requests Report', href: basePath + 'reports/requests.html' },
                        { title: 'Performance Report', href: basePath + 'reports/performance.html' },
                        { title: 'Tests Report', href: basePath + 'reports/tests.html' },
                        { title: 'Financial Report', href: basePath + 'reports/financial.html' },
                        { title: 'Custom Reports', href: basePath + 'reports/custom.html' },
                        { title: 'Scheduled Reports', href: basePath + 'reports/scheduled.html' }
                    ]
                },
                {
                    title: 'Tests List',
                    href: basePath + 'tests/list.html',
                    icon: '<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>'
                },
                {
                    title: 'Profile',
                    href: basePath + 'profile/view.html',
                    icon: '<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>'
                }
            ]
        };

        return configs[role] || [];
    },

    /**
     * Set active link based on current page
     */
    setActiveLink() {
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll('.sidebar-link');
        
        links.forEach(link => {
            const linkPath = link.getAttribute('data-path');
            if (currentPath.includes(linkPath)) {
                link.classList.add('bg-blue-50', 'text-blue-600', 'font-semibold');
            }
        });
    },

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Collapsible sections
        const toggles = document.querySelectorAll('.sidebar-section-toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const content = toggle.nextElementSibling;
                const icon = toggle.querySelector('svg');
                
                content.classList.toggle('hidden');
                icon.classList.toggle('rotate-180');
            });
        });

        // Mobile toggle
        const mobileToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        
        if (mobileToggle && sidebar) {
            mobileToggle.addEventListener('click', () => {
                sidebar.classList.toggle('-translate-x-full');
            });
        }
    },

    /**
     * Get default icon
     */
    getDefaultIcon() {
        return '<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>';
    }
};

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    SidebarComponent.init();
});
