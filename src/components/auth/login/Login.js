import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Logo from "../../../assets/shared/its.png";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/UserProvider";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [pageLogin, setPageLogin] = useState(0);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (pageLogin) {
      navigate("/register/");
    }
  }, [pageLogin, navigate]);

  const logIn = () => {
    login(loginData.email, loginData.password, "admin");
  };

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
          boxShadow: 2,
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
            justifyContent: "center",
          }}
        >
          <img
            src={Logo}
            alt="Logo its"
            style={{
              width: "15%",
            }}
          ></img>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography style={{ fontSize: "1.8rem", fontWeight: "lighter" }}>
              Centro de información
            </Typography>
            <Typography
              variant="h1"
              style={{ fontSize: "2.5rem", fontWeight: "bold" }}
            >
              Inicio de sesion
            </Typography>
          </div>

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
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              value={loginData.email}
              onChange={(e) => {
                handleChange(e);
              }}
              sx={{ width: "80%", fontSize: "1.5rem" }}
            />
            <TextField
              id="password"
              label="Contraseña"
              variant="outlined"
              name="password"
              type="password"
              value={loginData.Password}
              onChange={handleChange}
              sx={{ width: "80%", fontSize: "1.5rem" }}
            />
          </Stack>

          {/* {id !== "admin" ? (
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
          ) : null} */}

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
            {/* <Button
              variant="outlined"
              style={{ width: "20%", fontSize: "1rem" }}
              onClick={() => navigate(-1)}
            >
              volver
            </Button> */}
            <Button
              variant="contained"
              style={{ width: "40%", fontSize: "1rem" }}
              onClick={logIn}
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
