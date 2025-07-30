// Main Application Entry Point
import { SidebarManager } from './sidebar.js';
import { PaginationManager } from './pagination.js';
import { AnimationManager } from './animations.js';
import { NavigationManager } from './navigation.js';
import { notifications } from './notifications.js';
import { copyToClipboard } from './utils.js';

class WhitepaperApp {
    constructor() {
        this.sidebarManager = null;
        this.paginationManager = null;
        this.animationManager = null;
        this.navigationManager = null;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        try {
            // Initialize core managers
            this.sidebarManager = new SidebarManager();
            this.paginationManager = new PaginationManager(this.sidebarManager);
            this.animationManager = new AnimationManager();
            this.navigationManager = new NavigationManager();

            // Initialize additional features
            this.initializeGlobalFeatures();
            
            console.log('AUTONIX Whitepaper App initialized successfully');
        } catch (error) {
            console.error('Error initializing app:', error);
            notifications.show('Error loading application', 'error');
        }
    }

    initializeGlobalFeatures() {
        // Preload critical resources
        this.preloadResources();
        
        // Add global copy functionality
        this.initCopyFeatures();
        
        // Add additional styles
        this.addGlobalStyles();
    }

    preloadResources() {
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = resource;
            document.head.appendChild(link);
        });
    }

    initCopyFeatures() {
        // Add copy functionality for future use
        window.copyToClipboard = async (text) => {
            const success = await copyToClipboard(text);
            if (success) {
                notifications.show('Copied to clipboard!', 'success');
            } else {
                notifications.show('Failed to copy', 'error');
            }
        };
    }

    addGlobalStyles() {
        const globalStyles = `
            .navbar.scrolled {
                background: rgba(255, 255, 255, 0.98);
                box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
            }
            
            .nav-link.active {
                color: var(--primary-color);
            }
            
            .nav-link.active::after {
                width: 100%;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = globalStyles;
        document.head.appendChild(styleSheet);
    }

    // Public API methods
    goToSection(sectionId) {
        if (this.paginationManager) {
            const sections = document.querySelectorAll('.document-section');
            const targetIndex = Array.from(sections).findIndex(section => section.id === sectionId);
            if (targetIndex !== -1) {
                this.paginationManager.showSection(targetIndex);
            }
        }
    }

    toggleSidebar() {
        if (this.sidebarManager) {
            this.sidebarManager.toggle();
        }
    }

    showNotification(message, type = 'info') {
        notifications.show(message, type);
    }
}

// Initialize the application
const app = new WhitepaperApp();

// Expose app instance globally for debugging
window.WhitepaperApp = app;