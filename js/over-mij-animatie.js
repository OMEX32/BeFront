// Simple hover effects for cards
document.querySelectorAll('.over-mij-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// CTA button click effect
document.querySelector('.over-mij-button').addEventListener('click', function (e) {
    e.preventDefault();
    this.style.transform = 'translateY(-2px) scale(0.98)';
    setTimeout(() => {
        this.style.transform = 'translateY(-2px) scale(1)';
    }, 150);
});
