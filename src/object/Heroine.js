import Phaser from 'phaser';
import { keyOfAnimationForCharacter, valueOfDirectionKey } from '../common/Mapping';
import { ASSET_KEY, DIRECTION_KEY } from '../common/Constants';

export default class Heroine extends Phaser.Physics.Arcade.Sprite {
  /**
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   */
  constructor(scene, x, y) {
    super(scene, x, y, ASSET_KEY.HEROINE, 1);
    this.scene = scene;
    this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
    this.facing = DIRECTION_KEY.DOWN;

    this.defaultSpeed = 10;
    this.setCollideWorldBounds(true);
    this.setDisplaySize(8, 8);

    this.setOrigin(0, 1);
    this.setSize(26, 28);
    this.setOffset(4, 4);
  }

  /**
   * @param {Phaser.Types.Input.Keyboard.CursorKeys} cursors
   */
  update(cursors) {
    this.stopMoving();
    if (cursors.left.isDown) {
      this.facing = DIRECTION_KEY.LEFT;
      this.moveWith(DIRECTION_KEY.LEFT);
    } else if (cursors.right.isDown) {
      this.facing = DIRECTION_KEY.RIGHT;
      this.moveWith(DIRECTION_KEY.RIGHT);
    } else if (cursors.up.isDown) {
      this.facing = DIRECTION_KEY.UP;
      this.moveWith(DIRECTION_KEY.UP);
    } else if (cursors.down.isDown) {
      this.facing = DIRECTION_KEY.DOWN;
      this.moveWith(DIRECTION_KEY.DOWN);
    } else {
      this.stopAnimate();
    }
  }

  /**
   * @param {string} direction
   * @param {number} speedTimes
   */
  moveWith(direction, speedTimes = 3) {
    this.move(direction, this.defaultSpeed * speedTimes);
  }

  /**
   * @param {string} direction
   * @param {number} speed
   */
  move(direction, speed) {
    switch (direction) {
      case DIRECTION_KEY.LEFT: this.setVelocityX(0 - speed); break;
      case DIRECTION_KEY.RIGHT: this.setVelocityX(speed); break;
      case DIRECTION_KEY.UP: this.setVelocityY(0 - speed); break;
      case DIRECTION_KEY.DOWN: this.setVelocityY(speed); break;
      default: return;
    }
    const animateKey = keyOfAnimationForCharacter(ASSET_KEY.HEROINE, direction);
    this.play(animateKey, true);
  }

  stopMoving() {
    this.setVelocity(0);
  }

  stopAnimate() {
    this.setTexture(ASSET_KEY.HEROINE, 1 + valueOfDirectionKey(this.facing) * 3);
  }
}
