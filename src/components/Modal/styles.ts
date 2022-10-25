import styled from "styled-components";

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #000;
`;

export const Content = styled.div`
  margin: 0 auto;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  width: 100vw;
  height: 110vh;
  background-color: rgba(0, 0, 0, 0.3);
  animation: fadeIn 300ms ease-out;

  button {
    cursor: pointer;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export const FormMain = styled.div`
  width: 450px;
  height: auto;
  padding: 20px 10px;
  background-color: #FFF;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

`;

export const EditArea = styled.div`
  border-radius: 5px;
`;

export const ButtonCloseArea = styled.div`
  display: flex;
  justify-content: end;
  width: 90%;
`

export const ModalFormArea = styled.div`
  width: 100%;
  height: auto;


  form {
    height: auto;
    width: 95%;
    margin: 0 auto;
  }

  p{
    color: red;
  }
`;

export const ButtonModalArea = styled.span`
  width: 97%;
  display: flex;
  justify-content: end;
  height: 50px;
  margin: 0 auto;

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

export const Hr = styled.div`
 width: 100%;
 border-top: 1px solid #000;
 border-bottom: 1px solid #000;
`