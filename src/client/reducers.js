import { CREATE_ROOM_SUCCESS, JOIN_ROOM_SUCCESS, SET_USERNAME, UPDATE_CHAT_LOG } from './actions';

const initialState = {
    room: null,
    chatLog: [],
    username: null
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
            if (state.room !== null && action.update.roomId === state.room.id) {
                state.chatLog = [...state.chatLog, action.update.data];
            }
            break;
    }
    return state;
}
