import styled from "styled-components";

interface Props { 
    background: any
}

export const ButtonPage = styled.button<Props>`
 border: 1.9px solid #2C12D9;
 color: ${props => props.background ? '#CCC' : '#000'};
 background: ${props => props.background ? '#2C12D9' : '#f5f5f5'};
 cursor: pointer;
 padding: 5px 10px;
 border-radius: 3px;
 margin: 10px 0 0 2px;
`