import styled from "styled-components";

interface Props {
  bg: string | undefined;
}

export const Button = styled.button`
  width: 8rem;
  height: 40px;
  color: #fff;
  outline: 0;
  border: 0;
  cursor: pointer;
  margin: 5px 0 0 0;
  border-radius: 5px;
  background-color: #0048d9;
`;

export const Tables = styled.div`
  width: 100%;
  height: 30px auto;
  padding: 20px 5px;
  margin: 10px 0 0 0;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.06);
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f1f3f4;
  margin: 0 0 10px 0;
  padding: 0 10px 0 10px;
  border-radius: 5px;

  p {
    text-align: start;
    width: 150px;
  }
`;

export const TableContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0 0 10px;

  div {
    justify-content: space-between;
    border-bottom: 1px solid #f5f5f5;
    height: 50px;
    align-items: center;
    display: flex;

    p {
      text-align: start;
      font-size: 14px;
      width: 160px;
      display: block;
      background-color: red;
    }
  }
`;

export const EmptyAlert = styled.div`
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 70px auto;
`;

export const ModalFormArea = styled.div`
  width: 100%;
  height: auto;

  /* input {
    display: block;
    width: 95%;
    margin: 5px 0 10px 0;
    padding: 8px 5px;
    border-radius: 3px;
    outline: 0;
    background-color: #eef0f2;
    border: 0;
  } */

  form {
    height: auto;
    width: 95%;
    margin: 0 auto;
  }
`;
export const ButtonModalArea = styled.span`
  width: 97%;
  display: flex;
  justify-content: end;
  height: 50px;

  button {
    height: 30px;
    width: 80px;
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
    background-color: #0048d9;
    border-radius: 5px;
  }
`;

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

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`