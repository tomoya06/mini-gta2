import Phaser from 'phaser';

import BootScene from '@/scenes/BootScene';
import PlayScene from '@/scenes/PlayScene';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
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
