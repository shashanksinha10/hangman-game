const wordEl = document.getElementById('word');
const wrongLetterEl = document.getElementById('wrong-letter');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');

const correctLetter = [];
const wrongLetter = [];
const words = ['python', 'javascript', 'react', 'java', 'angular', 'html', 'css'];
let selectedWords = words[Math.floor(Math.random() * words.length)];
playAgainBtn.addEventListener('click', () => {
    correctLetter.splice(0);
    wrongLetter.splice(0);
    selectedWords = words[Math.floor(Math.random() * words.length)];
    displayWords();
    updateWrongLettersEl();
    popup.style.display = 'none';
});

function displayWords() {
    wordEl.innerHTML = `
                        ${selectedWords.split('').map(letter =>
        `<span class="letter"> ${correctLetter.includes(letter) ? letter : ''} 
                          </span>`).join('')}
                       `;
    const innerWord = wordEl.innerText.replace(/\n/g, '');
    if (innerWord === selectedWords) {
        finalMessage.innerText = 'Congratulation! You Won';
        popup.style.display = 'flex';
    }
};

window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if (selectedWords.includes(letter)) {
            if (!correctLetter.includes(letter)) {
                correctLetter.push(letter);
                displayWords();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetter.includes(letter)) {
                wrongLetter.push(letter);
                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

function updateWrongLettersEl() {
    wrongLetterEl.innerHTML = `
    ${wrongLetter.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetter.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part, index) => {
        const wrongWords = wrongLetter.length;
        if(index < wrongWords) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    if(wrongLetter.length === figureParts.length){
        finalMessage.innerHTML = 'You Lost'
        popup.style.display = 'flex';
    }
};

function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000)
};

displayWords();