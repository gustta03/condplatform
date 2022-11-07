import { Root } from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Item } from 'react-photoswipe-gallery';
import AsyncSelect from 'react-select/async';
import { ListFormat } from 'typescript';
import { Buttons } from '../../components/Buttons';
import { ModalEdit } from '../../components/Modal';
import { Pagination } from '../../components/Pagenation';
import { Theme } from '../../components/SideBarTheme';
import { AreaTable } from '../../components/TableArea';
import { TableHead } from '../../components/TableHead';
import { useCurrentPage } from '../../hooks/usePagination';
import { api } from '../../services/api/api';

import { Input } from '../Documents/styles';
import { ButtonsContent } from '../Users/styles';
import { NameOwner, NameOwnerDelete, OwnerResult } from './styles';

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
  id: number;
  label: string;
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

  const { register, handleSubmit } = useForm<FormType>();

  const onSubmit = (data: FormType) => {
    return addOrEdit ? addUnit(data) : EditUnit(data);
  };

  const addUnit = async (data: FormType) => {
    await api
      .post('/units', {
        name: data.name,
        name_owner: data.name_owner,
        token,
      })
      .then(res => {
        console.log(res);
      });
  };

  const EditUnit = (data: FormType) => {
    console.log(data.name_owner);
  };

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

  // const searchUser = async () => {
  //   await api
  //     .get('/users/search', {
  //       params: {
  //         q: user,
  //         token,
  //       },
  //     })
  //     .then(res => {
  //       setUserSearch(res.data.list);
  //     });
  // };

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
  
  const handleChangeSelect = (value:  SelectOptionsValue ): void => {
    return setOptions(value)
  }

  console.log(options)

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
                        id: item.id_owner,
                        type: 'Editar',
                      })
                    }
                  >
                    <Buttons type="BlueBtn" content="Editar" />
                  </div>
                  <div
                    onClick={() =>
                      setModalType({
                        id: item.id_owner,
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Nome da unidade</label>
            <Input bg="" {...register('name')} name="name" />
            <label>Nome do própietario</label>
            <Input
              bg=""
              {...register('name_owner')}
              name="name_owner"
              onChange={e => setUser(Number(e.target.value))}
            />

            <AsyncSelect
              cacheOptions
              onChange={handleChangeSelect}
              defaultOptions
              loadOptions={loadOptions}
            />

            <NameOwner>
              <NameOwnerDelete>
                <X size={15} color="#FFF" />
              </NameOwnerDelete>
              <div>... name aqui</div>
            </NameOwner>

            {ModalType.type === 'Adicionar' && (
              <button onClick={() => setAddOrEdit(true)}>Adicionar</button>
            )}
            {ModalType.type !== 'Adicionar' && (
              <button onClick={() => setAddOrEdit(false)}>Editar</button>
            )}
            <button onClick={() => setOpen(false)}>Cancelar</button>
          </form>
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
