document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        // Toggle menu
        menuToggle.addEventListener('click', () => {
            const isActive = nav.classList.contains('active');
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', !isActive);

            if (!isActive) {
                const navItems = nav.querySelectorAll('a');
                navItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(30px) scale(0.9)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0) scale(1)';
                    }, index * 80 + 200);
                });
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (targetId !== '#') history.pushState(null, null, targetId);
            }
        });
    });

    // Content bar interaction
    document.querySelectorAll('.content-bar').forEach(bar => {
        const activate = () => {
            bar.style.transform = 'scaleX(1.1)';
            bar.style.transition = 'transform 0.3s ease';
        };
        const reset = () => {
            bar.style.transform = 'scaleX(1)';
        };
        ['mouseenter', 'touchstart'].forEach(evt => bar.addEventListener(evt, activate));
        ['mouseleave', 'touchend'].forEach(evt => bar.addEventListener(evt, reset));
    });

    // Entrance animations
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const animatedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.content-left > *, .laptop-container');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        setTimeout(() => animatedObserver.observe(el), 100);
    });

    // Interactive laptop screen
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
            colorIndex = (colorIndex + 1) % colors.length;
            screenContent.querySelectorAll('.content-bar:not(.bar-gray)').forEach(bar => bar.style.background = colors[colorIndex]);
            const block = screenContent.querySelector('.content-block');
            if (block) block.style.background = colors[colorIndex];
        });
    }

    // ESC key closes menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.focus();
        }
    });

    // Disable animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
        document.querySelectorAll('*').forEach(el => el.style.animation = 'none');
    }

    // Back to Top button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            backToTopButton.classList.toggle('visible', window.pageYOffset > 300);
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
