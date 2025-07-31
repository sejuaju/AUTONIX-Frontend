// Configuration and Constants
export const CONFIG = {
    SIDEBAR_WIDTH: 280,
    ANIMATION_DURATION: 300,
    SCROLL_OFFSET: 80,
    NOTIFICATION_DURATION: 3000,
    DEBOUNCE_DELAY: 10
};

export const SELECTORS = {
    sidebar: '#sidebar',
    sidebarToggle: '#sidebar-toggle',
    mobileMenuToggle: '#mobile-menu-toggle',
    tocLinks: '.toc-link',
    documentSections: '.document-section',
    paginationControls: '.pagination-controls',
    navbar: '.navbar'
};

export const CLASSES = {
    active: 'active',
    disabled: 'disabled',
    loading: 'loading',
    scrolled: 'scrolled',
    animate: 'animate'
};

export const KONAMI_SEQUENCE = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];