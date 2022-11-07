import { Root } from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import AsyncSelect from 'react-select/async';

import { Buttons } from '../../components/Buttons';
import { ModalEdit } from '../../components/Modal';
import { Pagination } from '../../components/Pagenation';
import { Theme } from '../../components/SideBarTheme';
import { AreaTable } from '../../components/TableArea';
import { TableHead } from '../../components/TableHead';
import { useCurrentPage } from '../../hooks/usePagination';
import { api } from '../../services/api/api';
import { toasts } from '../../utils/toast';

import { Input, ModalArea } from '../Documents/styles';
import { ButtonsContent } from '../Users/styles';

import { NameOwner, NameOwnerDelete } from './styles';

interface TypeData {
  id?: number;
  id_owner: number;
  name: string;
  name_owner: string;
}

interface ModalTypes {
  id?: number;
  type: string;
}

interface FormType {
  name: string;
  name_owner: string;
}

interface SelectOptionsValue {
  id: number | undefined;
  label: string | undefined;
}

export const Unidades = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<TypeData[]>([]);
  const token = localStorage.getItem('@user:admin');
  const [ModalType, setModalType] = useState({} as ModalTypes);
  const [addOrEdit, setAddOrEdit] = useState(false);
  const [options, setOptions] = useState({} as SelectOptionsValue);

  const [user, setUser] = useState(0);

  const [searchValue, setValueSearch] = useState('');

  const pageSize = 6;

  const { currentItems, currentPage, setCurrentPage } = useCurrentPage(
    data,
    pageSize,
  );

  const { register, handleSubmit, reset } = useForm<FormType>();

  const ValueModalRest = () => {
    reset();
    setOpen(false);
    setOptions({ id: undefined, label: '' })
    getUnits();
  };

  const onSubmit = (data: FormType) => {
    return addOrEdit ? addUnit(data) : EditUnit(data);
  };

  const addUnit = async (data: FormType) => {
    await api
      .post('/units', {
        name: data.name,
        id_owner: options.id,
        token,
      })
      .then(res => {
        if (res.data.error === '') {
          toasts.sucessNotification('Unidade adicionada.');
          ValueModalRest();
        }
      });
  };

  async function EditUnit(data: FormType) {
    await api
      .put(`/unit/${ModalType.id}`, {
        name: data.name,
        id_owner: options.id,
        token,
      })
      .then(res => {
        if (res.data.error === '') {
          toasts.sucessNotification('Unidade editada com sucesso;');
          ValueModalRest();
        }
      });
  }

  const getUnits = async () => {
    await api
      .get('/units', {
        params: {
          token,
        },
      })
      .then(res => {
        setData(res.data.list);
      });
  };

  const loadOptions = async (searchValue: string) => {
    const data = await api.get('/users/search', {
      params: {
        q: searchValue,
        token,
      },
    });
    const result = data.data.list;
    return result.map((item: TypeData) => ({ id: item.id, label: item.name }));
  };

  const handleChangeSelect = (value: SelectOptionsValue | any): void => {
    return setOptions(value);
  };

  function DeleteUserOption() {
    return setOptions({ id: undefined, label: '' });
  }

  async function DeleteUnitTable() {
    await api
      .delete(`unit/${ModalType.id}`, {
        params: {
          token,
        },
      })
      .then(res => {
        if (res.data.error === '') {
          toasts.sucessNotification('Unidade excluida com sucesso.');
          ValueModalRest();
        }
      });
  }

  useEffect(() => {
    getUnits();
  }, []);

  return (
    <Theme>
      <Root open={open}>
        <div>Tela de unidades</div> <br />
        <div
          onClick={() => {
            setModalType({
              type: 'Adicionar',
            });
            setOpen(true);
          }}
        >
          <Buttons type="BlueBtn" content="Nova unidade" />
        </div>
        <AreaTable>
          <TableHead unit owner actions />
          {currentItems.map(item => {
            return (
              <div>
                <p>{item.name}</p>
                <p>{item.name_owner}</p>
                <ButtonsContent onClick={() => setOpen(true)}>
                  <div
                    onClick={() =>
                      setModalType({
                        id: item.id,
                        type: 'Editar',
                      })
                    }
                  >
                    <Buttons type="BlueBtn" content="Editar" />
                  </div>
                  <div
                    onClick={() =>
                      setModalType({
                        id: item.id,
                        type: 'Deletar',
                      })
                    }
                  >
                    <Buttons type="" content="Deletar" />
                  </div>
                </ButtonsContent>
              </div>
            );
          })}
        </AreaTable>
        <ModalEdit>
          <h4>{ModalType.type} unidade</h4>
          {ModalType.type !== 'Deletar' && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Nome da unidade</label>
              <Input bg="" {...register('name')} name="name" />
              <label>Nome do própietario</label>

              {!options.id ? (
                <AsyncSelect
                  cacheOptions
                  onChange={handleChangeSelect}
                  defaultOptions
                  loadOptions={loadOptions}
                />
              ) : null}

              {options.id ? (
                <NameOwner>
                  <NameOwnerDelete onClick={() => DeleteUserOption()}>
                    <X size={15} color="#FFF" />
                  </NameOwnerDelete>
                  <div>{options.label}</div>
                </NameOwner>
              ) : null}

              <ModalArea>
                {ModalType.type === 'Adicionar' && (
                  <button onClick={() => setAddOrEdit(true)}>Adicionar</button>
                )}
                {ModalType.type !== 'Adicionar' && (
                  <button onClick={() => setAddOrEdit(false)}>Editar</button>
                )}
                <button onClick={() => setOpen(false)}>Cancelar</button>
              </ModalArea>
            </form>
          )}
          {ModalType.type === 'Deletar' && (
            <>
              <div>Deseja realmente excuir esta unidade?</div>

              <ModalArea>
                <button onClick={() => DeleteUnitTable()}>Excuir</button>
                <button>Cancelar</button>
              </ModalArea>
            </>
          )}
        </ModalEdit>
      </Root>

      <Pagination
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={pageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </Theme>
  );
};
