const holes = document.querySelectorAll('.hole');
const scoreboard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const popup = document.querySelector('.popup');
const start = document.querySelector('.start');
const shoot = document.querySelector('.shoot');
const gameOver = document.querySelector('.game__over');
const levels = document.querySelectorAll('input[name="level"]');
const highScore = document.querySelector('.high__score');

if (localStorage.getItem("score") === null) 
localStorage.setItem('score', 0);   

const highest = localStorage.getItem('score');
highScore.textContent = highest;

let lastHole, timeUp, score;
let minTime = 200, maxTime = 1000;
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
    const time = randomTime(minTime,maxTime);
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
       if (score > highest) {
         localStorage.setItem('score', score);
         highScore.textContent = score;  
       }
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
levels.forEach(level => level.addEventListener('click', function () {
   scoreboard.textContent = 0;
   timeUp = true;
   [minTime, maxTime] = [parseFloat(this.dataset.min), parseFloat(this.dataset.max)];
}));