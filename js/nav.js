
// Mobile menu toggle with enhanced animations
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        const isActive = nav.classList.contains('active');

        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', !isActive);

        // Add stagger animation to nav items
        if (!isActive) {
            const navItems = nav.querySelectorAll('a');
            navItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(30px) scale(0.9)';
                setTimeout(() => {
                    item.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0) scale(1)';
                }, index * 80 + 200);
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close mobile menu when clicking on a link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update URL without jumping
            if (targetId !== '#') {
                history.pushState(null, null, targetId);
            }
        }
    });
});

// Interactive content bars with improved touch support
const contentBars = document.querySelectorAll('.content-bar');
contentBars.forEach(bar => {
    const handleInteraction = () => {
        bar.style.transform = 'scaleX(1.1)';
        bar.style.transition = 'transform 0.3s ease';
    };

    const handleInteractionEnd = () => {
        bar.style.transform = 'scaleX(1)';
    };

    bar.addEventListener('mouseenter', handleInteraction);
    bar.addEventListener('mouseleave', handleInteractionEnd);
    bar.addEventListener('touchstart', handleInteraction);
    bar.addEventListener('touchend', handleInteractionEnd);
});

// Enhanced entrance animations with intersection observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply entrance animations to elements
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.content-left > *, .laptop-container');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;

        setTimeout(() => {
            observer.observe(el);
        }, 100);
    });
});

// Interactive laptop screen with color cycling
const screenContent = document.querySelector('.screen-content');
if (screenContent) {
    let colorIndex = 0;
    const colors = [
        'linear-gradient(90deg, #ffd700, #ffed4e)',
        'linear-gradient(90deg, #ff6b6b, #ff8e8e)',
        'linear-gradient(90deg, #6bcf7f, #8ed99f)',
        'linear-gradient(90deg, #6bb6ff, #8ec5ff)',
        'linear-gradient(90deg, #da4cff, #e066ff)'
    ];

    screenContent.addEventListener('click', () => {
        const bars = screenContent.querySelectorAll('.content-bar:not(.bar-gray)');
        colorIndex = (colorIndex + 1) % colors.length;

        bars.forEach(bar => {
            bar.style.background = colors[colorIndex];
        });

        const contentBlock = screenContent.querySelector('.content-block');
        if (contentBlock) {
            contentBlock.style.background = colors[colorIndex];
        }
    });
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
    }
});

// Performance optimization: disable animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
    });
}

