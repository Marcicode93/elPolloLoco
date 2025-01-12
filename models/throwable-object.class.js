class ThrowableObject extends MovableObject {
  constructor(x, y, character) {
    super();
    this.x = x;
    this.y = y;
    this.character = character;
    this.height = 80;
    this.width = 60;
    this.bottleThrown = false;
    super.loadImages(this.images_throwing);
    this.throw();
  }

  images_throwing = [
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /**
   * This function allows the character to throw bottles at enemies.
   */

  throw() {
    this.bottleThrown = true;
    this.speedY = 20;
    this.speedX = this.character.otherDirection ? -20 : 20;
    this.playAnimation(this.images_throwing);
    world.throw_sound.play();
    this.applyGravity();

    const intervalId = setInterval(() => {
      if (this.bottleThrown) {
        this.x += this.speedX;
      }

      if (this.y > 400 || !this.bottleThrown) {
        clearInterval(intervalId);
        this.bottleThrown = false;
      }
    }, 25);
  }
}
