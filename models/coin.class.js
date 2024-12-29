class Coin extends DrawableObject {

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        super.loadImage(
          "./img_pollo_locco/img/8_coin/coin_1.png"
        );
      }
}