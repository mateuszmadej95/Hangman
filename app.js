const wordEl = document.querySelector('#word');
const wrongLettersEl = document.querySelector('#wrong-letters');
const playAgainBtn = document.querySelector('#play-button');
const popup = document.querySelector('#popup-container');
const notification = document.querySelector('#notification-container');
const finalMessage = document.querySelector('#final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['fuchsia', 'vaporize', 'zombie', 'witchcraft', 'microwave', 'beekeeper', 'blizzard', 'syndrome', 'vodka', 'voodoo', 'unknown', 'sphinx',
    'uncertainty', 'center', 'opposite', 'performer', 'mood', 'catalogue', 'report', 'abuse', 'mankind', 'love', 'mouse', 'elephant', 'forest', 'mountain', 'computer', 'table', 'orange', 'towel', 'carpet', 'replay'
];


let selectedWord = words[Math.floor(Math.random() * words.length)];
// let selectedWord = getWord();

const correctLetters = [];
const wrongLetters = [];

// get word from api
// function getWord() {
//     fetch(`http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data[0].word.toLowerCase());
//         })
// }


// display word
function displayWord() {
    wordEl.innerHTML = `${selectedWord
        .split('')
        .map(letter => `<span class='letter'>${correctLetters.includes(letter) ? letter : ''}</span>`)
        .join('')}`;

    const innerWord = wordEl.innerText.replace((/\n/g), '');
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won!🥳';
        popup.style.display = 'flex';
        window.removeEventListener('keydown', updateDOM);
    }
}

// update wrong
function updateWrong() {
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((figure, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            figure.style.display = 'block'
        } else {
            figure.style.display = 'none';
        }
    });

    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'You lost the game. 💩 Try again!';
        popup.style.display = 'flex';
        window.removeEventListener('keydown', updateDOM);
    }
}
// show notification
function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000)
}

// update DOM
function updateDOM(e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrong();
            } else {
                showNotification();
            }
        }
    }
}

// key down event
window.addEventListener('keydown', updateDOM);

// restart game
playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrong();
    popup.style.display = 'none';
    window.addEventListener('keydown', updateDOM);
})

displayWord()