export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;
export const PLAYER_STATUS = {
    JOINDED: 0,
    READY: 1,
    PLAYING: 2,
    FINISHED: 3,
    WIN: 4,
    LOOSE: 5
};

export const GAME_MODE = {
    STANDARD: 0,
    HEART: 1,
    SPRINT: 2
};

export const createStage = () => 
    Array.from(Array(STAGE_HEIGHT), () => 
        new Array(STAGE_WIDTH).fill([0, 'clear']));
