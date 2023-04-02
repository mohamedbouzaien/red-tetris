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
  socket.on("event://player-reset", () => {
    const payload = player.reset();
    socket.broadcast.emit('player-reset', JSON.stringify(payload));
  });
  socket.on("event://start-game", (msg) => {
    room.isStarted = true;
    this.emit("event://start-game", {

    });
  });
  socket.on("event://player-move", () => {

  });
  socket.on("event://player-drop", () => {

  });
});
