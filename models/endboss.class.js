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
  hurt_sound = new Audio("audio/boss-hit.mp3");
  dead_sound = new Audio("audio/boss-dead.mp3");
  attack_sound = new Audio("audio/boss-laugh.mp3");

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

  moveWithSpeedAndHeight(targetX, targetY, duration, callback) {
    const startTime = Date.now();
    const startX = this.x;
    const startY = this.y;
    const distances = {
      x: targetX - startX,
      y: targetY - startY,
    };

    this.startMovement(
      startTime,
      duration,
      distances,
      targetX,
      targetY,
      callback
    );
  }

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

  randomizeAttack() {
    if (Math.random() < 0.5) {
      this.performAttack();
    }
  }

  animate() {
    this.setupDeathCheck();
    this.setupHurtAnimation();
  }

  setupDeathCheck() {
    setInterval(() => {
      if (this.isDead()) {
        this.handleDeath();
      } else {
        this.handleMovementAndAnimation();
      }
    }, 200);
  }

  handleDeath() {
    this.stopMovement();
    this.playAnimation(this.images_dead);

    this.dead_sound.play();
    this.x += this.speed + 50;

    setTimeout(() => {
      stopGame();
    }, 3000);
  }

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

  setupHurtAnimation() {
    setInterval(() => {
      if (this.isCurrentlyHurt) {
        this.playAnimation(this.images_hurt);
        this.hurt_sound.play();
      }
    }, 200);
  }

  isHit() {
    this.isCurrentlyHurt = true;
    setTimeout(() => {
      this.isCurrentlyHurt = false;
    }, 1000);
  }

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

  stopMovement() {
    this.moveRandom = () => {};
  }
}
