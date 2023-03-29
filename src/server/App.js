const path = require("path");
const express = require("express");
const cors =  require("cors");
const RoomRouter =  require("./routes/RoomRouter.js");
const http = require("http");
const app = express();
const server = http.createServer(app);
const corsOptions = {
  origin: process.env.DOMAIN || "http://localhost:3000",
};


if (process.env.MODE === "prod") {
  global.console.log = function () {};
}

app.use(express.static(path.resolve("dist")));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/room", RoomRouter);
app.get("/", (req, res) => {
  res.sendFile("index.html", {
    root: path.resolve("./dist"),
  });
});
app.use((req, res) => {
  res.status(404).send("Not Found");
});

module.exports = {server, app};
