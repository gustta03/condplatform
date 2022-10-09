import { ReactNode } from "react";


import {
  AsideBar,
  Body,
  CardItem,
  Container,
  Content,
  DashboardList,
  Header,
  HeaderContents,
  PhotoUser,
  PhotoUserArea,
  ProfileArea,
  SearchArea,
  ThemeMain,
} from "./styled";


import { AsideItem } from "../AsideBar";


import { Link } from "react-router-dom";

import { BellRinging, ChartLine, HouseSimple, User } from "phosphor-react";
import { Notification } from 'phosphor-react'
import { Root } from "@radix-ui/react-dialog";

type Props = {
  children: ReactNode;
  // IsOpen: boolean | undefined
};

export const Theme = ({ children }: Props) => {
  return (
    <ThemeMain>
        <AsideBar>
          <Container>
             <Content>
                <CardItem>
                  <HouseSimple size={33} color="#7f8da1" />
                <p>condwebapp</p>
              </CardItem>
            <DashboardList>
                 <span>
                   <ChartLine size={24} />
                 </span>
               <Link to="/">
                     <h5>Dashboard</h5>
               </Link>
            </DashboardList>
            <AsideItem />
          </Content>
        </Container>
      </AsideBar>
      <Header>
        <HeaderContents>
          <SearchArea>
            <input placeholder="Pesquisar..." />
            <button>Ir</button>
          </SearchArea>
          <ProfileArea>
            <PhotoUserArea>
                <BellRinging size={24} />
                   <PhotoUser>
                      <User size={24}></User>
                    </PhotoUser>
                <div>
                <p>Gustavo Alves</p>
                <p>Adiministrador</p>
              </div>
            </PhotoUserArea>
          </ProfileArea>
        </HeaderContents>
        <Body>
          {/* <Root open={IsOpen}> */}
          {children}
          {/* </Root> */}
        </Body>
      </Header>
    </ThemeMain>
  );
};
