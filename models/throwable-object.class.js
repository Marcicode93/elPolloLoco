class ThrowableObject extends MovableObject {
  throw_sound = new Audio('audio/bottle-pop.mp3');

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 60;
    super.loadImage(
      "./img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.throw();
  }

  throw() {
    this.speedY = 20;
    this.throw_sound.play();
    this.applyGravity();
    setInterval(() => {
      this.x += 20;
    }, 25);
  }
}
