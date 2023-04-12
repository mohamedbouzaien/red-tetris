import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import WebSocketProvider from "../src/client/webSocket";
import Game from "../src/client/components/Game";
import store from "../src/client/store";

describe("Game component", () => {
    test("renders Tetris component inside Provider and WebSocketProvider", () => {
        render(
            <Provider store={store}>
                <WebSocketProvider>
                    <Game match={{ params: { roomName: 'testRoom', userName: 'John' } }} />
                </WebSocketProvider>
            </Provider>
        );
        expect(screen.getByText('MODE')).toBeInTheDocument();
    });
});