import React, { useState, useContext } from "react";
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import Chat from "./Chat";
import WebSocketProvider, { WebSocketContext } from '../webSocket';
import { Provider, useSelector } from "react-redux";
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";
import { useStage } from "../hooks/useStage";
import { createStage } from "../gamehelpers";
import { useInterval } from "../hooks/useInterval";
import store from "../store";
import { randomTetromino } from "../tetrominos";

const Tetris = ({history, match}) => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const player = {
        pos: {
            x: 10 / 2 - 2,
            y: 0
        },
        tetromino: randomTetromino().shape,
        collided: false
    };//useSelector(state =>state.player);
    const resetPlayer = () => {};
    //const [stage, setStage] = useStage(player, resetPlayer);
    // const [stage, setStage] = useStage(player);
    //const ws = useContext(WebSocketContext);
    console.log('re-render');
    const startGame = async () => {
        //setStage(createStage());
        setDropTime(1000);
        //await ws.gameStart();
        setGameOver(false);
    }

    const move = async ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) {
                //await ws.playerMove(-1);
            } else if (keyCode === 39) {
                //await ws.playerMove(1);
            } else if (keyCode === 40) {
                //await ws.playerDrop();
            } else if (keyCode === 38) {
                //await ws.playerRotate(1);
            }
        }
    }

    useInterval(() => {
        //ws.playerDrop();
    }, dropTime);

    return (
        <Provider store={store}>
            <WebSocketProvider>
                <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={ e => move(e)}>
                    <StyledTetris>
                        { /*player &&
                        <Stage stage={ player.stage }/>
    */}
                        <aside>
                            {gameOver ? (
                                <Display gameOver={gameOver} text="Game Over" />
                            ) : (
                            <div>
                                <Display text="Score" />
                                <Display text="Rows" />
                                <Display text="Level" />
                            </div>
                            )}
                            <StartButton callback={startGame}/>
                        </aside>

                    </StyledTetris>
                    <Chat history={history} match={match}/>
                </StyledTetrisWrapper>
            </WebSocketProvider>
        </Provider>
    )
}

export default React.memo(Tetris);

/*import React, { useEffect, useState } from "react";
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import Chat from "./Chat";
import store from "../store"
import WebSocketProvider, { WebSocketContext } from '../webSocket';
import { Provider, useDispatch, useSelector } from "react-redux";
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { checkCollision, createStage } from "../gamehelpers";
import { useInterval } from "../hooks/useInterval";
import { joinRoom, setUsername } from "../actions";

const Tetris = ({history, match}) => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);
    //const resetedPlayer = useSelector(state =>state.player);
    //const dispatch = useDispatch();
    console.log('re-render');
    const movePlayer = dir => {
        if (!checkCollision(player, stage, {x: dir, y: 0})) {
            updatePlayerPos({
                x: dir,
                y: 0
            });
        }
    }
    useEffect(() => {
        console.log("here");
    }, [])
    const startGame = () => {
        //setStage(createStage());
        setDropTime(1000);
        //dispatch(resetPlayer());
        setGameOver(false);
    }

    const drop = () => {
        if (!checkCollision(player, stage, {x: 0, y: 1})) {
            updatePlayerPos({
                x: 0,
                y: 1,
                collided: false
            });
        } else {
            if (player.pos.y < 1) {
                console.log("Game over!");
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({x: 0, y: 0, collided: true});
        }
    }

    const dropPlayer = () => {
        drop();
    }

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) {
                //movePlayer(-1);
            } else if (keyCode === 39) {
                //movePlayer(1);
            } else if (keyCode === 40) {
                //dropPlayer();
            } else if (keyCode === 38) {
                //playerRotate(stage, 1);
            }
        }
    }

    useInterval(() => {
        //drop();
    }, dropTime);

    return (
        <Provider store={store}>
            <WebSocketProvider>
                <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={ e => move(e)}>
                    <StyledTetris>
                        {player && <Stage stage={ stage }/>}
                        <aside>
                            {gameOver ? (
                                <Display gameOver={gameOver} text="Game Over" />
                            ) : (
                            <div>
                                <Display text="Score" />
                                <Display text="Rows" />
                                <Display text="Level" />
                            </div>
                            )}
                            <StartButton callback={startGame}/>
                        </aside>
                    </StyledTetris>
                    <Chat history={history} match={match}/>
                </StyledTetrisWrapper>
            </WebSocketProvider>
        </Provider>
    )
}

export default React.memo(Tetris);
*/