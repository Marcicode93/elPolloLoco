class Character extends MovableObject {
  height = 400;
  width = 180;
  y = 40;
  speed = 10;
  images_walking = [
    "img_pollo_locco/img/2_character_pepe/2_walk/W-21.png",
    "img_pollo_locco/img/2_character_pepe/2_walk/W-22.png",
    "img_pollo_locco/img/2_character_pepe/2_walk/W-23.png",
    "img_pollo_locco/img/2_character_pepe/2_walk/W-24.png",
    "img_pollo_locco/img/2_character_pepe/2_walk/W-25.png",
    "img_pollo_locco/img/2_character_pepe/2_walk/W-26.png",
  ];
  world;
  currentImage = 0;

  constructor() {
    super().loadImage(
      "../img_pollo_locco/img/2_character_pepe/2_walk/W-21.png"
    );
    this.loadImages(this.images_walking);
    this.animate();
  }
  animate() {
    setInterval(() => {
      if (this.world.keyboard.right) {
        this.x += this.speed;
        this.otherDirection=false;
      }
      if (this.world.keyboard.left) {
        this.x -= this.speed;
        this.otherDirection=true;
      }
      // this.world.camera_x=-this.x;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.right || this.world.keyboard.left) {
        this.x += this.speed;
        let i = this.currentImage % this.images_walking.length;
        let path = this.images_walking[i];
        this.img = this.ImageCache[path];
        this.currentImage++;
      }
    }, 50);
  }

  moveRight() {}

  jump() {}
}
