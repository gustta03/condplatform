import styled from "styled-components";

export const TableMain = styled.div`
  width: 100%;
  height: 30px auto;
  padding: 20px 5px;
  margin: 10px 0 0 0;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.06);

  table {
    width: 100%;
    border: 1;

    thead {
      background-color: #f1f5f7;
      .td {
        width: 86%;
      }

      td {
        padding: 10px 5px;
      }
    }

    tbody {
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  background-color: red;
`;

export const Thead = styled.thead`
  width: 500px;
  background-color: red;
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
    }
  }

`;
