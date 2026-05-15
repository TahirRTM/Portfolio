// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.9)';
        navbar.style.borderBottomColor = 'rgba(0, 212, 255, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.7)';
        navbar.style.borderBottomColor = 'rgba(0, 212, 255, 0.2)';
    }
});

// Smooth scroll snap
const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and other elements
document.querySelectorAll('section, .skill-category, .project-card, .timeline-item, .education-card').forEach(el => {
    observer.observe(el);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Create mailto link for frontend only
        const mailtoLink = `mailto:tahir.mushtaq@example.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

        // Show success message
        const originalText = contactForm.querySelector('button').textContent;
        contactForm.querySelector('button').textContent = '✓ Message prepared!';
        contactForm.querySelector('button').style.color = '#00d4ff';

        // Reset form
        contactForm.reset();

        // Reset button after delay
        setTimeout(() => {
            contactForm.querySelector('button').textContent = originalText;
            contactForm.querySelector('button').style.color = '';
        }, 3000);

        // Optional: Uncomment to open email client
        // window.location.href = mailtoLink;

        console.log('Form Data:', { name, email, message });
    });
}

// Download CV button
const downloadBtn = document.querySelector('.download-cv');
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        // This would normally link to a CV file
        // For now, it shows a message
        alert('CV download feature - would link to your actual CV file');

        // To implement actual download:
        // const link = document.createElement('a');
        // link.href = 'path/to/your/cv.pdf';
        // link.download = 'Tahir_Mushtaq_CV.pdf';
        // link.click();
    });
}

// Parallax effect on hero section
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        heroVisual.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        heroVisual.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// Animate numbers on scroll (for potential stats)
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
    });
});

// Skill tags interactive effect
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.backgroundColor = 'rgba(0, 212, 255, 0.3)';
        tag.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.5)';
    });

    tag.addEventListener('mouseleave', () => {
        tag.style.backgroundColor = '';
        tag.style.boxShadow = '';
    });
});

// Scroll to top button (optional)
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(168, 85, 247, 0.2));
        border: 2px solid #00d4ff;
        color: #00d4ff;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    `;

    button.addEventListener('mouseenter', () => {
        button.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.4), rgba(168, 85, 247, 0.4))';
        button.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.5)';
        button.style.transform = 'translateY(-5px)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(168, 85, 247, 0.2))';
        button.style.boxShadow = '';
        button.style.transform = '';
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(button);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
};

createScrollToTopButton();

// Add active animation to buttons on click
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;

        if (button.style.position !== 'relative') {
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
        }

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes if not already in CSS
if (!document.querySelector('style[data-ripple]')) {
    const style = document.createElement('style');
    style.setAttribute('data-ripple', 'true');
    style.innerHTML = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Highlight item hover effect
const highlightItems = document.querySelectorAll('.highlight-item');
highlightItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(10px)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = '';
    });
});

// Theme color pulse animation on load
window.addEventListener('load', () => {
    console.log('Portfolio loaded successfully');
    // Trigger initial animations
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Lazy load images effect (for future image additions)
const setupLazyLoad = () => {
    const images = document.querySelectorAll('img[data-lazy]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.lazy;
                img.removeAttribute('data-lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

setupLazyLoad();

// Accessibility: Manage focus in mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && navMenu.classList.contains('active')) {
        const focusableElements = navMenu.querySelectorAll('a, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});

// Performance optimization: Debounce scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Add any additional dynamic functionality here
console.log('Portfolio JavaScript initialized successfully');
