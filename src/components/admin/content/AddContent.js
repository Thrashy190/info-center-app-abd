import React from 'react';
import SideBar from '../../shared/SideBar';
import { useNavigate } from 'react-router-dom';
import '../../../App.css';
import { Grid, TextField, Typography, Button } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';

const AddContent = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(dayjs('2022-09-24T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container className="App">
      <Grid item xs={12} md={2}>
        <SideBar type={'admin'}></SideBar>
      </Grid>
      <Grid item xs={12} md={10}>
        <div style={{ padding: '50px' }}>
          <Grid sx={{ pb: '25x' }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography sx={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                Agregar contenido
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button variant="outlined" onClick={() => navigate(-1)}>
                Volver
              </Button>
            </Grid>
          </Grid>

          {/* Libros */}
          <Grid sx={{ py: '20px' }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography sx={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                Agregar libros
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item>
              <TextField label="Nombre Libro" />
            </Grid>
            <Grid item>
              <TextField label="Volumen" />
            </Grid>
            <Grid item>
              <DesktopDatePicker
                label="Fecha de publicacion"
                inputFormat="MM/DD/YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item>
              <TextField label="Editorial" />
            </Grid>
            <Grid item>
              <TextField label="Categoria" />
            </Grid>
            <Grid item style={{ display: 'flex', alignContent: 'center' }}>
              <Button variant="contained" style={{ width: '100%' }}>
                Agregar
              </Button>
            </Grid>
          </Grid>

          {/* Autores */}
          <Grid sx={{ py: '20px' }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography sx={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                Agregar autores
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item>
              <TextField label="Nombre" />
            </Grid>
            <Grid item>
              <TextField label="Apellido paterno" />
            </Grid>
            <Grid item>
              <TextField label="Apellido materno" />
            </Grid>
            <Grid item>
              <DesktopDatePicker
                label="Fecha de nacimiento"
                inputFormat="MM/DD/YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item>
              <TextField label="Genero" />
            </Grid>
            <Grid item>
              <TextField label="Nacionalidad" />
            </Grid>
            <Grid item>
              <TextField label="Correo" />
            </Grid>
            <Grid item>
              <TextField label="Telefono" />
            </Grid>
            <Grid item style={{ display: 'flex', alignContent: 'center' }}>
              <Button variant="contained" style={{ width: '100%' }}>
                Agregar
              </Button>
            </Grid>
          </Grid>

          {/* Editorial */}
          <Grid sx={{ py: '20px' }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography sx={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                Agregar editoril
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item>
              <TextField label="Nombre Editorial" />
            </Grid>
            <Grid item>
              <TextField label="Correo" />
            </Grid>
            <Grid item>
              <TextField label="Telefono" />
            </Grid>

            <Grid item style={{ display: 'flex', alignContent: 'center' }}>
              <Button variant="contained" style={{ width: '100%' }}>
                Agregar
              </Button>
            </Grid>
          </Grid>
          {/* Categorias */}
          <Grid sx={{ py: '20px' }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography sx={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                Agregar Categorias
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item>
              <TextField label="Nombre de la categoria" />
            </Grid>

            <Grid item style={{ display: 'flex', alignContent: 'center' }}>
              <Button variant="contained" style={{ width: '100%' }}>
                Agregar
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default AddContent;
