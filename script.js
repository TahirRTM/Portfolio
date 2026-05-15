/* ============================================
   CINEMATIC CYBERSECURITY EXPERIENCE
   INTERACTIVE FEATURES & ANIMATIONS
   ============================================ */

// ============= NAVBAR & NAVIGATION =============
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Mobile menu toggle
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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============= ACTIVE NAV LINK HIGHLIGHTING =============
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============= SYSTEM INITIALIZATION ANIMATION =============
window.addEventListener('load', () => {
    const systemInit = document.querySelector('.system-init');
    if (systemInit) {
        setTimeout(() => {
            systemInit.style.display = 'none';
        }, 3000);
    }
});

// ============= GLITCH EFFECT ON HERO NAME =============
const heroName = document.querySelector('.hero-name');
if (heroName) {
    const originalText = heroName.textContent;
    let glitchActive = false;
    
    function triggerGlitch() {
        if (!glitchActive) {
            glitchActive = true;
            const glitchCount = 5;
            let currentCount = 0;
            
            const glitchInterval = setInterval(() => {
                if (currentCount < glitchCount) {
                    const randomChars = 'ΨΩΣ∆ΞΛ∑∏∫√∞≠±×÷';
                    const glitchText = originalText.split('').map((char, index) => {
                        return Math.random() > 0.7 ? randomChars[Math.floor(Math.random() * randomChars.length)] : char;
                    }).join('');
                    
                    heroName.textContent = glitchText;
                    currentCount++;
                } else {
                    heroName.textContent = originalText;
                    glitchActive = false;
                    clearInterval(glitchInterval);
                }
            }, 50);
        }
    }
    
    // Trigger glitch on mouse over
    heroName.addEventListener('mouseenter', triggerGlitch);
}

// ============= MISSION CARD ANIMATIONS =============
const missionCards = document.querySelectorAll('.mission-card');
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

missionCards.forEach(card => {
    observer.observe(card);
    
    // Hover effect
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ============= MODULE CARDS ANIMATIONS =============
const moduleCards = document.querySelectorAll('.module-card');
moduleCards.forEach((card, index) => {
    observer.observe(card);
    
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        const items = card.querySelectorAll('.module-item');
        items.forEach((item, idx) => {
            item.style.transition = 'all 0.3s ease';
            item.style.transitionDelay = `${idx * 50}ms`;
        });
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ============= CASE CARDS ANIMATIONS =============
const caseCards = document.querySelectorAll('.case-card');
caseCards.forEach(card => {
    observer.observe(card);
    
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ============= FORM VALIDATION & SUBMISSION =============
const terminalForm = document.querySelector('.terminal-form');
if (terminalForm) {
    terminalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = terminalForm.querySelector('input[name="name"]');
        const emailInput = terminalForm.querySelector('input[name="email"]');
        const messageInput = terminalForm.querySelector('textarea[name="message"]');
        
        // Validation
        if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
            showNotification('ERROR: INCOMPLETE TRANSMISSION DATA', 'error');
            return;
        }
        
        if (!isValidEmail(emailInput.value)) {
            showNotification('ERROR: INVALID EMAIL FORMAT', 'error');
            return;
        }
        
        // Success
        showNotification('TRANSMISSION SUCCESSFUL - MESSAGE RECEIVED', 'success');
        terminalForm.reset();
        
        // Log data (in production, send to server)
        console.log({
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value,
            timestamp: new Date().toISOString()
        });
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Terminal notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `terminal-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 20px;
        background: ${type === 'success' ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255, 0, 110, 0.1)'};
        border: 2px solid ${type === 'success' ? '#00d4ff' : '#ff006e'};
        border-radius: 3px;
        color: ${type === 'success' ? '#00d4ff' : '#ff006e'};
        font-size: 0.85rem;
        letter-spacing: 1px;
        text-shadow: 0 0 10px ${type === 'success' ? '#00d4ff' : '#ff006e'};
        z-index: 10000;
        animation: slideIn 0.5s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out forwards';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// ============= PARTICLE BACKGROUND GENERATION =============
function generateParticles() {
    const cyberParticles = document.querySelector('.cyber-particles');
    if (!cyberParticles) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: ${Math.random() > 0.5 ? '#00d4ff' : '#ff006e'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.3};
            box-shadow: 0 0 ${Math.random() * 20 + 10}px currentColor;
            animation: float ${Math.random() * 15 + 10}s linear infinite;
        `;
        
        cyberParticles.appendChild(particle);
    }
}

// ============= ADD ANIMATIONS TO STYLE =============
function injectAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(20px); }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-20px) translateX(10px); }
        }
        
        .nav-link.active {
            color: #00d4ff;
            text-shadow: 0 0 20px #00d4ff;
        }
        
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
}

// ============= INITIALIZE ON PAGE LOAD =============
document.addEventListener('DOMContentLoaded', () => {
    injectAnimationStyles();
    generateParticles();
});

// ============= KEYBOARD SHORTCUTS =============
document.addEventListener('keydown', (e) => {
    // Ctrl+/ opens terminal
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        const terminal = document.getElementById('terminal');
        if (terminal) {
            terminal.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Escape closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============= SCROLL TO TOP BUTTON =============
window.addEventListener('scroll', () => {
    let scrollBtn = document.querySelector('.scroll-top-btn');
    
    if (window.scrollY > 500 && !scrollBtn) {
        scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-top-btn';
        scrollBtn.innerHTML = '↑ RETURN TO TOP';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 12px 20px;
            background: rgba(0, 212, 255, 0.1);
            border: 2px solid #00d4ff;
            color: #00d4ff;
            border-radius: 3px;
            cursor: pointer;
            font-size: 0.8rem;
            letter-spacing: 2px;
            z-index: 100;
            text-shadow: 0 0 10px #00d4ff;
            transition: all 0.3s ease;
            font-family: 'Courier New', monospace;
        `;
        
        scrollBtn.addEventListener('mouseenter', () => {
            scrollBtn.style.boxShadow = '0 0 30px #00d4ff';
            scrollBtn.style.transform = 'scale(1.1)';
        });
        
        scrollBtn.addEventListener('mouseleave', () => {
            scrollBtn.style.boxShadow = 'none';
            scrollBtn.style.transform = 'scale(1)';
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        document.body.appendChild(scrollBtn);
    } else if (window.scrollY <= 500 && scrollBtn) {
        scrollBtn.remove();
    }
});

// ============= PROFILE CARD INTERACTION =============
const profileCard = document.querySelector('.profile-card');
if (profileCard) {
    profileCard.addEventListener('mouseenter', () => {
        const tags = profileCard.querySelectorAll('.expertise-tag');
        tags.forEach((tag, index) => {
            tag.style.transition = 'all 0.3s ease';
            tag.style.transitionDelay = `${index * 50}ms`;
            tag.style.transform = 'translateY(-3px)';
        });
    });
    
    profileCard.addEventListener('mouseleave', () => {
        const tags = profileCard.querySelectorAll('.expertise-tag');
        tags.forEach(tag => {
            tag.style.transform = 'translateY(0)';
        });
    });
}

// ============= MISSION ITEMS DETAILED VIEW =============
missionCards.forEach(card => {
    card.addEventListener('click', () => {
        // Add visual feedback
        card.style.borderColor = '#ff00ff';
        setTimeout(() => {
            card.style.borderColor = '';
        }, 500);
    });
});

// ============= STATS COUNTER ANIMATION =============
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const finalValue = entry.target.textContent;
                animateCountUp(entry.target, finalValue);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCountUp(element, finalValue) {
    const numericValue = parseInt(finalValue.replace(/\D/g, ''));
    if (!isNaN(numericValue)) {
        let current = 0;
        const increment = Math.ceil(numericValue / 30);
        const interval = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                element.textContent = finalValue;
                clearInterval(interval);
            } else {
                element.textContent = current + (finalValue.replace(/\d/g, '') || '+');
            }
        }, 50);
    }
}

// Initialize stats animation on load
window.addEventListener('load', animateStats);

// ============= ACCESSIBILITY & PERFORMANCE =============
// Reduce animations on preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
    const style = document.createElement('style');
    style.textContent = `
        * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
    `;
    document.head.appendChild(style);
}

console.log('%c⚡ CYBERSECURITY PORTFOLIO INITIALIZED', 'color: #00d4ff; font-size: 16px; text-shadow: 0 0 10px #00d4ff;');
