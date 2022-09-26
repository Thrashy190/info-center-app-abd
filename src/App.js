import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

//auth
import Login from "./components/auth/login/Login";
import UserType from "./components/auth/UserType";
import Register from "./components/auth/register/Register";

//DAshboard user
import Home from "./components/user/Home";
import Content from "./components/user/Content";
import Profile from "./components/user/Profile";
import Lendings from "./components/user/Lendings";

//Dashboard admin
import HomeAdmin from "./components/admin/HomeAdmin";
import ContentAdmin from "./components/admin/content/ContentAdmin";
import AddContent from "./components/admin/content/AddContent";
import LendingAdmin from "./components/admin/Prestamos/LendingsAdmin";
import EnterAdmin from "./components/admin/Ingresos/EnterAdmin";

//ruta protegida ususarios
import ProtectedRoute from "./helpers/ProtectedRouter";

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
          {/* rutas normales privadas */}
          <Route path="/dashboard/inicio" element={<Home />} />
          <Route path="/dashboard/contenido" element={<Content />} />
          <Route path="/dashboard/prestamos" element={<Lendings />} />
          <Route path="/dashboard/perfil" element={<Profile />} />
          {/* rutas admin privadas */}
          <Route path="/admin/dashboard/inicio" element={<HomeAdmin />} />

          <Route path="/admin/dashboard/contenido" element={<ContentAdmin />} />
          <Route
            path="/admin/dashboard/contenido/agregar"
            element={<AddContent />}
          />

          <Route path="/admin/dashboard/prestamos" element={<LendingAdmin />} />
          <Route path="/admin/dashboard/ingresos" element={<EnterAdmin />} />
          <Route path="/admin/dashboard/perfil" element={<HomeAdmin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
