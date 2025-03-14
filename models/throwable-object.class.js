class ThrowableObject extends MovableObject {
  constructor(x, y, character) {
    super();
    this.x = x;
    this.y = y;
    this.character = character;
    this.height = 80;
    this.width = 60;
    this.bottleThrown = false;
    this.animationFrameCount = 0;
    this.currentImage = 0;
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
    world.throw_sound.play();
    this.playAnimation(this.images_throwing);
    this.applyGravity();

    const intervalId = setInterval(() => {
      if (this.bottleThrown) {
        this.x += this.speedX;
      }
      this.checkAnimationFrameCount();
      this.checkBottleDirection(intervalId);
    }, 25);
  }

  /**
   * Updates the animation frame counter and triggers the animation every 5 frames.
   * This method increments the animationFrameCount and plays the throwing animation
   * when the counter is divisible by 5, creating a controlled animation speed.
   */
  checkAnimationFrameCount() {
    this.animationFrameCount++;
    if (this.animationFrameCount % 5 === 0) {
      this.playAnimation(this.images_throwing);
    }
  }

  /**
   * Checks the bottle's vertical position and stops its movement if it hits the ground.
   * If the bottle's y-position exceeds 400 or it is no longer thrown, this method
   * clears the interval and resets the thrown state.
   * @param {number} intervalId - The ID of the interval to be cleared.
   */
  checkBottleDirection(intervalId) {
    if (this.y > 400 || !this.bottleThrown) {
      clearInterval(intervalId);
      this.bottleThrown = false;
    }
  }
}
