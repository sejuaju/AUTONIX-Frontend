// Sidebar Management
import { SELECTORS, CLASSES } from './config.js';
import { isMobile } from './utils.js';

export class SidebarManager {
    constructor() {
        this.sidebar = document.querySelector(SELECTORS.sidebar);
        this.mobileToggle = document.querySelector(SELECTORS.mobileMenuToggle);
        this.sidebarToggle = document.querySelector(SELECTORS.sidebarToggle);
        this.tocLinks = document.querySelectorAll(SELECTORS.tocLinks);
        
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => this.open());
        }

  
        if (this.sidebarToggle) {
            this.sidebarToggle.addEventListener('click', () => this.close());
        }

        
        this.tocLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isMobile()) {
                    this.close();
                }
            });
        });

       
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    }

    open() {
        if (this.sidebar) {
            this.sidebar.classList.add(CLASSES.active);
        }
        if (this.mobileToggle) {
            this.mobileToggle.classList.add('menu-open');
        }
    }

    close() {
        if (this.sidebar) {
            this.sidebar.classList.remove(CLASSES.active);
        }
        if (this.mobileToggle) {
            this.mobileToggle.classList.remove('menu-open');
        }
    }

    toggle() {
        if (this.sidebar) {
            this.sidebar.classList.toggle(CLASSES.active);
        }
        if (this.mobileToggle) {
            this.mobileToggle.classList.toggle('menu-open');
        }
    }

    handleOutsideClick(e) {
        if (!isMobile() || !this.sidebar) return;

        const isClickInsideSidebar = this.sidebar.contains(e.target);
        const isClickOnToggle = this.mobileToggle && this.mobileToggle.contains(e.target);
        const isSidebarActive = this.sidebar.classList.contains(CLASSES.active);

        if (!isClickInsideSidebar && !isClickOnToggle && isSidebarActive) {
            this.close();
        }
    }

    updateActiveTOCLink(sectionId) {
        this.tocLinks.forEach(link => {
            link.classList.remove(CLASSES.active);
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add(CLASSES.active);
            }
        });
    }
}