import React, { useState } from "react";
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
    const resetedPlayer = useSelector(state =>state.player);
    const dispatch = useDispatch();
    console.log('re-render');
    const movePlayer = dir => {
        if (!checkCollision(player, stage, {x: dir, y: 0})) {
            updatePlayerPos({
                x: dir,
                y: 0
            });
        }
    }

    const startGame = () => {
        setStage(createStage());
        setDropTime(1000);
        dispatch(resetPlayer());
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
                movePlayer(-1);
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer();
            } else if (keyCode === 38) {
                playerRotate(stage, 1);
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime);

    return (
        <Provider store={store}>
            <WebSocketProvider>
                <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={ e => move(e)}>
                    <StyledTetris>
                        <Stage stage={ stage }/>
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
