const {server, app} = require('./App');
const { chatLogs, rooms } = require('./controllers/RoomController');
const {Player, PLAYER_STATUS} = require('./models/Player');
const Room = require('./models/Room');
const io = require("socket.io")( server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
// start server
const PORT = process.env.PORT || 3004;
server.listen(PORT, () => {
  console.log(`[message] Server started on port ${PORT}`);
});

io.on("connection", (socket) => {
  let room = null;
  let player = null;
  console.log("User connected", socket.id);
  socket.on("event://player-join", function(data) {
    room = rooms.get(data.roomName);
    if (room) {
      player = room.players.get(data.nickName);
      if (player) {
        socket.emit('event://player-join', {
          player,
          room : {
            ...room,
            players: Array.from(room.players.values())
          }
        });
      }
    }
  });
  socket.on("event://send-message", function(msg) {
    console.log("got", msg);
    const payload = JSON.parse(msg);
    if (chatLogs[payload.roomID]) {
      chatLogs[msg.roomID].push(payload.data);
    }
    socket.broadcast.emit('event://get-message', msg);
  });
  socket.on("event://game-start", () => {
    player.status = PLAYER_STATUS.READY;
    room.players.set(player.nickname, player);
    let canStart = true;
    console.log(room.players.values());
    for (let [pkey, playerEnt] of room.players) {
      console.log(playerEnt.nickname, " ", playerEnt.status);
      if (playerEnt.status !== PLAYER_STATUS.READY) {
        canStart = false;
      }
    }
    if (canStart === true) {
      console.log(canStart);
      room.isStarted = true;
      for (let playerEnt in room.players.values()) {
        playerEnt.reset();
        playerEnt.updateStage();
        if (playerEnt.nickname === player.nickname)
          player = playerEnt;
      }
      console.log("Game start: ");
      socket.emit("event://game-start", {
        player,
        room : {
          ...room,
          players: Array.from(room.players.values())
        }
      });
    }
  });
  socket.on("event://player-reset", () => {
    player.reset();
    player.updateStage();
    room.players.set(player.nickname, player);
    const payload = {
      player,
      room: {
        ...room,
        players: Array.from(room.players.values())
      }
    };
    socket.emit('player-reset', payload);
  });
  socket.on("event://player-move", ({ dir }) => {
    player.move(dir);
    room.players.set(player.nickname, player);
    const payload = {
      player,
      room: {
        ...room,
        players: Array.from(room.players.values())
      }
    };
    socket.emit("event://player-move", payload);
  });
  socket.on("event://player-drop", () => {
    player.drop();
    if (player.status === PLAYER_STATUS.FINISHED) {
      room.gameOver = true;
    }
    room.players.set(player.nickname, player);
    const payload = {
      player,
      room: {
        ...room,
        players: Array.from(room.players.values())
      }
    };
    socket.emit("event://player-drop", payload);
  });
  socket.on("event://player-rotate", ( { dir }) => {
    player.playerRotate(dir);
    room.players.set(player.nickname, player);
    const payload = {
      player,
      room: {
        ...room,
        players: Array.from(room.players.values())
      }
    };
    socket.emit("event://player-rotate", payload);
  });
});
