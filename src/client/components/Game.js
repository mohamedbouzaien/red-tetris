import React from "react";
import Tetris from "./Tetris";
import WebSocketProvider from '../webSocket';
import store from "../store";
import { Provider } from "react-redux";
const Game = ({history, match }) => {
    console.log("rerender");
return (
    <Provider store={store}>
        <WebSocketProvider>
            <Tetris history={history} match={match}/>
        </WebSocketProvider>
    </Provider>
);
}
export default React.memo(Game);