class Character extends MovableObject {
  height = 400;
  width = 180;
  y = -80;
  speed = 10;
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

  world;
  walking_sound = new Audio("audio/walk.mp3");
  jump_sound = new Audio("audio/jump.mp3");
  hurt_sound = new Audio("audio/hurt.mp3");
  dead_sound = new Audio("audio/dead.mp3");

  constructor() {
    super().loadImage(
      "../img_pollo_locco/img/2_character_pepe/2_walk/W-21.png"
    );
    this.loadImages(this.images_walking);
    this.loadImages(this.images_jumping);
    this.loadImages(this.images_hurt);
    this.loadImages(this.images_dead);
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
      }
      if (this.world.keyboard.left && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
      }
      if (this.world.keyboard.space && !this.isAboveGround()) {
        this.jump();
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isHurt()) {
        this.playAnimation(this.images_hurt);
        this.hurt_sound.play();
      }
      if (this.isDead()) {
        this.playAnimation(this.images_dead);
        this.dead_sound.play();
        stopGame();
      }
      if (this.isAboveGround()) {
        this.playAnimation(this.images_jumping);
      } else {
        if (this.world.keyboard.right || this.world.keyboard.left) {
          this.playAnimation(this.images_walking);
        }
      }
    }, 50);
  }
}
