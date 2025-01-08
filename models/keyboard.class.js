class Keyboard {
  left = false;
  right = false;
  up = false;
  down = false;
  space = false;
  d = false;
  b = false;
  idle = false;

  constructor() {
    this.bindBtsPressEvents();
  }

  bindBtsPressEvents() {
    document.getElementById("btn-left").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.left = true;
    });

    document.getElementById("btn-left").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.left = false;
    });

    document.getElementById("btn-right").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.right = true;
    });

    document.getElementById("btn-right").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.right = false;
    });

    document.getElementById("btn-jump").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.space = true;
    });

    document.getElementById("btn-jump").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.space = false;
    });

    document
      .getElementById("btn-pick-up")
      .addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.b = true;
      });

    document.getElementById("btn-pick-up").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.b = false;
    });

    document.getElementById("btn-throw").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.d = true;
    });

    document.getElementById("btn-throw").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.d = false;
    });
  }
}
