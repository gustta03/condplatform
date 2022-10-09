import styled from "styled-components";

interface Props {
  bg: string | undefined;
}

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


export const Select = styled.select<Props>`
  display: block;
  width: 100%;
  margin: 5px 0 10px 0;
  padding: 8px 5px;
  border-radius: 3px;
  outline: 0;
  background-color: #eef0f2;
  border: ${props => props.bg ? '1px solid red' : 0};
`

export const Error = styled.p`
  color: red;
  /* margin-top: 10px; */

`

export const Input = styled.input<Props>`
  display: block;
  width: 98%;
  margin: 15px 0 10px 0;
  padding: 8px 5px;
  border-radius: 3px;
  outline: 0;
  background-color: #EEF0F2;
  border: ${props => props.bg ? '1px solid red' : 0};
`;

export const LineHorizont = styled.hr`
 width: 100%;
 color: #EEF0F2;
 margin: 20px 0;
`