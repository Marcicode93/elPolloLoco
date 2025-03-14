let level1;

/**
 * Initializes the first level of the game with enemies, clouds, and background objects.
 */
function initLevel() {
  level1 = new Level(
    /**
     * Array of regular enemy chickens.
     * @type {Chicken[]}
     */
    (
      enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
      ]
    ),
    /**
     * Array of small enemy chickens.
     * @type {Smallchicken[]}
     */
    (
      enemies_small = [
        new Smallchicken(),
        new Smallchicken(),
        new Smallchicken(),
        new Smallchicken(),
      ]
    ),
    /**
     * The endboss of the level.
     * @type {Endboss}
     */
    (endboss = new Endboss()),
    [
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
    ],

    [
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/air.png",
        -719,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/3_third_layer/2.png",
        -719,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/2_second_layer/2.png",
        -719,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/1_first_layer/2.png",
        -719,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/air.png",
        0,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/3_third_layer/1.png",
        0,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/2_second_layer/1.png",
        0,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/1_first_layer/1.png",
        0,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/air.png",
        719,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/3_third_layer/2.png",
        719,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/2_second_layer/2.png",
        719,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/1_first_layer/2.png",
        719,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/air.png",
        719 * 2,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/3_third_layer/1.png",
        719 * 2,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/2_second_layer/1.png",
        719 * 2,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/1_first_layer/1.png",
        719 * 2,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/air.png",
        719 * 3,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/3_third_layer/2.png",
        719 * 3,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/2_second_layer/2.png",
        719 * 3,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/1_first_layer/2.png",
        719 * 3,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/air.png",
        719 * 4,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/3_third_layer/1.png",
        719 * 4,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/2_second_layer/1.png",
        719 * 4,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/1_first_layer/1.png",
        719 * 4,
        100
      ),

      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/air.png",
        719 * 5,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/3_third_layer/2.png",
        719 * 5,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/2_second_layer/2.png",
        719 * 5,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/1_first_layer/2.png",
        719 * 5,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/air.png",
        719 * 6,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/3_third_layer/1.png",
        719 * 6,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/2_second_layer/1.png",
        719 * 6,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/1_first_layer/1.png",
        719 * 6,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/air.png",
        719 * 7,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/3_third_layer/2.png",
        719 * 7,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/2_second_layer/2.png",
        719 * 7,
        100
      ),
      new BackgroundObject(
        "img_pollo_locco/img/5_background/layers/1_first_layer/2.png",
        719 * 7,
        100
      ),
    ]
  );
}
