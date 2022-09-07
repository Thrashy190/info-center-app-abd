import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Logo from "../../../assets/shared/its.png";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  return (
    <Stack
      spacing={4}
      sx={{ py: "2em" }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <TextField
        id="numControl"
        label="Numero de control"
        variant="outlined"
        sx={{ width: "80%" }}
      />
      <TextField
        id="password"
        label="Contraseña"
        variant="outlined"
        sx={{ width: "80%", fontSize: "1.5rem" }}
      />
    </Stack>
  );
};

const EmployeeLogin = () => {
  return (
    <Stack
      spacing={4}
      sx={{ py: "2em" }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <TextField
        id="numEmpleado"
        label="Numero de empleado"
        variant="outlined"
        sx={{ width: "80%" }}
      />
      <TextField
        id="password"
        label="Contraseña"
        variant="outlined"
        sx={{ width: "80%", fontSize: "1.5rem" }}
      />
    </Stack>
  );
};

const OtherLogin = () => {
  return (
    <Stack
      spacing={4}
      sx={{ py: "2em" }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <TextField
        id="email"
        label="Correo electronico"
        variant="outlined"
        sx={{ width: "80%" }}
      />
      <TextField
        id="password"
        label="Contraseña"
        variant="outlined"
        sx={{ width: "80%", fontSize: "1.5rem" }}
      />
    </Stack>
  );
};

const AdminLogin = () => {
  return (
    <Stack
      spacing={4}
      sx={{ py: "2em" }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <TextField
        id="email"
        label="Correo electronico"
        variant="outlined"
        sx={{ width: "80%" }}
      />
      <TextField
        id="password"
        label="Contraseña"
        variant="outlined"
        sx={{ width: "80%", fontSize: "1.5rem" }}
      />
    </Stack>
  );
};

const Login = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pageLogin, setPageLogin] = useState(0);

  useEffect(() => {
    if (pageLogin) {
      navigate("/register/" + pageLogin);
    }
  }, [pageLogin, navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "75%",
          boxShadow: 4,
          borderRadius: "16px",
          justifyContent: "center",
          py: "3em",
          my: "3em",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={Logo}
            alt="Logo its"
            style={{
              width: "15%",
            }}
          ></img>
          <div sx={{ display: "flex" }}>
            <Typography style={{ fontSize: "1.8rem", fontWeight: "lighter" }}>
              Centro de información
            </Typography>
            <Typography
              variant="h1"
              style={{ fontSize: "2.5rem", fontWeight: "bold" }}
            >
              Inicio de sesion de
              {id === "student"
                ? " Alumnos"
                : id === "employees"
                ? " Empleados"
                : id === "other"
                ? " Otros"
                : id === "admin"
                ? " Admin"
                : () => {
                    navigate("*");
                  }}
            </Typography>
          </div>

          {id === "student" ? (
            <StudentLogin />
          ) : id === "employees" ? (
            <EmployeeLogin />
          ) : id === "other" ? (
            <OtherLogin />
          ) : id === "admin" ? (
            <AdminLogin />
          ) : null}

          {id !== "admin" ? (
            <div>
              <Typography
                variant="subtitle1"
                style={{ fontSize: "1rem", fontWeight: "lighter" }}
              >
                ¿No tienes una cuenta?{"  "}
                <Typography
                  sx={{
                    textDecoration: "underline",
                    "&:hover": {
                      cursor: "pointer",
                      color: "#800040",
                    },
                  }}
                  display="inline"
                  onClick={() => setPageLogin(id)}
                >
                  Registrate aqui
                </Typography>
              </Typography>
            </div>
          ) : null}

          <Stack
            spacing={4}
            direction="row"
            sx={{ pt: "4em" }}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              variant="outlined"
              style={{ width: "20%", fontSize: "1rem" }}
              onClick={() => navigate(-1)}
            >
              volver
            </Button>
            <Button
              variant="contained"
              style={{ width: "20%", fontSize: "1rem" }}
            >
              Entrar
            </Button>
          </Stack>
        </div>
      </Box>
    </div>
  );
};

export default Login;
