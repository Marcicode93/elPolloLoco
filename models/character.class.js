class Character extends MovableObject {
  height = 300;
  width = 140;
  y = 160;
  speed = 10;
  energy = 100;
  isNotMoving = false;
  idleCount = 0;
  sleepingCount = 360;
  invincible = false;

  images_walking = [
    "img_pollo_locco/img/2_character_pepe/2_walk/W-21.png",
    "img_pollo_locco/img/2_character_pepe/2_walk/W-22.png",
    "img_pollo_locco/img/2_character_pepe/2_walk/W-23.png",
    "img_pollo_locco/img/2_character_pepe/2_walk/W-24.png",
    "img_pollo_locco/img/2_character_pepe/2_walk/W-25.png",
    "img_pollo_locco/img/2_character_pepe/2_walk/W-26.png",
  ];

  images_jumping = [
    "img_pollo_locco/img/2_character_pepe/3_jump/J-31.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-32.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-33.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-34.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-35.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-36.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-37.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-38.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-39.png",
  ];

  images_dead = [
    "img_pollo_locco/img/2_character_pepe/5_dead/D-51.png",
    "img_pollo_locco/img/2_character_pepe/5_dead/D-52.png",
    "img_pollo_locco/img/2_character_pepe/5_dead/D-53.png",
    "img_pollo_locco/img/2_character_pepe/5_dead/D-54.png",
    "img_pollo_locco/img/2_character_pepe/5_dead/D-55.png",
    "img_pollo_locco/img/2_character_pepe/5_dead/D-56.png",
    "img_pollo_locco/img/2_character_pepe/5_dead/D-57.png",
  ];

  images_hurt = [
    "img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png",
    "img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png",
    "img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png",
  ];

  images_idle = [
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-2.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-3.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-4.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-5.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-6.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-7.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-8.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-9.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  images_idle_long = [
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  walking_sound = new Audio("audio/walk.mp3");
  jump_sound = new Audio("audio/jump.mp3");
  hurt_sound = new Audio("audio/hurt.mp3");
  dead_sound = new Audio("audio/dead.mp3");

  constructor() {
    super().loadImage("img_pollo_locco/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.images_walking);
    this.loadImages(this.images_jumping);
    this.loadImages(this.images_hurt);
    this.loadImages(this.images_dead);
    this.loadImages(this.images_idle);
    this.loadImages(this.images_idle_long);
    this.applyGravity();
    this.animate();
  }

  animate() {
    this.setupMovementAnimation();
    this.setupStatusAnimation();
  }

  setupMovementAnimation() {
    setInterval(() => {
      this.handleMovement();
      this.updateCamera();
    }, 1000 / 60);
  }

  handleMovement() {
    if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.idleCount = 0;
    }
    if (this.world.keyboard.left && this.x > 0) {
      this.moveLeft();
      this.idleCount = 0;
    }
    if (this.world.keyboard.space && !this.isAboveGround()) {
      this.jump();
      this.idleCount = 0;
    } else {
      this.idling();
      this.idleCount++;
    }
  }

  updateCamera() {
    this.world.camera_x = -this.x + 100;
  }

  moveRight() {
    super.moveRight();
    this.otherDirection = false;
    this.walking_sound.play();
  }

  moveLeft() {
    super.moveLeft();
    this.otherDirection = true;
    this.walking_sound.play();
  }

  idling() {
    if (!this.isNotMoving) {
      this.isNotMoving = true;

      if (this.idleCount < this.sleepingCount) {
        this.playAnimation(this.images_idle);
      } else {
        this.playAnimation(this.images_idle_long);
      }

      setTimeout(() => {
        this.isNotMoving = false;
      }, 160);
    }
  }

  setupStatusAnimation() {
    setInterval(() => {
      this.handleStatusEffects();
      this.handleCharacterAnimation();
    }, 50);
  }

  handleStatusEffects() {
    if (this.isHurt()) {
      this.playAnimation(this.images_hurt);
      this.hurt_sound.play();
    }

    if (this.isDead()) {
      this.playAnimation(this.images_dead);
      this.dead_sound.play();
      stopGameOver();
    }
  }

  handleCharacterAnimation() {
    if (this.isAboveGround()) {
      this.playAnimation(this.images_jumping);
    } else if (this.world.keyboard.right || this.world.keyboard.left) {
      this.playAnimation(this.images_walking);
    }
  }

  muteAllSounds() {
    this.dead_sound.pause();
    this.hurt_sound.pause();
    this.walking_sound.pause();
    this.jump_sound.pause();
    console.log("sounds muuuuuuuteeeed");
  }
}
