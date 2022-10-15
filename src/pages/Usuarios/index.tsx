import { Root } from '@radix-ui/react-dialog';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Buttons } from '../../components/Buttons';
import { Button } from '../../components/Buttons/styles';
import { ModalEdit } from '../../components/Modal';
import { Pagination } from '../../components/Pagenation';
import { Theme } from '../../components/SideBarTheme';
import { AreaTable } from '../../components/TableArea';
import { TableHead } from '../../components/TableHead';
import { api } from '../../services/api/api';
import { toasts } from '../../utils/toast';
import { ButtonsArea, ModalArea } from '../Documentos/styles';
import { ButtonsContent, Input } from './styles';

import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

import { useForm } from 'react-hook-form';

interface UsersType {
  cpf: string;
  id: number;
  name: string;
  email: string;
}

interface TypeModal {
  title: string;
  id?: number;
}

interface UserType {
  name: string;
  password: string;
  newpassword: string;
  email: string;
  cpf: string;
  id: number;
}

export const Usuarios = () => {
  const token = localStorage.getItem('@user:admin');

  const [dataUsers, setDataUsers] = useState<UsersType[]>([]);
  const [stateModal, setStateModal] = useState(false);
  const [isAddorEdit, setIsAddOrEdit] = useState(false);

  const [TypeModal, setTypeModal] = useState<TypeModal>();

  const PageSize = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const currentItems = dataUsers.slice(firstPageIndex, lastPageIndex);

  const schema = yup.object().shape({
    name: yup.string().required('O nome do usuário é obrigatorio'),
    email: yup.string().required('o email do usuário é obrigatorio'),
    cpf: yup.string().required('O CPF do usuário é obrigatorio'),
    password: yup.string().required('A senha do usuário é obrigatoria'),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserType>({
    resolver: yupResolver(schema),
  });

  const handleModal = () => {
    setStateModal(false);
    getUsers();
  };

  const onSubmit = (data: UserType) => {
    return isAddorEdit ? addNewUser(data) : editUser(data)
  };

  const editUser = async (data: UserType) => {
    await api
      .put(`/user/${TypeModal?.id}`, {
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        password: data.password,
        token,
      })
      .then(res => {
        if (res.data.error === '') {
          toasts.sucessNotification('Usuario editado com sucesso');
        }
      });
  };

  const getUsers = async () => {
    await api
      .get('/users', {
        params: {
          token: token,
        },
      })
      .then(res => setDataUsers(res.data.list));
  };

  const addNewUser = async (data: UserType) => {
    await api
      .post('/users', {
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        password: data.password,
        token,
      })
      .then(res => {
        if (res.data.error === '') {
          toasts.sucessNotification('Usuario salvo com sucesso!');
          handleModal();
        } else {
          toasts.errorNotification(res.data.error);
        }
      });
  };

  const deleteUser = useCallback(async (id: number | undefined) => {
    await api
      .delete(`/user/${id}`, {
        params: {
          token: token,
        },
      })
      .then(res => {
        if (res.data.error === '') {
          toasts.sucessNotification('Usúario excluido com sucesso');
        }
        setStateModal(false);
        getUsers();
      });
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Root open={stateModal}>
      <Theme>
        <div>Tela de usúarios</div>
        <div
          onClick={() => {
            setStateModal(true);
            setIsAddOrEdit(true);
            setTypeModal({
              title: 'Novo',
            });
          }}
        >
          <Buttons type="BlueBtn" content="Adicionar usuario" />
        </div>
        <AreaTable>
          <ModalEdit>
            {TypeModal?.title !== 'Deletar' && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1>{TypeModal?.title} usuario</h1>
                <label>Nome do usuario</label>
                <p>{errors.name?.message}</p>
                <Input
                  bg={errors.name?.message}
                  {...register('name')}
                  name="name"
                />
                <label>Email do usuario</label>
                <p>{errors.email?.message}</p>
                <Input
                  bg={errors.email?.message}
                  {...register('email')}
                  name="email"
                />
                <label>CPF do usuario</label>
                <p>{errors.cpf?.message}</p>
                <Input
                  bg={errors.cpf?.message}
                  {...register('cpf')}
                  name="cpf"
                />
                <label>Nova senha</label>
                <p>{errors.password?.message}</p>
                <Input
                  bg={errors.password?.message}
                  {...register('password')}
                  name="password"
                />
                <label>Confirme a nova senha</label>
                <p>{errors.newpassword?.message}</p>
                <Input bg={errors.newpassword?.message} name="newpassword" />

                <ModalArea>
                  {TypeModal?.title === 'Novo' && 
                    <button  onClick={() => addNewUser}>
                      Salvar usuario
                    </button>
                  }
                  {TypeModal?.title === 'Editar' && 
                  
                  <button  onClick={() => editUser}>
                   Editar usuario
                  </button>
                   
                  }

                  <button type="button" onClick={() => setStateModal(false)}>
                    Cancelar
                  </button>
                </ModalArea>
              </form>
            )}

            {TypeModal?.title === 'Deletar' && (
              <>
                <h3>{TypeModal.title} Usuario</h3>
                <p>
                  Deseja realmente <b>EXCLUIR</b> este úsuario?
                </p>
                <ModalArea>
                  <button onClick={() => deleteUser(TypeModal?.id)}>
                    Excluir
                  </button>
                  <button onClick={() => setStateModal(false)}>Cancelar</button>
                </ModalArea>
              </>
            )}
          </ModalEdit>

          <TableHead name email actions cpf />
          {currentItems.map(data => {
            return (
              <div key={data.id}>
                <p>{data.name}</p>
                <p>{data.cpf}</p>
                <p>{data.email}</p>

                <ButtonsContent>
                  <div
                    onClick={() => {
                      setStateModal(true);
                      setIsAddOrEdit(false);
                      setTypeModal({
                        title: 'Editar',
                        id: data.id,
                      });
                    }}
                  >
                    <Buttons content="Editar" type={'BlueBtn'} />
                  </div>
                  <div
                    onClick={() => {
                      setStateModal(true);
                      setTypeModal({
                        title: 'Deletar',
                        id: data.id,
                      });
                    }}
                  >
                    <Buttons content="Deletar" type={''} />
                  </div>
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
    </Root>
  );
};
