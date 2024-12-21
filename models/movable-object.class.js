class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    }
    return this.y < 40;
  }

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

  isJumpingOn(mo) {
    return (
      this.speedY < 0 && // Charakter fällt nach unten
      this.y + this.height <= mo.y + 20 && // Charakter ist oberhalb des Objekts
      this.x + this.width > mo.x && // Horizontale Überlappung (rechts)
      this.x < mo.x + mo.width // Horizontale Überlappung (links)
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;

    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.ImageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRandom() {
    if (this.x > 2200) {
      this.x -= this.speed + 1;
    }
    this.moveRight();
  }

  jump() {
    this.speedY = 30;
    this.otherDirection = true;
    this.jump_sound.play();
  }
}
