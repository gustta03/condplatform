import { Toaster } from 'react-hot-toast';
import Rotas from './routes/Routes';
import GlobalStyle from './styles/global';

function App() {
  return (
    <>
      <Rotas />
      <GlobalStyle />
      <Toaster />
    </>
  );
}

export default App;
