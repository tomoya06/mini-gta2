import ES from 'easystarjs';

export default class RealMap {
  /**
   *
   * @param {Phaser.Tilemaps.Tilemap} jsonObject
   * @param {string} walkableLayerName
   * @param {string} obstacleLayerName
   * @param {number} tileWidth
   * @param {number} tileHeight
   */
  constructor(jsonObject, walkableLayerName, obstacleLayerName, tileWidth, tileHeight) {
    const { layers, width, height } = jsonObject;
    this.width = width;
    this.height = height;
    this.nodes = '0'.repeat(height).split('').map(() => '0'.repeat(width).split(''));
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;

    const walkableLayer = layers.find((layer) => layer.name === walkableLayerName).data;
    const obstacleLayer = layers.find((layer) => layer.name === obstacleLayerName).data;

    for (let row = 0; row < this.height; row += 1) {
      for (let col = 0; col < this.width; col += 1) {
        if (obstacleLayer[row][col].index >= 0) {
          this._setWalkableAt(row, col, false);
        } else if (walkableLayer[row][col].index >= 0) {
          this._setWalkableAt(row, col);
        }
      }
    }

    // eslint-disable-next-line new-cap
    this.easystar = new ES.js();
    this.easystar.setGrid(this.nodes);
    this.easystar.setAcceptableTiles([1]);
  }

  /**
   * set walkable for nodes. 1: walkable; 0: no
   * @param {number} x
   * @param {number} y
   * @param {boolean} flag
   */
  _setWalkableAt(x, y, flag = true) {
    this.nodes[y][x] = flag ? 1 : 0;
  }

  /**
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @param {PF.FinderOptions} config
   * @return {Promise<number[][]>}
   */
  async findThePathInPixel(x1, y1, x2, y2, config = undefined) {
    const thePathInNode = await this.findThePath(x1, y1, x2, y2, config);
    const thePathInPixel = thePathInNode.map((node) => [
      node[0] * this.tileWidth - this.tileWidth / 2,
      node[1] * this.tileHeight - this.tileHeight / 2,
    ]);
    return thePathInPixel;
  }

  /**
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @return {Promise<number[][]>}
   */
  findThePath(x1, y1, x2, y2) {
    return new Promise((resolve) => {
      this.easystar.findPath(x1, y1, x2, y2, (path) => {
        if (!path) {
          return resolve([]);
        }
        const remappedPath = path.map(({ x, y }) => [x, y]);
        return resolve(remappedPath);
      });
      this.easystar.calculate();
    });
  }
}
