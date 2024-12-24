class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new Statusbar();
  // coinBar = new Coinbar();
  throwableObjects = [];

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCollisionsEndboss();
      this.checkBottleCollisions();
      this.checkBottleCollisionsEndboss();
      this.checkThrowObjects();
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.d) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
    }
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      });
    }, 100);
  }

  checkCollisionsEndboss() {
    setInterval(() => {
        if (this.character.isColliding(this.level.endboss)) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
    }, 100);
  }

  checkBottleCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        this.throwableObjects.forEach((bottle) => {
          if (bottle.isColliding(enemy)) {
            enemy.hit();
            this.removeBottle(bottle);
            console.log("enemyyyyy hiiiit");
            enemy.energy;
            console.log(enemy.energy);
          }
        });
      });
    }, 100);
  }

  checkBottleCollisionsEndboss() {
    setInterval(() => {
  
        this.throwableObjects.forEach((bottle) => {
          if (bottle.isColliding(endboss)) {
            endboss.isHit();
            endboss.hit();
            this.removeBottle(bottle);
            console.log("boooooss hiiiit");
            endboss.energy;
            console.log(endboss.energy);
          }
        });
    }, 100);
  }

  removeBottle(bottle) {
    const index = this.throwableObjects.indexOf(bottle);
    if (index > -1) {
      this.throwableObjects.splice(index, 1);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);

    // this.ctx.translate(-this.camera_x, 0);
    // this.addToMap(this.coinBar);
    // this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.level.endboss);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
