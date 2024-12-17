class Chicken extends MovableObject{
  y = 330;
  height=100
  width=100
  images_walking=[
    'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ]


    constructor(){
        super().loadImage('../img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.images_walking);
        this.x = 200+ Math.random()*500;
        this.speed= 0.15 + Math.random()*0,25;
        this.animate()
      }

      animate() {
        this.moveLeft();
        setInterval(() => {
          let i= this.currentImage % this.images_walking.length;
          let path = this.images_walking[i];
          this.img = this.ImageCache[path];
          this.currentImage++;
        }, 100);
      }

}
