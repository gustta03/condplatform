import { Root } from '@radix-ui/react-dialog';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Buttons } from '../../components/Buttons';
import { ModalEdit } from '../../components/Modal';
import { Theme } from '../../components/SideBarTheme';
import { AreaTable } from '../../components/TableArea';

import { TableHead } from '../../components/TableHead';
import { api } from '../../services/api/api';
import { toasts } from '../../utils/toast';
import { Input, ModalArea } from '../Documents/styles';
import { ButtonsContent } from '../Users/styles';
import { CheckBox, Cover } from './styles';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useForm } from 'react-hook-form';

interface dataSelect {
  title: string;
  allowed: number;
  name: string;
  days: string;
  end_time: string;
  start_time: string;
  id?: number;
  cover: string;
}

interface Modal {
  title: string;
  id?: number | undefined;
}

interface FormSchema {
  chekbox: boolean;
  cover: FileList;
  start_time: string;
  end_time: string;
  title: string;
}

export const Areas = () => {
  const [areas, setAreas] = useState<dataSelect[]>([]);
  const [IsOpen, setIsOpen] = useState(false);
  const token: any = localStorage.getItem('@user:admin');
  const [ModalType, setModalType] = useState<Modal>();
  const [isAddOrEdit, setIsAddOrEdit] = useState(false);
  const [modalDaysCheck, setModalDaysCheck] = useState<string[]>([]);
  const [allowed, setAllowed] = useState<number>();
  const [day, setDays] = useState<any[]>([]);
  const [Df, setDf] = useState<any[]>([])

  const schema = yup.object().shape({
    chekbox: yup.boolean().required('O nome do documento é obrigatorio'),
    cover: yup.mixed().test('required', 'O arquivo é obrigatorio', _file => {
      if (_file.length >= 1) {
        return true;
      }

      return false;
    }),
    start_time: yup.string().required('A data de incio é obrigatória'),
    title: yup.string().required('O titulo é obrigatorio'),
    end_time: yup.string().required('A data de fim é obrigatória'),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: yupResolver(schema),
  });

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data charset=utf-8',
    },
  };

  const saveModal = useCallback(() => {
    setIsOpen(false);
    reset();
    getAreas();
  }, []);

  const formSubmit = (data: FormSchema) => {
    if (!isAddOrEdit) {
      return addNewArea(data);
    } else {
      return handleEditArea(data);
    }
  };

  const addNewArea = async (data: FormSchema) => {
    await api
      .post(
        `/areas`,
        {
          title: data.title,
          cover: data.cover[0],
          allowed: allowed,
          days: modalDaysCheck.join(','),
          start_time: data.start_time,
          end_time: data.end_time,
          token,
        },
        config,
      )
      .then(res => {
        if (res.data.error === '') {
          toasts.sucessNotification('Área comum adicionada com sucesso!');
          saveModal();
        } else {
          toasts.errorNotification(res.data.error);
        }
      });
  };

  const handleEditArea = async (data: FormSchema) => {
    await api
      .post(
        `/area/${ModalType?.id}`,
        {
          title: data.title,
          cover: data.cover[0],
          allowed: allowed,
          days: modalDaysCheck.join(','),
          start_time: data.start_time,
          end_time: data.end_time,
          token,
        },
        config,
      )
      .then(res => {
        if (res.data.error === '') {
          toasts.sucessNotification('Área comum editada com sucesso!');
          saveModal();
        } else {
          toasts.errorNotification(res.data.error);
        }
      });
  };

  const deleteArea = async (id: number | undefined) => {
    await api
      .delete(`/area/${id}`, {
        params: {
          token: token,
        },
      })
      .then(res => {
        if (res.data.error === '') {
          toasts.sucessNotification('Área excluída com sucesso');
          saveModal();
        }
      });
  };

  const getAreas = useCallback(async () => {
    await api
      .get('/areas', {
        params: {
          token,
        },
      })
      .then(res => {
        res.data.list.map((item: any) => {
          const daysWeek = ['segunda', 'terça', 'quarta', 'quinta',
          'sexta', 'sabado', 'domingo']
          const days = item.days.split(',')
          const dFormated = []
        
          for(const i in days) {
            if(days && daysWeek[days[i]]) {
              dFormated.push(daysWeek[days[i]])
            }
          }
          setDf(dFormated)
          console.log(dFormated)
        })
        setAreas(res.data.list);
        setDays(res.data.list);
      });
  }, []);

  const updateAllowed = async (id: number | undefined) => {
    await api.put(`/area/${id}/allowed`, {
      token: token,
    });
    getAreas();
  };

  const ToggleModalDays = (
    item: string,
    value: ChangeEvent<HTMLInputElement>,
  ) => {
    let days = [...modalDaysCheck];

    if (value.target.checked === false) {
      days = days.filter(days => days !== item);
    } else {
      days.push(item);
    }
    console.log(item);
    setModalDaysCheck(days);
  };

  useEffect(() => {
    getAreas();
  }, []);

  return (
    <Root open={IsOpen}>
      <Theme>
        <div>Àreas comuns</div>
        <span
          onClick={() => {
            setIsOpen(true);
            setModalType({
              title: 'Nova',
            });
          }}
        >
          <Buttons type="BlueBtn" content="Nova área comum" />
        </span>
        <AreaTable>
          <TableHead Capa ativo title funcionamento inicio fim actions />
          {areas.map(_data => {
            return (
              <div key={_data.id}>
                <CheckBox
                  type="checkbox"
                  onClick={() => updateAllowed(_data.id)}
                  checked={_data.allowed === 1}
                />
                <p>{_data.title}</p>

                <p>
                  <Cover src={_data.cover}></Cover>
                </p>
                <p>{_data.days}</p>
                 
                 
                <>
                 {Df.map((item) => {
                  console.log(item)
                 })}
                </>
                 

                <br />
                <p>{_data.start_time}</p>
                <p>{_data.end_time}</p>
                <ButtonsContent>
                  <div
                    onClick={() => {
                      setIsOpen(true);
                      setModalType({
                        title: 'Editar',
                        id: _data.id,
                      });
                    }}
                  >
                    <Buttons type="BlueBtn" content="Editar" />
                  </div>
                  <div
                    onClick={() => {
                      setIsOpen(true);
                      setModalType({
                        title: 'Excluir',
                        id: _data.id,
                      });
                    }}
                  >
                    <Buttons type="" content="Deletar" />
                  </div>
                </ButtonsContent>
              </div>
            );
          })}
        </AreaTable>

        <ModalEdit>
          <h3>{ModalType?.title} àrea comum</h3>

          <form onSubmit={handleSubmit(formSubmit)}>
            {ModalType?.title !== 'Excluir' && (
              <>
                <label>Ativo</label>
                <span>{errors.chekbox?.message}</span>
                <input
                  {...register('chekbox')}
                  value={0}
                  type={'checkbox'}
                  onChange={e => setAllowed(e.target.value ? 1 : 0)}
                />
                <br />
                <br />
                <label>Dias da semana</label>
                <br /> <br />
                <input
                  type="checkbox"
                  value={1}
                  checked={modalDaysCheck.includes('1')}
                  onChange={event => ToggleModalDays('1', event)}
                />
                <label>segunda</label>
                <input
                  type="checkbox"
                  checked={modalDaysCheck.includes('2')}
                  value={2}
                  onChange={event => ToggleModalDays('2', event)}
                />
                <label>terça</label>
                <input
                  type="checkbox"
                  checked={modalDaysCheck.includes('3')}
                  value={3}
                  onChange={event => ToggleModalDays('3', event)}
                />
                <label>quarta</label>
                <input
                  type="checkbox"
                  value={4}
                  checked={modalDaysCheck.includes('4')}
                  onChange={event => ToggleModalDays('4', event)}
                />
                <label>quinta</label>
                <input
                  type="checkbox"
                  value={5}
                  checked={modalDaysCheck.includes('5')}
                  onChange={value => ToggleModalDays('5', value)}
                />
                <label>sexta</label>
                <input
                  type="checkbox"
                  value={6}
                  checked={modalDaysCheck.includes('6')}
                  onChange={event => ToggleModalDays('6', event)}
                />
                <label>sabado</label>
                <input
                  type="checkbox"
                  value={7}
                  checked={modalDaysCheck.includes('7')}
                  onChange={event => ToggleModalDays('7', event)}
                />
                <label>domingo</label>
                {/* <input
                  type="checkbox"
                  value={8}
                  checked={modalDaysCheck.includes('8')}
                  onChange={value => ToggleModalDays('8', value)}
                /> */}
                <br />
                <br />
                {errors.title?.message ? (
                  <p>{errors.title.message}</p>
                ) : (
                  <label>Titulo</label>
                )}
                <Input
                  bg={errors.title?.message}
                  {...register('title')}
                  name="title"
                />
                {errors.cover?.message ? (
                  <p>{errors.cover?.message}</p>
                ) : (
                  <label>Foto do local</label>
                )}
                <Input
                  {...register('cover')}
                  bg={errors.cover?.message}
                  name="cover"
                  type={'file'}
                />
                {errors.title?.message ? (
                  <p>{errors.start_time?.message}</p>
                ) : (
                  <label>Hora de inicio</label>
                )}
                <Input
                  {...register('start_time')}
                  bg={errors.start_time?.message}
                />
                {errors.end_time?.message ? (
                  <p>{errors.end_time?.message}</p>
                ) : (
                  <label>Hora de encerramento</label>
                )}
                <Input
                  {...register('end_time')}
                  bg={errors.end_time?.message}
                />
                <ModalArea>
                  {ModalType?.title === 'Nova' && (
                    <button
                      onClick={() => {
                        setIsAddOrEdit(false);
                      }}
                    >
                      Salvar área
                    </button>
                  )}
                  {ModalType?.title === 'Editar' && (
                    <button
                      onClick={() => {
                        setIsAddOrEdit(true);
                      }}
                    >
                      Editar área
                    </button>
                  )}
                  <button onClick={() => setIsOpen(false)}>Cancelar</button>
                </ModalArea>
              </>
            )}
          </form>
          {ModalType?.title === 'Excluir' && (
            <>
              <p>
                Deseja realmente <b>EXCLUIR</b> esta área comum?
              </p>
              <ModalArea>
                <button onClick={() => deleteArea(ModalType.id)}>
                  Excluir
                </button>
                <button onClick={() => setIsOpen(false)}>Cancelar</button>
              </ModalArea>
            </>
          )}
        </ModalEdit>
      </Theme>
    </Root>
  );
};
