import React, { useState, useEffect } from "react";
import SideBar from "../Shared/SideBar";
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
  Autocomplete,
  LinearProgress,
} from "@mui/material";
import { useAuth } from "../../../context/UserProvider";
import { convertUnixToCompleteDate } from "../../../helpers/DateConverter";

const EnterAdmin = () => {
  const {
    getStudents,
    getEmployees,
    addAdmissionToInfoCenter,
    getAdmissions,
    fechaSalida,
  } = useAuth();

  const [studentsList, setStudentsList] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);

  const [userType, setUserType] = useState("S");

  const [ingresos, setIngresos] = useState([]);
  const [user, setUser] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setStudentsList(await getStudents());
    setEmployeesList(await getEmployees());
    setIngresos(await getAdmissions());
    await getAdmissions().then((data) => {
      setIngresos(data);
    });
  };

  const addEnter = () => {
    addAdmissionToInfoCenter(user[0], userType);
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      getData().then(() => {
        setIsLoading(false);
      });
    }
  }, [isLoading]);

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
                  defaultValue={"S"}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Usuarios"
                  name="user"
                  value={userType}
                  onChange={(e) => {
                    setUser("");
                    setUserType(e.target.value);
                  }}
                >
                  <MenuItem value={"S"}>Alumnos</MenuItem>
                  <MenuItem value={"E"}>Empleados</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid sx={{ pb: "30px" }} container item spacing={2}>
            {userType === "S" ? (
              <>
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-student"
                    value={user.numControl}
                    onChange={(e, newValue) => {
                      setUser(
                        studentsList.filter(
                          (data) => data.numControl === newValue
                        )
                      );
                    }}
                    options={studentsList.map((option) => option.numControl)}
                    renderInput={(params) => (
                      <TextField {...params} label="Numero de control" />
                    )}
                  />
                </Grid>
              </>
            ) : userType === "E" ? (
              <>
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-employee"
                    value={user.numEmployee}
                    onChange={(e, newValue) => {
                      setUser(
                        employeesList.filter(
                          (data) => data.numEmployee === newValue
                        )
                      );
                    }}
                    options={employeesList.map((option) => option.numEmployee)}
                    renderInput={(params) => (
                      <TextField {...params} label="Numero de empleado" />
                    )}
                  />
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
              <Button
                variant="contained"
                style={{ width: "100%" }}
                onClick={() => {
                  addEnter();
                }}
              >
                Agregar
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                Nombre: {user[0] ? user[0].name : ""}
              </Typography>
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
            {isLoading ? (
              <LinearProgress />
            ) : (
              ingresos.map((data, key) => {
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
                      <Typography sx={{ fontSize: "1rem" }}>
                        <Typography
                          sx={{ fontSize: "1rem", fontWeight: "bold" }}
                        >
                          Identificador:
                        </Typography>
                        {data.tipoIngreso === "S"
                          ? data.numControl
                          : data.numEmployee}
                      </Typography>
                      <Typography sx={{ fontSize: "1rem" }}>
                        <Typography
                          sx={{ fontSize: "1rem", fontWeight: "bold" }}
                        >
                          Fecha de ingreso:
                        </Typography>
                        {convertUnixToCompleteDate(data.fechaIngreso)}
                      </Typography>

                      {/* Fecha de salida */}
                      <Typography sx={{ fontSize: "1rem" }}>
                        <Typography
                          sx={{ fontSize: "1rem", fontWeight: "bold" }}
                        >
                          Fecha de salida:
                        </Typography>
                        {data.fechaSalida === null
                          ? "No registrada"
                          : convertUnixToCompleteDate(data.fechaSalida)}
                      </Typography>
                      {/* salida */}
                      <Typography sx={{ fontSize: "1rem" }}>
                        <Typography
                          sx={{ fontSize: "1rem", fontWeight: "bold" }}
                        >
                          {data.tipoIngreso === "S"
                            ? "Carrera:"
                            : "Departamento:"}
                        </Typography>
                        {data.tipoIngreso === "S"
                          ? data.career
                          : data.department}
                      </Typography>
                      <Typography sx={{ fontSize: "1rem" }}>
                        <Typography
                          sx={{ fontSize: "1rem", fontWeight: "bold" }}
                        >
                          Genero:
                        </Typography>
                        {data.gender}
                      </Typography>
                      <Button
                        disabled={data.fechaSalida === null ? false : true}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          fechaSalida(data, data.idCol);
                          setIsLoading(true);
                        }}
                      >
                        Registrar salida
                      </Button>
                    </div>
                  </Box>
                );
              })
            )}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default EnterAdmin;
