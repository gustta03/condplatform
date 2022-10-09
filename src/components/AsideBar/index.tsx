import { SideBarData } from "../SideBarData/SideBarData";
import { Link } from "react-router-dom";
import { TitleType, Container } from "./styled";

export const AsideItem = () => {
  return (
    <>
      {SideBarData.map((item, index) => {
        return (
          <div key={index}>
            <TitleType>{item.type}</TitleType>
            <Container>
              <Link to={item.link}>
                <span>{item.icon}</span>
                <p>{item.title}</p>
              </Link>
            </Container>
          </div>
        );
      })}
    </>
  );
};
