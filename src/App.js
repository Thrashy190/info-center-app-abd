import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/login/Login";
import UserType from "./components/auth/UserType";
import Register from "./components/auth/register/Register";
import Dashboard from "./components/user/Dashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/usertype" />} />
        <Route path="/usertype" element={<UserType />} />
        <Route path="/login/:id" element={<Login />} />
        <Route path="/register/:id" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="*"
          element={() => {
            return <div>404 pagina no encontrada</div>;
          }}
        />
      </Routes>
    </div>
  );
}

export default App;
