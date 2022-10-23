import { AreaTable } from '../../components/TableArea';

import { Close, Root } from '@radix-ui/react-dialog';
import { Theme } from '../../components/SideBarTheme';
import { useCallback, useEffect, useState } from 'react';
import { TableHead } from '../../components/TableHead';
import { api } from '../../services/api/api';
import { Buttons } from '../../components/Buttons';
import { Input, Error, LineHorizont, ModalArea, Select } from './styles';

import { ModalEdit } from '../../components/Modal';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';
import { toasts } from '../../utils/toast';
import { Pagination } from '../../components/Pagenation';

interface TypeReservations {
  id: number;
  id_area: number;
  name_area: string;
  name_unit: string;
  reservation_date: string;
  reservation_date_formatted: string;
  error: string;
}

interface ModalInfo {
  title: 'Nova' | 'Editar' | 'Deletar';
  id: number | null;
  selectArea?: number | string;
  selectUnit?: number | string;
}

interface dataSelect {
  title: string;
  name: string;
  id?: string;
}

interface Inputs {
  id_unit: string;
  id_area: string;
  id: number;
  reservation_date: string;
}

export const Reservas = () => {
  const token: any = localStorage.getItem('@user:admin');

  const [StateModal, setStateModal] = useState(false);
  const [dataReservation, setReservation] = useState<TypeReservations[]>([]);
  const [modalInfo, setModalInfo] = useState<ModalInfo>();
  const [areas, setAreas] = useState<dataSelect[]>([]);
  const [unity, setUnit] = useState<dataSelect[]>([]);

  const [modalAreaId, setModalAreaId] = useState('');
  const [modalUnitId, setModalUnitId] = useState('');
  const [loading, setLoading] = useState(false);

  const [addOrEdit, setAddOrEdit] = useState(false);

  const PageSize = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const currentItems = dataReservation.slice(firstPageIndex, lastPageIndex);

 

  const schema = yup.object().shape({
    id_unit: yup.string().required('A unidade é obrigatoria'),
    id_area: yup.string().required('A area é obrigatoria'),
    reservation_date: yup.string().required('A data é obrigatoria'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const ResteInputs = () => {
    reset();
    setStateModal(false);
  };

  const getReservations = async () => {
    await api
      .get('/reservations', {
        params: {
          token,
        },
      })
      .then(res => {
        setReservation(res.data.list);
      });

    await api
      .get('/areas', {
        params: {
          token,
        },
      })
      .then(res => {
        setAreas(res.data.list);
      });

    await api
      .get('/units', {
        params: {
          token,
        },
      })
      .then(res => {
        setUnit(res.data.list);
      });
  };

  const submitForm = (data: any) => {
    return addOrEdit ? createReservation(data) : editReservation(data);
  };

  const editReservation = async (data: Inputs) => {
    await api
      .put(`/reservation/${modalInfo?.id}`, {
        id_unit: data.id_unit,
        id_area: data.id_area,
        reservation_date: data.reservation_date,
        token,
      })
      .then(res => {
        if (res.data.error === '') {
          toasts.sucessNotification('Reserva editada com sucesso');
          reset();
        }
      });

    setStateModal(false);
    getReservations();
  };

  const createReservation = useCallback(
    async (data: Inputs) => {
      await api
        .post(`/reservations`, {
          id_unit: data.id_unit,
          id_area: data.id_area,
          reservation_date: data.reservation_date,
          token,
        })
        .then(res => {
          if (res.data.error === '') {
            toasts.sucessNotification('Reserva salvo com sucesso');
            reset();
          } else {
            toasts.errorNotification(res.data.error);
          }
        });

      setStateModal(false);
      getReservations();
    },
    [dataReservation],
  );

  const deleteReservation = async (id: any) => {
    await api
      .delete(`/reservation/${id}`, {
        params: {
          token: token,
        },
      })
      .then(res => {
        if (res.data.error === '') {
          toasts.sucessNotification('Reserva Excluida com sucesso com sucesso');
        }
      });

    setStateModal(false);
    getReservations();
  };

  useEffect(() => {
    getReservations();
    console.log(currentPage)
  }, []);

  if(currentItems.length === 0) {
    setCurrentPage(currentPage - 1)
  }

  return (
    <Root open={StateModal}>
      <Theme>
        <p>Tela de reservas</p>

        <Close asChild>
          <div
            onClick={() => {
              setStateModal(true);
              setModalInfo({ title: 'Nova', id: null });
            }}
          >
            <Buttons type={'BlueBtn'} content={'Nova reserva'} />
          </div>
        </Close>

        <AreaTable>
          <TableHead date="Data da reserva" unit actions area />

          {currentItems.map((item: TypeReservations) => {
            return (
              <div key={item.id}>
                <p>{item.name_unit}</p>
                <p>{item.name_area}</p>
                <p>{item.reservation_date_formatted}</p>
                <p>
                  <b
                    onClick={() => {
                      setModalInfo({
                        title: 'Editar',
                        id: item.id,
                        selectArea: modalAreaId,
                        selectUnit: modalUnitId,
                      });
                      setStateModal(true);
                    }}
                  >
                    <Buttons type="BlueBtn" content={'Editar'} />
                  </b>
                  <b
                    onClick={() => {
                      setModalInfo({
                        title: 'Deletar',
                        id: item.id,
                      });
                      setStateModal(true);
                    }}
                  >
                    <Buttons type="Deletar" content={'Deletar'} />
                  </b>
                </p>
              </div>
            );
          })}

          <ModalEdit>
            {modalInfo?.title != 'Deletar' && (
              <form onSubmit={handleSubmit(submitForm)}>
                <h2>{`${modalInfo?.title} Reserva`}</h2>
                <LineHorizont />
                <label>Unidade</label>

                <Select
                  bg={errors.id_unit?.message}
                  id="id_unit"
                  {...register('id_unit')}
                  name="id_unit"
                  onChange={e => setModalUnitId(e.target.value)}
                >
                  <option selected value={''}>
                    Selecione
                  </option>

                  {unity.map((_unit: dataSelect) => (
                    <option value={_unit.id}>{_unit.name}</option>
                  ))}
                </Select>

                <Error>{errors.id_unit?.message}</Error>

                <label htmlFor="form-area">Area</label>

                <Select
                  bg={errors.id_area?.message}
                  {...register('id_area')}
                  name="id_area"
                  onChange={e => setModalAreaId(e.target.value)}
                >
                  <option selected value={''}>
                    Selecione
                  </option>
                  {areas.map((_area: dataSelect) => (
                    <option value={_area.id}>{_area.title}</option>
                  ))}
                </Select>
                <Error>{errors.id_area?.message}</Error>

                <label>Data de reserva</label>

                <Input
                  bg={errors.reservation_date?.message}
                  type={'text'}
                  {...register('reservation_date')}
                  name="reservation_date"
                />

                <Error>{errors.reservation_date?.message}</Error>

                <ModalArea>
                  {modalInfo?.title === 'Nova' && (
                    <button onClick={() => setAddOrEdit(true)}>
                      Adicionar
                    </button>
                  )}
                  {modalInfo?.title === 'Editar' && (
                    <button onClick={() => setAddOrEdit(false)}>Editar</button>
                  )}
                  <button onClick={() => ResteInputs()}>Cancelar</button>
                </ModalArea>
              </form>
            )}
            {modalInfo?.title === 'Deletar' && (
              <>
                <h4>Excluir reserva</h4>
                <hr />
                <p>
                  Deseja realmente <b>EXCLUIR</b> esta reserva?
                </p>
                <ModalArea>
                  <button onClick={() => deleteReservation(modalInfo.id)}>
                    excluir
                  </button>
                  <button onClick={() => setStateModal(false)}>cancelar</button>
                </ModalArea>
              </>
            )}
          </ModalEdit>
        </AreaTable>

        <Pagination
          currentPage={currentPage}
          totalCount={dataReservation.length}
          pageSize={PageSize}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </Theme>
    </Root>
  );
};
