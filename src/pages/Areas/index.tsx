import { Root } from '@radix-ui/react-dialog';
import { useCallback, useEffect, useState } from 'react';
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

import { useForm } from 'react-hook-form'

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

export const Areas = () => {
  const [areas, setAreas] = useState<dataSelect[]>([]);
  const [IsOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem('@user:admin');
  const [ModalType, setModalType] = useState<Modal>();
  const [isAddOrEdit, setIsAddOrEdit] = useState(false) 

  const { handleSubmit, register } = useForm()

  const saveModal = useCallback(() => {
    setIsOpen(false);
    getAreas();
  }, []);

  const formSubmit = useCallback((data: any) => {
    if(isAddOrEdit) {
      return addNewArea(data)
    }else {
      return handleEditArea(data)
    }
  }, [])

  const addNewArea = async (data: any) => {
    // await api.post('/areas', {
    
    // })

    console.log(data)
  }
  
  const handleEditArea = async (data: any) => {
    // await api.put('/', { })
  } 

  const deleteArea = async (id: number | undefined) => {
    await api
      .delete(`/area/${id}`, {
        params: {
          token: token,
        },
      })
      .then(res => {
        if (res.data.error === '') {
          toasts.sucessNotification('Area excluída com sucesso');
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
          <form onSubmit={handleSubmit(formSubmit)}>
            {ModalType?.title !== 'Excluir' && (
              <>
                <h3>{ModalType?.title} àrea comum</h3>
                <label>Ativo</label>
                <input {...register('chekbox')} type={'checkbox'} />
                <br />
                <br />
                <label>capa do local</label>
                <Input {...register('cover')} bg="" type={'file'} />
                <label>data de inicio</label>
                <Input {...register('start_time')} bg="" type={'date'} />
                <label>data de fim</label>
                <Input {...register('end_time')} bg="" type={'date'} />
                <ModalArea>
                  <button onClick={() => { setIsAddOrEdit(false) }}>Salvar área</button>
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
