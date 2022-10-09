import styled from 'styled-components';

export const FormMain = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Form = styled.div`
  width: 420px;
  height: 300px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 280px;

    form {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  }

  input {
    display: block;
    width: 252px;
    margin: 0 0 10px 0;
    padding: 10px 20px 10px 5px;
    border: 1px solid #d1d1d1;
    outline: 0;
  }
  button {
    width: 130px;
    height: 40px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #007aff;
    border: 0;
    outline: 0;
    color: #fff;
  }
`;
