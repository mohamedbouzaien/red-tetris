const {server, app} = require('./App');
const { chatLogs } = require('./controllers/RoomController');
const Player = require('./models/Player');
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
  const player = new Player();
  const room = new Room();
  console.log("User connected", socket.id);
  socket.on("event://send-message", function(msg) {
    console.log("got", msg);
    const payload = JSON.parse(msg);
    if (chatLogs[payload.roomID]) {
      chatLogs[msg.roomID].push(payload.data);
    }
    socket.broadcast.emit('event://get-message', msg);
  });
  socket.on("event://game-start", () => {
    room.isStarted = true;
    player.reset();
    const payload = player;
    socket.broadcast.emit("event://game-start", JSON.stringify(payload));
  });
  socket.on("event://player-reset", () => {
    player.reset();
    const payload = player;
    socket.broadcast.emit('player-reset', JSON.stringify(payload));
  });
  socket.on("event://player-move", ({ dir }) => {
    player.move(dir);
    const payload = player;
    socket.broadcast.emit("event://player-move", JSON.stringify(payload));
  });
  socket.on("event://player-drop", () => {
    player.drop();
    const payload = player;
    socket.broadcast.emit("event://player-drop", JSON.stringify(payload));
  });
  socket.on("event://player-rotate", ( { dir }) => {
    player.playerRotate(dir);
    const payload = player;
    socket.broadcast.emit("event://player-rotate", JSON.stringify(payload));
  });
});
