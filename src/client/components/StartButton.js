import React from "react";
import { StyledStartButton } from "./styles/StyledStartButton";

const StartButton = ({ disabled, text, callback }) => (
    <StyledStartButton disabled={disabled? disabled : false} onClick={callback}>{text}</StyledStartButton>
);

export default StartButton;