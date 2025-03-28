class Endboss extends MovableObject {
  height = 400;
  width = 200;
  y = 65;
  energy = 100;
  attackSpeed = 20;
  attackCooldown = false;

  images_alert = [
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  images_walking = [
    "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  images_attack = [
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  images_hurt = [
    "img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  images_dead = [
    "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  hadFirstContact = true;
  isCurrentlyHurt = false;

  constructor() {
    super().loadImage(this.images_alert[0]);
    this.loadImages(this.images_alert);
    this.loadImages(this.images_walking);
    this.loadImages(this.images_attack);
    this.loadImages(this.images_hurt);
    this.loadImages(this.images_dead);
    this.x = 4800;
    this.animate();
    this.randomizeAttack();
    this.performAttack();
  }

  /**
   * performs an attack with random x coordinates (distance / reach)
   */
  performAttack() {
    if (this.isDead() || !this.attackCooldown) {
      this.attackCooldown = true;
      const originalX = this.x;
      const originalY = this.y;
      const forwardDistance = Math.random() * 400;
      const forwardDuration = 250;

      this.executeAttack(
        originalX,
        originalY,
        forwardDistance,
        forwardDuration
      );
    }
  }

  /**
   * executes attack, normal attack or fly attack with it's own specifics.
   */
  executeAttack(originalX, originalY, forwardDistance, forwardDuration) {
    if (Math.random() < 0.5) {
      this.flyAndAttack(originalX, originalY, forwardDistance, forwardDuration);
    }

    this.moveWithSpeed(this.x - forwardDistance, forwardDuration, () => {
      this.moveWithSpeed(originalX, forwardDuration, () => {
        setTimeout(() => {
          this.attackCooldown = false;
        }, 1000);
      });
    });
  }

  /**
   * fly attack by the endboss to have more attack patterns.
   */
  flyAndAttack(originalX, originalY, forwardDistance, forwardDuration) {
    const forwardX = originalX - forwardDistance;
    const flyHeight = originalY - 150;

    this.moveWithSpeedAndHeight(forwardX, flyHeight, forwardDuration, () => {
      this.moveWithSpeedAndHeight(originalX, originalY, forwardDuration, () => {
        setTimeout(() => {
          this.attackCooldown = false;
        }, 1000);
      });
    });
  }
/**
 * Captures the starting data for a movement, including time and position.
 * @returns {{startTime: number, startX: number, startY: number}} An object with the start time and coordinates.
 */
getMovementStartData() {
  return {
    startTime: Date.now(),
    startX: this.x,
    startY: this.y,
  };
}

/**
 * Calculates the distances to move from start to target coordinates.
 * @param {number} targetX - The target x-coordinate.
 * @param {number} targetY - The target y-coordinate.
 * @param {number} startX - The starting x-coordinate.
 * @param {number} startY - The starting y-coordinate.
 * @returns {{x: number, y: number}} An object with the x and y distances.
 */
calculateDistances(targetX, targetY, startX, startY) {
  return {
    x: targetX - startX,
    y: targetY - startY,
  };
}

/**
 * Initiates movement to a target position over a specified duration with a callback.
 * @param {number} targetX - The target x-coordinate to move to.
 * @param {number} targetY - The target y-coordinate to move to.
 * @param {number} duration - The duration of the movement in milliseconds.
 * @param {Function} callback - The function to call when the movement is complete.
 */
moveWithSpeedAndHeight(targetX, targetY, duration, callback) {
  const { startTime, startX, startY } = this.getMovementStartData();
  const distances = this.calculateDistances(targetX, targetY, startX, startY);
  
  this.startMovement(
    startTime,
    duration,
    distances,
    targetX,
    targetY,
    callback
  );
}

  /**
   * Starts the movement animation to a target position.
   * @param {number} startTime - The starting timestamp.
   * @param {number} duration - The duration of the movement in milliseconds.
   * @param {Object} distances - The distances to move in x and y directions.
   * @param {number} targetX - The target X position.
   * @param {number} targetY - The target Y position.
   * @param {Function} callback - The callback function to execute after movement.
   */
  startMovement(startTime, duration, distances, targetX, targetY, callback) {
    const moveInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;

      if (elapsedTime >= duration) {
        clearInterval(moveInterval);
        this.x = targetX;
        this.y = targetY;
        if (callback) callback();
      } else {
        this.x += (distances.x / duration) * 20;
        this.y += (distances.y / duration) * 20;
      }
    }, 20);
  }

  /**
   * Moves the endboss to a target X position with specified speed.
   * @param {number} targetX - The target X position.
   * @param {number} duration - The duration of the movement in milliseconds.
   * @param {Function} callback - The callback function to execute after movement.
   */
  moveWithSpeed(targetX, duration, callback) {
    const startTime = Date.now();
    const startX = this.x;
    const distance = targetX - startX;

    const moveInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime >= duration) {
        this.x = targetX;
        clearInterval(moveInterval);
        if (callback) callback();
      } else {
        this.x = startX + (distance * elapsedTime) / duration;
      }
    }, 20);
  }

  /**
   * randomizes, which attack is going to be played.
   */
  randomizeAttack() {
    if (Math.random() < 0.5) {
      this.performAttack();
    }
  }

  /**
   * is used to animate the endboss.
   */
  animate() {
    this.setupDeathCheck();
    this.setupHurtAnimation();
  }

  /**
   * checks if endboss is dead.
   */
  setupDeathCheck() {
    setInterval(() => {
      if (this.isDead()) {
        this.handleDeath();
      } else {
        this.handleMovementAndAnimation();
      }
    }, 200);
  }

  /**
   * handles death of endboss.
   */
  handleDeath() {
    this.stopMovement();
    this.playAnimation(this.images_dead);

    world.dead_boss_sound.play();
    this.x += this.speed + 50;

    setTimeout(() => {
      stopGame();
    }, 3000);
  }

  /**
   * allows endboss to move through the world.
   */
  handleMovementAndAnimation() {
    this.moveRandom();
    this.randomizeAnimation();

    if (this.isMoving) {
      this.playAnimation(this.images_walking);
    } else if (this.currentAnimation === "alert") {
      this.playAnimation(this.images_alert);
    } else if (this.currentAnimation === "attack") {
      this.playAnimation(this.images_attack);
    }
  }

  /**
   * endboss hurt animation.
   */
  setupHurtAnimation() {
    setInterval(() => {
      if (this.isCurrentlyHurt) {
        this.playAnimation(this.images_hurt);
        world.hurt_boss_sound.play();
      }
    }, 200);
  }

  /**
   * Marks the endboss as hurt and triggers hurt animation for 1 second.
   */
  isHit() {
    this.isCurrentlyHurt = true;
    setTimeout(() => {
      this.isCurrentlyHurt = false;
    }, 1000);
  }

  /**
   * randomizes the animation that is being played to make the endboss feel more alive.
   */
  randomizeAnimation() {
    const random = Math.random();

    if (random < 0.33) {
      this.currentAnimation = "walking";
    } else if (random < 0.66) {
      this.currentAnimation = "alert";
    } else {
      this.currentAnimation = "attack";
      this.randomizeAttack();
    }
  }

  /**
   * Stops the endboss movement by overriding the moveRandom method.
   */
  stopMovement() {
    this.moveRandom = () => {};
  }
}
