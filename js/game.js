let canvas;
let keyboard = new Keyboard();
let isMuted = false;
music = null;

function init() {
  canvas = document.getElementById("canvas");
}

/**
 * this function starts the game removes the start / win / game over screen so that the player sees the canvas.
 */

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

/**
 * handle game state.
 */

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

/**
 * this function allows to mute the music by clicking on the sound toggle button after starting the game.
 */

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

/**
 * this generates an array with all the audio elements, as soon as the world is created.
 * 
 */

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

/**
 * this updates the displayed image of the sound toggle 
 */

function updateSoundToggles(isMuted) {
  let soundToggle1 = document.getElementById("soundtoggle1");
  let soundToggle2 = document.getElementById("soundtoggle2");
  soundToggle1.classList.toggle("display-none", isMuted);
  soundToggle2.classList.toggle("display-none", !isMuted);
}

/**
 * this function toggles the sound on or off.
 */

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

/**
 * this function mutes the other music playing, when e.g. the endboss is reached. Main music stops then and endboss music is being played.
 */

function muteMusic() {
  world.endbossMusic.pause();
  world.game_sound.pause();
}

/**
 * this function is used to switch the music to the needed music (e.g. when endboss is reached)
 */

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

/**
 * this function shows the game over screen and ends the game, when the player dies.
 */

function stopGameOver() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
  gameOverScreen();
  muteMusic();
}

/**
 * this function ends the game, when the player wins.
 */

function stopGame() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
  winScreen();
  muteMusic();
}

/**
 * display win or game over screen.
 */

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

/**
 * this function checks the used device and in case the user wants to play the game in vertical mode on their smartphone, 
 * a message is displayed to tilt the phone
 */

function checkDevice() {
  const isMobile =
    window.innerWidth <= 600 && /Mobi|Android/i.test(navigator.userAgent);

  if (isMobile) {
    document.getElementById("orientation-message").style.display = "flex";
  } else {
    document.getElementById("orientation-message").style.display = "none";
  }
}

window.onload = checkDevice;
window.onresize = checkDevice;

/**
 * registers the clicked buttons on the keyboard to move the character in the world.
 */

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
