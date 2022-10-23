import { Dispatch, SetStateAction, useState } from 'react';

import { ButtonPage } from './styles';

interface Items {
  pages: number;
  currentPage: number;
  setCurrentpages: Dispatch<SetStateAction<number>>;
}

export const Pagenate = ({ pages, setCurrentpages, currentPage }: Items) => {

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
