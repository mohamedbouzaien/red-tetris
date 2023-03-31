import styled from "styled-components";

export  const StyledChatHistoryDiv = styled.div`
    width: 400px;
    border: 1px solid #ccc;
    height:400px; 
    text-align: left;
    padding: 10px;
    overflow: scroll;
    background: rgba(0, 0, 0, .6);
    i {
        color: pink;
        font-weight: bold;
        font-family: 'Roboto', sans-serif;
    }
    div {
        color: green;
        font-family: 'Roboto', sans-serif;
    }
`;