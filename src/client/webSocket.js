import { createContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { gameStartAction, playerDropAction, playerMoveAction, playerResetAction, playerRotateAction, updateChatLog } from "./actions";
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
        socket.emit("event://player-move", { dir });
    }
    useEffect(() => {
        if (!socket) {
            socket = io.connect("http://localhost:3004");
            socket.on("event://get-message", (msg) => {
                const payload = JSON.parse(msg);
                console.log(payload);
                dispatch(updateChatLog(payload));
            });
            socket.on("event://game-start", (payload) => {
                const player = JSON.parse(payload);
                console.log(player);
                dispatch(gameStartAction(player));
            });
            socket.on("event://player-reset", (payload) => {
                const player = JSON.parse(payload);
                console.log(player);
                dispatch(playerResetAction(player));
            });
            socket.on("event://player-move", (payload) => {
                const player = JSON.parse(payload);
                console.log(player);
                dispatch(playerMoveAction(player));
            });
            socket.on("event://player-drop", (payload) => {
                const player = JSON.parse(payload);
                console.log(player);
                dispatch(playerDropAction(player));
            });
            socket.on("event://player-rotate", (payload) => {
                const player = JSON.parse(payload);
                console.log(player);
                dispatch(playerRotateAction(player));
            });
            ws.current = {
                socket: socket,
                sendMessage,
                gameStart,
                playerReset,
                playerMove,
                playerDrop,
                playerRotate
            }
        }
    }, []);
    console.log(ws);

    return (
        <WebSocketContext.Provider value={ws.current}>
            {children}
        </WebSocketContext.Provider>
    )
}