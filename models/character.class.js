class Character extends MovableObject {
  height = 400;
  width = 180;
  y = 40;
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
        let i = this.currentImage % this.images_walking.length;
        let path = this.images_walking[i];
        this.img = this.ImageCache[path];
        this.currentImage++;
      }
    }, 100);
  }

  moveRight() {}

  jump() {}
}
