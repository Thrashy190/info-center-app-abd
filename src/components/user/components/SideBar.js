import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import Logo from "../../../assets/shared/its.png";
import { useAuth } from "../../../context/UserProvider";
import { useLocation } from "react-router-dom";

const tabsData = [
  { title: "Inicio", icon: <HomeIcon />, link: "/dashboard/inicio" },
  {
    title: "Contenido",
    icon: <LibraryBooksIcon />,
    link: "/dashboard/contenido",
  },
  { title: "Prestamos", icon: <CheckBoxIcon />, link: "/dashboard/prestamos" },
  { title: "Perfil", icon: <AccountBoxIcon />, link: "/dashboard/perfil" },
];

const SideBar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <div className="SideBar">
      <div
        style={{
          paddingTop: "20px",
          display: "flex",
          direction: "column",
          justifyContent: "center",
        }}
      >
        <img src={Logo} alt="Logo its" className="logo"></img>
      </div>
      <ul className="SidebarList">
        {tabsData.map((val, key) => {
          return (
            <li
              key={key}
              className={val.link === location.pathname ? "row active" : "row"}
              onClick={() => {
                navigate(val.link);
              }}
            >
              <div id="icon">{val.icon}</div>
              <Typography id="title">{val.title}</Typography>
            </li>
          );
        })}
        <li
          className="row"
          onClick={() => {
            logout();
          }}
        >
          <div id="icon">
            <LogoutIcon />
          </div>
          <Typography id="title">Cerrar sesion</Typography>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;