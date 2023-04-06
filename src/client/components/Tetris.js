import React, { useState, useContext, useEffect } from "react";
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
    const player = useSelector(state =>state.player);
    const gameOver = useSelector(state => state.gameOver);
    const room = useSelector(state => state.room);
    const [dropTime, setDropTime] = useState(null);
    console.log(player);
    console.log(room);
    const ws = useContext(WebSocketContext);
    console.log('re-render');
    const startGame = async () => {
        await ws.gameStart();
    }
    

    const move = async ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) {
                await ws.playerMove(-1);
            } else if (keyCode === 39) {
                await ws.playerMove(1);
            } else if (keyCode === 40) {
                await ws.playerDrop();
            } else if (keyCode === 38) {
                await ws.playerRotate(1);
            }
        }
    }

    useEffect(() => {
        if (room?.isStarted === true) {
            setDropTime(player?.dropTime);
        }
     },[player]) 

    useInterval(async () => {
        if (!gameOver)
            await ws.playerDrop();
    }, dropTime);

    return (
                <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={ e => move(e)}>
                    <StyledTetris>
                        <Stage stage={ player ? player.stage : null }/>
                        <aside>
                            {gameOver ? (
                                <Display gameOver={gameOver} text="Game Over" />
                            ) : (
                            <div>
                                <Display text={`Score: ${player ? player.score : 0}`} />
                                <Display text={`Rows: ${player ? player.rows : 0}`} />
                                <Display text={`Level: ${player ? player.level : 0}`} />
                            </div>
                            )}
                            <StartButton text={room && player && room.ownerName === player.nickname ? "Start" : "Ready" } callback={startGame}/>
                        </aside>

                    </StyledTetris>
                    {
                        room && player &&
                        room.players.map((p) => p.nickname === player.nickname ? 
                        <div key={p.nickname}></div> : 
                        <Stage key={p.nickname} stage={p.stage}/>
                        )
                    }
                    <Chat history={history} match={match}/>
                </StyledTetrisWrapper>
    )
}

export default React.memo(Tetris);
