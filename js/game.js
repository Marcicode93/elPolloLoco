let canvas;
let keyboard = new Keyboard();
game_sound = new Audio("audio/background-music.mp3");
game_over_sound = new Audio("audio/game-over-jingle.mp3");
win_sound = new Audio("audio/win.mp3");
endbossMusic = new Audio("audio/final-boss-music.mp3");
music = null;

function init() {
  canvas = document.getElementById("canvas");
}

function startGame() {
  gameStart = document.getElementById("start-screen");
  canvas = document.getElementById("canvas");
  canvas.classList.remove('display-none');
  let gameOver = document.getElementById("game-over-screen");
  let win = document.getElementById("win-screen");
  win.classList.add("display-none");
  gameOver.classList.add("display-none");
  gameStart.classList.add("display-none");
  initLevel();
  world = new World(canvas);
  switchMusic();
  world.endbossReached = false;
}

function muteMusic() {
  endbossMusic.pause();
  game_sound.pause();
}

function switchMusic() {
  muteMusic();
  if ((world.endbossReached == true)) {
    endbossMusic.play();
    endbossMusic.loop = true;
  } else {
    game_sound.play();
    game_sound.loop = true;
  }
}

function stopGameOver() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
  gameOverScreen();
  muteMusic();
}

function stopGame() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
  winScreen();
  muteMusic();
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

function reloadPage() {
  location.reload();
}

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
