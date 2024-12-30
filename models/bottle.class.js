class Bottle extends DrawableObject {

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        super.loadImage(
          "./img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png"
        );
      }
}