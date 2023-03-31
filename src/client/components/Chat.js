import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { WebSocketContext } from "../webSocket";
import { joinRoom, setUsername } from "../actions";
import { StyledChatHistoryDiv } from "./styles/StyledChatHistoryDiv";

const Chat = ({history, match}) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const { roomName, userName } = match.params;
    //const username = useSelector(state => state.username);
    //const room = useSelector(state => state.room);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(joinRoom(roomName, userName));
        dispatch(setUsername(userName));
    }, [])
    const chats = useSelector(state => state.chatLog);
    console.log(chats);
    const ws = useContext(WebSocketContext);
    const sendMessage = async () => {
      await ws.sendMessage(roomName, {
          username: userName,
          message: currentMessage
      });
    }
    /*const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + 
                ":" + 
                new Date(Date.now()).getMinutes()
            };
            await socket.emit("send_message", messageData);
        }
    };*/
    return (
        <>{userName &&
            <div className="room">
                <StyledChatHistoryDiv>
                    {chats.map((c, i) => (
                            <div key={i}><i>{c.username}:</i> {c.message}</div>
                    ))}
                </StyledChatHistoryDiv>
                <div className="control">
                    <input type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)}/>
                    <button onClick={sendMessage}>&#9658;</button>
                </div>
            </div>
            }
        </>
    );
}
export default Chat;