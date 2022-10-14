import { useEffect, useState } from 'react';
import { Buttons } from '../../components/Buttons';
import { Button } from '../../components/Buttons/styles';
import { Pagination } from '../../components/Pagenation';
import { Theme } from '../../components/SideBarTheme';
import { AreaTable } from '../../components/TableArea';
import { TableHead } from '../../components/TableHead';
import { api } from '../../services/api/api';
import { ButtonsArea } from '../Documentos/styles';
import { ButtonsContent } from './styles';

interface UsersType {
  cpf: string;
  id: number;
  name: string;
  email: string;
}

export const Usuarios = () => {
  const token = localStorage.getItem('@user:admin');

  const [dataUsers, setDataUsers] = useState<UsersType[]>([]);

  let PageSize = 7;

  const [currentPage, setCurrentPage] = useState(1);

  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const currentItems = dataUsers.slice(firstPageIndex, lastPageIndex);

  const getUsers = async () => {
    await api.get('/users', {
      params: {
        token: token,
      },
    }).then(res => setDataUsers(res.data.list));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Theme>
      <div>Tela de usúarios</div>
      <AreaTable>
        <TableHead name email actions cpf />
        {currentItems.map(data => {
          return (
            <div key={data.id}>
              <p>{data.name}</p>
              <p>{data.cpf}</p>
              <p>{data.email}</p>

             <ButtonsContent>
                <Buttons content='Editar' type={'BlueBtn'} />
                <Buttons content='Deletar' type={''}/>
             </ButtonsContent>
            </div>
          );
        })}
      </AreaTable>

      <Pagination
          currentPage={currentPage}
          totalCount={dataUsers.length}
          pageSize={PageSize}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
    </Theme>
  );
};
