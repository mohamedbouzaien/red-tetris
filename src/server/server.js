const {server, app} = require('./App');
const io = require("socket.io")( server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
var uuidv4 = require('uuid').v4;
// start server
const PORT = process.env.PORT || 3004;
app.get('/room', function (req, res, next) {
	const room = {
		name: req.query.name,
		id: uuidv4()
	};
	rooms[room.id] = room;
	chatLogs[room.id] = [];
	res.json(room);
});

app.get('/room/:roomId', function (req, res, next) {
	const roomId = req.params.roomId;
	const response = {
		...rooms[roomId],
		chats: chatLogs[roomId]
	};
	res.json(response);
});
server.listen(PORT, () => {
  console.log(`[message] Server started on port ${PORT}`);
});
let rooms = {}
let chatLogs = {};
io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  socket.on("event://send-message", function(msg) {
    console.log("got", msg);
    const payload = JSON.parse(msg);
    if (chatLogs[payload.roomID]) {
      chatLogs[msg.roomID].push(payload.data);
    }
    socket.broadcast.emit('event://get-message', msg);
  });
});
