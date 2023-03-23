class Room {
    constructor(name) {
        this.name = name;
        this.isStarted = false;
        this.players = new Map();
    }
    
    findPlayerByNickname(nickname) {
        if (this.players.has(nickname)) {
            return this.players.get(nickname);
        }
    }
}

module.exports =  Room;
