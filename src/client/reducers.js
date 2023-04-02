import { CREATE_ROOM_SUCCESS, GAME_START, JOIN_ROOM_SUCCESS, PLAYER_MOVE, PLAYER_RESET, SET_USERNAME, UPDATE_CHAT_LOG, PLAYER_DROP, PLAYER_ROTATE } from './actions';

const initialState = {
    room: null,
    chatLog: [],
    username: null,
    player: null
}

export default function chatReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }

    switch(action.type) {
        case CREATE_ROOM_SUCCESS:
            console.log("got to CREATE_ROOM_SUCCESS reducer");
            state.room = action.payload;
            break;
        
        case JOIN_ROOM_SUCCESS:
            console.log("got to JOIN_ROOM_SUCCESS reducer");
            state.room = action.payload;
            break;

        case SET_USERNAME:
            console.log("got to SET_USERNAME reducer");
            state.username = action.username;
            break;
        
        case UPDATE_CHAT_LOG:
            console.log("got to UPDATE_CHAT_LOG reducer");
            console.log(state);
            if (state.room !== null && action.update.roomId === state.room.name) {
                state.chatLog = [...state.chatLog, action.update.data];
            }
            break;
        case GAME_START:
            console.log("got GAME_START reducer");
            state.player = action.player;
            break;
        case PLAYER_RESET:
            console.log("got RESET_PLAYER reducer");
            state.player = action.player;
            break;
        case PLAYER_MOVE:
            console.log("got PLAYER_MOVE reducer");
            state.player = action.player;
            break;
        case PLAYER_DROP:
            console.log("got PLAYER_DROP reducer");
            state.player = action.player;
            break;
        case PLAYER_ROTATE:
            console.log("got PLAYER_ROTATE reducer");
            state.player = action.player;
            break;
    }
    return state;
}
