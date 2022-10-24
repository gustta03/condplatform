import styled from "styled-components"

interface Props {
  bg: string | undefined;
}

export const ButtonsContent = styled.div`
  width: 126px;
  margin: 0 25px 0 0px;
`

export const Input = styled.input<Props>`
  display: block;
  width: 98%;
  margin: 15px 0 10px 0;
  padding: 8px 5px;
  border-radius: 3px;
  outline: 0;
  background-color: #eef0f2;
  border: ${(props) => (props.bg ? "1px solid red" : 0)};
`;
