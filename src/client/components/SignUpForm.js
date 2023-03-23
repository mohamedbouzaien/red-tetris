import { useState } from "react";
import { StyledInput } from "./styles/StyledInput";
import { StyledTetrisWrapper } from "./styles/StyledTetris";
import { StyledSignupButton } from "./styles/StyledSignupButton";
import { StyledFormWrapper } from "./styles/StyledFormWrapper";
import { StyledInputLabel } from "./styles/StyledInputLabel";
import { StyledInputDiv } from "./styles/StyledInputDiv";
import { StyledLogo } from "./styles/StyledLogo";
import { StyledLogoWrapper } from "./styles/StyledLogoWrapper";

const SignUpForm = () => {
    const [inputs, setInputs] = useState({
        room: "",
        nickname: ""
    });
    const { room, nickname } = inputs;
    const handleSubmit = () => {

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
                        <StyledInputLabel>
                            Room:
                        </StyledInputLabel>
                        <StyledInput type="text" name="room" value={room} onChange={ handleChange }/>
                    </StyledInputDiv>
                    <StyledInputDiv>
                        <StyledInputLabel>
                            Nickname:
                        </StyledInputLabel>
                        <StyledInput type="text" name="nickname" value={nickname} onChange= { handleChange }/>
                    </StyledInputDiv>
                    <StyledInputDiv>
                        <StyledSignupButton type="submit" value="Submit" />
                    </StyledInputDiv>
                </form>
            </StyledFormWrapper>
        </StyledTetrisWrapper>
    );
}
export default SignUpForm;