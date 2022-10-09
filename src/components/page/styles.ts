import styled from "styled-components";

interface Props {
  disp: boolean
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
