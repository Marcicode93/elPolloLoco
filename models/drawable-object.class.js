class DrawableObject {
  img;
  ImageCache = [];
  currentImage = 0;
  x = 120;
  y = 280;
  width = 100;
  height = 150;

  /**
   * Loads a single image from the specified path.
   * @param {string} path - The file path to the image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * draws image onto the canvas.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * draws a frame around the elements in the world to allow for collision detection.
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Smallchicken ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      if (this instanceof Character) {
        ctx.rect(this.x, this.y + 150, this.width - 30, this.height - 150);
      } else if (this instanceof Endboss) {
        ctx.rect(this.x, this.y + 100, this.width, this.height - 120);
      } else {
        ctx.rect(this.x, this.y, this.width, this.height);
      }
    }
  }

  /**
   * loads images from an array to allow for animation.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.ImageCache[path] = img;
    });
  }
}
