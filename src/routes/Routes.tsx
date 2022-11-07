import { Route, Routes } from 'react-router-dom';
import { Avisos } from '../pages/Warnings';
import { Dashboard } from '../pages/Dashboard';
import { Documentos } from '../pages/Documents';
import { LoginApp } from '../pages/Login';
import { NotFound } from '../pages/NotFound';
import { Reservas } from '../pages/Reservations';
import { Ocorrencias } from '../pages/Occurrences';
import { Achados } from '../pages/Founds';
import { Usuarios } from '../pages/Users';
import { Areas } from '../pages/CommonAreas';
import { Unidades } from '../pages/Units';

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
      <Route path="/areascomuns" element={<Areas />} />
      <Route path="/unidades" element={<Unidades />} />
    </Routes>
  );
}

export default Rotas;
