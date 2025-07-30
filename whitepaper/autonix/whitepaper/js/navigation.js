// Navigation and Smooth Scrolling
import { CONFIG } from './config.js';
import { smoothScrollTo } from './utils.js';

export class NavigationManager {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.tocLinks = document.querySelectorAll('.toc-link');
        
        this.init();
    }

    init() {
        this.initSmoothScrolling();
        this.initActiveNavHighlighting();
    }

    initSmoothScrolling() {
        // Handle all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    smoothScrollTo(target, CONFIG.SCROLL_OFFSET);
                }
            });
        });
    }

    initActiveNavHighlighting() {
        window.addEventListener('scroll', () => {
            let current = '';
            
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop && 
                    window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            this.updateActiveLinks(current);
        });
    }

    updateActiveLinks(currentSectionId) {
        this.tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
}