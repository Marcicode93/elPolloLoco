class Level {
  enemies;
  enemies_small;
  endboss;
  clouds;
  backgroundObjects;
  level_end_x = 5000;

  constructor(enemies,enemies_small,endboss, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.enemies_small = enemies_small;
    this.endboss = endboss;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
