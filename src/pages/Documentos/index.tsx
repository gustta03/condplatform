import { Trigger, DialogClose, Root } from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Theme } from '../../components/SideBarTheme';
import { AreaTable } from '../../components/TableArea';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { api } from '../../services/api/api';

import { Buttons } from '../../components/Buttons';
import { ModalEdit } from '../../components/Modal';
import { TableHead } from '../../components/TableHead';

import { Button, ModalArea, ButtonsArea, Buttonc, Input } from './styles';

import {
  CheckModalTrueOrFalse,
  IsOpen,
  StateModalDefaltMainApp,
} from '../../helpers/CheckStateModal';

import { EmptyAlertIcon } from '../../components/EmptyAlert';

import { Pagenate } from '../../components/Pagination';

import { toasts } from '../../utils/toast';

export interface TypeDataDocs {
  fileurl: string;
  id: number;
  title: string;
}
interface TypeModalInfos {
  title: string;
  id: number;
}

interface schemaType {
  title: string;
  file: boolean;
}
export interface TypeError {
  error: string;
  ErrorEditDoc: string;
}

export const Documentos = () => {
  const token: any = localStorage.getItem('@user:admin');
  const [dataDocs, setDataDocs] = useState<TypeDataDocs[]>([]);
  const [loading, setLoading] = useState(false);
  const [addOrEdit, setAddOrEdit] = useState(false);

  const [ModalInfo, setModalInfo] = useState<TypeModalInfos>();
  const [title, setTitle] = useState('');

  const [File, setFile] = useState<FileList | null>();
  const [StateModal, setStateModal] = useState(false);

  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentpage] = useState(0);

  const page = Math.ceil(dataDocs.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = dataDocs.slice(startIndex, endIndex);

  const schema = yup.object().shape({
    title: yup.string().required('O nome do documento é obrigatorio'),
    file: yup.mixed().test('required', 'O arqivo é obrigatorio', _file => {
      if (_file.length >= 1) {
        return true;
      }

      return false;
    }),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: yupResolver(schema),
  });

  const ReloadInput = () => {
    reset();
    setStateModal(false);
  };

  const getDocuments = useCallback(async () => {
    await api
      .get('/docs', {
        params: { token },
      })
      .then(res => res.data)
      .then(res => setDataDocs(res.list));
  }, [dataDocs]);

  const onSubmit = useCallback(() => {
    return addOrEdit ? handleAddDocument : handleEditDocument;
  }, []);

  const handleEditDocument = async (id: number) => {
    const formData = new FormData();
    formData.append('title', title);

    if (File) {
      formData.append('file', File[0]);
    }

    formData.append('token', token);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data; charset=utf-8;',
      },
    };

    await api
      .post(`/doc/${id}`, formData, config)
      .then(res => res.data)
      .then(res => {
        if (res.error === '') {
          toasts.sucessNotification('Documento editado com sucesso!');
          setStateModal(false);
          reset();
        }
      });

    getDocuments();
  };

  const ChangeStateModalToMainApp = useCallback(() => {
    StateModalDefaltMainApp(false);
    setStateModal(false);
  }, []);

  const handleAddDocument = useCallback(async () => {
    const formData = new FormData();
    formData.append('title', title);

    if (File) {
      formData.append('file', File[0]);
    }

    formData.append('token', token);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data; charset=utf-8;',
      },
    };
    await api
      .post(`/docs`, formData, config)
      .then(res => res.data)
      .then(res => {
        if (res.error === '') {
          toasts.sucessNotification('Documento enviado para o App');
          setStateModal(false);
          reset();
        } else {
          toasts.errorNotification(res.error);
        }
      });

    // CheckModalTrueOrFalse(error.error === "");
    // setStateModal(IsOpen);

    getDocuments();
  }, [title, File]);

  const handleDelteDocument = useCallback(async (id: number) => {
    await api
      .delete(`/doc/${id}`, {
        params: {
          token: token,
        },
      })
      .then(res => res.data)
      .then(res => {
        if (res.error === '') {
          toasts.sucessNotification('Documento excluido com sucesso!');
        }
      });

    getDocuments();
    setStateModal(false);
  }, []);

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <Root open={StateModal}>
      <Theme>
        <p>Tela documentos</p>
        <Trigger asChild>
          <span
            onClick={() =>
              setModalInfo({
                title: 'Criar',
                id: 12,
              })
            }
          >
            <Buttonc onClick={() => setStateModal(true)}>
              Novo documento
            </Buttonc>
          </span>
        </Trigger>

        {currentItems.length > 0 && (
          <AreaTable>
            <TableHead resolvidos={'Titulo'} actions />

            {currentItems.map((item: TypeDataDocs) => {
              return (
                <div key={item.id}>
                  <p>{item.title}</p>

                  <ButtonsArea>
                    <b
                      onClick={() => {
                        setModalInfo({ title: 'Editar', id: item.id });
                        setStateModal(true);
                      }}
                    >
                      <Buttons type="BlueBtn" content="Editar" />
                    </b>
                    <b
                      onClick={() => {
                        setModalInfo({ title: 'Deletar', id: item.id });
                        setStateModal(true);
                      }}
                    >
                      <Buttons type="Deletar" content="Deletar" />
                    </b>
                    <b>
                      <a href={item.fileurl} target="_blank">
                        <Button>Abrir</Button>
                      </a>
                    </b>
                  </ButtonsArea>
                </div>
              );
            })}
          </AreaTable>
        )}

        <ModalEdit>
          {ModalInfo?.title === 'Deletar' && (
            <>
              <h3>Excluir documento</h3>
              <p>
                Deseja realmente <b>EXCLUIR</b> este documento?
              </p>
              {ModalInfo?.title === 'Deletar' && (
                <ModalArea>
                  <Trigger
                    onClick={() => {
                      handleDelteDocument(ModalInfo.id);
                    }}
                  >
                    Deletar
                  </Trigger>
                  <DialogClose onClick={() => ReloadInput}>
                    Cancelar
                  </DialogClose>
                </ModalArea>
              )}
            </>
          )}
          {ModalInfo?.title !== 'Deletar' && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3>{ModalInfo?.title} documento</h3>
              <label>Nome do documento</label>

              <Input
                bg={errors.title?.message}
                {...register('title')}
                placeholder="Digite aqui o nome do documento"
                name="title"
                onChange={e => setTitle(e.target.value)}
              />

              <p>{errors.title?.message}</p>
              <label>Arquivo (PDF)</label>

              <Input
                bg={errors.file?.message}
                type="file"
                {...register('file')}
                name="file"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setFile(event.target.files)
                }
                placeholder="Subir arquivo (PDF)"
              />

              <p>{errors.file?.message}</p>
              <ModalArea>
                {ModalInfo?.title === 'Criar' && (
                  <button onClick={() => handleAddDocument()}>
                    Criar documento
                  </button>
                )}
                {ModalInfo?.title === 'Editar' && (
                  <button onClick={() => handleEditDocument(ModalInfo.id)}>
                    Editar documento
                  </button>
                )}

                <button onClick={ReloadInput}>Cancelar</button>
              </ModalArea>
            </form>
          )}
        </ModalEdit>
        <Pagenate
          pages={page}
          currentPage={currentPage}
          setCurrentpages={setCurrentpage}
        />
        {dataDocs.length <= 0 && <EmptyAlertIcon type="documentos" />}
      </Theme>
    </Root>
  );
};
