import { createContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateChatLog } from "./actions";
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

    const sendResetPlayer = () => {
        socket.emit("event://reset-player");
    }
    useEffect(() => {
        if (!socket) {
            socket = io.connect("http://localhost:3004");
            socket.on("event://get-message", (msg) => {
                const payload = JSON.parse(msg);
                console.log(payload);
                dispatch(updateChatLog(payload));
            });
            ws.current = {
                socket: socket,
                sendMessage
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