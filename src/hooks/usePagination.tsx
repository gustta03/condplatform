import { useMemo, useState } from 'react';
import { TypeReservations } from '../pages/Reservations';


interface Props {
  totalCount: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
  paginationRange?: string | number[] | undefined
}


 
export const DOTS = '...';

const range = (start: number, end: number) => {
  const length = end - start + 1;
 
  return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: Props) => {



  const paginationRange: any = useMemo(() => {

    const totalPageCount = Math.ceil(totalCount / pageSize);
    
    const totalPageNumbers = siblingCount + 5;


    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

  
  if (totalPageNumbers >= totalPageCount) {
    return range(1, totalPageCount);
  }
  
  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);

    return [...leftRange, DOTS, totalPageCount];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
      
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(
      totalPageCount - rightItemCount + 1,
      totalPageCount
    );
    return [firstPageIndex, DOTS, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }

  }, [totalCount, pageSize, siblingCount, currentPage]);
   
  
  return paginationRange;
};

const useCurrentPage = ( data: any[], PageSize: number) => {
  
  const [currentPage, setCurrentPage] = useState(1);

  const firstPageIndex = (currentPage - 1) * PageSize


  const lastPageIndex = firstPageIndex + PageSize;
  const currentItems = data.slice(firstPageIndex, lastPageIndex);

  if(currentItems.length === 0) {
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return {
    currentPage,
    currentItems,
    setCurrentPage
  }
}

export { usePagination, useCurrentPage }
