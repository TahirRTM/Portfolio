/* ============================================
   MODERN DARK PORTFOLIO - JAVASCRIPT
   Interactive Features & Functionality
   ============================================ */

// ============= DOM ELEMENTS =============
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// ============= HAMBURGER MENU =============
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============= NAVBAR SCROLL EFFECT =============
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - window.innerHeight / 3;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// ============= SMOOTH SCROLL NAVIGATION =============
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - navbar.offsetHeight;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============= CONTACT FORM HANDLING =============
if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    if (message.length < 10) {
        showNotification('Message must be at least 10 characters.', 'error');
        return;
    }
    
    // Success
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    contactForm.reset();
    
    console.log('Form Data:', { name, email, message, timestamp: new Date() });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============= NOTIFICATIONS =============
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const bgColor = type === 'success' 
        ? 'rgba(255, 107, 0, 0.95)' 
        : 'rgba(239, 68, 68, 0.95)';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background: ${bgColor};
        color: white;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.95rem;
        z-index: 2000;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 107, 0, 0.3);
        animation: notificationSlideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'notificationSlideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ============= INTERSECTION OBSERVER FOR ANIMATIONS =============
const animationObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animationObserver.unobserve(entry.target);
        }
    });
}, animationObserverOptions);

// Observe elements for animation
document.querySelectorAll(
    '.about-card, .experience-card, .skill-card, .project-card'
).forEach(el => {
    animationObserver.observe(el);
});

// ============= KEYBOARD SHORTCUTS =============
document.addEventListener('keydown', (e) => {
    // Close menu on Escape
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============= ANIMATIONS STYLESHEET =============
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes notificationSlideIn {
        from {
            opacity: 0;
            transform: translateX(400px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes notificationSlideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(400px);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out !important;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(animationStyles);

// ============= SCROLL TO TOP BUTTON =============
const scrollBtn = document.createElement('button');
scrollBtn.setAttribute('aria-label', 'Scroll to top');
scrollBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>';
scrollBtn.className = 'scroll-to-top';
scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #ff6b00, #ff8533);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 30px rgba(255, 107, 0, 0.3);
`;

document.body.appendChild(scrollBtn);

// Show/hide scroll button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.visibility = 'visible';
    } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.visibility = 'hidden';
    }
});

// Scroll to top functionality
scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll button hover effects
scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.transform = 'translateY(-5px) scale(1.1)';
    scrollBtn.style.boxShadow = '0 15px 40px rgba(255, 107, 0, 0.5)';
});

scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.transform = 'translateY(0) scale(1)';
    scrollBtn.style.boxShadow = '0 10px 30px rgba(255, 107, 0, 0.3)';
});

// ============= ACCESSIBILITY =============
// Respect prefers-reduced-motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
    const noMotionStyle = document.createElement('style');
    noMotionStyle.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(noMotionStyle);
}

// ============= HERO CAROUSEL FUNCTIONALITY =============
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const indicators = Array.from(document.querySelectorAll('.carousel-indicators button'));
    let current = 0;
    let autoplayId = null;

    function update() {
        const offset = -current * 100;
        track.style.transform = `translateX(${offset}%)`;
        slides.forEach((s, i) => s.classList.toggle('active', i === current));
        indicators.forEach((b, i) => b.classList.toggle('active', i === current));
    }

    function next() { current = (current + 1) % slides.length; update(); }
    function prev() { current = (current - 1 + slides.length) % slides.length; update(); }

    nextBtn.addEventListener('click', () => { next(); restartAutoplay(); });
    prevBtn.addEventListener('click', () => { prev(); restartAutoplay(); });

    indicators.forEach(btn => {
        btn.addEventListener('click', (e) => {
            current = Number(btn.dataset.slide);
            update();
            restartAutoplay();
        });
    });

    function startAutoplay() { autoplayId = setInterval(next, 4200); }
    function stopAutoplay() { if (autoplayId) clearInterval(autoplayId); }
    function restartAutoplay() { stopAutoplay(); startAutoplay(); }

    const carousel = document.querySelector('.hero-carousel');
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Initialize
    update();
    startAutoplay();
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { next(); restartAutoplay(); }
        if (e.key === 'ArrowLeft') { prev(); restartAutoplay(); }
    });
});

// ============= PAGE INITIALIZATION =============
document.addEventListener('DOMContentLoaded', () => {
    console.log('✨ Professional Portfolio Loaded');
    updateActiveNavLink();
    
    // Add fade in effect
    document.body.style.opacity = '1';
});

// Fade in body on load
document.body.style.opacity = '0';
window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.5s ease-out';
    document.body.style.opacity = '1';
});