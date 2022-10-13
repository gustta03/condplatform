import { Overlay, Root } from '@radix-ui/react-dialog';
import { Load, Container } from './styled';

interface TypeRoot {
  open: boolean;
}

export const LoadingRequest = ({ open }: TypeRoot) => {
  return (
    <Root open={open}>
      <Container>
        <Overlay>
          <Load>
            <div className="lds-facebook"><div></div><div></div><div></div></div>
          </Load>
        </Overlay>
      </Container>
    </Root>
  );
};
