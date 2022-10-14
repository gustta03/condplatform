import { Route, Routes } from 'react-router-dom';
import { Avisos } from '../pages/Avisos';
import { Dashboard } from '../pages/Dashboard';
import { Documentos } from '../pages/Documentos';
import { LoginApp } from '../pages/Login';
import { NotFound } from '../pages/NotFound';
import { Reservas } from '../pages/Reservas';
import { Ocorrencias } from '../pages/Ocorrencias';
import { Achados } from '../pages/Achados';
import { Usuarios } from '../pages/Usuarios';

function Rotas() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />}></Route>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<LoginApp />} />
      <Route path="/avisos" element={<Avisos />} />
      <Route path="/documento" element={<Documentos />} />
      <Route path="/reservas" element={<Reservas />} />
      <Route path="/ocorrencias" element={<Ocorrencias />} />
      <Route path="/achados" element={<Achados />} />
      <Route path="/usuarios" element={<Usuarios />} />
    </Routes>
  );
}

export default Rotas;
