import React, { useState } from 'react';
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
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const LendingAdmin = () => {
  const [user, setUser] = useState('A');
  const [libros, setLibros] = useState([
    {
      nombre: 'Calculo 1',
    },
  ]);
  const [libro, setLibro] = useState('');

  const prestamos = [
    {
      usuario: 'C19051632',
      fecha_prestamo: '23/07/2022',
      fecha_devolucion: '26/07/2022',
      empleado: 'current user',
    },
  ];

  const handleAddLibro = () => {
    setLibros([...libros, { nombre: libro }]);
  };

  const onDeleteBloque = (bloque) => {
    const copia = [...libros];
    let indiceABorrar = copia.findIndex(
      (block) => bloque.nombre === block.nombre
    );
    copia.splice(indiceABorrar, 1);
    setLibros(copia);
  };

  return (
    <Grid container className="App">
      <Grid item xs={12} md={2}>
        <SideBar type={'admin'}></SideBar>
      </Grid>
      <Grid item xs={12} md={10}>
        <div style={{ padding: '40px' }}>
          <Grid sx={{ pb: '30px' }} container item spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography sx={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                Prestamos de libros
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button variant="contained" style={{ width: '100%' }}>
                Agregar
              </Button>
            </Grid>
          </Grid>
          <Grid sx={{ pb: '30px' }} container item spacing={2}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Ususario</InputLabel>
                <Select
                  defaultValue={'A'}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Usuarios"
                  name="user"
                  value={user}
                  onChange={(e) => {
                    setUser(e.target.value);
                  }}
                >
                  <MenuItem value={'A'}>Alumnos</MenuItem>
                  <MenuItem value={'W'}>Empleados</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {user === 'A' ? (
              <>
                <Grid item xs={12} md={3}>
                  <TextField fullWidth label="Numero de control" />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} md={3}>
                  <TextField fullWidth label="Numero de empleado" />
                </Grid>
              </>
            )}
          </Grid>

          <Grid sx={{ pb: '30px' }} container item spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Libros"
                value={libro}
                onChange={(e) => {
                  setLibro(e.target.value);
                }}
              />
            </Grid>

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
                  handleAddLibro();
                }}
              >
                Agregar libro
              </Button>
            </Grid>
          </Grid>

          <Grid sx={{ pb: '20px' }} container item spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography sx={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                Libros
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ pb: '40px' }} container item>
            <Grid
              item
              xs={12}
              md={12}
              spacing={2}
              sx={{ display: 'flex', direction: 'row' }}
            >
              {libros.map((data, key) => {
                return (
                  <Grid
                    xs={12}
                    md={2}
                    key={key}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      direction: 'row',
                      border: '2px solid black',
                      textAlign: 'center',
                      borderRadius: '10px',
                      padding: '10px',
                      marginRight: '10px',
                    }}
                  >
                    <Typography>{data.nombre}</Typography>
                    <CloseIcon
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        onDeleteBloque(data);
                      }}
                    ></CloseIcon>
                  </Grid>
                );
              })}
            </Grid>
            {libros.length <= 0 ? (
              <Grid item xs={12} md={4}>
                <Typography sx={{ fontWeight: 'light' }}>
                  Agregar libros
                </Typography>
              </Grid>
            ) : null}
          </Grid>

          <Divider />
          <Grid sx={{ py: '20px' }} container item spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography sx={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                Lista de prestamos
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
            {prestamos.map((data, key) => {
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
                      {data.usuario}
                    </Typography>
                    <Typography sx={{ fontSize: '1.2rem' }}>
                      <Typography
                        sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                      >
                        Fecha del prestamos:
                      </Typography>
                      {data.fecha_prestamo}
                    </Typography>
                    <Typography sx={{ fontSize: '1.2rem' }}>
                      <Typography
                        sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                      >
                        Fecha de devolucion:
                      </Typography>
                      {data.fecha_devolucion}
                    </Typography>
                    <Typography sx={{ fontSize: '1.2rem' }}>
                      <Typography
                        sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                      >
                        Empleado que hizo el prestamo:
                      </Typography>
                      {data.empleado}
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

export default LendingAdmin;
