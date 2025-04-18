class Coinbar extends DrawableObject {
  images = [
    "img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  percentage = 0;

  constructor() {
    super();
    this.loadImages(this.images);
    this.x = 60;
    this.y = 40;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }

  /**
   * Sets the percentage value and updates the image based on the resolved index.
   * @param {number} percentage - The percentage value to set (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.images[this.resolveImageIndex()];
    this.img = this.ImageCache[path];
  }

  /**
   * Resolves the image index based on the current percentage value.
   * @returns {number} The index of the image to use (0-5).
   */
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
