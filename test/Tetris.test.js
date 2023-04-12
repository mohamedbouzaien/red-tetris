import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Tetris from '../src/client/components/Tetris';
import { createStage } from '../src/client/gamehelpers';
import io from 'socket.io-mock';
import { WebSocketContext } from '../src/client/webSocket';

const mockStore = configureStore([]);

describe('Tetris component', () => {
  let store;
  let ws;
  let socket;

  beforeEach(() => {
	const chatLog = [
		{ username: 'John', message: 'Hi there' },
		{ username: 'Jane', message: 'Hey John' }
	  ];
	socket = new io();
    const playerJoin = (roomName, nickName) => {
        socket.socketClient.emit("event://player-join", {
          roomName,
          nickName
        });
      }
	const disconnect = () => {
		socket.socketClient.disconnect();
	  }
    ws = {
        socket,
        playerJoin,
		disconnect
    }
    store = mockStore({
      player: {
        nickname: 'Player1',
        stage: createStage(),
        score: 0,
        rows: 0,
        dropTime: 1000,
        status: 0,
      },
      gameOver: false,
      room: {
        players: [],
        isStarted: false,
        ownerName: 'Player1',
      },
      mode: 'STANDARD',
	  chatLog: chatLog
    });
  });

  it('should render the Tetris component correctly', () => {
    const { container } = render(
      <Provider store={store}>
		<WebSocketContext.Provider value={ws}>
        	<Tetris match={{ params: { roomName: 'testRoom', userName: 'John' } }}/>
		</WebSocketContext.Provider>
	  </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should call playerMove function when the left arrow key is pressed', () => {
    const { container } = render(
      <Provider store={store}>
		<WebSocketContext.Provider value={ws}>
        	<Tetris match={{ params: { roomName: 'testRoom', userName: 'John' } }}/>
		</WebSocketContext.Provider>
	  </Provider>
    );
    const wrapper = container.firstChild;
    const playerMove = jest.fn();
    wrapper.focus();
    wrapper.addEventListener('keydown', playerMove);
    fireEvent.keyDown(wrapper, { key: 'ArrowLeft', code: 37, charCode: 37 });
    expect(playerMove).toHaveBeenCalled();
  });

  it('should call playerRotate function when the up arrow key is pressed', () => {
    const { container } = render(
		<Provider store={store}>
		<WebSocketContext.Provider value={ws}>
        	<Tetris match={{ params: { roomName: 'testRoom', userName: 'John' } }}/>
		</WebSocketContext.Provider>
	  </Provider>
    );
    const wrapper = container.firstChild;
    const playerRotate = jest.fn();
    wrapper.focus();
    wrapper.addEventListener('keydown', playerRotate);
    fireEvent.keyDown(wrapper, { key: 'ArrowUp', code: 38, charCode: 38 });
    expect(playerRotate).toHaveBeenCalled();
  });

  it('should call playerDrop function when the down arrow key is pressed', () => {
    const { container } = render(
		<Provider store={store}>
		<WebSocketContext.Provider value={ws}>
        	<Tetris match={{ params: { roomName: 'testRoom', userName: 'John' } }}/>
		</WebSocketContext.Provider>
	  </Provider>
    );
    const wrapper = container.firstChild;
    const playerDrop = jest.fn();
    wrapper.focus();
    wrapper.addEventListener('keydown', playerDrop);
    fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 40, charCode: 40 });
    expect(playerDrop).toHaveBeenCalled();
  });

  it('should call playerMove function when the right arrow key is pressed', () => {
    const { container } = render(
		<Provider store={store}>
		<WebSocketContext.Provider value={ws}>
        	<Tetris match={{ params: { roomName: 'testRoom', userName: 'John' } }}/>
		</WebSocketContext.Provider>
	  </Provider>
    );
    const wrapper = container.firstChild;
    const playerMove = jest.fn();
    wrapper.focus();
    wrapper.addEventListener('keydown', playerMove);
    fireEvent.keyDown(wrapper, { key: 'ArrowRight', code: 39, charCode: 39 });
    expect(playerMove).toHaveBeenCalled();
  });

  it('should call verticalDrop function when the spacebar key is pressed', () => {
    const { container } = render(
		<Provider store={store}>
		<WebSocketContext.Provider value={ws}>
        	<Tetris match={{ params: { roomName: 'testRoom', userName: 'John' } }}/>
		</WebSocketContext.Provider>
	  </Provider>
    );
    const wrapper = container.firstChild;
    const verticalDrop = jest.fn();
    wrapper.focus();
    wrapper.addEventListener('keydown', verticalDrop);
    fireEvent.keyDown(wrapper, { key: ' ', code: 32, charCode: 32 });
    expect(verticalDrop).toHaveBeenCalled();
  });
});