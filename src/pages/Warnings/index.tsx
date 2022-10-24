import { Theme } from '../../components/SideBarTheme';
import * as yup from 'yup';

import { ButtonModalArea, EmptyAlert, Input, ModalFormArea } from './styles';
import { Button } from './styles';

import { AreaTable } from '../../components/TableArea';
import { useCallback, useEffect, useState } from 'react';
import { api } from '../../services/api/api';
import { Buttons } from '../../components/Buttons';
import { ModalEdit } from '../../components/Modal';
import { TableHead } from '../../components/TableHead';


import { Root, Trigger } from '@radix-ui/react-dialog';

import { yupResolver } from '@hookform/resolvers/yup';

import { toasts } from '../../utils/toast';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Pagination } from '../../components/Pagenation';
import { Loading } from '../../components/Loading/Loading';
import { useCurrentPage } from '../../hooks/usePagination';

export interface TypeData {
  body: string;
  id: number;
  title: string;
  datecreated: string;
}

interface TypeDataModal {
  title: string;
  id?: number;
}

interface Input {
  title: string;
  body: string;
  id: number;
}

export const Avisos = () => {
  const token = localStorage.getItem('@user:admin');
  const [dataWarnings, setData] = useState<TypeData[]>([]);
  const [Modal, setModal] = useState<TypeDataModal>();
  const [isLoading, setIsLoading] = useState(false);
  const [StateModal, setStateModal] = useState(false);

  const PageSize = 6;

  const { currentItems, currentPage, setCurrentPage } = useCurrentPage(dataWarnings, PageSize)
  
  const [AddOrEdit, setAddOrEdit] = useState(false);

  const schema = yup.object().shape({
    title: yup.string().required('o titulo é obrigatorio'),
    body: yup.string().required('o corpo do aviso é obrigatorio'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Input>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Input) => {
    if (AddOrEdit) {
      createWarning(data);
      console.log(AddOrEdit);
    } else {
      handleEditButton(data);
    }
  };

  const getWarnings = useCallback(async () => {
    setIsLoading(true);
    await api
      .get('/walls', {
        params: { token: token },
      })
      .then(res => res.data)
      .then(res => {
        setData(res.list);
      });

    resetValidation();
    setIsLoading(false);
  }, []);

  const resetValidation = () => {
    reset();
    setStateModal(false);
  };

  const handleEditButton = async (data: Input) => {
    await api.put(`/wall/${Modal?.id}`, {
      token: token,
      title: data.title,
      body: data.body,
    });

    toasts.sucessNotification('Aviso editado com sucesso!');

    getWarnings();
    resetValidation();
  };

  const handleDeleteButton = useCallback(async (id: number | undefined) => {
    await api.delete(`/wall/${id}`, { params: { token } }).then(res => {
      if (res.data.error === '') {
        toasts.sucessNotification('Aviso excluído com sucesso');
      }
    });

    getWarnings();
    resetValidation();
  }, []);

  const createWarning = async (data: Input) => {
    await api
      .post(`/walls`, { title: data.title, body: data.body, token })
      .then(res => res.data)
      .then(res => {
        if (res.error === '') {
          toasts.sucessNotification('Aviso enviando para o App');
        }
      });

    getWarnings();
    resetValidation();
  };

  useEffect(() => {
    getWarnings();
  }, []);

  return (
    <Root open={StateModal}>
      <Theme>
        <Loading open={isLoading}>
          <p>Tela de avisos</p>

          <Trigger asChild>
            <span
              onClick={() =>
                setModal({
                  title: 'Adicionar',
                })
              }
            >
              <Button onClick={() => setStateModal(true)}>Novo aviso</Button>
            </span>
          </Trigger>

          <ModalEdit>
            <div>....</div>
            <ModalFormArea>
              <form onSubmit={handleSubmit(onSubmit)}>
                {Modal?.title != 'Deletar' && (
                  <>
                    <span>
                      <h2>{Modal?.title} aviso</h2>
                    </span>
                    <label>Título</label>
                    <Input
                      bg={errors.title?.message}
                      {...register('title')}
                      name="title"
                    />
                    <p>{errors.title?.message}</p>

                    <label>Corpo do aviso</label>
                    <Input
                      bg={errors.body?.message}
                      {...register('body')}
                      name="body"
                    />
                    <p>{errors.body?.message}</p>

                    <ButtonModalArea>
                      {Modal?.title === 'Adicionar' && (
                        <button onClick={() => setAddOrEdit(true)}>
                          Adicionar
                        </button>
                      )}
                      {Modal?.title !== 'Adicionar' && (
                        <button onClick={() => setAddOrEdit(false)}>
                          Editar
                        </button>
                      )}
                      <button onClick={() => setStateModal(false)}>
                        Cancelar
                      </button>
                    </ButtonModalArea>
                  </>
                )}

                {Modal?.title === 'Deletar' && (
                  <>
                    <h3>Excluir Aviso</h3>
                    <h4>
                      Deseja realmente <b>EXCLUIR</b> este aviso?
                    </h4>
                    <ButtonModalArea>
                      <button onClick={() => handleDeleteButton(Modal.id)}>
                        Excluir
                      </button>
                      <button onClick={() => setStateModal(false)}>
                        Cancelar
                      </button>
                    </ButtonModalArea>
                  </>
                )}
              </form>
            </ModalFormArea>
          </ModalEdit>
          {currentItems.length > 0 && (
            <AreaTable>
              <TableHead
                date={'data de criação'}
                resolvidos={'Titulo'}
                actions
              />
              {currentItems.map(item => {
                return (
                  <div key={item.id}>
                    <p>{item.title}</p>
                    <p>{item.datecreated}</p>
                    <p>
                      <b
                        onClick={() => {
                          setModal({
                            title: 'Editar',
                            id: item.id,
                          });
                          setStateModal(true);
                        }}
                      >
                        <Buttons type="BlueBtn" content="Editar" />
                      </b>
                      <b
                        onClick={() => {
                          setModal({
                            title: 'Deletar',
                            id: item.id,
                          });
                          setStateModal(true);
                        }}
                      >
                        <Buttons type="Deletar" content="Deletar" />
                      </b>
                    </p>
                  </div>
                );
              })}
            </AreaTable>
          )}

          <Pagination
            currentPage={currentPage}
            totalCount={dataWarnings.length}
            pageSize={PageSize}
            onPageChange={(page: number) => setCurrentPage(page)}
          />

          {/* {dataWarnings.length <= 0 && (
            <EmptyAlert>
              <FileArrowUp size={100} color="#a0a0a0" />
              <h4>Ops... Não há avisos cadastrados no sistema</h4>
            </EmptyAlert>
          )} */}
        </Loading>
      </Theme>
    </Root>
  );
};
