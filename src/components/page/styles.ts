import styled from "styled-components";

interface Props {
  disp?: boolean;
  background?: boolean;
}

export const Container = styled.li`
  display: flex;
  align-items: center;
   div{
    margin: 0 10px 0 10px;
   }
`
export const ArrowRight = styled.div<Props>`
 display: ${props => props.disp === true ? 'none' : 'block'};
`

export const ButtonPage = styled.button<Props>`
 border: 1.9px solid #2C12D9;
 color: ${props => props.background ? '#CCC' : '#000'};
 background: ${props => props.background ? '#2C12D9' : '#f5f5f5'};
 cursor: pointer;
 padding: 5px 10px;
 border-radius: 3px;
 margin: 10px 0 0 2px;
`
