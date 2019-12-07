export const ASSET_KEY = {
  // map and tiles
  TILESET: 'tileset',
  TILESET_NAME: 'formatted_tiles',
  TILEMAP: 'map',
  TILEMAP_ROAD_LAYERNAME: 'Road',
  TILEMAP_INLAND_LAYERNAME: 'Inland',

  // characters
  HEROINE: 'heroine',
};

export const DIRECTION_KEY = {
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'down',
};

export const ANIMATIONS = [
  {
    key: ASSET_KEY.HEROINE,
    frameRate: 10,
    anims: [
      {
        key: DIRECTION_KEY.LEFT,
        frames: [3, 4, 5, 4],
      },
      {
        key: DIRECTION_KEY.RIGHT,
        frames: [6, 7, 8, 7],
      },
      {
        key: DIRECTION_KEY.UP,
        frames: [9, 10, 11, 10],
      },
      {
        key: DIRECTION_KEY.DOWN,
        frames: [0, 1, 2, 1],
      },
    ],
  },
];
