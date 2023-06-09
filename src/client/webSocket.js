import { createContext, useRef } from "react";
import { useDispatch } from "react-redux";
import { changeModeAction, gameStartAction, joinRoomSuccess, playerDropAction, playerMoveAction, playerOutAction, playerReadyAction, playerResetAction, playerRotateAction, resetStateAction, updateChatLog } from "./actions";
import io from "socket.io-client";

const WebSocketContext = createContext(null);

export { WebSocketContext };

let socketInstance = null;

const getSocketInstance = () => {
  if (!socketInstance) {
    socketInstance = io.connect("http://localhost:3004");
  }
  return socketInstance;
};

const resetSocketInstance = () => {
  socketInstance = null;
}

export default ({ children }) => {
  const socket = useRef(null);
  const dispatch = useDispatch();
  const sendMessage = (roomId, message) => {
    const payload = {
      roomId: roomId,
      data: message
    };
    getSocketInstance().emit("event://send-message", JSON.stringify(payload));
    dispatch(updateChatLog(payload));
  };

  const playerJoin = (roomName, nickName) => {
    if (getSocketInstance()) {
      getSocketInstance().emit("event://player-join", {
        roomName,
        nickName
      });
    }
  };
  const gameStart = () => {
    getSocketInstance().emit("event://game-start");
  };

  const playerReset = () => {
    getSocketInstance().emit("event://player-reset");
  };

  const playerMove = (dir) => {
    getSocketInstance().emit("event://player-move", { dir });
  };

  const playerDrop = () => {
    getSocketInstance().emit("event://player-drop");
  };

  const playerRotate = (dir) => {
    getSocketInstance().emit("event://player-rotate", { dir });
  };

  const changeMode = (mode) => {
    getSocketInstance().emit("event://mode-change", mode);
  }

  const verticalDrop = () => {
    getSocketInstance().emit("event://player-vertical-drop");
  }

  const disconnect = () => {
    getSocketInstance().disconnect();
    resetSocketInstance();
  }

    const socketInstance = getSocketInstance();
    socket.current = socketInstance;
    socketInstance.on("event://get-message", (msg) => {
      const payload = JSON.parse(msg);
      dispatch(updateChatLog(payload));
    });
    socketInstance.on("event://player-join", (payload) => {
      dispatch(joinRoomSuccess(payload));
    });
    socketInstance.on("event://game-start-broadcast", (payload) => {
      dispatch(gameStartAction(payload));
    });
    socketInstance.on("event://player-reset", (payload) => {
      dispatch(playerResetAction(payload));
    });
    socketInstance.on("event://player-move", (payload) => {
      dispatch(playerMoveAction(payload));
    });
    socketInstance.on("event://player-drop", (payload) => {
      dispatch(playerDropAction(payload));
    });
    socketInstance.on("event://player-rotate", (payload) => {
      dispatch(playerRotateAction(payload));
    });
    socketInstance.on("event://player-ready", (payload) => {
      dispatch(playerReadyAction(payload));
    });
    socketInstance.on("disconnect", () => {
      dispatch(resetStateAction());
    });
    socketInstance.on("event://player-out", (payload) => {
      dispatch(playerOutAction(payload));
    });
    socketInstance.on("event://mode-change", (mode) => {
      dispatch(changeModeAction(mode));
    })
  
  

  const ws = {
    socket: socket.current,
    sendMessage,
    gameStart,
    playerReset,
    playerMove,
    playerDrop,
    playerRotate,
    playerJoin,
    changeMode,
    verticalDrop,
    disconnect
  };

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  );
};