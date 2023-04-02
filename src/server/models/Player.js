const Tetromino = require('./Tetromino');

const STAGE_WIDTH = 10;
const STAGE_HEIGHT = 20;
class Player {
    constructor () {
        this.reset();
        this.status = false; // to change to many statuses later
    }

    reset() {
        this.pos = {
            x : STAGE_WIDTH / 2 - 2,
            y: 0
        };
        this.tetromnio= new Tetromino();
        this.tetromnio.random();
        this.collided = false;
        this.createStage();
    }

    playerRotate(dir) {
        this.tetromino = this.rotate(this.tetromino, dir);
        const pos = this.pos.x;
        let offset = 1;
        while (this.checkCollision({x: 0, y: 0})) {
            this.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > this.tetromino[0].length) {
                this.rotate(this.tetromino, -dir);
                this.pos.x = pos;
                return;
            }
        }
    }

    drop() {
        if (!this.checkCollision({x: 0, y: 1})) {
            updatePlayerPos({
                x: 0,
                y: 1,
                collided: false
            });
        } else {
            if (this.pos.y < 1) {
                console.log("Game over!");
                this.status = true;
            }
            updatePlayerPos({x: 0, y: 0, collided: true});
        }
    }

    movePlayer(dir) {
        if (!checkCollision({x: dir, y: 0})) {
            updatePlayerPos({
                x: dir,
                y: 0
            });
        }
    }

    rotate(matrix, dir) {
        const rotatedTetro = matrix.map((_, index) => matrix.map(col => col[index]));
        if (dir > 0)
            return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
    }

    createStage(){
        this.stage = Array.from(Array(STAGE_HEIGHT), () => 
            new Array(STAGE_WIDTH).fill([0, 'clear']));
    }

    checkCollision({ x: moveX, y: moveY}) {
        for (let y = 0; y < this.tetromino.length; y++) {
            for (let x = 0; x < this.tetromino[y].length; x++) {
                if (this.tetromino[y][x] !== 0) {
                    if (!this.stage[y + this.pos.y + moveY] ||
                        !this.stage[y + this.pos.y + moveY][x + this.pos.x + moveX] ||
                        this.stage[y + this.pos.y + moveY][x + this.pos.x + moveX][1] !== 'clear') {
                            return true;
                     }
                }
            }
        }
    }

    updatePlayerPos({
        x,
        y,
        collided
    }) {
            this.pos = {
                x: (this.pos.x += x),
                y: (this.pos.y += y)
            };
            this.collided  = collided;
    };
}
module.exports = Player;


