import styled from "styled-components";

export const StyledErrorMessage = styled.div`
    color: #f3b9bd;
    background-image: url('https://i.imgur.com/GnyDvKN.png');
    background-repeat: no-repeat;
    background-position: 10px center;
    margin: 0px 0px;
    padding: 15px 10px 15px 50px;
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                rgba(60, 66, 87, 0.16) 0px 0px 0px 1px, 
                rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                rgba(0, 0, 0, 0) 0px 0px 0px 0px;
    border-radius: 4px;
    outline-color: #999999;
    display: ${props => (props.message === "" ? 'none' : 'inline')};
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
`;