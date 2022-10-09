import styled from "styled-components";

interface PropBg {
  bg: string;
}

export const Button = styled.button<PropBg>`
  background-color: ${prop => prop.bg === 'BlueBtn' ? "#2F48D9" : 'hsl(348, 100%, 61%)'};
  border: 0;
  color: #FFf;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  margin: 0 0 0 2px;
`