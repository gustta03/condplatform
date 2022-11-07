import { TableContents, TableMain } from './styles'
import { ReactNode } from 'react'


interface Children {
  children: ReactNode;
}


export const AreaTable = ({ children }: Children) => {

  return (
    <TableMain>
      <span>
        <TableContents>
          {children}
        </TableContents>
      </span>
    </TableMain>
  );
};
