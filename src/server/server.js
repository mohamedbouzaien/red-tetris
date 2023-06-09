const { GAME_MODE } = require('./models/Room');
const {server, app} = require('./App');
const { chatLogs, rooms } = require('./controllers/RoomController');
const {Player, PLAYER_STATUS, HEART_STAGE} = require('./models/Player');
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
        if (room.mode === GAME_MODE.HEART) {
          player.stage = HEART_STAGE;
        }
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
      if (playerEnt.status !== PLAYER_STATUS.READY) {
        canStart = false;
      }
    }
    if (canStart === true) {
      room.isStarted = true;
      if (room.gameOver === true) {
        for (let [pkey, playerEnt] of room.players) {
          playerEnt.status = PLAYER_STATUS.READY;
          playerEnt.tetroId = -1;
          playerEnt.score = 0;
          playerEnt.rows = 0;
          playerEnt.level = 0;
          playerEnt.dropTime = 1000;
          playerEnt.speedMode = false;
          playerEnt.rowsCleared = 0;
          playerEnt.reset();
          if (room.mode === GAME_MODE.HEART) {
            playerEnt.stage = HEART_STAGE;
          } else {
            playerEnt.createStage();
          }
          if (playerEnt.nickname === player.nickname)
            player = playerEnt;
        }
      }
      room.gameOver = false;
      for (let [pkey, playerEnt] of room.players) {
        playerEnt.status = PLAYER_STATUS.PLAYING;
        playerEnt.reset();
        playerEnt.updateStage();
        if (playerEnt.nickname === player.nickname)
          player = playerEnt;
      }
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
    for (let [pkey, playerEnt] of room.players) {
      if (playerEnt.rowsCleared > 0) {
        for (let [pkey, playerEnt2] of room.players) {
          if (playerEnt.nickname !== playerEnt2.nickname) 
            playerEnt2.getMalus(playerEnt.rowsCleared);
        }
        playerEnt.rowsCleared = 0;
      }
    }
    if (player.status === PLAYER_STATUS.FINISHED) {
      room.gameOver = true;
      room.calculateWinner();
      room.chooseNewOwner();
      room.isStarted = false;
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
  socket.on("event://player-vertical-drop", () => {
    if (!room)
      return;
    player.verticalDrop();
    room.players.set(player.nickname, player);
    for (let [pkey, playerEnt] of room.players) {
      if (playerEnt.rowsCleared > 0) {
        for (let [pkey, playerEnt2] of room.players) {
          if (playerEnt.nickname !== playerEnt2.nickname) 
            playerEnt2.getMalus(playerEnt.rowsCleared);
        }
        playerEnt.rowsCleared = 0;
      }
    }
    if (player.status === PLAYER_STATUS.FINISHED) {
      room.gameOver = true;
      room.calculateWinner();
      room.chooseNewOwner();
      room.isStarted = false;
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
  socket.on("event://mode-change", (mode) => {
    if (!room)
      return;
    room.mode = mode;
    if (mode === GAME_MODE.SPRINT) {
      for (let [pkey, playerEnt] of room.players) {
        playerEnt.speedMode = true;
        playerEnt.createStage();
      }
    } else if (mode === GAME_MODE.HEART) {
      for (let [pkey, playerEnt] of room.players) {
        playerEnt.speedMode = false;
        playerEnt.changeHeartStage();
      }
    } else {
      for (let [pkey, playerEnt] of room.players) {
        playerEnt.speedMode = false;
        playerEnt.createStage();
      }
    }
    io.in(room.name).emit("event://mode-change", mode);
  });
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
      room.calculateWinner();
      room.chooseNewOwner();
      room.isStarted = false;
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
