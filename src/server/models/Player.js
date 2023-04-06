const Tetromino = require('./Tetromino');

const STAGE_WIDTH = 10;
const STAGE_HEIGHT = 20;
const PLAYER_STATUS = {
    JOINDED: 0,
    READY: 1,
    PLAYING: 2,
    FINISHED: 3,
    WIN: 4,
    LOOSE: 5
}
const POINTS = [40, 100, 300, 1200];

class Player {
    constructor (nickname, tetrominos) {
        this.tetroId = -1;
        this.nickname = nickname;
        this.tetrominos = tetrominos;
        this.reset();
        this.status = PLAYER_STATUS.JOINDED;
        this.createStage();
        this.score = 0;
        this.rows = 0;
        this.level = 0;
        this.dropTime = 1000;
        this.speedMode = false;
    }

    reset() {
        this.tetroId++;
        this.pos = {
            x : STAGE_WIDTH / 2 - 2,
            y: 0
        };
        this.tetromino = this.tetrominos[this.tetroId];
        this.collided = false;
    }

    playerRotate(dir) {
        this.tetromino.shape = this.rotate(this.tetromino.shape, dir);
        const pos = this.pos.x;
        let offset = 1;
        while (this.checkCollision({x: 0, y: 0})) {
            this.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > this.tetromino.shape[0].length) {
                this.rotate(this.tetromino.shape, -dir);
                this.pos.x = pos;
                return;
            }
        }
        this.updateStage();
    }

    drop() {
        if (!this.checkCollision({x: 0, y: 1})) {
            this.updatePlayerPos({
                x: 0,
                y: 1,
                collided: false
            });
        } else {
            if (this.pos.y < 1) {
                console.log("Game over!");
                this.status = PLAYER_STATUS.FINISHED;
            }
            this.updatePlayerPos({x: 0, y: 0, collided: true});
        }
        this.updateStage();
    }

    move(dir) {
        if (!this.checkCollision({x: dir, y: 0})) {
            this.updatePlayerPos({
                x: dir,
                y: 0
            });
        }
        this.updateStage();
    }

    rotate(matrix, dir) {
        const rotatedTetro = matrix.map((_, index) => matrix.map(col => col[index]));
        if (dir > 0)
            return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
    }

    checkCollision({ x: moveX, y: moveY}) {
        for (let y = 0; y < this.tetromino.shape.length; y++) {
            for (let x = 0; x < this.tetromino.shape[y].length; x++) {
                if (this.tetromino.shape[y][x] !== 0) {
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
    }

    sweepRows() {
        let rowsCleared = 0;
        const newStage = this.stage.reduce((ack, row) => {
            if (row.findIndex(cell => cell[0] === 0) === -1) {
                rowsCleared++;
                ack.unshift(new Array(this.stage[0].length).fill([0, 'clear']));
                return ack;
            }
            ack.push(row);
            return ack;
        }, []);
        this.stage = newStage;
        this.calculateScore(rowsCleared);
    }

    updateStage() {
        const newStage = this.stage.map(row =>
            row.map(cell => (cell[1] === 'clear' ? [0, 'clear']: cell))
        );
        this.tetromino.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    newStage[y + this.pos.y][x + this.pos.x] = [
                    value,
                    `${this.collided ? 'merged' : 'clear'}`
                    ];
                };
            });
        });
        this.stage = newStage;
        if (this.collided) {
            this.reset();
            this.updateStage();
            this.sweepRows();
        }
    }

    createStage() {
        this.stage = Array.from(Array(STAGE_HEIGHT), () => 
            new Array(STAGE_WIDTH).fill([0, 'clear']));
    }

    calculateScore(rowsCleared) {
        if (rowsCleared > 0) {
            this.score += POINTS[rowsCleared - 1] * (this.level + 1);
            this.rows += rowsCleared;
            if (this.rows > (this.level + 1) * 10) {
                this.level++;
                if (this.speedMode === true) {
                    this.dropTime = 1000 / (this.level + 1) + 200;
                }
            }
        }
    }
}
module.exports = {Player, PLAYER_STATUS};
