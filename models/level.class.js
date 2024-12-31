class Level {
  enemies;
  endboss;
  clouds;
  backgroundObjects;
  level_end_x = 5000;

  constructor(enemies,endboss, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
