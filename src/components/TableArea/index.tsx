import { TableContents, TableHeader, TableMain } from './styles'
import { ReactNode, useState } from 'react'
import { TableHead } from '../TableHead'
import { TypeDataDocs } from '../../pages/Documentos'

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
