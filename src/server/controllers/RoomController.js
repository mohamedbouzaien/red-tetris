const Room = require("../models/Room");

const rooms = new Map();
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
            room.players.set(nickname, nickname);
            return res.status(200).json({
                message: "user joined"
            })
        } else {
            rooms.set(name, new Room(name));
            return res.status(200).json({
                message: "room created"
            });
        }
    },

    find: async (req, res) => {
        const { name, username } = req.query;
        if (rooms.has(roomName)) {
            return res.status(200).json(rooms.get(name));
        } else {
            return res.status(403).json({
                error: "Room does not exist"
            });
        }
    }
};
module.exports = {rooms, RoomController};
