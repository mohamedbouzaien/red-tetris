import { createContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { gameStartAction, joinRoomSuccess, playerDropAction, playerMoveAction, playerResetAction, playerRotateAction, updateChatLog } from "./actions";
import io from "socket.io-client";

const WebSocketContext = createContext(null);

export { WebSocketContext };

export default ({ children }) => {
    let socket;
    const ws = useRef(null);
    const dispatch = useDispatch();

    const sendMessage = (roomId, message) => {
        const payload = {
            roomId: roomId,
            data: message
        }
        socket.emit("event://send-message", JSON.stringify(payload));
        dispatch(updateChatLog(payload));
    }

    const playerJoin = (roomName, nickName) => {
        socket.emit("event://player-join", {
            roomName,
            nickName
        });
    }
    const gameStart = () => {
        socket.emit("event://game-start");
    }
    
    const playerReset = () => {
        socket.emit("event://player-reset");
    }
    
    const playerMove = (dir) => {
        socket.emit("event://player-move", { dir });
    }
    
    const playerDrop = () => {
        socket.emit("event://player-drop");
    }
    
    const playerRotate = (dir) => {
        socket.emit("event://player-rotate", { dir });
    }
    if (!socket) {
        socket = io.connect("http://localhost:3004");
        socket.on("event://get-message", (msg) => {
            const payload = JSON.parse(msg);
            console.log(payload);
            dispatch(updateChatLog(payload));
        });
        socket.on("event://player-join", (payload) => {
            console.log(payload);
            dispatch(joinRoomSuccess(payload));
        })
        socket.on("event://game-start", (payload) => {
            dispatch(gameStartAction(payload));
        });
        socket.on("event://player-reset", (payload) => {
            dispatch(playerResetAction(payload));
        });
        socket.on("event://player-move", (payload) => {
            dispatch(playerMoveAction(payload));
        });
        socket.on("event://player-drop", (payload) => {
            dispatch(playerDropAction(payload));
        });
        socket.on("event://player-rotate", (payload) => {
            dispatch(playerRotateAction(payload));
        });
        ws.current = {
            socket: socket,
            sendMessage,
            gameStart,
            playerReset,
            playerMove,
            playerDrop,
            playerRotate,
            playerJoin
        }
    }
    console.log(ws);

    return (
        <WebSocketContext.Provider value={ws.current}>
            {children}
        </WebSocketContext.Provider>
    )
}