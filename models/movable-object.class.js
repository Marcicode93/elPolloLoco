class MovableObject {
  x = 120;
  y = 250;
  img;
  width = 100;
  height = 150;


  loadimage(path){
    this.img = new Image();
    this.img.src = path;
    this.img.onload = () =>{
      console.log("Image loaded", path);
      
    }
  }
  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {}
}
