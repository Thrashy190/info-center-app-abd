import React, { useState, useEffect } from "react";
import SideBar from "../../shared/SideBar";
import "../../../App.css";
import {
  Grid,
  Button,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { useAuth } from "../../../context/UserProvider";

const EnterAdmin = () => {
  //const { getStudents } = useAuth();

  const [data, setData] = useState([]);

  const [user, setUser] = useState("A");
  const ingresos = [
    {
      id: "C19051632",
      fecha_ingreso: "23/07/32",
      tipo_user: "student",
      genero: "Hombre",
    },
    {
      id: "1231",
      fecha_ingreso: "23/07/32",
      tipo_user: "employee",
      genero: "Hombre",
    },
    {
      id: "C19051632",
      fecha_ingreso: "23/07/32",
      tipo_user: "student",
      genero: "Hombre",
    },
    {
      id: "C19051632",
      fecha_ingreso: "23/07/32",
      tipo_user: "student",
      genero: "Hombre",
    },
    {
      id: "C19051632",
      fecha_ingreso: "23/07/32",
      tipo_user: "student",
      genero: "Hombre",
    },
  ];

  const UserText = (text) => {
    return text === "student"
      ? "Estudiante"
      : text === "employee"
      ? "Empleado"
      : "Otros";
  };

  // useEffect(() => {
  //   setData(getStudents());
  //   console.log(data);
  // }, []);

  return (
    <Grid container className="App">
      <Grid item xs={12} md={2}>
        <SideBar type={"admin"}></SideBar>
      </Grid>
      <Grid item xs={12} md={10}>
        <div style={{ padding: "40px" }}>
          <Grid sx={{ pb: "30px" }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography sx={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                Ingresos al centro de informacion
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ pb: "30px" }} container item spacing={2}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Ususario</InputLabel>
                <Select
                  defaultValue={"A"}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Usuarios"
                  name="user"
                  value={user}
                  onChange={(e) => {
                    setUser(e.target.value);
                  }}
                >
                  <MenuItem value={"A"}>Alumnos</MenuItem>
                  <MenuItem value={"W"}>Empleados</MenuItem>
                  <MenuItem value={"O"}>Otros</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid sx={{ pb: "30px" }} container item spacing={2}>
            {user === "A" ? (
              <>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Numero de control" />
                </Grid>
              </>
            ) : user === "W" ? (
              <>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Numero de empleado" />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Correo" />
                </Grid>
              </>
            )}
            <Grid
              item
              xs={12}
              md={3}
              style={{ display: "flex", alignContent: "center" }}
            >
              <Button variant="contained" style={{ width: "100%" }}>
                Agregar
              </Button>
            </Grid>
          </Grid>
          <Grid sx={{ pb: "20px" }} container item spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                Lista de ingresos
              </Typography>
            </Grid>
          </Grid>
          <div
            style={{
              width: "100%",
              marginTop: "40px",
              height: "500px",
              overflow: "auto",
            }}
          >
            {ingresos.map((data, key) => {
              return (
                <Box
                  key={key}
                  sx={{
                    boxShadow: 2,
                    mb: "20px",
                    py: "20px",
                    px: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <div
                    style={{
                      paddingLeft: "30px",
                      display: "flex",
                      direction: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <Typography sx={{ fontSize: "1.2rem" }}>
                      <Typography
                        sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                      >
                        Identificador:
                      </Typography>
                      {data.id}
                    </Typography>
                    <Typography sx={{ fontSize: "1.2rem" }}>
                      <Typography
                        sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                      >
                        Fecha de ingreso:
                      </Typography>
                      {data.fecha_ingreso}
                    </Typography>
                    <Typography sx={{ fontSize: "1.2rem" }}>
                      <Typography
                        sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                      >
                        Tipo de usuario:
                      </Typography>
                      {UserText(data.tipo_user)}
                    </Typography>
                    <Typography sx={{ fontSize: "1.2rem" }}>
                      <Typography
                        sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                      >
                        Genero:
                      </Typography>
                      {data.genero}
                    </Typography>
                  </div>
                </Box>
              );
            })}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default EnterAdmin;
