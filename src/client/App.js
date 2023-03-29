import React,  { useState } from "react";
import { Provider, useSelector, useDispatch } from 'react-redux';
import { createRoom, setUsername, joinRoom } from './actions';
import store  from "./store";
import Tetris from './components/Tetris';
import SignUpForm from "./components/SignUpForm";
import { HashRouter, Route } from "react-router-dom";

/*const App = () => (
  <div className="App">
    <HashRouter hashType="noslash">
        <Route path="/" exact component={SignUpForm} />
        <Route path="/:roomName[:userName]" component={Tetris} />
    </HashRouter>
  </div>
);
export default App;*/
function ChatRoom() {
  const [usernameInput, setUsernameInput] = useState("");
  const username = useSelector(state => state.username);
  const dispatch = useDispatch();

  function enterRooom(){
      dispatch(setUsername(usernameInput));
      console.log("Enter room function Chat component");
  }

  return (
      <div>
          {!username && 
          <div className="user">
              <input type="text" placeholder="Enter username" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
              <button onClick={enterRooom}>Enter Room</button>
          </div>  
          }
          {username &&
          <div className="room">
              <div className="history"></div>
              <div className="control">
                  <input type="text" />
                  <button>Send</button>
              </div>
          </div>
          }

      </div>
  )
}

function HomeComponent(){
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const currentRoom = useSelector(state => state.room);

  const dispatch = useDispatch();

  return (
          <>
              {!currentRoom && 
                  <div className="create">
                      <div>
                          <span>Create new room</span>
                          <input type="text" placeholder="Room name" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                          <button onClick={() => dispatch(createRoom(roomName))}>Create</button>
                      </div>
                      <div>
                          <span>Join existing room</span>
                          <input type="text" placeholder="Room code" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
                          <button onClick={() => dispatch(joinRoom(roomId))}>Join</button>
                      </div>
                  </div>  
              }

              {currentRoom && 
                  <ChatRoom />
              }
          </>
  );
}

function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <HomeComponent />
          </div>
      </Provider>
  )
}

export default App;
