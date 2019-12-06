import Phaser from 'phaser';

import BootScene from '@/scenes/BootScene';
import PlayScene from '@/scenes/PlayScene';

/** @type {Phaser.Types.Core.GameConfig} */
const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
  },
  scene: [BootScene, PlayScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);

export default game;
