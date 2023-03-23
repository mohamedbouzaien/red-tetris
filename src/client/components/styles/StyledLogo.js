import styled from "styled-components";

export const StyledLogo = styled.h1`
    font-family: Pixel, Arial, Helvetica, sans-serif;
    color: ${props => (props.first ? 'red' : '#999')};
    font-size: 2.8em;
    padding-left: ${props => (props.first ? '40%' : '45%')};
`;