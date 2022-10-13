import { useEffect, useState } from 'react';
import { Item } from 'react-photoswipe-gallery';
import { Pagination } from '../../components/page';
import { Theme } from '../../components/SideBarTheme';
import { AreaTable } from '../../components/TableArea';
import { TableHead } from '../../components/TableHead';
import { api } from '../../services/api/api';
import { Photo } from '../ocorrencias/styles';
import { Date, Unit, Where } from './styles';

interface DataFoundAndLostType {
  datecreated_formatted: string;
  description: string;
  id: number;
  status: string;
  photo: string;
  where: string;
}

export const Achados = () => {
  const token = localStorage.getItem('@user:admin');

  const [dataFoundAndLost, setDataFoundAndLoast] = useState<
    DataFoundAndLostType[]
  >([]);

  let PageSize = 7;

  const [currentPage, setCurrentPage] = useState(5);

  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const currentItems = dataFoundAndLost.slice(firstPageIndex, lastPageIndex);

  const getFoundAndLost = async () => {
    await api
      .get('/foundandlost', {
        params: {
          token: token,
        },
      })
      .then(res => setDataFoundAndLoast(res.data.list));
  };

  const updateFoundAndLost = async (id: number) => {
    await api
      .put(`/foundandlost/${id}`, {
        token: token,
      })
      .then(res => {
        if (res.data.error === '') {
          getFoundAndLost();
        }
      });
  };

  useEffect(() => {
    getFoundAndLost();
  }, []);

  console.log(dataFoundAndLost);
  console.log(currentItems);
  return (
    <Theme>
      <div>Tela de achados e perdidos</div>
      <AreaTable>
        <TableHead local resolvidos="recuperado" date="Data" desc photos />
        {currentItems.map(data => {
          return (
            <div key={data.id}>
              <input  onClick={() => updateFoundAndLost(data.id)} type={'checkbox'} checked={data.status === 'recovered'} />
              <Where>{data.where}</Where>
              <Unit>{data.description}</Unit>
              <Date>{data.datecreated_formatted}</Date>
              <Photo>
                <div>{'Fotos'}</div>
              </Photo>
            </div>
          );
        })}
      </AreaTable>

      <Pagination
        currentPage={currentPage}
        totalCount={dataFoundAndLost.length}
        pageSize={PageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </Theme>
  );
};
