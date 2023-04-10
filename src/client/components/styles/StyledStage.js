import styled from 'styled-components';

export const StyledStage = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 1px;
    border: 2px solid #333;
    width: 100%;
    max-width: 20vw;
    background: #111;
    width: calc(15vw * ${(props) => props.scale});
	height: calc(30vw * ${(props) => props.scale});
	min-width: calc(200px * ${(props) => props.scale});
	min-height: calc(400px * ${(props) => props.scale});
    margin: auto;
	position: relative;
`;
