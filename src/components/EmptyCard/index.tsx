import { FileArrowUp, FilePlus } from "phosphor-react";
import { EmptyAlert } from "./styles";

interface Props {
  type: string;
}

export const EmptyAlertIcon = ({ type }: Props) => {
  return (
    <EmptyAlert>
      <FilePlus size={100} color="#a0a0a0" />
      <h4>Ops... Não há {type} cadastrados no sistema</h4>
    </EmptyAlert>
  );
};
