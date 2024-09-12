const cardsArray = [
    { name: 'burger', img: 'images/burger.jpg' },
    { name: 'dessert', img: 'images/dessert.jpg' },
    { name: 'fries', img: 'images/fries.jpg' },
    { name: 'momos', img: 'images/momos.jpg' },
    { name: 'pizzaa', img: 'images/pizzaa.jpg' },
    { name: 'tacoss', img: 'images/tacoss.jpg' }

];


let gameCards = [...cardsArray, ...cardsArray];
gameCards = gameCards.sort(() => 0.5 - Math.random());

let firstCard = null;
let secondCard = null;
let moves = 0;
let matchedPairs = 0;
let timerInterval = null;
let seconds = 0;

const gameBoard = document.getElementById('game-board');
const movesCounter = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const restartButton = document.getElementById('restart');


function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        timerDisplay.textContent = seconds;
    }, 1000);
}


function stopTimer() {
    clearInterval(timerInterval);
}


function resetGame() {
    gameBoard.innerHTML = '';
    gameCards = [...cardsArray, ...cardsArray].sort(() => 0.5 - Math.random());
    firstCard = null;
    secondCard = null;
    moves = 0;
    matchedPairs = 0;
    seconds = 0;
    movesCounter.textContent = moves;
    timerDisplay.textContent = seconds;
    stopTimer();
    createBoard();
}


function createBoard() {
    gameCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const frontFace = document.createElement('div');
        frontFace.classList.add('card-front');

        const backFace = document.createElement('div');
        backFace.classList.add('card-back');

        const backImage = document.createElement('img');
        backImage.src = card.img;
        backFace.appendChild(backImage);

        cardInner.appendChild(frontFace);
        cardInner.appendChild(backFace);
        cardElement.appendChild(cardInner);

        cardElement.dataset.name = card.name;

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}


function flipCard() {
    if (this === firstCard || this.classList.contains('matched')) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        if (moves === 0) startTimer();
    } else {
        secondCard = this;
        moves++;
        movesCounter.textContent = moves;

        if (firstCard.dataset.name === secondCard.dataset.name) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matchedPairs++;
            if (matchedPairs === cardsArray.length) {
                stopTimer();
                setTimeout(() => alert(`Game Over! You finished in ${seconds} seconds with ${moves} moves.`), 500);
            }
            resetSelectedCards();
        } else {
            setTimeout(unflipCards, 1000);
        }
    }
}

function resetSelectedCards() {
    firstCard = null;
    secondCard = null;
}

function unflipCards() {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetSelectedCards();
}

restartButton.addEventListener('click', resetGame);


createBoard();
