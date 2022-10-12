import { DOTS, usePagination } from '../../hooks/usePagination';

import { ArrowRight, Container } from './styles';
import { ButtonPage } from '../Pagination/styles';
import { useEffect } from 'react';

interface Props {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  siblingCount?: number
  onPageChange: (params: number) => void

}

export const Pagination: any = (props: Props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <Container>
      <ArrowRight disp={currentPage === 1 ? true : false}  onClick={onPrevious}><ButtonPage>&lt;</ButtonPage></ArrowRight>
      {paginationRange.map((item: any) => {
        if (item === DOTS) {
          return <div>&#8230;</div>;
        }
        return (
          <>
            <ButtonPage
              background={item === currentPage}
              onClick={() => onPageChange(item)}
            >
              {item}
            </ButtonPage>
          </>
        );
      })}
    </Container>
  );
};
