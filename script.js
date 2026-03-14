/* ============================================================
   THE FORGE DIGITAL - Interactive Scripts
   Scroll reveals, navigation, form validation
   Purposeful, smooth interactions -- not flashy
   ============================================================ */

(function () {
    'use strict';

    /* ---- NAVBAR SCROLL EFFECT ---- */
    var navbar = document.getElementById('navbar');

    function handleNavScroll() {
        var scrollY = window.scrollY;
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();


    /* ---- MOBILE HAMBURGER MENU ---- */
    var hamburger = document.getElementById('hamburger');
    var navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            var isOpen = navMenu.classList.toggle('open');
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
                    field.style.borderColor = '#b54a32';
                }

                // Basic email check
                if (field.type === 'email' && field.value.trim()) {
                    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(field.value.trim())) {
                        isValid = false;
                        field.style.borderColor = '#b54a32';
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


    /* ---- FALLING SHAPES ANIMATION ---- */
    function initFallingShapes() {
        var canvas = document.getElementById('heroCanvas');
        if (!canvas) return;

        // Respect reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            canvas.style.display = 'none';
            return;
        }

        var ctx = canvas.getContext('2d');
        var shapes = [];
        var animationId;

        // Set canvas size to cover upper portion of page
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            // Make canvas tall enough to cover hero + next 2-3 sections
            canvas.height = window.innerHeight * 2.5;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Shape class
        function Shape(x, y, size, type, opacity) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.type = type; // 'square', 'circle', 'triangle'
            this.opacity = opacity;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = Math.random() * 0.5 + 0.3;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        }

        Shape.prototype.update = function () {
            this.x += this.vx;
            this.y += this.vy;
            this.rotation += this.rotationSpeed;
            this.opacity -= 0.002;
        };

        Shape.prototype.draw = function (ctx) {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#a89668'; // brass color
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);

            if (this.type === 'square') {
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            } else if (this.type === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (this.type === 'triangle') {
                ctx.beginPath();
                ctx.moveTo(0, -this.size / 2);
                ctx.lineTo(this.size / 2, this.size / 2);
                ctx.lineTo(-this.size / 2, this.size / 2);
                ctx.closePath();
                ctx.fill();
            }

            ctx.restore();
        };

        function createShape() {
            var types = ['square', 'circle', 'triangle'];
            var type = types[Math.floor(Math.random() * types.length)];
            var size = Math.random() * 30 + 15;
            var x = Math.random() * canvas.width;
            var y = -size;
            var opacity = 0.25; // Subtle but visible
            return new Shape(x, y, size, type, opacity);
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Create new shapes occasionally (balanced spawn rate)
            if (Math.random() < 0.04) {
                shapes.push(createShape());
            }

            // Update and draw shapes
            for (var i = shapes.length - 1; i >= 0; i--) {
                shapes[i].update();
                shapes[i].draw(ctx);

                // Remove if off screen or fully transparent
                if (shapes[i].y > canvas.height || shapes[i].opacity <= 0) {
                    shapes.splice(i, 1);
                }
            }

            animationId = requestAnimationFrame(animate);
        }

        animate();

        // Cleanup on page unload
        window.addEventListener('beforeunload', function () {
            cancelAnimationFrame(animationId);
        });
    }

    initFallingShapes();

})();
