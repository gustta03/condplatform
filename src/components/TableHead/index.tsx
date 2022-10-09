import { Phone } from "phosphor-react";
import { TableHeader } from "./styles";

interface Props {
  date?: string | undefined;
  area?: boolean;
  title?: boolean;
  photos?: boolean;
  resolvidos?: "Titulo" | "Resolvido";
  unit?: boolean;
  actions?: boolean;
}

export const TableHead = ({ date, area, photos, resolvidos, unit, actions, title }: Props) => {
  return (
    <TableHeader>
      {resolvidos ? <p>{resolvidos}</p> : null}
      {unit ? <p>Unidade</p> : null}
      {title ? <p>Título</p> : null}
      {area ? <p>Àrea</p> : null}
     
      {date ? <p>{date}</p> : null}
      {photos ? <p>Fotos</p> : null}
      {actions ? <p>Ações</p> : null}
    </TableHeader>
  );
};
