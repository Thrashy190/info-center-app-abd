import React, { useState, useEffect } from 'react';
import SideBar from '../../shared/SideBar';
import '../../../App.css';
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
} from '@mui/material';
import { useAuth } from '../../../context/UserProvider';

const EnterAdmin = () => {
  const { getStudents, getEmployees, addAdmissionToInfoCenter } = useAuth();

  const [studentsList, setStudentsList] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);

  const [userType, setUserType] = useState('S');

  const [ingresos, setIngresos] = useState([]);

  const [user, setUser] = useState({
    fecha: Math.floor(new Date() / 1000),
    tipo: userType,
    id: '',
  });

  const UserText = (text) => {
    return text === 'student'
      ? 'Estudiante'
      : text === 'employee'
      ? 'Empleado'
      : 'Otros';
  };

  const getData = async () => {
    setStudentsList(await getStudents());
    setEmployeesList(await getEmployees());
  };

  const handleChange = (newValue) => {
    setUser({
      ...user,
      ['id']: studentsList.filter((data) => data.numControl === newValue).id,
    });
  };

  const addEnter = () => {
    console.log(user);
    addAdmissionToInfoCenter(user);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid container className="App">
      <Grid item xs={12} md={2}>
        <SideBar type={'admin'}></SideBar>
      </Grid>
      <Grid item xs={12} md={10}>
        <div style={{ padding: '40px' }}>
          <Grid sx={{ pb: '30px' }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography sx={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                Ingresos al centro de informacion
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ pb: '30px' }} container item spacing={2}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Ususario</InputLabel>
                <Select
                  defaultValue={'S'}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Usuarios"
                  name="user"
                  value={userType}
                  onChange={(e) => {
                    setUserType(e.target.value);
                  }}
                >
                  <MenuItem value={'S'}>Alumnos</MenuItem>
                  <MenuItem value={'E'}>Empleados</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid sx={{ pb: '30px' }} container item spacing={2}>
            {userType === 'S' ? (
              <>
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-student"
                    value={user.numControl}
                    onChange={(e, newValue) => {
                      handleChange(newValue);
                    }}
                    options={studentsList.map((option) => option.numControl)}
                    renderInput={(params) => (
                      <TextField {...params} label="Numero de control" />
                    )}
                  />
                </Grid>
              </>
            ) : userType === 'E' ? (
              <>
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-employee"
                    value={user.numControl}
                    onChange={(e, newValue) => {
                      handleChange(newValue);
                    }}
                    options={employeesList.map((option) => option.numEmpleado)}
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
              style={{ display: 'flex', alignContent: 'center' }}
            >
              <Button
                variant="contained"
                style={{ width: '100%' }}
                onClick={() => {
                  addEnter();
                }}
              >
                Agregar
              </Button>
            </Grid>
          </Grid>
          <Grid sx={{ pb: '20px' }} container item spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography sx={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                Lista de ingresos
              </Typography>
            </Grid>
          </Grid>
          <div
            style={{
              width: '100%',
              marginTop: '40px',
              height: '500px',
              overflow: 'auto',
            }}
          >
            {ingresos.map((data, key) => {
              return (
                <Box
                  key={key}
                  sx={{
                    boxShadow: 2,
                    mb: '20px',
                    py: '20px',
                    px: '10px',
                    borderRadius: '5px',
                  }}
                >
                  <div
                    style={{
                      paddingLeft: '30px',
                      display: 'flex',
                      direction: 'row',
                      justifyContent: 'space-around',
                    }}
                  >
                    <Typography sx={{ fontSize: '1.2rem' }}>
                      <Typography
                        sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                      >
                        Identificador:
                      </Typography>
                      {data.id}
                    </Typography>
                    <Typography sx={{ fontSize: '1.2rem' }}>
                      <Typography
                        sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                      >
                        Fecha de ingreso:
                      </Typography>
                      {data.fecha_ingreso}
                    </Typography>
                    <Typography sx={{ fontSize: '1.2rem' }}>
                      <Typography
                        sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                      >
                        Tipo de usuario:
                      </Typography>
                      {UserText(data.tipo_user)}
                    </Typography>
                    <Typography sx={{ fontSize: '1.2rem' }}>
                      <Typography
                        sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                      >
                        Genero:
                      </Typography>
                      {data.genero}
                    </Typography>
                  </div>
                </Box>
              );
            })}
            {ingresos.length <= 0 ? (
              <Grid container item spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontWeight: 'light' }}>
                    No hay ningun ingreso por el momento
                  </Typography>
                </Grid>
              </Grid>
            ) : null}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default EnterAdmin;
