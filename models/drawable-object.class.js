class DrawableObject {
  img;
  ImageCache = [];
  currentImage = 0;
  x = 120;
  y = 280;

  width = 100;
  height = 150;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      if (this instanceof Character) {
        ctx.rect(this.x, this.y+150, this.width-30, this.height-150);
      } else if (this instanceof Endboss){
        ctx.rect(this.x, this.y+100, this.width, this.height-120);
      }
      else {
        ctx.rect(this.x, this.y, this.width, this.height);
      }
    }
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.ImageCache[path] = img;
    });
  }
}
