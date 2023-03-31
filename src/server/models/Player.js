import Tetromino from "./Tetromino";

export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;
class Player {
    constructor () {
        this.pos = {
            x : STAGE_WIDTH / 2 - 2,
            y: 0
        };
        this.tetromnio= new Tetromino();
        this.tetromnio.random();
        this.collided = false;
    }
}
module.exports = Player;
