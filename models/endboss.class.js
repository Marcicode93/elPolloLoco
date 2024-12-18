class Endboss extends MovableObject{

    height= 500;
    width=300;
    y=-35;
    images_walking=[
      'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png',
      'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png',
      'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png',
      'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png',
      'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png',
      'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png',
      'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png',
      'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png',

    ];

    constructor() {
        super().loadImage(this.images_walking[0]
        );
        this.loadImages(this.images_walking);
        this.x = 2500;
        this.animate();
      }

      animate(){
        setInterval(() => {
            this.playAnimation(this.images_walking)
          }, 200);
      }
  
}