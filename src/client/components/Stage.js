import React, { useEffect, useState } from "react";

import Cell from './Cell';
import { StyledStage } from "./styles/StyledStage";
import { StyledStatus } from "./styles/StyledStatus";
import { PLAYER_STATUS, createStage } from "../gamehelpers";

const Stage = ({ stage, scale, status }) => {
    const [message, setMessage] = useState("");
    if (!stage) {
        stage = createStage();
    }
    useEffect(() => {
        if (status === PLAYER_STATUS.READY) {
            setMessage("READY");
        } else if (status === PLAYER_STATUS.LOOSE) {
            setMessage("LOSER");
        } else if (status === PLAYER_STATUS.WIN) {
            setMessage("WINNER");
        } else {
            setMessage("");
        }
    }, [status]);
    return(
        
        <StyledStage width={stage[0].length} height={stage.length} scale={scale} data-testid="stage">
        {
            stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]}/>))
        }
            <StyledStatus scale={scale} data-testid="status-message">{message}</StyledStatus>
        </StyledStage>
    )};
export default Stage;
