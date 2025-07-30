// Animation and Visual Effects
import { CLASSES, CONFIG, KONAMI_SEQUENCE } from './config.js';
import { debounce, getScrollPosition } from './utils.js';
import { notifications } from './notifications.js';

export class AnimationManager {
    constructor() {
        this.lastScrollTop = 0;
        this.konamiCode = [];
        this.navbar = document.querySelector('.navbar');
        
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.initNavbarEffects();
        this.initParallaxEffects();
        this.initAllocationBars();
        this.initButtonAnimations();
        this.initEasterEgg();
        this.initLoadingAnimation();
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(CLASSES.animate);
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.document-section').forEach(section => {
            section.classList.add('scroll-animate');
            observer.observe(section);
        });
    }

    initNavbarEffects() {
        if (!this.navbar) return;

        const debouncedScrollHandler = debounce(() => {
            const scrollTop = getScrollPosition();
            
            // Add/remove scrolled class
            if (scrollTop > 50) {
                this.navbar.classList.add(CLASSES.scrolled);
            } else {
                this.navbar.classList.remove(CLASSES.scrolled);
            }
            
            // Hide/show navbar on scroll
            if (scrollTop > this.lastScrollTop && scrollTop > 100) {
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                this.navbar.style.transform = 'translateY(0)';
            }
            
            this.lastScrollTop = scrollTop;
        }, CONFIG.DEBOUNCE_DELAY);

        window.addEventListener('scroll', debouncedScrollHandler);
    }

    initParallaxEffects() {
        const heroGrid = document.querySelector('.hero-grid');
        if (!heroGrid) return;

        window.addEventListener('scroll', () => {
            const scrolled = getScrollPosition();
            const speed = scrolled * 0.5;
            heroGrid.style.transform = `translate(${speed * 0.1}px, ${speed * 0.1}px)`;
        });
    }

    initAllocationBars() {
        const allocationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = entry.target.querySelectorAll('.allocation-bar');
                    bars.forEach((bar, index) => {
                        setTimeout(() => {
                            const percentage = bar.style.getPropertyValue('--percentage') || '0%';
                            bar.style.width = percentage;
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.5 });

        const tokenomicsSection = document.querySelector('#tokenomics');
        if (tokenomicsSection) {
            allocationObserver.observe(tokenomicsSection);
        }
    }

    initButtonAnimations() {
        const buttons = document.querySelectorAll('.btn');
        if (buttons.length === 0) return;

        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (!this.classList.contains(CLASSES.loading)) {
                    this.classList.add(CLASSES.loading);
                    
                    setTimeout(() => {
                        this.classList.remove(CLASSES.loading);
                    }, 1000);
                }
            });
        });

        // Add loading button styles
        this.addLoadingStyles();
    }

    addLoadingStyles() {
        const loadingStyles = `
            .btn.loading {
                position: relative;
                pointer-events: none;
            }
            
            .btn.loading::after {
                content: '';
                position: absolute;
                width: 16px;
                height: 16px;
                margin: auto;
                border: 2px solid transparent;
                border-top-color: currentColor;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = loadingStyles;
        document.head.appendChild(styleSheet);
    }

    initEasterEgg() {
        document.addEventListener('keydown', (e) => {
            this.konamiCode.push(e.code);
            
            if (this.konamiCode.length > KONAMI_SEQUENCE.length) {
                this.konamiCode.shift();
            }
            
            if (this.konamiCode.join(',') === KONAMI_SEQUENCE.join(',')) {
                this.activateEasterEgg();
                this.konamiCode = [];
            }
        });
    }

    activateEasterEgg() {
        document.body.style.animation = 'rainbow 2s infinite';
        notifications.show('🚀 AUTONIX Easter Egg Activated! 🚀', 'success');
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);

        // Add rainbow animation if not exists
        if (!document.querySelector('#rainbow-animation')) {
            const style = document.createElement('style');
            style.id = 'rainbow-animation';
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initLoadingAnimation() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = '0';
                heroContent.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    heroContent.style.transition = 'all 0.8s ease';
                    heroContent.style.opacity = '1';
                    heroContent.style.transform = 'translateY(0)';
                }, 200);
            }
        });
    }
}