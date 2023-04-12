import { CREATE_ROOM_SUCCESS, GAME_START, JOIN_ROOM_SUCCESS, PLAYER_MOVE, 
    PLAYER_RESET, SET_USERNAME, UPDATE_CHAT_LOG, PLAYER_DROP, PLAYER_ROTATE, 
    PLAYER_READY, RESET_STATE, PLAYER_OUT, CHANGE_MODE } from './actions';
import { GAME_MODE } from './gamehelpers';

const initialState = {
    room: null,
    chatLog: [],
    username: null,
    player: null,
    gameOver: false,
    isStarted: false,
    mode: GAME_MODE.STANDARD
}

export default function chatReducer(state = initialState, action) {
    switch(action.type) {
        case CREATE_ROOM_SUCCESS:
            return {
                ...state,
                room: action.payload.room
            };
        
        case JOIN_ROOM_SUCCESS:
            if (action.payload.player) {
                return {
                    ...state,
                    player: action.payload.player,
                    room: action.payload.room,
                    mode: action.payload.room.mode,
                    gameOver: action.payload.room.gameOver
                };
            }
            return {
                ...state,
                room: action.payload.room
            };

        case SET_USERNAME:
            return {
                ...state,
                username: action.username
            };
        
        case UPDATE_CHAT_LOG:
            if (state.room !== null && action.update.roomId === state.room.name) {
                return {
                    ...state,
                    chatLog: [...state.chatLog, action.update.data]
                };
            }
            return state;
        
        case GAME_START:
            return {
                ...state,
                room: action.payload.room,
                isStarted: action.payload.room.isStarted,
                gameOver: action.payload.room.gameOver
            };
        
        case PLAYER_RESET:
            return {
                ...state,
                player: action.payload.player,
                room: action.payload.room
            };
        
        case PLAYER_MOVE:
            return {
                ...state,
                player: action.payload.player,
                room: action.payload.room
            };
        
        case PLAYER_DROP:
            return {
                ...state,
                player: action.payload.player,
                room: action.payload.room,
                gameOver: action.payload.room.gameOver
            };
        
        case PLAYER_ROTATE:
            return {
                ...state,
                player: action.payload.player,
                room: action.payload.room
            };

        case PLAYER_READY:
            return {
                ...state,
                player: action.payload.player,
                room: action.payload.room
            };

        case RESET_STATE:
            return initialState;

        case PLAYER_OUT:
            return {
                ...state,
                room: action.payload.room
            }

        case CHANGE_MODE:
            return {
                ...state,
                mode: action.mode
            }

        default:
            return state;
    }
}
