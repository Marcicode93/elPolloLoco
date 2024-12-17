let canvas;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
  console.log("my character is", world.character);
}

// character.src = "../img_pollo_locco/img/2_character_pepe/2_walk/W-21.png";
// ctx.drawImage(character,20,20,50,150)
