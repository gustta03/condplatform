import { useEffect, useState } from 'react';
import { AreaTable } from '../../components/TableArea';
import { Buttons } from '../../components/Buttons';
import { ModalEdit } from '../../components/Modal';
import { Theme } from '../../components/SideBarTheme';
import { TableHead } from '../../components/TableHead';
import { api } from '../../services/api/api';
import { Photo, Unit, Date, Checked } from './styles';
import { Root } from '@radix-ui/react-dialog';

import { Pagenate } from '../../components/Pagination';
import { Check } from 'phosphor-react';
import { isTemplateMiddle } from 'typescript';

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

  const token: any = localStorage.getItem('@user:admin');

  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentpage] = useState(0);

  const page = Math.ceil(warningData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = warningData.slice(startIndex, endIndex);

  const gotoPrevious = () => {
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);
  };

  const gotoNext = () => {
    currentImageIndex + 1 < modalPhotos.length &&
      setCurrentIndex(currentImageIndex + 1);
  };

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
  }, [modalPhotos]);

  return (
    <Root open={StateModal}>
      <Theme>
        <div>Tela de ocorrências</div>
        <AreaTable>
          <TableHead resolvidos="Resolvido" unit photos date="Data" title />

          {currentItems.map((item, index) => {
            return (
              <div>
                <Checked
                  type={'checkbox'}
                  checked={item.status === 'RESOLVED' ? true : false}
                />
                <Unit>{item.name_unit}</Unit>
                <p>{item.title}</p>
                <Date>{item.datecreated_formatted}</Date>
                <Photo onClick={() => setModalPhotos(item.photos)}>
                  <div>{item.photos.length} fotos</div>
                </Photo>
              </div>
            );
          })}
        </AreaTable>

        <Pagenate
          pages={page}
          currentPage={currentPage}
          setCurrentpages={setCurrentpage}
        />
      </Theme>
    </Root>
  );
};
