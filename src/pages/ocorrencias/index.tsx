import { useEffect, useMemo, useState } from 'react';
import { AreaTable } from '../../components/TableArea';
import { Buttons } from '../../components/Buttons';
import { ModalEdit } from '../../components/Modal';
import { Theme } from '../../components/SideBarTheme';
import { TableHead } from '../../components/TableHead';
import { api } from '../../services/api/api';
import { Photo, Unit, Date, Checked } from './styles';
import { Root } from '@radix-ui/react-dialog';

import { Pagination } from '../../components/page';
import { Gallery, Item } from 'react-photoswipe-gallery';

interface WarningTypes {
  title: string;
  datecreated: string;
  datecreated_formatted: string;
  id: number;
  id_unit: number;
  photos: string[];
  status: string;
  name_unit: string;
}

export const Ocorrencias = () => {
  const [warningData, setWarningData] = useState<WarningTypes[]>([]);
  const [modalPhotos, setModalPhotos] = useState<string[]>([]);
  const [StateModal, setStateModal] = useState(false);

  const [currentImageIndex, setCurrentIndex] = useState<any>();

  const token: string | null = localStorage.getItem('@user:admin');


  let PageSize = 8

  const [currentPage, setCurrentPage] = useState(1);

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    const currentItems = warningData.slice(firstPageIndex, lastPageIndex);


  const getOcoreencias = async () => {
    await api
      .get('/warnings', {
        params: {
          token,
        },
      })
      .then(res => {
        setWarningData(res.data.list);
      });
  };

  const onBeforeSlide = () => {
    console.log(modalPhotos);
  };

  useEffect(() => {
    getOcoreencias();
    onBeforeSlide();
  }, []);

  return (
    <Root open={StateModal}>
      <Theme>
        <div>Tela de ocorrências</div>
        <AreaTable>
          <TableHead resolvidos="Resolvido" unit photos date="Data" title />

          {currentItems.map((item, index) => {
            return (
              <div id='index'>
                <Checked
                  type={'checkbox'}
                  checked={item.status === 'RESOLVED'}
                />
                <Unit>{item.name_unit}</Unit>
                <p>{item.title}</p>
                <Date>{item.datecreated_formatted}</Date>
                <Photo onClick={() => setModalPhotos(item.photos)}>
                <Gallery>
                  <div>
                    <Item
                      width="160"
                      height="160"
                      alt="Photo of seashore by Folkert Gorter"
                    >
                     {({ ref, open }) => (
                       <img
                         style={{ cursor: 'pointer' }}
                         src="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg"
                         ref={ref as React.MutableRefObject<HTMLImageElement>}
                         onClick={open}
                       />
                     )}
                    </Item>
                     
                  </div>
                </Gallery>
                </Photo>
              </div>
            );
          })}
        </AreaTable>


       <Pagination
        currentPage={currentPage}
        totalCount={warningData.length}
        pageSize={PageSize}
        onPageChange={(page: any) => setCurrentPage(page)}
      />
      </Theme>
    </Root>
  );
};
