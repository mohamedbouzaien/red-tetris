const { PLAYER_STATUS } = require("./Player");
const Tetromino = require("./Tetromino");

const GAME_MODE = {
    STANDARD: 0,
    HEART: 1,
    SPRINT: 2
};

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
        this.mode = GAME_MODE.STANDARD;
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
        if (this.players.size > 1) {
            for (let [pkey, playerEnt] of this.players) {
                if (playerEnt.score >= max.value) {
                    max.name = playerEnt.nickname;
                    max.value = playerEnt.score;
                }
                playerEnt.status = PLAYER_STATUS.LOOSE;
            }
            const winner = this.players.get(max.name);
            winner.status = PLAYER_STATUS.WIN;
            this.players.set(winner.nickname, winner);
        }
    }

    chooseNewOwner() {
        if (this.players.size > 1) {
            for (let [pkey, playerEnt] of this.players) {
                if (playerEnt.status === PLAYER_STATUS.WIN) {
                    this.ownerName = playerEnt.nickname;
                    break;
                }
            }
        } else {
            this.ownerName = this.players.entries().next().value[1].nickname;
        }
    }
}

module.exports =  {Room, GAME_MODE};
