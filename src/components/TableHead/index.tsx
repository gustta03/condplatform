import { Phone } from "phosphor-react";
import { TableHeader } from "./styles";

interface Props {
  date?: string | undefined;
  area?: boolean;
  title?: boolean;
  photos?: boolean;
  resolvidos?: "Titulo" | "Resolvido" | 'recuperado';
  unit?: boolean;
  actions?: boolean;
  local?: boolean;
  desc?: boolean;
  name?: boolean;
  email?: boolean;
  cpf?: boolean;
}

export const TableHead = ({ date, area, photos, resolvidos, unit, actions, title, local, desc, name, email, cpf }: Props) => {
  return (
    <TableHeader>
      {resolvidos ? <p>{resolvidos}</p> : null}
      {unit ? <p>Unidade</p> : null}
      {title ? <p>Título</p> : null}
      {local ? <p>local</p> : null}
      {desc ? <p>descrição</p> : null}
      {area ? <p>Àrea</p> : null}
      {date ? <p>{date}</p> : null}
      {photos ? <p>Fotos</p> : null}
      {name ? <p>Nome</p> : null}
      {cpf ? <p>CPF</p> : null}
      {email ? <p>Email</p> : null}
      {actions ? <p>Ações</p> : null}
    </TableHeader>
  );
};
