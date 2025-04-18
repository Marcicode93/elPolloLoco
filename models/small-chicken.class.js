class Smallchicken extends MovableObject {
  y = 380;
  height = 60;
  width = 60;
  energy = 1;
  images_walking = [
    "./img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  images_dead = [
    "./img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png",
  ];

  constructor() {
    super().loadImage(
      "./img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png"
    );
    this.loadImages(this.images_walking);
    this.loadImages(this.images_dead);
    this.x = 400 + Math.random() * 3500;
    (this.speed = 2 + Math.random() * 0), 25;
    this.animate();
  }

  /**
   * animates small chicken object with the method move left and dies, if jumped on.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.images_walking);
    }, 100);

    let deathAnimation = setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.images_dead);
        world.dead_small_sound.play();
        clearInterval(deathAnimation);
      }
    }, 100);
  }
}
