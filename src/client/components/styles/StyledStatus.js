import styled from "styled-components";

export const StyledStatus = styled.div`
	position: absolute;
	top: 50%;
	right: 50%;
	font-size: calc(4vmin * ${(props) => props.scale});
	transform: translateX(50%);
	font-family: Pixel, Arial, Helvetica, sans-serif;
    color: white;
`;
