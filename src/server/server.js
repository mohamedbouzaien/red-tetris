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
  let room;
  let player = null;
  console.log("User connected", socket.id);
  socket.on("event://player-join", function(data) {
    room = rooms.get(data.roomName);
    if (room) {
      player = room.players.get(data.nickName);
      socket.join(room.name);
      if (player) {
        socket.emit('event://player-join', {
          player,
          room : {
            ...room,
            players: Array.from(room.players.values())
          }
        });
        socket.broadcast.to(room.name).emit('event://player-join', {
          room : {
            ...room,
            players: Array.from(room.players.values())
          }
        });
        const msg = JSON.stringify({
          roomId: room.name,
          data: {
            username: "tetrisBot",
            message: player.nickname + " has joined the room"
          }
        });
        io.in(room.name).emit('event://get-message', msg);
      }
    }
  });
  socket.on("event://send-message", function(msg) {
    console.log("got", msg);
    const payload = JSON.parse(msg);
    if (chatLogs[payload.roomID]) {
      chatLogs[msg.roomID].push(payload.data);
    }
    socket.to(room.name).emit('event://get-message', msg);
  });
  socket.on("event://game-start", () => {
    if (!room)
      return;
    player.status = PLAYER_STATUS.READY;
    room.players.set(player.nickname, player);
    let canStart = true;
    if (player.nickname !== room.ownerName) {
      canStart = false;
    }
    for (let [pkey, playerEnt] of room.players) {
      console.log(playerEnt.nickname, " ", playerEnt.status);
      if (playerEnt.status !== PLAYER_STATUS.READY) {
        canStart = false;
      }
    }
    if (canStart === true) {
      console.log(canStart);
      room.isStarted = true;
      for (let [pkey, playerEnt] of room.players) {
        playerEnt.status = PLAYER_STATUS.PLAYING;
        playerEnt.reset();
        playerEnt.updateStage();
        if (playerEnt.nickname === player.nickname)
          player = playerEnt;
      }
      console.log("Game start: ");
    }
    socket.emit("event://player-ready", {
      player,
      room : {
        ...room,
        players: Array.from(room.players.values())
      }
    });
    io.to(room.name).emit("event://game-start-broadcast", {
      room : {
        ...room,
        players: Array.from(room.players.values())
      }
    });
  });
  socket.on("event://player-reset", () => {
    if (!room)
      return;
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
    if (!room)
      return;
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
    if (!room)
      return;
    player.drop();
    room.players.set(player.nickname, player);
    if (player.status === PLAYER_STATUS.FINISHED) {
      room.gameOver = true;
      room.calculateWinner();
    }
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
    if (!room)
      return;
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
  /*socket.onAny((eventName, ...args) => {
    console.log(eventName, " ", room);
  });*/
  socket.on("disconnect", () => {
    if (!room)
      return;
    room.players.delete(player.nickname);
    rooms.set(room.name, room);
    socket.leave(room.name);
    const msg = JSON.stringify({
      roomId: room.name,
      data: {
        username: "tetrisBot",
        message: player.nickname + " has left the room"
      }
    });
    io.in(room.name).emit('event://get-message', msg);
    if (room.players.size === 0) {
      rooms.delete(room.name);
      room = null;
      player = null;
      return;
    }
    if (room.isStarted) {
      room.gameOver = true;
      //room.calculateWinner();
    }
    io.in(room.name).emit("event://player-out", {
      room : {
        ...room,
        players: Array.from(room.players.values())
      }
    });
    console.log('user disconnected', socket.id);
  })
});
