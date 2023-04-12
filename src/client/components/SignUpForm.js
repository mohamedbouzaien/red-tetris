import { useState } from "react";
import { StyledInput } from "./styles/StyledInput";
import { StyledTetrisWrapper } from "./styles/StyledTetris";
import { StyledSignupButton } from "./styles/StyledSignupButton";
import { StyledFormWrapper } from "./styles/StyledFormWrapper";
import { StyledInputLabel } from "./styles/StyledInputLabel";
import { StyledInputDiv } from "./styles/StyledInputDiv";
import { StyledLogo } from "./styles/StyledLogo";
import { StyledLogoWrapper } from "./styles/StyledLogoWrapper";
import { StyledErrorMessage } from "./styles/StyledErrorMessage";

const SignUpForm = ({ history }) => {
    const [inputs, setInputs] = useState({
        room: "",
        nickname: "",
        message: ""
    });
    const { room, nickname, message } = inputs;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputs.room === "" || inputs.nickname === "") {
            setInputs({
                room : "",
                nickname: "",
                message: "Please change blank input"
            });
        } else {
            await fetch("http://localhost:3004/api/room", {
                method: "POST",
                body: JSON.stringify({
                    name: room,
                    nickname
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((res) =>
                res.json()
            ).then((result) => {
                if (result.error) {
                    setInputs({
                        room : room,
                        nickname: nickname,
                        message: result.error
                    });
                } else {
                    history.push(`/${room}[${nickname}]`);
                }
            }).catch((error) => {
                console.error("Error:", error);
            });
        }
    }

    const handleChange = (e) => {
		const { value, name } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});
    }
    return(
        <StyledTetrisWrapper role="button" tabIndex={0}>
            <StyledLogoWrapper>
                <StyledLogo first={ true }>RED</StyledLogo>
                <StyledLogo first={ false }>TETRIS</StyledLogo>
            </StyledLogoWrapper>
            <StyledFormWrapper>
                <form onSubmit={ handleSubmit }>
                    <StyledInputDiv>
                        <StyledInputLabel htmlFor="room">
                            Room:
                        </StyledInputLabel>
                        <StyledInput type="text" name="room" id="room" value={room} onChange={ handleChange }/>
                    </StyledInputDiv>
                    <StyledInputDiv>
                        <StyledInputLabel htmlFor="nickname">
                            Nickname:
                        </StyledInputLabel>
                        <StyledInput type="text" name="nickname" id="nickname" value={nickname} onChange= { handleChange }/>
                    </StyledInputDiv>
                    <StyledInputDiv>
                        <StyledSignupButton type="submit" value="Start" />
                    </StyledInputDiv>
                    <StyledErrorMessage message={message}> {message} </StyledErrorMessage>
                </form>
            </StyledFormWrapper>
        </StyledTetrisWrapper>
    );
}
export default SignUpForm;