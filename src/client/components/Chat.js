import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { WebSocketContext } from "../webSocket";
import { setUsername } from "../actions";
import { StyledChatHistoryDiv } from "./styles/StyledChatHistoryDiv";

const Chat = ({history, match}) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const { roomName, userName } = match.params;
    //const username = useSelector(state => state.username);
    const ws = useContext(WebSocketContext);
    const dispatch = useDispatch();
    useEffect(() => {
        //dispatch(joinRoom(roomName, userName));
        ws.playerJoin(roomName, userName);
        dispatch(setUsername(userName));
    }, [])
    const chats = useSelector(state => state.chatLog);
    const sendMessage = async () => {
      await ws.sendMessage(roomName, {
          username: userName,
          message: currentMessage
      });
      setCurrentMessage("");
    }

    const dispatchKey = async ({ keyCode }) => {
        if (keyCode === 13) {
            sendMessage();
        }
    };
    return (
        <>{userName &&
            <div>
                <StyledChatHistoryDiv>
                    {chats.map((c, i) => (
                            <div key={i}><i>{c.username}:</i> {c.message}</div>
                    ))}
                </StyledChatHistoryDiv>
                <div role="button" tabIndex="0" onKeyDown={ e => dispatchKey(e)}>
                    <input style={{width: "78%", marginLeft: "10px"}} type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} placeholder="Your message..."/>
                    <button onClick={sendMessage} style={{backgroundColor: "grey"}} data-testid="chat-send-button">&#9658;</button>
                </div>
            </div>
            }
        </>
    );
}
export default Chat;