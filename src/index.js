import Phaser from 'phaser';

import BootScene from '@/scene/BootScene';
import PlayScene from '@/scene/PlayScene';
import MainScene from '@/scene/MainScene';

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

/** @type {Phaser.Types.Core.GameConfig} */
const config = {
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
  },
  width: windowWidth,
  height: windowHeight,
  scene: [BootScene, MainScene, PlayScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);

export default game;
