import React, { Dispatch, SetStateAction, useState } from "react";
import { TypeDataDocs } from '../../pages/Documentos/index'
import { ButtonPage } from "./styles";

interface Items {
  pages: number;
  currentPage: any
  setCurrentpages: Dispatch<SetStateAction<number>>
}

 export const Pagenate = ({ pages, setCurrentpages, currentPage }: Items) => {
 

//   const page = Math.ceil(items.length / itemsPerPage);
//   const startIndex = currentPage * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

  return (
    <div>
      {Array.from(Array(pages), (_tem, index) => {
        return (
          <ButtonPage
            background={index === currentPage ? true : false}
            value={index}
            key={index}
            onClick={(e: any) => setCurrentpages(Number(e.target.value))}
          >
            {index + 1}
          </ButtonPage>
        );
      })}
    </div>
  );
};
