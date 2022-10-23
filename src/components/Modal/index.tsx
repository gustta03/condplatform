import * as Dialog from "@radix-ui/react-dialog";

import { ReactNode } from "react";
import { Content, EditArea, FormMain, ModalFormArea, Overlay, ButtonCloseArea, Hr } from './styles'

interface Children {
  children: ReactNode;
}

export const ModalEdit = ({ children }: Children) => {

  return (
    <EditArea>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <Overlay />
        </Dialog.Overlay>
        <Content>
          <div>................</div>
          <Dialog.Content>
  
            <FormMain>
              <ButtonCloseArea>
                <Dialog.Trigger asChild>
                 
                </Dialog.Trigger>
              </ButtonCloseArea>
             
               <ModalFormArea>
              
                  { children }
           
               </ModalFormArea>
           
            </FormMain>
          </Dialog.Content>
        </Content>
      </Dialog.Portal>
    </EditArea>
  );
};
