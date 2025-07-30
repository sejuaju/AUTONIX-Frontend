// Utility Functions
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export function copyToClipboard(text) {
    return navigator.clipboard.writeText(text).then(() => {
        return true;
    }).catch(err => {
        console.error('Failed to copy: ', err);
        return false;
    });
}

export function getScrollPosition() {
    return window.scrollY || document.documentElement.scrollTop;
}

export function smoothScrollTo(element, offset = 0) {
    if (!element) return;
    
    const offsetTop = element.offsetTop - offset;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

export function isMobile() {
    return window.innerWidth <= 768;
}

export function createElement(tag, className = '', innerHTML = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
}