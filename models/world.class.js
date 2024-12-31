class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new Statusbar();
  endbossBar = new Bossbar();
  coins = this.generateCoins(10);
  coinBar = new Coinbar();
  coin_sound = new Audio("audio/coin-pickup.mp3");
  bottleBar = new Bottlebar();
  bottles = this.generateBottles(4);
  bottle_sound = new Audio("audio/bottle-pickup.mp3");
  noBottle_sound = new Audio("audio/no-bottle.mp3");
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
      this.checkCoinCollection();
      this.checkBottleCollection();
      this.checkThrowObjects();
    }, 200);
  }

  generateCoins(count) {
    let coins = [];
    for (let i = 0; i < count; i++) {
      let x = 600 + Math.random() * 3000;
      let y = Math.random() + 160;
      coins.push(new Coin(x, y));
    }
    console.log(coins);

    return coins;
  }

  checkCoinCollection() {
    this.coins = this.coins.filter((coin) => {
      if (this.checkCharacterCollidingCoin(coin)) {
        this.coinBar.setPercentage(this.coinBar.percentage + 10);
        this.coin_sound.play();
        return false;
      }
      return true;
    });
  }

  checkCharacterCollidingCoin(coin) {
    return (
      this.character.x + this.character.width > coin.x &&
      this.character.x < coin.x + coin.width &&
      this.character.y + this.character.height > coin.y &&
      this.character.y < coin.y + coin.height
    );
  }

  checkBottleCollection() {
    this.bottles = this.bottles.filter((bottle) => {
      if (this.checkCharacterCollidingBottle(bottle)) {
        this.bottleBar.setPercentage((this.bottleBar.percentage = 100));
        this.bottle_sound.play();
        return false;
      }
      return true;
    });
  }

  checkCharacterCollidingBottle(bottle) {
    return (
      this.character.x + this.character.width > bottle.x &&
      this.character.x < bottle.x + bottle.width &&
      this.character.y + this.character.height > bottle.y &&
      this.character.y < bottle.y + bottle.height
    );
  }

  generateBottles(count) {
    let bottles = [];
    let startX = 3400;
    let endX = 4600;
    let interval = (endX - startX) / count;

    for (let i = 0; i < count; i++) {
      let x = startX + i * interval + Math.random() * (interval * 0.5);
      let y = 360;
      bottles.push(new Bottle(x, y));
    }

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
      this.noBottle_sound.play();
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
