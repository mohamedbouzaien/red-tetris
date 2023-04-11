
 

import React from "react";
import Tetris from "../src/client/components/Tetris";
import { render, cleanup, waitFor } from "@testing-library/react";
import WebSocketProvider from '../webSocket';
import store from "../store";
import { Provider } from "react-redux";
import { PLAYER_STATUS } from "../src/client/gameHelper";
import "@testing-library/jest-dom";

const customRender = (children, socket, tetris) => {
	return render(
        <Provider store={store}>
        <WebSocketProvider>
				{children}
        </WebSocketProvider>
        </Provider>
	);
};

const socket = {
	id: "myid",
	emit: jest.fn(),
};

const tetris = {
	players: {
		myid: {
			id: "myid",
			name: "wpark",
			status: PLAYER_STATUS.INIT,
			score: 0,
			nextPiece: "",
		},
		otherid: {
			id: "otherid",
			name: "toto",
			status: PLAYER_STATUS.INIT,
			score: 0,
			nextPiece: "",
		},
	},
	owner: "",
	dropTime: null,
	isStarted: false,
};

afterEach(() => {
	cleanup();
});

describe("<Tetris />", () => {
	it("renders Tetris", () => {
		customRender(<Tetris />, socket, tetris);
	});
	it("shows start buttom if I am owner", () => {
		tetris.owner = "myid";
		tetris.isStarted = false;
		const { getByText } = customRender(<Tetris />, socket, tetris);
		getByText("start");
	});
	it("disabled start button if game is started", () => {
		tetris.owner = "myid";
		tetris.isStarted = true;
		const { getByText } = customRender(<Tetris />, socket, tetris);
		expect(getByText("start")).toBeDisabled();
	});
	it("disabled start button if other player are not ready", () => {
		tetris.owner = "myid";
		tetris.isStarted = false;
		tetris.players["otherid"].status = PLAYER_STATUS.INIT;
		const { getByText } = customRender(<Tetris />, socket, tetris);
		expect(getByText("start")).toBeDisabled();
	});
	it("shows ready buttom if I am not owner", () => {
		tetris.owner = "otherid";
		tetris.isStarted = false;
		const { getByText } = customRender(<Tetris />, socket, tetris);
		getByText("ready");
	});
	it("disabled ready buttom if game is started", () => {
		tetris.owner = "otherid";
		tetris.isStarted = true;
		const { getByText } = customRender(<Tetris />, socket, tetris);
		expect(getByText("ready")).toBeDisabled();
	});
	it("disabled ready buttom if I am ready", () => {
		tetris.owner = "otherid";
		tetris.isStarted = false;
		tetris.players["myid"].status = PLAYER_STATUS.READY;
		const { getByText } = customRender(<Tetris />, socket, tetris);
		expect(getByText("ready")).toBeDisabled();
	});

	it("send socket 'PLAYER:DROPDOWN' event if dropTime is not null", async () => {
		tetris.isStarted = true;
		tetris.dropTime = 10;
		customRender(<Tetris />, socket, tetris);
		await waitFor(() =>
			expect(socket.emit).toHaveBeenCalledWith("PLAYER:DROPDOWN", {
				type: "DOWN",
			}),
		);
	});
	it("sows empty view if me doesn't exist", () => {
		delete tetris.players["myid"];
		customRender(<Tetris />, socket, tetris);
	});
});