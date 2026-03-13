/* ============================================================
   THE FORGE DIGITAL - Interactive Scripts
   Particles, scroll reveals, navigation, card effects
   ============================================================ */

(function () {
    'use strict';

    /* ---- NAVBAR SCROLL EFFECT ---- */
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    function handleNavScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();


    /* ---- MOBILE HAMBURGER MENU ---- */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            const isOpen = navMenu.classList.toggle('open');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }


    /* ---- SMOOTH SCROLL FOR ANCHOR LINKS ---- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    /* ---- SCROLL REVEAL ---- */
    function initScrollReveal() {
        var elements = document.querySelectorAll('[data-reveal]');
        if (!elements.length) return;

        // Respect reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            elements.forEach(function (el) {
                el.classList.add('revealed');
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
                    setTimeout(function () {
                        el.classList.add('revealed');
                    }, delay);
                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    initScrollReveal();


    /* ---- CARD GLOW EFFECT (mouse tracking) ---- */
    function initCardGlow() {
        var cards = document.querySelectorAll('.service-card');

        cards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = ((e.clientX - rect.left) / rect.width) * 100;
                var y = ((e.clientY - rect.top) / rect.height) * 100;
                card.style.setProperty('--mouse-x', x + '%');
                card.style.setProperty('--mouse-y', y + '%');
            });
        });
    }

    initCardGlow();


    /* ---- HERO PARTICLE SYSTEM ---- */
    function initParticles() {
        var canvas = document.getElementById('heroParticles');
        if (!canvas) return;

        // Skip particles for reduced motion or mobile
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (window.innerWidth < 768) return;

        var ctx = canvas.getContext('2d');
        var particles = [];
        var particleCount = 50;
        var animationId;

        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1.5 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.4 + 0.1,
                pulse: Math.random() * Math.PI * 2
            };
        }

        function initParticleArray() {
            particles = [];
            for (var i = 0; i < particleCount; i++) {
                particles.push(createParticle());
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];

                // Update position
                p.x += p.speedX;
                p.y += p.speedY;
                p.pulse += 0.01;

                // Wrap around edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Calculate opacity with pulse
                var currentOpacity = p.opacity * (0.6 + Math.sin(p.pulse) * 0.4);

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(224, 118, 56, ' + currentOpacity + ')';
                ctx.fill();
            }

            // Draw connection lines between nearby particles
            for (var a = 0; a < particles.length; a++) {
                for (var b = a + 1; b < particles.length; b++) {
                    var dx = particles[a].x - particles[b].x;
                    var dy = particles[a].y - particles[b].y;
                    var dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        var lineOpacity = (1 - dist / 120) * 0.08;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.strokeStyle = 'rgba(224, 118, 56, ' + lineOpacity + ')';
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animationId = requestAnimationFrame(drawParticles);
        }

        // Use Intersection Observer to pause when hero is not visible
        var heroSection = document.getElementById('hero');
        var isHeroVisible = true;

        var heroObserver = new IntersectionObserver(function (entries) {
            isHeroVisible = entries[0].isIntersecting;
            if (isHeroVisible && !animationId) {
                drawParticles();
            } else if (!isHeroVisible && animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        }, { threshold: 0 });

        if (heroSection) {
            heroObserver.observe(heroSection);
        }

        resize();
        initParticleArray();
        drawParticles();

        window.addEventListener('resize', function () {
            resize();
            initParticleArray();
        });
    }

    initParticles();


    /* ---- FORM VALIDATION & SUBMISSION FEEDBACK ---- */
    var form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            var requiredFields = form.querySelectorAll('[required]');
            var isValid = true;

            requiredFields.forEach(function (field) {
                // Remove any prior error state
                field.style.borderColor = '';

                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e04848';
                }

                // Basic email check
                if (field.type === 'email' && field.value.trim()) {
                    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(field.value.trim())) {
                        isValid = false;
                        field.style.borderColor = '#e04848';
                    }
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });

        // Clear error border on input
        form.querySelectorAll('input, textarea, select').forEach(function (field) {
            field.addEventListener('input', function () {
                this.style.borderColor = '';
            });
        });
    }


    /* ---- ACTIVE NAV LINK HIGHLIGHTING ---- */
    function initActiveNavTracking() {
        var sections = document.querySelectorAll('section[id]');
        var navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

        if (!sections.length || !navLinks.length) return;

        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.getAttribute('id');
                    navLinks.forEach(function (link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -40% 0px'
        });

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }

    initActiveNavTracking();

})();
