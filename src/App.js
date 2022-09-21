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
          <Route path="/dashboard/inicio" element={<Home />} />
          <Route path="/dashboard/contenido" element={<Content />} />
          <Route path="/dashboard/prestamos" element={<Lendings />} />
          <Route path="/dashboard/perfil" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
