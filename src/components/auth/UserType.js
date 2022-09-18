import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Logo from "../../assets/shared/its.png";
import { useNavigate } from "react-router-dom";

const UserType = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);

  useEffect(() => {
    if (page) {
      navigate("/login/" + page);
    }
  }, [page, navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
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
          py: "3em",
          my: "3em",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography style={{ fontSize: "1.8rem", fontWeight: "lighter" }}>
              Instituto Tecnologico de Saltillo
            </Typography>
            <Typography
              variant="h1"
              style={{ fontSize: "2.5rem", fontWeight: "bold" }}
            >
              Centro de información
            </Typography>
          </div>
        </div>
        <Stack
          spacing={4}
          sx={{ py: "2em" }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            style={{ width: "80%", fontSize: "1.5rem" }}
            onClick={() => setPage("student")}
          >
            Alumnos
          </Button>
          <Button
            variant="contained"
            style={{ width: "80%", fontSize: "1.5rem" }}
            onClick={() => setPage("employees")}
          >
            Empleados
          </Button>
          <Button
            variant="contained"
            style={{ width: "80%", fontSize: "1.5rem" }}
            onClick={() => setPage("other")}
          >
            Otros
          </Button>
        </Stack>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            style={{ fontSize: "1rem", fontWeight: "lighter" }}
          >
            ¿Usted es administrador? {"  "}
            <Typography
              sx={{
                textDecoration: "underline",
                "&:hover": {
                  cursor: "pointer",
                  color: "#800040",
                },
              }}
              display="inline"
              onClick={() => setPage("admin")}
            >
              Entre aqui
            </Typography>
          </Typography>
        </div>
      </Box>
    </div>
  );
};

export default UserType;
