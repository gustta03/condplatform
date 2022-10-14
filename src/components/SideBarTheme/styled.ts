import styled from 'styled-components';

export const Container = styled.div`
  height: 100px;
  display: flex;
  color: #7f8da1;
  flex-direction: column;     
  font-family: Nunito, sans-serif;
`;

export const Content = styled.div`
  color: #7f8da1;
  background-color: #fff;

  width: 100%;

  h5 {
    font-size: 16px;
    font-weight: 200;
  }
`;

export const AsideBar = styled.div`
  width: 280px;
  height: 658px;
  background-color: #333840;
  display: flex;
  flex-direction: column;
`;

export const CardItem = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 10px 0 10px 0px;
  margin: 0 auto;
  color: #7f8da1;

  p {
    margin: 0 0 0 10px;
    font-weight: bold;
    font-size: 20px;
  }
`;

export const AsideBarItems = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 89px 0 10px 20px;
  color: #fff;
`;

export const DashboardList = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  height: 50px;
  cursor: pointer;

  span {
    margin: 0 10px 0 13px;
  }

  a {
    color: #7f8da1;
    text-decoration: none;
  }

  &:hover {
    background-color: #293846;
  }
`;

export const ThemeMain = styled.div`
  display: flex;
`;
export const Header = styled.div`
  width: 100%;
  height: 60px;
  background-color: #fff;
  box-shadow: 0px 10px 27px -19px rgba(0, 0, 0, 0.1);

  span {
    width: 50px;
    height: 50px;
    background-color: red;
  }
`;

export const HeaderContents = styled.div`
  width: 95%;
  height: 50%;
  margin: 6px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const ProfileArea = styled.div``;

export const SearchArea = styled.div`
  width: 250px;

  input {
    width: 171px;
    padding: 6px;
    outline: 0;
    border: 1px solid #e5e5e5;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  input::placeholder {
    color: #ccd1d9;
  }

  button {
    padding: 7px 15px;
    border: none;
    cursor: pointer;
    background-color: #5465ff;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    color: #fff;
  }
`;

export const PhotoUserArea = styled.div`
  display: flex;
  align-items: center;
  text-align: center;

  p {
    line-height: 5px;
    font-size: 13px;
    color: #7f8da1;
  }

  p:first-child {
    font-size: 14px;
    color: #000;
  }
`;
export const PhotoUser = styled.div`
  margin: 0 20px 0 20px;
  cursor: pointer;
`;

export const Body = styled.div`
  height: 250px;
  width: 95%;
  margin: 50px auto;

  span {
    background-color: #fff;
  }
`;
