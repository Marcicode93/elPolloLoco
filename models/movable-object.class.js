class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  isMoving = false;

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
    return this.y < 160;
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

  hit() {
    if (
      this.world.character.isAboveGround() &&
      this.world.character.speedY < 0
    ) {
      this.energy;
    } else {
      this.energy -= 2;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
    }
  }

  hitBoss() {
    this.energy -= 10;
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

  jump() {
    this.speedY = 30;
    this.world.jump_char_sound.play();
  }
}
