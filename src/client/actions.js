export const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST";
export const UPDATE_CHAT_LOG = "UPDATE_CHAT_LOG";

export const CREATE_ROOM_REQUEST = "CREATE_ROOM_REQUEST";
export const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS";
export const CREATE_ROOM_ERROR = "CREATE_ROOM_ERROR";

export const JOIN_ROOM_REQUEST = "JOIN_ROOM_REQUEST";
export const JOIN_ROOM_SUCCESS = "JOIN_ROOM_SUCCESS";
export const JOIN_ROOM_ERROR = "JOIN_ROOM_ERROR";

export const SET_USERNAME = "SET_USERNAME";

export function createRoomRequest() {
    return {
        type: CREATE_ROOM_REQUEST
    }
}

export function createRoomSuccess(payload) {
    return {
        type: CREATE_ROOM_SUCCESS,
        payload
    }
}

export function createRoomError(error) {
    return {
        type: CREATE_ROOM_ERROR,
        error
    }
}

export function createRoom(roomName) {
    return async function (dispatch) {
        dispatch(createRoomRequest());
        try{
            const response = {
                data : {
                    message: "Ya lahwi"
                }
            }
            dispatch(createRoomSuccess(response.data));
        }catch(error){
            dispatch(createRoomError(error));
        }
    }
}

export function joinRoomRequest(){
    return {
        type: JOIN_ROOM_REQUEST
    }
}

export function joinRoomSuccess(payload){
    return {
        type: JOIN_ROOM_SUCCESS,
        payload
    }
}

export function joinRoomError(error){
    return {
        type: JOIN_ROOM_ERROR,
        error
    }
}

export function joinRoom(roomId) {
    return async function (dispatch) {
        dispatch(joinRoomRequest());
        try{
            const response = {
                data: {
                    message: "Joined za room"
                }
            }
            dispatch(joinRoomSuccess(response.data));
        }catch(error){
            dispatch(joinRoomError(error));
        }
    }
}

export function setUsername(username) {
    return {
        type: SET_USERNAME,
        username
    }
}