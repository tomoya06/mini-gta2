import { Scene } from 'phaser';
import { ANIMATIONS, ASSET_KEY } from '../common/Constants';
import { keyOfAnimationForCharacter } from '../common/Mapping';

export default class BootScene extends Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    this.loadAssets();
  }

  create() {
    this.createAnimations();
    this.scene.start('MainScene');
  }

  loadAssets() {
    this.load.image(ASSET_KEY.TILESET, 'assets/map/formatted_tiles.png');
    this.load.tilemapTiledJSON(ASSET_KEY.TILEMAP, 'assets/map/map.json');

    this.load.spritesheet(ASSET_KEY.HEROINE, 'assets/char/pipo-nekonin001.png', {
      frameHeight: 32,
      frameWidth: 32,
    });
  }

  createAnimations() {
    ANIMATIONS.forEach((animateSet) => {
      animateSet.anims.forEach((animate) => {
        this.anims.create({
          key: keyOfAnimationForCharacter(animateSet.key, animate.key),
          frames: this.anims.generateFrameNumbers(animateSet.key, { frames: animate.frames }),
          frameRate: animateSet.frameRate,
          repeat: -1,
        });
      });
    });
  }
}
