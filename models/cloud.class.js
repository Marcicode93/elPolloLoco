class Cloud extends MovableObject(){

    constructor(){
        super().loadimage('../img_pollo_locco/img/5_background/layers/4_clouds')
        this.x = 200+ Math.random()*500;
      }
}
