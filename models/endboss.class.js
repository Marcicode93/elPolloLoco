class Endboss extends MovableObject {
  height = 500;
  width = 300;
  y = -35;
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

  hadFirstContact = 0;

  constructor() {
    super().loadImage(this.images_alert[0]);
    this.loadImages(this.images_alert);
    this.x = 2500;
    this.animate();
  }

  animate() {

    setInterval(() => {
      this.moveRandom();
      // this.walking_sound.play();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.images_alert);
    }, 200);
  }
}
