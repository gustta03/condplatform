import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  height: 47px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 10px;
  color: #7f8da1;
  overflow: hidden;
  cursor: pointer;
  font-size: 14px;
  p {
    margin: 0 0 0 10px;
  }
  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    color: inherit;
  }
  &:hover {
    background-color: #f1f3f4;
  }
`;

export const TitleType = styled.div`
  margin: 10px 13px;
  color: #7f8da1;
  font-size: 14px;
  font-weight: bold;
`;
