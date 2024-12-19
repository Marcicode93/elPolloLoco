class Statusbar extends DrawableObject {
  images = [
    "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  width = 300;
  height = 100;

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.images);
    this.x=100;
    this.y=0;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.images[this.resolveImageIndex()]
    this.img = this.ImageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
