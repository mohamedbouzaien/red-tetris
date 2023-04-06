const {Player} = require("../models/Player");
const Room = require("../models/Room");

const rooms = new Map();
const chatLogs = new Map();
const RoomController = {
    create: async (req, res) => {
        const { name, nickname } = req.body;
        if (rooms.has(name)) {
            const room = rooms.get(name);
            if (room.findPlayerByNickname(nickname)) {
                return res.status(403).json({
                    error: `${nickname} is taken. Please change your nickname!`
                });
            }
            if (room.players.size >= 3) {
                return res.status(403).json({
                    error: `${name} is full! Go away!`
                })
            }
            room.players.set(nickname, new Player(nickname, room.tetrominos));
            rooms.set(name, room);
            return res.status(200).json({
                ...rooms.get(name),
                chats: chatLogs.get(name)
            })
        } else {
            const room = new Room(name);
            room.players.set(nickname, new Player(nickname, room.tetrominos));
            room.ownerName = nickname;
            rooms.set(name, room);
            chatLogs.set(name, []);
            return res.status(200).json({
                ...rooms.get(name),
                chats: chatLogs.get(name)
            });
        }
    },

    find: async (req, res) => {
        const { name, username } = req.query;
        if (rooms.has(name)) {
            return res.status(200).json({
                ...rooms.get(name),
                chats: chatLogs.get(name)
            });
        } else {
            return res.status(403).json({
                error: "Room does not exist"
            });
        }
    }
};
module.exports = {rooms, chatLogs, RoomController};
