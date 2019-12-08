import Phaser from 'phaser';
import { keyOfAnimationForCharacter, valueOfDirectionKey } from '../common/Mapping';
import { ASSET_KEY, DIRECTION_KEY } from '../common/Constants';

export default class Heroine extends Phaser.GameObjects.PathFollower {
  /**
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   */
  constructor(scene, x, y) {
    super(
      scene,
      new Phaser.Curves.Path(x, y),
      x, y,
      ASSET_KEY.HEROINE, 1,
    );

    // world init
    this.myBody = new Phaser.Physics.Arcade.Body(scene.physics.world, this);
    this.parentScene = scene;
    this.parentScene.physics.add.existing(this);
    this.parentScene.add.existing(this);

    // position related
    this.facing = DIRECTION_KEY.DOWN;
    this.lastPosition = [x, y];

    // moving related
    this.defaultSpeed = 10;
    this.pathFollower = null;

    this.pathUpdate = () => {
      Phaser.GameObjects.PathFollower.prototype.pathUpdate.call(this);
      if (this.isFollowing()) {
        this.gestureUpdate();
      }
    };

    // size related
    this.setDisplaySize(8, 8);
    this.setOrigin(1, 1);
    this.setSize(26, 28);

    // physics related
    this.myBody.setCollideWorldBounds(true);
    this.myBody.setOffset(4, 4);
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
    } else if (!this.isFollowing()) {
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
      case DIRECTION_KEY.LEFT: this.body.setVelocityX(0 - speed); break;
      case DIRECTION_KEY.RIGHT: this.body.setVelocityX(speed); break;
      case DIRECTION_KEY.UP: this.body.setVelocityY(0 - speed); break;
      case DIRECTION_KEY.DOWN: this.body.setVelocityY(speed); break;
      default: return;
    }
    this.gestureUpdate();
  }

  gestureUpdate() {
    const currentPosition = [this.getTopLeft().x, this.getTopLeft().y];
    const delta = [
      currentPosition[0] - this.lastPosition[0],
      currentPosition[1] - this.lastPosition[1],
    ];
    let realDirection;
    if (delta[0] > 0) {
      realDirection = DIRECTION_KEY.RIGHT;
    } else if (delta[0] < 0) {
      realDirection = DIRECTION_KEY.LEFT;
    }
    if (delta[1] > 0) {
      realDirection = DIRECTION_KEY.DOWN;
    } else if (delta[1] < 0) {
      realDirection = DIRECTION_KEY.UP;
    }
    if (delta[0] === 0 && delta[1] === 0) {
      realDirection = DIRECTION_KEY.DOWN;
    }
    const animateKey = keyOfAnimationForCharacter(ASSET_KEY.HEROINE, realDirection);
    this.play(animateKey, true);
    this.lastPosition = currentPosition;
    console.log(delta, animateKey);
  }

  stopMoving() {
    this.body.setVelocity(0);
  }

  stopAnimate() {
    this.setTexture(ASSET_KEY.HEROINE, 1 + valueOfDirectionKey(this.facing) * 3);
  }

  /**
   * @param {number[][]} thePath
   */
  moveAlongThePath(thePath) {
    const newPathObject = new Phaser.Curves.Path(thePath[0][0], thePath[0][1]);
    for (let i = 1; i < thePath.length; i += 1) {
      newPathObject.lineTo(thePath[i][0], thePath[i][1]);
    }
    this.setPath(newPathObject);
    this.startFollow({
      duration: thePath.length * this.defaultSpeed * 100,
    });
  }
}
