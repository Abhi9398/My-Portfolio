// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light-mode') {
        body.classList.add('light-mode');
        darkModeToggle.textContent = '☀️'; // Sun icon for light mode
    } else {
        darkModeToggle.textContent = '🌙'; // Moon icon for dark mode
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light-mode');
            darkModeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'dark-mode'); // Explicitly save dark mode
            darkModeToggle.textContent = '🌙';
        }
    });


    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('.floating-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (window.innerWidth > 768 ? 80 : 0), // Adjust for fixed nav height on larger screens
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- Floating Navigation on Scroll ---
    const floatingNav = document.querySelector('.floating-nav');
    const heroSection = document.getElementById('hero');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the hero section is out of view
    };

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                floatingNav.classList.add('scrolled');
                // You might want to adjust its position/style when scrolled class is added
            } else {
                floatingNav.classList.remove('scrolled');
            }
        });
    }, observerOptions);

    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    // Initial check in case page is loaded with scroll
    if (window.scrollY > heroSection.offsetHeight * 0.5) {
        floatingNav.classList.add('scrolled');
    }


    // --- Scroll-Triggered Fade-In Animations ---
    const animateOnScrollElements = document.querySelectorAll(
        '.about-section p, .career-interests-grid .interest-card, ' +
        '.skill-card, .project-card, .timeline-item, .certification-card, ' +
        '.contact-form-container, .contact-info-social'
    );

    const fadeInObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, fadeInObserverOptions);

    animateOnScrollElements.forEach(el => {
        el.style.opacity = '0'; // Set initial opacity
        el.style.transform = 'translateY(20px)'; // Set initial transform
        fadeInObserver.observe(el);
    });


    // --- Skill Progress Bar Animation ---
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress-bar');
    let hasAnimatedSkills = false; // Flag to ensure it animates only once

    const skillObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the skills section is visible
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedSkills) {
                progressBars.forEach(bar => {
                    const width = bar.style.width; // Get the target width from inline style
                    bar.style.width = '0%'; // Reset to 0% for animation
                    // Force reflow to ensure the transition is applied from 0%
                    void bar.offsetWidth;
                    bar.style.width = width; // Animate to target width
                });
                hasAnimatedSkills = true;
                observer.unobserve(skillsSection); // Stop observing after animation
            }
        });
    }, skillObserverOptions);

    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }


    // --- Hero Text Animation (simple fade-in, slide-up) ---
    const heroTitle = document.querySelector('.hero-content h1');
    const heroTagline = document.querySelector('.hero-content p');
    const heroButtons = document.querySelector('.hero-ctas');

    if (heroTitle && heroTagline && heroButtons) {
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
            heroTitle.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        }, 300);

        setTimeout(() => {
            heroTagline.style.opacity = '1';
            heroTagline.style.transform = 'translateY(0)';
            heroTagline.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        }, 800);

        setTimeout(() => {
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
            heroButtons.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        }, 1300);
    }


    // --- Contact Form Submission (Basic client-side prevention) ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // Here you would typically send data to a server using fetch() or XMLHttpRequest
            // Example:
            /*
            const formData = new FormData(this);
            fetch('/send-email', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert('Message sent successfully!');
                this.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to send message. Please try again later.');
            });
            */

            // For now, just a confirmation alert
            alert('Thank you for your message! I will get back to you soon.');
            this.reset(); // Clear the form after submission
        });
    }

});