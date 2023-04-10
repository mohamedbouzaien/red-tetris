import styled from "styled-components";

export const StyledModeDiv = styled.div`
    box-sizing: border-box;
    margin: 0 0 20px 0;
    padding: 20px;
    min-height: 30px;
    width: 100%;
    height: 50px;
    border: none;
    color: white;
    background: #333;
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: 1rem;
    outline: none;
    cursor: pointer;

    &:disabled {
        color: grey;
        opacity: 0.7;
        cursor: default;
      }
`;

export const StyledArrowButtons = styled.button`
  height: 50px;
  font-size: 2rem;
  color: white;
  box-sizing: border-box;
  background: #333;

  &:disabled {
    color: grey;
    opacity: 0.7;
    cursor: default;
  }
`;

export const StyledModeBoxDiv = styled.div`
  box-sizing: border-box;
  display: block;
  align-items: center;
  margin: 20px 20px 20px 0;
  padding: 20px;
  border: 4px solid #333;
  min-height: 30px;
  height: 150px;
  border-radius: 20px;
  color: #999;
  background: #000;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  text-align: center;
  position: absolute;
  top: 25%; left: 15%;
  transform: translate(-50%,-80%);
`;
