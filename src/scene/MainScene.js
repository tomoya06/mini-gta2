import { Scene } from 'phaser';
import { ASSET_KEY } from '../common/Constants';
import Heroine from '../object/Heroine';
import RealMap from '../other/RealMap';

export default class MainScene extends Scene {
  constructor() {
    super({ key: 'MainScene' });

    this.map = null;
    this.player = null;
    this.cursors = null;
  }

  create() {
    // Map init
    const map = this.make.tilemap({ key: ASSET_KEY.TILEMAP });
    const tiles = map.addTilesetImage(ASSET_KEY.TILESET_NAME, ASSET_KEY.TILESET);
    const roadLayer = map.createStaticLayer(ASSET_KEY.TILEMAP_ROAD_LAYERNAME, tiles);
    const inlandLayer = map.createStaticLayer(ASSET_KEY.TILEMAP_INLAND_LAYERNAME, tiles);
    inlandLayer.setCollisionByExclusion([-1]);
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.map = map;

    // player
    this.player = new Heroine(this, 16, 16);
    this.physics.add.collider(this.player, inlandLayer);

    // camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true; // avoid tile bleed
    this.cameras.main.zoom = 3;

    // user input
    this.cursors = this.input.keyboard.createCursorKeys();

    this.drawThePath();
  }

  async drawThePath() {
    this.realMap = new RealMap(this, this.map, 'Road', 'Inland', 8, 8);
    const thePath = await this.realMap.findAndDrawThePath(3, 3, 31, 15);
    this.player.moveAlongThePath(thePath);
  }

  update() {
    this.player.update(this.cursors);
  }
}
