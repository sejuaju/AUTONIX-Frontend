// Pagination System
import { SELECTORS, CLASSES } from './config.js';
import { createElement } from './utils.js';

export class PaginationManager {
    constructor(sidebarManager) {
        this.sidebarManager = sidebarManager;
        this.sections = document.querySelectorAll(SELECTORS.documentSections);
        this.currentIndex = 0;
        this.totalSections = this.sections.length;
        
        this.init();
    }

    init() {
        this.hideAllSections();
        this.showSection(0);
        this.createNavigationControls();
        this.bindTOCLinks();
    }

    hideAllSections() {
        this.sections.forEach((section, index) => {
            section.style.display = index === 0 ? 'block' : 'none';
        });

      
        const header = document.querySelector('.document-header');
        const footer = document.querySelector('.document-footer');
        if (header) header.style.display = 'block';
        if (footer) footer.style.display = 'block';
    }

    showSection(index) {
        if (index < 0 || index >= this.totalSections) return;

     
        this.sections.forEach(section => {
            section.style.display = 'none';
        });

     
        this.sections[index].style.display = 'block';
        this.currentIndex = index;

     
        this.updateUI();
        
       
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateUI() {
        const currentSection = this.sections[this.currentIndex];
        if (currentSection && this.sidebarManager) {
            this.sidebarManager.updateActiveTOCLink(currentSection.id);
        }
        
        this.updateNavigationButtons();
        this.updatePageIndicator();
        this.updateNavigationTitles();
    }

    createNavigationControls() {
     
        const existing = document.querySelector(SELECTORS.paginationControls);
        if (existing) existing.remove();

        const sectionTitles = this.getSectionTitles();
        const navControls = createElement('div', 'pagination-controls', `
            <button id="prevBtn" class="nav-btn prev-btn">
                <div class="nav-btn-content">
                    <div class="nav-direction">
                        <i class="fas fa-chevron-left"></i>
                        <span>Previous</span>
                    </div>
                    <div class="nav-title" id="prevTitle"></div>
                </div>
            </button>
            <div class="page-indicator">
                <div class="current-section">
                    <span class="section-label">Current Section</span>
                    <span class="section-name" id="currentSectionName">${sectionTitles[0] || 'Introduction'}</span>
                </div>
                <div class="page-counter">
                    <span id="currentPage">1</span> / <span id="totalPages">${this.totalSections}</span>
                </div>
            </div>
            <button id="nextBtn" class="nav-btn next-btn">
                <div class="nav-btn-content">
                    <div class="nav-direction">
                        <span>Next</span>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                    <div class="nav-title" id="nextTitle"></div>
                </div>
            </button>
        `);

       
        const footer = document.querySelector('footer');
        const mainContent = document.querySelector('.main-content');
        
        if (footer && mainContent && mainContent.contains(footer)) {
            mainContent.insertBefore(navControls, footer);
        } else if (mainContent) {
            mainContent.appendChild(navControls);
        }

       
        document.getElementById('prevBtn').addEventListener('click', () => this.previousSection());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextSection());
        
        this.updateNavigationTitles();
    }

    getSectionTitles() {
        return Array.from(this.sections).map(section => {
            const titleElement = section.querySelector('.section-title');
            return titleElement ? titleElement.textContent.trim() : '';
        });
    }

    previousSection() {
        if (this.currentIndex > 0) {
            this.showSection(this.currentIndex - 1);
        }
    }

    nextSection() {
        if (this.currentIndex < this.totalSections - 1) {
            this.showSection(this.currentIndex + 1);
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn && nextBtn) {
            const isFirst = this.currentIndex === 0;
            const isLast = this.currentIndex === this.totalSections - 1;
            
            prevBtn.disabled = isFirst;
            nextBtn.disabled = isLast;
            
            prevBtn.classList.toggle(CLASSES.disabled, isFirst);
            nextBtn.classList.toggle(CLASSES.disabled, isLast);
        }
    }

    updatePageIndicator() {
        const currentPageEl = document.getElementById('currentPage');
        if (currentPageEl) {
            currentPageEl.textContent = this.currentIndex + 1;
        }
    }

    updateNavigationTitles() {
        const sectionTitles = this.getSectionTitles();
        const prevTitleEl = document.getElementById('prevTitle');
        const nextTitleEl = document.getElementById('nextTitle');
        const currentSectionNameEl = document.getElementById('currentSectionName');
        
       
        if (currentSectionNameEl && sectionTitles[this.currentIndex]) {
            currentSectionNameEl.textContent = sectionTitles[this.currentIndex];
        }
        
       
        if (prevTitleEl) {
            if (this.currentIndex > 0) {
                prevTitleEl.textContent = sectionTitles[this.currentIndex - 1];
                prevTitleEl.style.display = 'block';
            } else {
                prevTitleEl.style.display = 'none';
            }
        }
        
     
        if (nextTitleEl) {
            if (this.currentIndex < this.totalSections - 1) {
                nextTitleEl.textContent = sectionTitles[this.currentIndex + 1];
                nextTitleEl.style.display = 'block';
            } else {
                nextTitleEl.style.display = 'none';
            }
        }
    }

    bindTOCLinks() {
        document.querySelectorAll(SELECTORS.tocLinks).forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetIndex = Array.from(this.sections).findIndex(section => section.id === targetId);
                
                if (targetIndex !== -1) {
                    this.showSection(targetIndex);
                }
            });
        });
    }
}