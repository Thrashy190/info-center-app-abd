import React from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import LogoutIcon from "@mui/icons-material/Logout";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useNavigate } from "react-router-dom";
import { Typography, Grid } from "@mui/material";
import Logo from "../../../assets/shared/its.png";
import { useAuth } from "../../../context/UserProvider";
import { useLocation } from "react-router-dom";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { getTodayDate } from "../../../helpers/DateConverter";

const tabsAdminData = [
  {
    title: "Contenido",
    icon: <LibraryBooksIcon />,
    link: "/admin/dashboard/contenido",
  },
  {
    title: "Prestamos",
    icon: <CheckBoxIcon />,
    link: "/admin/dashboard/prestamos",
  },
  {
    title: "Ingresos",
    icon: <AccessTimeIcon />,
    link: "/admin/dashboard/ingresos",
  },
  {
    title: "Usuarios",
    icon: <GroupAddIcon />,
    link: "/admin/dashboard/registro",
  },
  {
    title: "Reportes",
    icon: <AssessmentIcon />,
    link: "/admin/dashboard/reportes",
  },
];

const SideBar = ({ type }) => {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
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

      <div className="infoconteiner">
        <Typography id="info">Te atiende:</Typography>
        <Typography id="info">
          {currentUser.name} {currentUser.lastNameFather}{" "}
          {currentUser.lastNameMother}
        </Typography>
        <Typography id="info">Fecha de hoy: </Typography>
        <Typography id="info">{getTodayDate()}</Typography>
      </div>

      <ul className="SidebarList">
        {tabsAdminData.map((val, key) => {
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
