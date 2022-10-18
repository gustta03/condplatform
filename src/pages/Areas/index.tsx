import { Root } from '@radix-ui/react-dialog';
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Buttons } from '../../components/Buttons';
import { ModalEdit } from '../../components/Modal';
import { Theme } from '../../components/SideBarTheme';
import { AreaTable } from '../../components/TableArea';
import { Thead } from '../../components/TableArea/styles';
import { TableHead } from '../../components/TableHead';
import { api } from '../../services/api/api';
import { toasts } from '../../utils/toast';
import { Input, ModalArea } from '../Documentos/styles';
import { ButtonsContent } from '../Usuarios/styles';
import { CheckBox, Cover } from './styles';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useForm } from 'react-hook-form';
import { Hr } from '../../components/Modal/styles';
// import { formLabels } from '../../helper/form';

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
  const DaysLabels = ['segunda', 'terça', 'quarta', 'quinta', 'sexta'];

  const [areas, setAreas] = useState<dataSelect[]>([]);
  const [IsOpen, setIsOpen] = useState(false);
  const token: any = localStorage.getItem('@user:admin');
  const [ModalType, setModalType] = useState<Modal>();
  const [isAddOrEdit, setIsAddOrEdit] = useState(false);
  const [modalDaysCheck, setModalDaysCheck] = useState<string[]>([]);
  const [allowed, setAllowed] = useState<number>();


  const schema = yup.object().shape({
    chekbox: yup.boolean().required('O nome do documento é obrigatorio'),
    cover: yup.mixed().test('required', 'O arquivo é obrigatorio', _file => {
      if (_file.length >= 1) {
        return true;
      }

      return false;
    }),
    start_time: yup.string().required('A data de incio é obrigatória'),
    and_time: yup.string().required('A data de fim é obrigatória'),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormSchema>();

  const saveModal = useCallback(() => {
    setIsOpen(false);
    reset()
    getAreas();
  }, []);

  const formSubmit = (data: any) => {
    if (!isAddOrEdit) {
      return addNewArea(data);
    } else {
      return handleEditArea(data);
    }
  };

  const addNewArea = async (data: FormSchema) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data charset=utf-8',
      },
    };

    await api.post(
      '/areas',
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
    ).then((res) => {
      if(res.data.error === '') {
        toasts.sucessNotification('Área comum adicionada com sucesso!')
        saveModal()
      }
      else{
        toasts.errorNotification(res.data.error)
      }
    })
  };

  const handleEditArea = async (data: FormSchema) => {
    // await api.put('/area', {}, {});
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
        setAreas(res.data.list);
      });
  }, []);

  const ToggleModalDays = (item: any | undefined, value: any | undefined) => {
    const days = [...modalDaysCheck];

    if (value.target.checked === false) {
      days.filter(days => days !== item);
    } else {
      days.push(item);
    }

    console.log(days);

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
                <CheckBox type="checkbox" checked={_data.allowed === 1} />
                <p>{_data.title}</p>

                <p>
                  <Cover src={_data.cover}></Cover>
                </p>
                <p>{_data.days}</p>
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

                <p>{errors.chekbox?.message}</p>
                <input {...register('chekbox')} type={'checkbox'}  onChange={e => setAllowed(e.target.value ? 1 : 0)} />
                <br />

       
                <br />
                <label>Dias da semana</label>
                <br />
                <br />
                <input
                  type="checkbox"
                  value={0}
                  checked={modalDaysCheck.includes('0')}
                  onChange={value => ToggleModalDays('0', value)}
                  defaultValue={0}
                />

                <label>segunda</label>

                <input
                  type="checkbox"
                  checked={modalDaysCheck.includes('1')}
                  onChange={value => ToggleModalDays('1', value)}
                  defaultValue={1}
                />

                <label>terça</label>

                <input
                  type="checkbox"
                  checked={modalDaysCheck.includes('2')}
                  onChange={value => ToggleModalDays('2', value)}
                  defaultValue={2}
                />

                <label>quarta</label>

                <input
                  type="checkbox"
                  checked={modalDaysCheck.includes('3')}
                  onChange={value => ToggleModalDays('3', value)}
                  defaultValue={3}
                />

                <label>quinta</label>

                <input
                  type="checkbox"
                  checked={modalDaysCheck.includes('4')}
                  onChange={value => ToggleModalDays('4', value)}
                  defaultValue={4}
                />

                <label>sexta</label>

                <input
                  type="checkbox"
                  checked={modalDaysCheck.includes('5')}
                  onChange={value => ToggleModalDays('5', value)}
                  defaultValue={5}
                />

                <label>sabado</label>

                <input
                  type="checkbox"
                  checked={modalDaysCheck.includes('6')}
                  onChange={value => ToggleModalDays('6', value)}
                  defaultValue={5}
                />

                <label>domingo</label>

                <input
                  type="checkbox"
                  checked={modalDaysCheck.includes('7')}
                  onChange={value => ToggleModalDays('7', value)}
                  defaultValue={5}
                />
                <br/>
                <br/>

                <label>Titulo</label>
                <Input bg="" {...register('title')} name="title" />
                <label>capa do local</label>
                <p>{errors.cover?.message}</p>
                <Input
                  {...register('cover')}
                  bg=""
                  name="cover"
                  type={'file'}

                />
                <label>data de inicio</label>
                <p>{errors.start_time?.message}</p>
                <Input {...register('start_time')} bg="" />
                <label>data de fim</label>
                <p>{errors.end_time?.message}</p>
                <Input {...register('end_time')} bg="" />

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
              <h2>Excluir área</h2>
              <ModalArea>
                <button onClick={() => deleteArea(ModalType.id)}>
                  Excluir
                </button>
                <button>Cancelar</button>
              </ModalArea>
            </>
          )}
        </ModalEdit>
      </Theme>
    </Root>
  );
};
