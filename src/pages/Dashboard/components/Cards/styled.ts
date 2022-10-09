import styled from "styled-components";

export const CardMain = styled.div`
  height: 105px;
  display: flex;
  justify-content: space-around;
`;
export const Card = styled.div`
  width: 251px;
  background-color: #fff;
  border-radius: 5px;

  p {
    color: #bfc6d0;
    margin: 10px 0 0 20px;
  }

  div {
    font-size: 22px;
    width: 50px;
    height: auto;
    margin: 10px 0 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 40px;
    font-weight: 300;

    img {
      height: auto;
      margin: 0 30px 0 10px;
    }

    .groupicon {
      width: 50px;
      height: 60px;
      background-color: red;
    }
  }
`;
