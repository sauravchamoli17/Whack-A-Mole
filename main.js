const holes = document.querySelectorAll('.hole');
const scoreboard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const popup = document.querySelector('.popup');
const start = document.querySelector('.start');
const shoot = document.querySelector('.shoot');
const gameOver = document.querySelector('.game__over');
let lastHole, timeUp,score;
timeUp = false;
score = 0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHoles(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
      return randomHoles(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(200,1000);
    const hole = randomHoles(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');  
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    start.play();
    scoreboard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => {
       timeUp = true;
       gameOver.play();
    },10000);
}

function bonk(e) {
    if (!e.isTrusted) return; //cheater!
    score++;
    shoot.currentTime = 0;
    shoot.play();
    this.classList.remove('up');
    scoreboard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));