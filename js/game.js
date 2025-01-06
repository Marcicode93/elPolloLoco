let canvas;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
}

function startGame() {
  gameStart = document.getElementById("start-screen");
  let gameOver = document.getElementById("game-over-screen");
  let win = document.getElementById("win-screen");
  win.classList.add("display-none");
  gameOver.classList.add("display-none");
  gameStart.classList.add("display-none");
  initLevel();
  world = new World(canvas);
}

function stopGameOver() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
  gameOverScreen();
}

function stopGame() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
  winScreen();
}

function gameOverScreen() {
  let gameOver = document.getElementById("game-over-screen");
  gameOver.classList.toggle("display-none");
  game_over_sound.play();
}

function winScreen() {
  let win = document.getElementById("win-screen");
  win.classList.toggle("display-none");
  win_sound.play();
}

// toDo
// game_sound = new Audio("audio/background-music.mp3");
game_over_sound = new Audio("audio/game-over-jingle.mp3");
win_sound = new Audio("audio/win.mp3");



window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.right = true;
  }
  if (e.keyCode == 37) {
    keyboard.left = true;
  }
  if (e.keyCode == 38) {
    keyboard.up = true;
  }
  if (e.keyCode == 40) {
    keyboard.down = true;
  }
  if (e.keyCode == 32) {
    keyboard.space = true;
  }
  if (e.keyCode == 68) {
    keyboard.d = true;
  }
  if (e.keyCode == 66) {
    keyboard.b = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.right = false;
  }
  if (e.keyCode == 37) {
    keyboard.left = false;
  }
  if (e.keyCode == 38) {
    keyboard.up = false;
  }
  if (e.keyCode == 40) {
    keyboard.down = false;
  }
  if (e.keyCode == 32) {
    keyboard.space = false;
  }
  if (e.keyCode == 68) {
    keyboard.d = false;
  }
  if (e.keyCode == 66) {
    keyboard.b = false;
  }
});
