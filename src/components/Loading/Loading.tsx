import { ReactNode } from 'react';
import { Load } from './styled';

interface stateLoading {
  open: boolean;
  children: ReactNode
}

export const Loading = ({ open, children }: stateLoading) => {
  return (
    <div>
      {open ? <Load>carregando</Load> : children}
    </div>
  )
}