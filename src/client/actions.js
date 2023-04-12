export const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST";
export const UPDATE_CHAT_LOG = "UPDATE_CHAT_LOG";
export const CREATE_ROOM_REQUEST = "CREATE_ROOM_REQUEST";
export const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS";
export const CREATE_ROOM_ERROR = "CREATE_ROOM_ERROR";
export const JOIN_ROOM_REQUEST = "JOIN_ROOM_REQUEST";
export const JOIN_ROOM_SUCCESS = "JOIN_ROOM_SUCCESS";
export const JOIN_ROOM_ERROR = "JOIN_ROOM_ERROR";
export const SET_USERNAME = "SET_USERNAME";
export const GAME_START = "GAME_START";
export const PLAYER_RESET = "PLAYER_RESET";
export const PLAYER_MOVE = "PLAYER_MOVE";
export const PLAYER_DROP = "PLAYER_DROP";
export const PLAYER_ROTATE = "PLAYER_ROTATE";
export const PLAYER_READY = "PLAYER_READY";
export const RESET_STATE = "RESET_STATE";
export const PLAYER_OUT = "PLAYER_OUT";
export const CHANGE_MODE = "CHANGE_MODE";

export function createRoomSuccess(payload) {
    return {
        type: CREATE_ROOM_SUCCESS,
        payload
    }
}

export function joinRoomSuccess(payload){
    return {
        type: JOIN_ROOM_SUCCESS,
        payload
    }
}

export function setUsername(username) {
    return {
        type: SET_USERNAME,
        username
    }
}

export function updateChatLog(update) {
    return {
        type: UPDATE_CHAT_LOG,
        update
    }
}

export function gameStartAction(payload) {
    return {
        type: GAME_START,
        payload
    }
}

export function playerResetAction(payload) {
    return {
        type: PLAYER_RESET,
        payload
    }
}

export function playerMoveAction(payload) {
    return {
        type: PLAYER_MOVE,
        payload
    }
}

export function playerDropAction(payload) {
    return {
        type: PLAYER_DROP,
        payload
    }
}

export function playerRotateAction(payload) {
    return {
        type: PLAYER_ROTATE,
        payload
    }
}

export function playerReadyAction(payload) {
    return {
        type: PLAYER_READY,
        payload
    }
}

export function resetStateAction() {
    return {
        type: RESET_STATE
    }
}

export function playerOutAction(payload) {
    return {
        type: PLAYER_OUT,
        payload
    }
}

export function changeModeAction(mode) {
    return {
        type: CHANGE_MODE,
        mode
    }
}
