import React from "react";
import { StyledStartButton } from "./styles/StyledStartButton";

const StartButton = ({ text, callback }) => (
    <StyledStartButton onClick={callback}>{text}</StyledStartButton>
);

export default StartButton;