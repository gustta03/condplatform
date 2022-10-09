import styled from "styled-components";
interface Props {
  bg: string | undefined;
}

export const ButtonsArea = styled.div`
  width: 170px;
`;

export const Button = styled.button`
  background-color: hsl(141, 53%, 53%);
  color: #fff;
  padding: 0 8px;
  border-radius: 4px;
  border: 0;
  height: 35px;
  cursor: pointer;
`;

export const ModalArea = styled.span`
  width: 97%;
  display: flex;
  justify-content: end;
  height: 50px;

  button {
    height: 40px;
    width: 90px;
    border: 0;
    outline: 0;
    margin: 5px 0 0 0;
    background-color: #002266;
    color: #fff;
    border-radius: 5px;
  }

  button:nth-child(1) {
    margin: 5px 10px 0 0;
    color: #fff;
    width: 120px;
    background-color: #0048d9;
    border-radius: 5px;
  }
`;

export const Buttonc = styled.button`
  background-color: #0048d9;
  color: #fff;
  height: 40px;
  width: 90px;
  border: 0;
  outline: 0;
  width: 120px;
  border-radius: 5px;
  cursor: pointer;
`;

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
