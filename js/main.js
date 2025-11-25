// =============================================
// BASE CAMP KYUSHU - Main JavaScript
// Interactive functionality for website
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // =============================================
    // MOBILE MENU TOGGLE
    // =============================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // Change icon
            if (mainNav.classList.contains('active')) {
                this.innerHTML = '✕';
            } else {
                this.innerHTML = '☰';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = mainNav.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuToggle.innerHTML = '☰';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileMenuToggle.innerHTML = '☰';
            });
        });
    }
    
    // =============================================
    // HEADER SCROLL EFFECT
    // =============================================
    const header = document.querySelector('.main-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // =============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // =============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // =============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.pillar-card, .location-card, .process-step, .featured-content');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // =============================================
    // LAZY LOADING FOR IMAGES
    // =============================================
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // =============================================
    // VIDEO IFRAME RESPONSIVE HELPER
    // =============================================
    const videoContainers = document.querySelectorAll('.video-item');
    
    videoContainers.forEach(container => {
        const iframe = container.querySelector('iframe');
        if (iframe) {
            // Ensure proper responsive behavior
            iframe.style.width = '100%';
            iframe.style.height = '100%';
        }
    });
    
    // =============================================
    // FORM VALIDATION (if forms are added later)
    // =============================================
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Remove error class on input
                    field.addEventListener('input', function() {
                        this.classList.remove('error');
                    }, { once: true });
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
    
    // =============================================
    // EXTERNAL LINK INDICATOR
    // =============================================
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        // Add rel attributes for security
        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    // =============================================
    // BACK TO TOP BUTTON (Optional)
    // =============================================
    function createBackToTopButton() {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.className = 'back-to-top';
        button.setAttribute('aria-label', 'Back to top');
        button.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--sunset-orange);
            color: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s;
            z-index: 999;
            box-shadow: 0 4px 15px rgba(214, 121, 66, 0.4);
        `;
        
        document.body.appendChild(button);
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });
        
        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Uncomment to enable back to top button
    // createBackToTopButton();
    
    // =============================================
    // CONSOLE GREETING
    // =============================================
    console.log('%cBASE CAMP KYUSHU', 'font-size: 24px; font-weight: bold; color: #d67942;');
    console.log('%c土地 — 人 — 物語', 'font-size: 14px; color: #2c4a6e;');
    console.log('%cWhere mountains meet the sea and stories take form.', 'font-size: 12px; color: #5a7a65;');
    console.log('%cBased in Itoshima, Kyushu, Japan', 'font-size: 10px; color: #666;');
    console.log('%c© 2025 M Global Japan', 'font-size: 10px; color: #666;');
    
});

// =============================================
// UTILITY FUNCTIONS
// =============================================

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait) {
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

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Get query parameter from URL
 */
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// =============================================
// PERFORMANCE MONITORING (Development only)
// =============================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', function() {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}
