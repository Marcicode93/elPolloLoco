class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new Statusbar();
  endbossBar = new Bossbar();
  coins = this.generateCoins(5);
  coinBar = new Coinbar();
  bottleBar = new Bottlebar();
  bottles = this.generateBottles(2);
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
      this.checkCharacterCollidingCoin();
      this.checkThrowObjects();
    }, 200);
  }

  generateCoins(count) {
    let coins = [];
    for (let i = 0; i < count; i++) {
      let x = 400 + Math.random() * 5000;
      let y = Math.random() + 160;
      coins.push(new Coin(x, y));
    }
    console.log(coins);

    return coins;
  }
  
    checkCoinCollection() {
      this.coins = this.coins.filter((coin) => {
        if (this.checkCharacterCollidingCoin(coin)) {
          this.coinBar.setPercentage(this.coinBar.percentage + 20);
          return false;
        }
        return true;
      });
    }
  
    checkCharacterCollidingCoin(coin) {
      console.log(coin);
      console.log(this.character);
  
      return (
        this.character.x + this.character.width > coin.x &&
        this.character.x < coin.x + coin.width &&
        this.character.y + this.character.height > coin.y &&
        this.character.y < coin.y + coin.height
      );
    }
  
  generateBottles(count) {
    let bottles = [];
    for (let i = 0; i < count; i++) {
      let x = 400 + Math.random() * 2000;
      let y = 360;
      bottles.push(new Bottle(x, y));
    }
    console.log(bottles);

    return bottles;
  }

  checkThrowObjects() {
    if (this.keyboard.d && this.bottleBar.percentage > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.bottleBar.setPercentage(this.bottleBar.percentage - 20);
    } else if (this.keyboard.d && this.bottleBar.percentage === 0) {
      return false;
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
            enemy.energy;
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
          endboss.hitBoss();
          this.endbossBar.setPercentage(this.level.endboss.energy);
          this.removeBottle(bottle);
          endboss.energy;
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

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.endbossBar);
    this.ctx.translate(this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.coinBar);
    this.ctx.translate(this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.bottleBar);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.bottles);
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
