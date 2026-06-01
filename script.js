// Ultra-premium portfolio JS
document.addEventListener('DOMContentLoaded', () => {
    // Navbar
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
            navToggle.classList.toggle('open');
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');
        updateActiveNavLink();
    });

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('main section');
        let current = '';
        sections.forEach(s => { const top = s.offsetTop - window.innerHeight/3; if (window.pageYOffset >= top) current = s.id; });
        navLinks.forEach(link => { link.classList.toggle('active', link.getAttribute('href').substring(1) === current); });
    }

    // Smooth scroll
    navLinks.forEach(link => link.addEventListener('click', (e) => {
        e.preventDefault(); const id = link.getAttribute('href').substring(1); const sec = document.getElementById(id); if (sec) window.scrollTo({ top: sec.offsetTop - navbar.offsetHeight, behavior: 'smooth' });
    }));

    // Carousel
    const carousel = document.getElementById('heroCarousel');
    if (carousel) {
        const slides = Array.from(carousel.querySelectorAll('.slide'));
        const prev = carousel.querySelector('.carousel-nav.prev');
        const next = carousel.querySelector('.carousel-nav.next');
        const dots = Array.from(carousel.querySelectorAll('.dot'));
        let idx = 0; let autoplay = null; const INTERVAL = 6000;

        function show(i) {
            idx = (i + slides.length) % slides.length;
            slides.forEach((s, j) => { s.classList.toggle('active', j===idx); s.setAttribute('aria-hidden', j!==idx); });
            dots.forEach((d,j)=> d.classList.toggle('active', j===idx));
        }

        function start() { autoplay = setInterval(()=> show(idx+1), INTERVAL); }
        function stop() { if (autoplay) clearInterval(autoplay); }
        function restart() { stop(); start(); }

        if (next) next.addEventListener('click', ()=> { show(idx+1); restart(); });
        if (prev) prev.addEventListener('click', ()=> { show(idx-1); restart(); });
        dots.forEach(d => d.addEventListener('click', ()=> { show(Number(d.dataset.slide)); restart(); }));
        carousel.addEventListener('mouseenter', stop); carousel.addEventListener('mouseleave', start);
        document.addEventListener('keydown', (e)=> { if (e.key==='ArrowRight') { show(idx+1); restart(); } if (e.key==='ArrowLeft') { show(idx-1); restart(); } });

        show(0); start();
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) contactForm.addEventListener('submit', handleForm);

    function handleForm(e) {
        e.preventDefault(); const name = document.getElementById('name').value.trim(); const email = document.getElementById('email').value.trim(); const message = document.getElementById('message').value.trim();
        if (!name || !email || !message) return notify('Please fill all fields','error');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return notify('Invalid email','error');
        notify('Message sent — I will get back to you soon','success'); contactForm.reset(); console.log({name,email,message});
    }

    function notify(msg,type='info'){
        const n = document.createElement('div'); n.className = `notify ${type}`; n.textContent = msg; n.style.cssText = 'position:fixed;right:20px;top:90px;padding:12px 18px;border-radius:8px;z-index:2200;font-weight:700'; n.style.background = type==='success' ? 'linear-gradient(90deg,#ff6b00,#ff8533)' : 'rgba(40,40,40,0.95)'; n.style.color='#fff'; document.body.appendChild(n); setTimeout(()=> { n.style.opacity=0; setTimeout(()=> n.remove(),300); },3500);
    }

    // Reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { document.documentElement.style.scrollBehavior='auto'; }

    // Small console sign-off
    console.log('Portfolio UI ready');
});
