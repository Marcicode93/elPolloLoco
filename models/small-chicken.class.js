class Smallchicken extends MovableObject {
    y = 380;
    height = 60;
    width = 60;
    energy = 1;
    images_walking = [
      "./img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "./img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "./img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];
  
    images_dead = [
      "./img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png",
    ];
  
    walking_sound = new Audio("audio/chicken.mp3");
  
    constructor() {
      super().loadImage(
        "./img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png"
      );
      this.loadImages(this.images_walking);
      this.loadImages(this.images_dead);
      this.x = 400 + Math.random() * 3500;
      (this.speed = 0.15 + Math.random() * 0), 25;
      this.animate();
    }
  
    animate() {
      setInterval(() => {
        this.moveLeft();
        // this.walking_sound.play();
      }, 1000 / 60);
  
      setInterval(() => {
        this.playAnimation(this.images_walking);
      }, 100);
  
      let deathAnimation = setInterval(() => {
        if (this.isDead()) {
          this.playAnimation(this.images_dead);
          console.log("Chicken deeeeeeead");
          clearInterval(deathAnimation)
        }
      }, 100);
    }
  }
  