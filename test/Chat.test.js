import React from 'react';
import { render, fireEvent, act, getByTestId } from '@testing-library/react';
import Chat from '../src/client/components/Chat';
import { WebSocketContext } from '../src/client/webSocket';
import { setUsername } from '../src/client/actions';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import io from 'socket.io-mock';

const mockStore = configureStore([]);

describe('Chat component', () => {
  let ws;
  let store;
  let socket;

  beforeEach(() => {
    socket = new io();
    const playerJoin = (roomName, nickName) => {
      socket.socketClient.emit("event://player-join", {
        roomName,
        nickName
      });
    }
    const sendMessage = (roomId, message) => {
      const payload = {
        roomId: roomId,
        data: message
      };
      socket.socketClient.emit("event://send-message", JSON.stringify(payload));
    };
    ws = {
      socket,
      playerJoin,
      sendMessage
    }
    store = mockStore({
      username: '',
      chatLog: []
    });
  });

  afterEach(() => {
    //socket.close();
  });

  it('should render chat history', async () => {
    const chatLog = [
      { username: 'John', message: 'Hi there' },
      { username: 'Jane', message: 'Hey John' }
    ];
    store = mockStore({
      username: 'John',
      chatLog: chatLog
    });
    const { getByText } = render(
      <WebSocketContext.Provider value={ws}>
        <Provider store={store}>
          <Chat match={{ params: { roomName: 'testRoom', userName: 'John' } }} />
        </Provider>
      </WebSocketContext.Provider>
    );

    expect(getByText('Hi there')).toBeInTheDocument();
    expect(getByText('Hey John')).toBeInTheDocument();
  });

  it('should send message on button', async () => {
    store.dispatch = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <WebSocketContext.Provider value={ws}>
        <Provider store={store}>
          <Chat match={{ params: { roomName: 'testRoom', userName: 'John' } }} />
        </Provider>
      </WebSocketContext.Provider>
    );

    const input = getByPlaceholderText('Your message...');
    const button = getByTestId("chat-send-button");
    fireEvent.change(input, { target: { value: 'Hello, world!' } });
    fireEvent.click(button);

    await act(async () => {
      ws.socket.socketClient.emit("event://player-join", {
        username: 'John',
        message: 'Hello, world!'
      });
    });

    expect(store.dispatch).toHaveBeenCalledWith(
      setUsername('John')
    );
  });
  it('should send message on key down', async () => {
    store.dispatch = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <WebSocketContext.Provider value={ws}>
        <Provider store={store}>
          <Chat match={{ params: { roomName: 'testRoom', userName: 'John' } }} />
        </Provider>
      </WebSocketContext.Provider>
    );

    const input = getByPlaceholderText('Your message...');
    fireEvent.change(input, { target: { value: 'Hello, world!' } });
    fireEvent.keyDown(input, { keyCode: 13 });

    await act(async () => {
      ws.socket.socketClient.emit("event://player-join", {
        username: 'John',
        message: 'Hello, world!'
      });
    });

    expect(store.dispatch).toHaveBeenCalledWith(
      setUsername('John')
    );
  });

  it('should send message on key down wrong one', async () => {
    store.dispatch = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <WebSocketContext.Provider value={ws}>
        <Provider store={store}>
          <Chat match={{ params: { roomName: 'testRoom', userName: 'John' } }} />
        </Provider>
      </WebSocketContext.Provider>
    );

    const input = getByPlaceholderText('Your message...');
    fireEvent.change(input, { target: { value: 'Hello, world!' } });
    fireEvent.keyDown(input, { keyCode: 15 });

    await act(async () => {
      ws.socket.socketClient.emit("event://player-join", {
        username: 'John',
        message: 'Hello, world!'
      });
    });

    expect(store.dispatch).toHaveBeenCalledWith(
      setUsername('John')
    );
  });
});