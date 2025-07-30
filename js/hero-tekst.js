
const cyclingTextElement = document.getElementById('cyclingText');
const words = ['Snel', 'Professioneel', 'Betaalbaar'];
let currentIndex = 0;
let isTyping = false;

function typeWord(word) {
    return new Promise((resolve) => {
        isTyping = true;
        let currentText = '';
        let charIndex = 0;

        const typeInterval = setInterval(() => {
            currentText += word[charIndex];
            cyclingTextElement.innerHTML = currentText + '<span class="cursor">|</span>';
            charIndex++;

            if (charIndex === word.length) {
                clearInterval(typeInterval);
                isTyping = false;
                resolve();
            }
        }, 100); // 100ms per character
    });
}

function eraseWord() {
    return new Promise((resolve) => {
        isTyping = true;
        let currentText = words[currentIndex];

        const eraseInterval = setInterval(() => {
            currentText = currentText.slice(0, -1);
            cyclingTextElement.innerHTML = currentText + '<span class="cursor">|</span>';

            if (currentText === '') {
                clearInterval(eraseInterval);
                isTyping = false;
                resolve();
            }
        }, 50); // 50ms per character (faster erase)
    });
}

async function cycleWords() {
    while (true) {
        // Wait 3 seconds before starting to erase
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Erase current word
        await eraseWord();

        // Move to next word
        currentIndex = (currentIndex + 1) % words.length;

        // Wait a bit before typing new word
        await new Promise(resolve => setTimeout(resolve, 200));

        // Type new word
        await typeWord(words[currentIndex]);
    }
}

// Start the cycle after page load
setTimeout(() => {
    cycleWords();
}, 3000);
