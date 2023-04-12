import chatReducer from '../src/client/reducers';
import * as actions from '../src/client/actions';

describe('chatReducer', () => {
    const initialState = {
        room: null,
        chatLog: [],
        username: null,
        player: null,
        gameOver: false,
        isStarted: false,
        mode: 0
    };

    it('should return the initial state', () => {
        expect(chatReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle CREATE_ROOM_SUCCESS', () => {
        const payload = { room: { name: 'test' } };
        expect(
            chatReducer(initialState, actions.createRoomSuccess(payload))
        ).toEqual({
            ...initialState,
            room: payload.room,
        });
    });

    it('should handle JOIN_ROOM_SUCCESS', () => {
        const payload = {
            room: { name: 'test', players: [] },
            player: { nickname: 'tester', score: 'test' },
        };
        expect(
            chatReducer(initialState, actions.joinRoomSuccess(payload))
        ).toEqual({
            ...initialState,
            room: payload.room,
            mode: payload.room.mode,
            gameOver: payload.room.gameOver,
            player: payload.player,
        });
    });

    it('should handle SET_USERNAME', () => {
        const username = 'test';
        expect(
            chatReducer(initialState, actions.setUsername(username))
        ).toEqual({
            ...initialState,
            username,
        });
    });

    it('should handle UPDATE_CHAT_LOG', () => {
        const roomId = 'test';
        const update = { roomId, data: 'hello' };
        expect(
            chatReducer(initialState, actions.updateChatLog(update))
        ).toEqual(initialState);
    });

    it('should handle GAME_START', () => {
        const payload = { room: { name: 'test', isStarted: true, gameOver: true } };
        expect(
            chatReducer(initialState, actions.gameStartAction(payload))
        ).toEqual({
            ...initialState,
            room: payload.room,
            isStarted: true,
            gameOver: true,
        });
    });

    it('should handle PLAYER_RESET', () => {
        const payload = {
            room: { name: 'test', players: [] },
            player: { nickname: 'tester', score: 'test' },
        };
        expect(
            chatReducer(initialState, actions.playerResetAction(payload))
        ).toEqual({
            ...initialState,
            room: payload.room,
            player: payload.player,
        });
    });

    it('should handle PLAYER_MOVE', () => {
        const payload = {
            room: { name: 'test', players: [] },
            player: { nickname: 'tester', score: 'test' },
        };
        expect(
            chatReducer(initialState, actions.playerMoveAction(payload))
        ).toEqual({
            ...initialState,
            room: payload.room,
            player: payload.player,
        });
    });

    it('should handle PLAYER_DROP', () => {
        const payload = {
            room: { name: 'test', players: [], gameOver: true },
            player: { nickname: 'tester', score: 'test' },
        };
        expect(
            chatReducer(initialState, actions.playerDropAction(payload))
        ).toEqual({
            ...initialState,
            room: payload.room,
            player: payload.player,
            gameOver: true,
        });
    });

    it('should handle PLAYER_ROTATE', () => {
        const payload = {
            room: { name: 'test', players: [] },
            player: { nickname: 'tester', score: 'test' },
        };
        expect(
            chatReducer(initialState, actions.playerRotateAction(payload))
        ).toEqual({
            ...initialState,
            room: payload.room,
            player: payload.player,
        });
    });

    it('should handle PLAYER_READY', () => {
        const payload = {
            room: { name: 'test', players: [] },
            player: { nickname: 'tester', score: 'test' },
        };
        expect(
            chatReducer(initialState, actions.playerReadyAction(payload))
        ).toEqual({
            ...initialState,
            room: payload.room,
            player: payload.player,
        });
    });

    it('should handle RESET_STATE', () => {
        expect(
            chatReducer(initialState, actions.resetStateAction())
        ).toEqual(initialState);
    });

    it('should handle PLAYER_OUT', () => {
        const payload = {
            room: { name: 'test', players: [] }
        };
        expect(
            chatReducer(initialState, actions.playerOutAction(payload))
        ).toEqual({
            ...initialState,
            room: payload.room,
        });
    });

    it('should handle CHANGE_MODE', () => {
        const mode = 1;
        expect(
            chatReducer(initialState, actions.changeModeAction(mode))
        ).toEqual({
            ...initialState,
            mode: mode
        });
    });
});
