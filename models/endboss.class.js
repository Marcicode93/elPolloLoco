class Endboss extends MovableObject {
  height = 500;
  width = 300;
  y = -35;
  energy = 50;

  images_alert = [
    "./img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  images_walking = [
    "./img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  images_attack = [
    "./img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png",
    "./img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png",
    "./img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png",
    "./img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png",
    "./img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  images_hurt = [
    "./img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  images_dead = [
    "./img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png",
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
    this.x = 2500;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveRandom();
      this.randomizeAnimation();

      if (this.currentAnimation === "walking") {
        this.playAnimation(this.images_walking);
      } else if (this.currentAnimation === "alert") {
        this.playAnimation(this.images_alert);
      } else if (this.currentAnimation === "attack") {
        this.playAnimation(this.images_attack);
      }
    }, 200);

    setInterval(() => {
      if (this.isCurrentlyHurt) {
        this.playAnimation(this.images_hurt);
      }
    }, 200);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.images_dead);
        console.log("deaaaaaaaad");
        stopGame();
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
    }
  }
}
