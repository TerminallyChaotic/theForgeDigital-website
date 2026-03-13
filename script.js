// The Forge Digital - JavaScript

// Smooth scrolling for navigation links
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

// Form validation (optional enhancement)
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        // Optional: Add client-side validation here
        // Form will submit to Formspree endpoint
    });
}
