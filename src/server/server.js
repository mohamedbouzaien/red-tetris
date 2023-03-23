const server= require('./App');
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
  console.log("User connected", socket.id);
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${ data }`);
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  })
});