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
  bottleBar = new Bottlebar();
  bottles = this.generateBottles(4);
  game_sound = new Audio("audio/background-music.mp3");
  game_over_sound = new Audio("audio/game-over-jingle.mp3");
  win_sound = new Audio("audio/win.mp3");
  endbossMusic = new Audio("audio/final-boss-music.mp3");
  throw_sound = new Audio("audio/bottle-pop.mp3");
  bottle_sound = new Audio("audio/bottle-pickup.mp3");
  noBottle_sound = new Audio("audio/no-bottle.mp3");
  coin_sound = new Audio("audio/coin-pickup.mp3");
  walking_char_sound = new Audio("audio/walk.mp3");
  jump_char_sound = new Audio("audio/jump.mp3");
  hurt_char_sound = new Audio("audio/hurt.mp3");
  dead_char_sound = new Audio("audio/dead.mp3");
  walking_chicken_sound = new Audio("audio/chicken.mp3");
  dead_chicken_sound = new Audio("audio/chicken dead sound.mp3");
  walking_small_sound = new Audio("audio/chicken.mp3");
  dead_small_sound = new Audio("audio/small chicken dead sound.mp3");
  hurt_boss_sound = new Audio("audio/boss-hit.mp3");
  dead_boss_sound = new Audio("audio/boss-dead.mp3");
  attack_boss_sound = new Audio("audio/boss-laugh.mp3");
  throwableObjects = [];
  bossBarDrawn = false;
  endbossDrawn = false;
  endbossReached = false;
  damageDone = false;
  lastThrowTime = 0;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Links the world instance to the character for reference.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Run all function ins the world and continously check for collisions
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCollisionsSmall();
      this.checkCollisionsEndboss();
      this.checkBottleCollisions();
      this.checkBottleCollisionsSmall();
      this.checkBottleCollisionsEndboss();
      this.checkCoinCollection();
      this.checkBottleCollection();
      this.checkThrowObjects();
      this.isJumpingOn();
      this.isJumpingOnSmall();
    }, 100);
  }

  /**
   * Checks for jumping collisions with regular enemies and handles damage or removal.
   */
  isJumpingOn() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          if (this.character.isAboveGround() && this.character.speedY < 0) {
            enemy.energy = enemy.energy - 1;
            enemy.isDead();
            this.removeEnemy(enemy);
          } else {
            if (this.character.isHurt()) {
              this.character.hit();
            }
          }
        }
      });
    }, 50);
  }

  /**
   * Checks for jumping collisions with small enemies and handles damage or removal.
   */
  isJumpingOnSmall() {
    setInterval(() => {
      this.level.enemies_small.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          if (this.character.isAboveGround() && this.character.speedY < 0) {
            enemy.energy = enemy.energy - 1;
            enemy.isDead();
            this.removeEnemySmall(enemy);
          } else {
            if (this.character.isHurt()) {
              this.character.hit();
            }
          }
        }
      });
    }, 50);
  }

  /**
   * Removes a regular enemy from the level's enemy array.
   * @param {Object} enemy - The enemy object to remove.
   */
  removeEnemy(enemy) {
    const index = this.level.enemies.indexOf(enemy);
    if (index > -1) {
      this.level.enemies.splice(index, 1);
    }
  }

  /**
   * Removes a small enemy from the level's small enemy array.
   * @param {Object} enemy - The small enemy object to remove.
   */
  removeEnemySmall(enemy) {
    const index = this.level.enemies_small.indexOf(enemy);
    if (index > -1) {
      this.level.enemies_small.splice(index, 1);
    }
  }

  /**
   * Generates a specified number of coins with random positions.
   * @param {number} count - The number of coins to generate.
   * @returns {Coin[]} Array of generated Coin objects.
   */
  generateCoins(count) {
    return this.createCoinArray(count);
  }

  /**
   * Creates an array of coins by generating positions and instantiating Coin objects.
   * @param {number} count - The number of coins to create.
   * @returns {Coin[]} An array containing the generated Coin objects.
   */
  createCoinArray(count) {
    let coins = [];
    for (let i = 0; i < count; i++) {
      let { x, y } = this.generateCoinPosition(coins);
      coins.push(new Coin(x, y));
    }
    return coins;
  }

  /**
   * Generates a position for a new coin, ensuring a minimum distance to the last coin.
   * @param {Coin[]} coins - The array of existing coins to check against.
   * @returns {{x: number, y: number}} An object containing the x and y coordinates for the new coin.
   */
  generateCoinPosition(coins) {
    const minDistance = 600;
    let x = 600 + Math.random() * 4000;
    let y = 160;

    if (coins.length > 0) {
      let lastCoin = coins[coins.length - 1];
      while (Math.abs(lastCoin.x - x) < minDistance) {
        x = 600 + Math.random() * 4000;
      }
    }
    return { x, y };
  }

  /**
   * Checks for coin collection by the character and updates the coin bar.
   */
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

  /**
   * Checks if the character is colliding with a coin.
   * @param {Coin} coin - The coin object to check collision with.
   * @returns {boolean} True if colliding, false otherwise.
   */
  checkCharacterCollidingCoin(coin) {
    return (
      this.character.x + this.character.width > coin.x &&
      this.character.x < coin.x + coin.width &&
      this.character.y + this.character.height > coin.y &&
      this.character.y < coin.y + coin.height
    );
  }

  /**
   * Checks for bottle collection by the character and updates the bottle bar.
   */
  checkBottleCollection() {
    this.bottles = this.bottles.filter((bottle) => {
      if (this.keyboard.b && this.checkCharacterCollidingBottle(bottle)) {
        this.bottleBar.setPercentage((this.bottleBar.percentage = 100));
        this.bottle_sound.play();
        return false;
      }
      return true;
    });
  }

  /**
   * Checks if the character is colliding with a bottle.
   * @param {Bottle} bottle - The bottle object to check collision with.
   * @returns {boolean} True if colliding and 'b' key pressed, false otherwise.
   */
  checkCharacterCollidingBottle(bottle) {
    return (
      this.character.x + this.character.width > bottle.x &&
      this.character.x < bottle.x + bottle.width &&
      this.character.y + this.character.height > bottle.y &&
      this.character.y < bottle.y + bottle.height
    );
  }

  /**
   * Generates a specified number of bottles with spaced positions.
   * @param {number} count - The number of bottles to generate.
   * @returns {Bottle[]} Array of generated Bottle objects.
   */
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

  /**
   * Handles throwing of bottles by the character if available.
   */
  // Neue Methoden
  isThrowAllowed() {
    let currentTime = Date.now();
    return (
      this.keyboard.d &&
      this.bottleBar.percentage > 0 &&
      currentTime - this.lastThrowTime >= 500
    );
  }

  /**
   * Throws a bottle by creating a new ThrowableObject and updating game state.
   * Adds the bottle to the throwableObjects array, reduces the bottle bar percentage,
   * and updates the last throw time.
   */
  throwBottle() {
    let bottle = new ThrowableObject(
      this.character.x + 100,
      this.character.y + 100,
      this.character
    );
    this.throwableObjects.push(bottle);
    this.bottleBar.setPercentage(this.bottleBar.percentage - 20);
    this.lastThrowTime = Date.now();
  }

  /**
   * Plays a sound when the player attempts to throw a bottle but none are available.
   * Checks if the throw key is pressed and the bottle bar is empty before playing the sound.
   */
  playNoBottleSound() {
    if (this.keyboard.d && this.bottleBar.percentage === 0) {
      this.noBottle_sound.play();
    }
  }

  /**
   * Checks if a bottle can be thrown and executes the throw or plays a sound if not possible.
   * Uses isThrowAllowed() to determine if conditions are met, then either throws a bottle
   * or plays the no-bottle sound.
   */
  checkThrowObjects() {
    if (this.isThrowAllowed()) {
      this.throwBottle();
    } else {
      this.playNoBottleSound();
    }
  }

  /**
   * Checks collisions between character and regular enemies.
   */
  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy) && !enemy.damageDone) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
          enemy.damageDone = true;

          setTimeout(() => {
            enemy.damageDone = false;
          }, 1000);
        }
      });
    }, 100);
  }

  /**
   * Checks collisions between character and small enemies.
   */
  checkCollisionsSmall() {
    setInterval(() => {
      this.level.enemies_small.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      });
    }, 100);
  }

  /**
   * Checks collisions between character and the endboss.
   */
  checkCollisionsEndboss() {
    setInterval(() => {
      if (this.character.isColliding(this.level.endboss)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    }, 100);
  }

  /**
   * Checks collisions between thrown bottles and regular enemies.
   */
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

  /**
   * Checks collisions between thrown bottles and small enemies.
   */
  checkBottleCollisionsSmall() {
    setInterval(() => {
      this.level.enemies_small.forEach((enemy) => {
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

  /**
   * Checks collisions between thrown bottles and the endboss.
   */
  checkBottleCollisionsEndboss() {
    setInterval(() => {
      this.throwableObjects.forEach((bottle, index) => {
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

  /**
   * Removes a thrown bottle from the throwableObjects array.
   * @param {ThrowableObject} bottle - The bottle object to remove.
   */
  removeBottle(bottle) {
    const index = this.throwableObjects.indexOf(bottle);
    if (index > -1) {
      this.throwableObjects.splice(index, 1);
    }
  }

  /**
   * draw the World and all elements in it (like character, endboss, statusbars)
   */
  draw() {
    this.clearCanvas();
    this.drawBackgroundObjects();
    this.drawStatusbars();
    this.drawCollectables();
    this.addToMap(this.character);
    this.drawBossBar();
    this.drawEnemies();
    this.endBossDrawn();
    this.drawThrowableObjects();

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Clears the entire canvas for redrawing.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws background objects and clouds with camera translation.
   */
  drawBackgroundObjects() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.addObjectsToMap(this.level.clouds);
  }

  /**
   * Draws the status bars (health, coins, bottles) without camera translation.
   */
  drawStatusbars() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.coinBar);
    this.ctx.translate(this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.bottleBar);
    this.ctx.translate(this.camera_x, 0);
  }

  /**
   * Draws the endboss health bar when the character reaches a certain point.
   */
  drawBossBar() {
    if (this.character.x > 3500 || this.bossBarDrawn) {
      this.bossBarDrawn = true;
      this.ctx.translate(-this.camera_x, 0);
      this.addToMap(this.endbossBar);
      this.ctx.translate(this.camera_x, 0);
    }
  }

  /**
   * Draws all enemies (regular and small) in the world.
   */
  drawEnemies() {
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.enemies_small);
  }

  /**
   * Draws the endboss when the character reaches a certain point and switches music.
   */
  endBossDrawn() {
    if (this.character.x > 3500 || this.endbossDrawn) {
      this.endbossDrawn = true;
      if (this.endbossReached == false) {
        this.endbossReached = true;
        switchMusic();
      }
      this.addToMap(this.level.endboss);
    }
  }

  /**
   * Draws all collectable items (coins and bottles) in the world.
   */
  drawCollectables() {
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.bottles);
  }

  /**
   * Draws all throwable objects with camera translation.
   */
  drawThrowableObjects() {
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Adds multiple objects to the map for rendering.
   * @param {Object[]} objects - Array of objects to add to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single movable object to the map, handling direction flipping if needed.
   * @param {MovableObject} mo - The movable object to add to the map.
   */
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

  /**
   * Turn character picture to the other side, when walking left.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the flipped image back to its original state.
   * @param {MovableObject} mo - The movable object to restore.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
