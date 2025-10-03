// Portfolio App JavaScript
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupNavigation();
        this.setupSkillAnimations();
        this.setupFormHandling();
        this.setupParallaxEffects();
    }

    setupEventListeners() {
        // Window scroll event
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Window resize event
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // DOM content loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.handleDOMReady();
        });
    }

    handleScroll() {
        this.updateNavbar();
        this.updateActiveSection();
        this.animateOnScroll();
        this.updateParallax();
    }

    handleResize() {
        this.closeNavMenu();
    }

    handleDOMReady() {
        this.addScrollAnimationClasses();
        this.animateHeroElements();
    }

    // Navigation functionality
    setupNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Hamburger menu toggle
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    closeNavMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    updateNavbar() {
        const navbar = document.getElementById('navbar');
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    updateActiveSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Scroll animations
    setupScrollAnimations() {
        // Create intersection observer for fade-in animations
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger skill animations when skills section is visible
                    if (entry.target.classList.contains('skills')) {
                        this.animateSkills();
                    }

                    // Animate stats when about section is visible
                    if (entry.target.classList.contains('about')) {
                        this.animateStats();
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-50px'
        });
    }

    addScrollAnimationClasses() {
        const animateElements = document.querySelectorAll(
            '.section-header, .skill-card, .timeline-item, .project-card, .about-content, .contact-content'
        );
        
        animateElements.forEach(element => {
            element.classList.add('fade-in');
            this.observer.observe(element);
        });

        // Observe sections for specific animations
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            this.observer.observe(section);
        });
    }

    animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Hero animations
    animateHeroElements() {
        const heroName = document.querySelector('.hero-name');
        const heroTitle = document.querySelector('.hero-title');
        const heroTagline = document.querySelector('.hero-tagline');
        const heroButtons = document.querySelector('.hero-buttons');

        // Stagger animation delays
        setTimeout(() => {
            if (heroName) heroName.style.animationDelay = '0s';
        }, 100);

        setTimeout(() => {
            if (heroTitle) heroTitle.style.animationDelay = '0.2s';
        }, 300);

        setTimeout(() => {
            if (heroTagline) heroTagline.style.animationDelay = '0.4s';
        }, 500);

        setTimeout(() => {
            if (heroButtons) heroButtons.style.animationDelay = '0.6s';
        }, 700);
    }

    // Skill animations
    setupSkillAnimations() {
        this.skillsAnimated = false;
    }

    animateSkills() {
        if (this.skillsAnimated) return;
        this.skillsAnimated = true;

        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }, index * 200);
        });
    }

    // Stats animation
    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent.replace(/[^\d]/g, '');
            if (finalValue) {
                this.animateCounter(stat, 0, parseInt(finalValue), 2000);
            }
        });
    }

    animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Parallax effects
    setupParallaxEffects() {
        this.shapes = document.querySelectorAll('.shape');
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        this.shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${rate * speed}px)`;
        });
    }

    // Form handling
    setupFormHandling() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(e);
            });
        }

        // Add input focus effects
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    handleFormSubmit(e) {
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Disable submit button and show loading state
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';

        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            this.showFormSuccess();
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 2000);
    }

    showFormSuccess() {
        // Create and show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <p>Message sent successfully! I'll get back to you soon.</p>
            </div>
        `;
        successMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-success);
            color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
        `;

        document.body.appendChild(successMessage);

        // Remove message after 5 seconds
        setTimeout(() => {
            successMessage.style.animation = 'slideOutRight 0.5s ease-out';
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 500);
        }, 5000);
    }

    // Hover effects for interactive elements
    setupHoverEffects() {
        // Skill cards hover effect
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Project cards hover effect
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'var(--shadow-sm)';
            });
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px)';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
            });
        });
    }

    // Typing effect for hero tagline
    setupTypingEffect() {
        const taglineElement = document.querySelector('.hero-tagline');
        const originalText = taglineElement.textContent;
        
        if (originalText.includes('[') && originalText.includes(']')) {
            // Only animate if it's still a placeholder
            return;
        }

        taglineElement.textContent = '';
        let i = 0;

        const typeWriter = () => {
            if (i < originalText.length) {
                taglineElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };

        setTimeout(typeWriter, 1000);
    }

    // Smooth reveal animations for timeline items
    animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 300);
        });
    }

    // Theme toggle functionality (bonus feature)
    setupThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        
        // Add theme toggle styles
        themeToggle.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: var(--color-primary);
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 1000;
            box-shadow: var(--shadow-lg);
            transition: all 0.3s ease;
        `;

        document.body.appendChild(themeToggle);

        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    toggleTheme() {
        const currentScheme = document.documentElement.getAttribute('data-color-scheme');
        const newScheme = currentScheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-color-scheme', newScheme);
        
        const themeToggle = document.querySelector('.theme-toggle');
        const icon = themeToggle.querySelector('i');
        
        if (newScheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    // Loading screen
    setupLoadingScreen() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <p>Loading...</p>
            </div>
        `;
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--color-background);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        `;

        document.body.appendChild(loader);

        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(loader);
                }, 500);
            }, 1000);
        });
    }
}

// Additional CSS for animations (injected via JavaScript)
const additionalStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .loader-spinner {
        width: 50px;
        height: 50px;
        border: 4px solid var(--color-secondary);
        border-top: 4px solid var(--color-primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .form-success-message .success-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .form-success-message i {
        font-size: 1.5rem;
    }

    .theme-toggle:hover {
        transform: scale(1.1);
        box-shadow: var(--shadow-glow);
    }

    /* Enhanced hover effects */
    .skill-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .project-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .timeline-item {
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.6s ease;
    }

    .timeline-item.visible {
        opacity: 1;
        transform: translateX(0);
    }

    .timeline-item:nth-child(even) {
        transform: translateX(30px);
    }

    .timeline-item:nth-child(even).visible {
        transform: translateX(0);
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the app
const portfolio = new PortfolioApp();

// Setup additional features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    portfolio.setupHoverEffects();
    portfolio.setupThemeToggle();
    portfolio.setupLoadingScreen();
    
    // Add some extra interactivity
    const heroButtons = document.querySelectorAll('.hero-btn');
    heroButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            btn.appendChild(ripple);
            
            setTimeout(() => {
                btn.removeChild(ripple);
            }, 600);
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});

// Smooth scrolling polyfill for older browsers
if (!window.CSS || !CSS.supports('scroll-behavior', 'smooth')) {
    const smoothScrollPolyfill = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const startPosition = window.pageYOffset;
                    const targetPosition = targetElement.offsetTop - 70;
                    const distance = targetPosition - startPosition;
                    const duration = 1000;
                    let start = null;
                    
                    const animation = (currentTime) => {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const run = ease(timeElapsed, startPosition, distance, duration);
                        window.scrollTo(0, run);
                        if (timeElapsed < duration) requestAnimationFrame(animation);
                    };
                    
                    const ease = (t, b, c, d) => {
                        t /= d / 2;
                        if (t < 1) return c / 2 * t * t + b;
                        t--;
                        return -c / 2 * (t * (t - 2) - 1) + b;
                    };
                    
                    requestAnimationFrame(animation);
                }
            });
        });
    };
    
    smoothScrollPolyfill();
}
