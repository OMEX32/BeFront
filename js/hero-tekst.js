document.addEventListener('DOMContentLoaded', () => {
    const cyclingTextElement = document.getElementById('cyclingText');
    const words = ['Snel', 'Professioneel', 'Betaalbaar'];
    let currentIndex = 0;

    if (!cyclingTextElement) return;

    function typeWord(word) {
        return new Promise((resolve) => {
            let currentText = '';
            let charIndex = 0;

            const typeInterval = setInterval(() => {
                currentText += word[charIndex];
                cyclingTextElement.innerHTML = currentText + '<span class="cursor">|</span>';
                charIndex++;

                if (charIndex === word.length) {
                    clearInterval(typeInterval);
                    resolve();
                }
            }, 100);
        });
    }

    function eraseWord() {
        return new Promise((resolve) => {
            let currentText = words[currentIndex];

            const eraseInterval = setInterval(() => {
                currentText = currentText.slice(0, -1);
                cyclingTextElement.innerHTML = currentText + '<span class="cursor">|</span>';

                if (currentText === '') {
                    clearInterval(eraseInterval);
                    resolve();
                }
            }, 50);
        });
    }

    async function cycleWords() {
        while (true) {
            await new Promise(resolve => setTimeout(resolve, 3000));
            await eraseWord();
            currentIndex = (currentIndex + 1) % words.length;
            await new Promise(resolve => setTimeout(resolve, 200));
            await typeWord(words[currentIndex]);
        }
    }

    // Start after delay
    setTimeout(() => {
        typeWord(words[currentIndex]).then(cycleWords);
    }, 1000);
});
