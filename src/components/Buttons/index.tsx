
import { Button } from "./styles";

interface PropButton {
  type: string;
  content?: string;
}

export const Buttons = ({ type, content }: PropButton) => {


  return (
    <>
       <Button bg={type}>{content}</Button>
    </>
  );
};
