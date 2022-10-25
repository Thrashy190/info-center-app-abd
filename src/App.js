import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

//auth
import Login from './components/auth/Login';

//Dashboard
import ContentAdmin from './components/admin/Content/ContentAdmin';
import AddContent from './components/admin/Content/AddContent';
import LendingAdmin from './components/admin/Prestamos/LendingsAdmin';
import EnterAdmin from './components/admin/Ingresos/EnterAdmin';
import UsersAdmin from './components/admin/Users/UsersAdmin';

//ruta protegida
import ProtectedRoute from './helpers/ProtectedRouter';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="*"
          element={() => {
            return <div>404 pagina no encontrada</div>;
          }}
        />
        <Route path="/" element={<Navigate to="/login" />} />
        {/* <Route path="/usertype" element={<UserType />} /> */}
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          {/* rutas admin privadas */}
          <Route path="/admin/dashboard/contenido" element={<ContentAdmin />} />
          <Route
            path="/admin/dashboard/contenido/agregar"
            element={<AddContent />}
          />
          <Route path="/admin/dashboard/prestamos" element={<LendingAdmin />} />
          <Route path="/admin/dashboard/ingresos" element={<EnterAdmin />} />
          <Route path="/admin/dashboard/registro" element={<UsersAdmin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
