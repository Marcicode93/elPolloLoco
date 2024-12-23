class Chicken extends MovableObject {
  y = 330;
  height = 100;
  width = 100;
  energy = 1;
  images_walking = [
    "./img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  images_dead = [
    "./img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ];

  walking_sound = new Audio("audio/chicken.mp3");

  constructor(character) {
    super().loadImage(
      "./img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.character = character;
    this.loadImages(this.images_walking);
    this.loadImages(this.images_dead);
    this.x = 300 + Math.random() * 500;
    (this.speed = 0.15 + Math.random() * 0), 25;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
      // this.walking_sound.play();
    }, 1000 / 60);

    setInterval(() => {
      if (this.isJumpingOn(this)) {
        this.hit();
        if (chicken.isDead()) {
          console.log("Chicken ist tot!");
        }

        character.speedY = 15;
      }
    }, 100);

    setInterval(() => {
      this.playAnimation(this.images_walking);
    }, 100);
  }
}
