let canvas;
let keyboard = new Keyboard();
let isMuted = false;
music = null;

function init() {
  canvas = document.getElementById("canvas");
}

function startGame() {
  canvas = document.getElementById("canvas");
  canvas.classList.remove("display-none");
  let soundToggle = document.getElementById("sound-toggle");
  soundToggle.classList.remove("display-none");
  handleGameOver();
  handleGameStart();
  handleGameWin();

  initLevel();
  world = new World(canvas);
  checkMusic();
  world.endbossReached = false;
}

function handleGameOver() {
  let gameOver = document.getElementById("game-over-screen");
  gameOver.classList.add("display-none");
}

function handleGameStart() {
  gameStart = document.getElementById("start-screen");
  gameStart.classList.add("display-none");
}

function handleGameWin() {
  let win = document.getElementById("win-screen");
  win.classList.add("display-none");
}

function checkMusic() {
  if (isMuted) {
    let audioElements = getAudioElements();
    audioElements.forEach((audio) => {
      if (audio) {
        audio.muted = isMuted;
      }
    });
  } else {
    switchMusic();
  }
}

function getAudioElements() {
  if (!world) return [];
  return [
    world.game_over_sound,
    world.game_sound,
    world.win_sound,
    world.endbossMusic,
    world.throw_sound,
    world.bottle_sound,
    world.noBottle_sound,
    world.coin_sound,
    world.walking_char_sound,
    world.jump_char_sound,
    world.hurt_char_sound,
    world.dead_char_sound,
    world.walking_chicken_sound,
    world.dead_chicken_sound,
    world.walking_small_sound,
    world.dead_small_sound,
    world.hurt_boss_sound,
    world.dead_boss_sound,
    world.attack_boss_sound,
  ];
}

function updateSoundToggles(isMuted) {
  let soundToggle1 = document.getElementById("soundtoggle1");
  let soundToggle2 = document.getElementById("soundtoggle2");
  soundToggle1.classList.toggle("display-none", isMuted);
  soundToggle2.classList.toggle("display-none", !isMuted);
}

function toggleSound() {
  isMuted = !isMuted;

  let audioElements = getAudioElements();
  audioElements.forEach((audio) => {
    if (audio) {
      audio.muted = isMuted;
    }
  });

  updateSoundToggles(isMuted);
}

function muteMusic() {
  world.endbossMusic.pause();
  world.game_sound.pause();
}

function switchMusic() {
  muteMusic();
  if (world.endbossReached == true) {
    world.endbossMusic.currentTime = 0;
    world.endbossMusic.play();
    world.endbossMusic.loop = true;
  } else {
    world.game_sound.currentTime = 0;
    world.game_sound.play();
    world.game_sound.loop = true;
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
  world.game_over_sound.play();
}

function winScreen() {
  let win = document.getElementById("win-screen");
  win.classList.toggle("display-none");
  world.win_sound.play();
}

function reloadPage() {
  location.reload();
}

function checkDevice() {
  const isMobile =
    window.innerWidth <= 500 && /Mobi|Android/i.test(navigator.userAgent);

  if (isMobile) {
    document.getElementById("orientation-message").style.display = "flex";
  } else {
    document.getElementById("orientation-message").style.display = "none";
  }
}

window.onload = checkDevice;
window.onresize = checkDevice;

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
