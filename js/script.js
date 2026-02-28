/* ============================================
   PORTFOLIO MAIN JAVASCRIPT
   Vanilla JS - No frameworks or libraries
   ============================================ */

// Configuration object for easy URL updates
const CONFIG = {
    // Template URLs - Replace these with your actual URLs
    profilePhoto: '../assets/about.png',
    aboutPhoto: '../assets/pf.png',
    resumeUrl: '../assets/resume.pdf',
    
    // Contact information
    email: 'tztayyaba.26@gmail.com',
    linkedin: 'https://www.linkedin.com/in/tayyaba-zubaid-2553b2379/',
    github: 'https://github.com/Tayyaba-tz',
    
    // Project links
    projects: [
        {
            image: '../assets/projects/deenify.png',
            link: 'https://github.com/Tayyaba-tz/Deenify'
        },
        {
            image: '../assets/projects/fintrack.png',
            link: 'https://github.com/Tayyaba-tz/FinTrack'
        },
        {
            image: '../assets/projects/pokemon.png',
            link: 'https://github.com/Tayyaba-tz/Pokemon_Info_Card'
        },
        {
            image: '../assets/projects/weather.png',
            link: 'https://github.com/Tayyaba-tz/Weather_Dashboard'
        },
        {
            image: '../assets/projects/evacuation.jpeg',
            link: 'https://github.com/Tayyaba-tz/Disaster-Evacuation-Path-Planner'
        },
        {
            image: '../assets/projects/tomzora.png',
            link: 'https://github.com/Tayyaba-tz/CodeAlpha-Tomzora'
        },
    ],
   
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Update all template URLs with actual values from CONFIG
 * This allows dynamic updates when resume or other files change
 */
function updateDynamicContent() {
    // Update profile and about photos
    const profileImg = document.querySelector('.hero-image');
    const aboutImg = document.querySelector('.about-image');
    
    if (profileImg) profileImg.src = CONFIG.profilePhoto;
    if (aboutImg) aboutImg.src = CONFIG.aboutPhoto;
    
    // Update CV download buttons
    const cvButtons = document.querySelectorAll('.btn-cv, .experience-container .btn-primary');
    cvButtons.forEach(btn => {
        if (btn.textContent.includes('CV') || btn.textContent.includes('Download')) {
            btn.href = CONFIG.resumeUrl;
        }
    });
    
    // Update project images and links
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        if (index < CONFIG.projects.length) {
            const img = card.querySelector('.project-image');
            const link = card.querySelector('.project-link');
            
            if (img) img.src = CONFIG.projects[index].image;
            if (link) link.href = CONFIG.projects[index].link;
        }
    });
    
    // Update contact information
    updateContactInfo();
}

/**
 * Update contact information
 */
function updateContactInfo() {
    // Update email link
    const emailLink = document.querySelector('a[href*="mailto:"]');
    if (emailLink) {
        emailLink.href = `mailto:${CONFIG.email}`;
        emailLink.textContent = CONFIG.email;
    }
    
    // Update LinkedIn link
    const linkedinLink = document.querySelector('a[href*="LINKEDIN_URL"]');
    if (linkedinLink) linkedinLink.href = CONFIG.linkedin;
    
    // Update GitHub link
    const githubLink = document.querySelector('a[href*="GITHUB_URL"]');
    if (githubLink) githubLink.href = CONFIG.github;
}

// ============================================
// NAVIGATION
// ============================================

/**
 * Initialize sticky navbar functionality
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

/**
 * Update active navigation link based on current scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// ANIMATIONS & OBSERVERS
// ============================================

/**
 * Initialize Intersection Observer for scroll animations
 */
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger animations
                if (entry.target.classList.contains('stats-bar')) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
                
                if (entry.target.classList.contains('skills')) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
                
                // Fade in sections
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
}

/**
 * Animate counter numbers in stats section
 */
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50; // Animate over 50 frames
        
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(interval);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 30);
    });
}

/**
 * Animate skill bars
 */
function animateSkills() {
    const skillFills = document.querySelectorAll('.skill-fill');
    skillFills.forEach(fill => {
        fill.style.animation = 'skill-fill 1s ease-out forwards';
    });
}

// ============================================
// PROJECT FILTERING
// ============================================

/**
 * Initialize project filter functionality
 */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsGrid = document.querySelector('.projects-grid');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            if (filter === 'all') {
                projectsGrid.classList.remove('is-filtered');
            } else {
                projectsGrid.classList.add('is-filtered');
            }

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = '';          // restore default
                    card.style.animation = 'fadeIn 0.3s ease-in';
                } else {
                    card.style.display = 'none';      // inline style — CSS cannot override this
                }
            });
        });
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Main initialization function
 */
function init() {
    // Update all dynamic content from CONFIG
    updateDynamicContent();
    
    // Initialize all features
    initNavbar();
    initIntersectionObserver();
    initProjectFilter();
    initSmoothScroll();
    
    console.log('Portfolio initialized successfully');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============================================
// DYNAMIC CONTENT UPDATE WATCHER
// ============================================

/**
 * Watch for changes in CONFIG and update content dynamically
 * This allows the page to update without page reload when resume/files change
 */
function setupConfigWatcher() {
    // Create a proxy to watch for CONFIG changes
    const handler = {
        set(target, property, value) {
            target[property] = value;
            console.log(`CONFIG.${property} updated to:`, value);
            updateDynamicContent();
            return true;
        }
    };
    
    // Note: This is a simple implementation. For production, consider using:
    // - LocalStorage to persist changes
    // - API calls to fetch updated content
    // - WebSocket for real-time updates
}

// ============================================
// UTILITY: Update CONFIG from external source
// ============================================

/**
 * Function to update configuration from an external source
 * Usage: updateConfigFromSource('https://api.example.com/portfolio-config')
 */
async function updateConfigFromSource(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Merge new data with CONFIG
        Object.assign(CONFIG, data);
        
        // Update page content
        updateDynamicContent();
        
        console.log('Configuration updated from source:', url);
    } catch (error) {
        console.error('Failed to update configuration:', error);
    }
}

/**
 * Function to update resume URL dynamically
 * Usage: updateResumeUrl('https://example.com/new-resume.pdf')
 */
function updateResumeUrl(newUrl) {
    CONFIG.resumeUrl = newUrl;
    updateDynamicContent();
    console.log('Resume URL updated to:', newUrl);
}

/**
 * Function to update profile photo dynamically
 * Usage: updateProfilePhoto('https://example.com/new-photo.jpg')
 */
function updateProfilePhoto(newUrl) {
    CONFIG.profilePhoto = newUrl;
    const profileImg = document.querySelector('.hero-image');
    if (profileImg) profileImg.src = newUrl;
    console.log('Profile photo updated to:', newUrl);
}

// Export functions for external use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONFIG,
        updateDynamicContent,
        updateResumeUrl,
        updateProfilePhoto,
        updateConfigFromSource
    };
}
