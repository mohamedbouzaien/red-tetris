const express = require("express");
const { RoomController } = require("../controllers/RoomController.js");

const RoomRouter = express.Router();

RoomRouter.post('/', RoomController.create);
RoomRouter.get('/', RoomController.find);

module.exports =  RoomRouter;