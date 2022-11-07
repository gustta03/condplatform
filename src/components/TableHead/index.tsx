
import { TableHeader } from './styles';

interface Props {
  date?: string | undefined;
  area?: boolean;
  title?: boolean;
  photos?: boolean;
  resolvidos?: 'Titulo' | 'Resolvido' | 'recuperado';
  unit?: boolean;
  actions?: boolean;
  local?: boolean;
  desc?: boolean;
  name?: boolean;
  email?: boolean;
  cpf?: boolean;
  ativo?: boolean;
  funcionamento?: boolean;
  Capa?: boolean;
  inicio?: boolean;
  fim?: boolean;
  owner?: boolean;
}

export const TableHead = ({
  date,
  area,
  photos,
  resolvidos,
  unit,
  actions,
  title,
  local,
  desc,
  name,
  email,
  cpf,
  ativo,
  Capa,
  funcionamento,
  inicio,
  fim,
  owner
}: Props) => {
  return (
    <TableHeader>
      {resolvidos ? <p>{resolvidos}</p> : null}
      {unit ? <p>Unidade</p> : null}
      {ativo ? <p>Ativo</p> : null}
      {title ? <p>Título</p> : null}
      {local ? <p>local</p> : null}
      {Capa ? <p>Capa</p> : null}
      {funcionamento ? <p>Dias da semana de funcionamento</p> : null}
      {inicio ? <p>Horário de inicio</p> : null}
      {fim ? <p>Horário de fim</p> : null}
      {desc ? <p>descrição</p> : null}
      {area ? <p>Àrea</p> : null}
      {date ? <p>{date}</p> : null}
      {photos ? <p>Fotos</p> : null}
      {name ? <p>Nome</p> : null}
      {cpf ? <p>CPF</p> : null}
      {email ? <p>Email</p> : null}
      {owner ? <p>Propietário</p> : null}
      {actions ? <p>Ações</p> : null}
    </TableHeader>
  );
};
