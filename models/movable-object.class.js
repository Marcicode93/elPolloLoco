class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  isMoving = false;

  /**
   * applies gravity forces to the world dragging elements down, when in the air.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }, 1000 / 25);
  }

  /**
   * checks, if element is in the air.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    }
    return this.y < 160;
  }

  /**
   * checks, if two elements in the world are colliding with each other. Hitbox has been adjusted to make it more precise.
   */
  isColliding(mo) {
    const hitboxX = this.x;
    const hitboxY = this.y + 150;
    const hitboxWidth = this.width - 30;
    const hitboxHeight = this.height - 150;

    return (
      hitboxX + hitboxWidth > mo.x &&
      hitboxY + hitboxHeight > mo.y &&
      hitboxX < mo.x + mo.width &&
      hitboxY < mo.y + mo.height
    );
  }

  /**
   * applies damage to a character or enemy.
   */
  hit() {
    if (this.isInCooldown()) return;

    if (this.isAirHit()) return;

    this.applyDamage(4);
    this.updateLastHit();
  }

  /**
   * sets cooldown for damage reception.
   */
  isInCooldown() {
    const now = new Date().getTime();
    return this.lastHit && now - this.lastHit < 60; // 1 Sekunde Cooldown
  }

  /**
   * Checks if the hit comes from an airborne character moving downward.
   * @returns {boolean} True if hit from air, false otherwise.
   */
  isAirHit() {
    return (
      this.world.character.isAboveGround() && this.world.character.speedY < 0
    );
  }

  /**
   * Reduces the object's energy by a specified amount.
   * @param {number} amount - The amount of damage to apply.
   */
  applyDamage(amount) {
    this.energy -= amount;
    if (this.energy < 0) this.energy = 0;
  }

  /**
   * Updates the timestamp of the last hit received.
   */
  updateLastHit() {
    this.lastHit = new Date().getTime();
  }

  /**
   * applies damage to the endboss; endboss has its own hit function to make the game experience better and not have the endboss die immediately.
   */
  hitBoss() {
    this.energy -= 11;
    if (this.energy < 20) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * checks, if hurt.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;

    return timepassed < 1;
  }

  /**
   * returns that status is dead.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * function to play different images in an array to act like an animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.ImageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right by its speed value.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by its speed value.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Moves the object randomly within a specified range, setting movement state.
   */
  moveRandom() {
    const minX = 4000;
    const maxX = 4800;
    const direction = Math.random() < 0.5 ? -1 : 1;

    const nextX = this.x + direction * (this.speed + Math.random() * 50);
    if (nextX >= minX && nextX <= maxX) {
      this.x = nextX;
      this.isMoving = true;
    } else {
      this.isMoving = false;
    }
  }

  /**
   * Makes the object jump by setting an upward speed and playing jump sound.
   */
  jump() {
    this.speedY = 30;
    this.world.jump_char_sound.play();
  }
}
