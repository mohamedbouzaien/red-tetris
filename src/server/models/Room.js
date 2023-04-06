const Tetromino = require("./Tetromino");

class Room {
    constructor(name) {
        this.name = name;
        this.isStarted = false;
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
}

module.exports =  Room;
