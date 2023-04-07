import styled from 'styled-components';

export const StyledStage = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 1px;
    border: 2px solid #333;
    width: 100%;
    max-width: 25vw;
    background: #111;
    width: calc(20vw * ${(props) => props.scale});
	height: calc(40vw * ${(props) => props.scale});
	min-width: calc(250px * ${(props) => props.scale});
	min-height: calc(500px * ${(props) => props.scale});
    margin: auto;
	position: relative;
`;