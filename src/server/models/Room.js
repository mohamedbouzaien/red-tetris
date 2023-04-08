const { PLAYER_STATUS } = require("./Player");
const Tetromino = require("./Tetromino");

class Room {
    constructor(name) {
        this.name = name;
        this.isStarted = false;
        this.gameOver = false;
        this.ownerName = '';
        this.players = new Map();
        this.tetrominos = new Array(100);
        for (let i = 0; i < 100; i++) {
            this.tetrominos[i] = new Tetromino();
            this.tetrominos[i].random();
        }
    }
    
    findPlayerByNickname(nickname) {
        if (this.players.has(nickname)) {
            return this.players.get(nickname);
        }
    }
    
    calculateWinner() {
        const max = {
            name: "",
            value: 0
        };
        for (let [pkey, playerEnt] of this.players) {
            if (playerEnt.score > max.value) {
                max.name = playerEnt.nickname;
                max.value = playerEnt.score;
            }
            playerEnt.status = PLAYER_STATUS.LOOSE;
        }
        const winner = this.players.get(max.name);
        winner.status = PLAYER_STATUS.WIN;
        this.players.set(winner.username);
    }
}

module.exports =  Room;
