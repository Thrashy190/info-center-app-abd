import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/login/Login';
import UserType from './components/auth/UserType';
import Register from './components/auth/register/Register';
import Dashboard from './components/user/Dashboard';
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
        <Route path="/" element={<Navigate to="/usertype" />} />
        <Route path="/usertype" element={<UserType />} />
        <Route path="/login/:id" element={<Login />} />
        <Route path="/register/:id" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/inicio" element={<Dashboard />} />
          <Route path="/dashboard/libros" element={<Dashboard />} />
          <Route path="/dashboard/prestamos" element={<Dashboard />} />
          <Route path="/dashboard/perfil" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
