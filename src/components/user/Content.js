import React, { useState } from 'react';
import SideBar from '../shared/SideBar';
import '../../App.css';

import {
  Grid,
  Typography,
  TextField,
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { addDataToCollection, searchAllBooks, searchUser } from '../../context/UserProvider';

const Content = () => {
  const dummyData = 
  [
    {
      nombre: 'Calculo I',
      volumen: '2',
      fecha_publicacion: '23/12/2002',
      editorial: 'dwfwdcwde',
      categoria: 'Exactas',
    },
    {
      nombre: 'Calculo II',
      volumen: '1',
      fecha_publicacion: '23/12/2002',
      editorial: 'wdwbqwbdw',
      categoria: 'Exactas',
    },
    {
      nombre: 'Calculo III',
      volumen: '2',
      fecha_publicacion: '23/12/2002',
      editorial: 'wkjdcbowd',
      categoria: 'Exactas',
    },
    {
      nombre: 'Estatica',
      volumen: '3',
      fecha_publicacion: '23/12/2002',
      editorial: 'wdñkpnpwdkcnp',
      categoria: 'Mecanica',
    },
    {
      nombre: 'Dinamica',
      volumen: '4',
      fecha_publicacion: '23/12/2002',
      editorial: 'wdkcijowidcj',
      categoria: 'Mecanica',
    },
  ];

  const [typeSearch, setTypeSearch] = useState('Libros');
  const [category, setCategory] = useState('Exactas');
  const [year, setYear] = useState(2022);

  return (
    <Grid container className="App">
      <Grid item xs={12} md={2}>
        <SideBar></SideBar>
      </Grid>
      <Grid item xs={12} md={10}>
        <div style={{ padding: '50px' }}>
          <div style={{ paddingBottom: '20px' }}>
            <Typography sx={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
              Contenido de la plataforma
            </Typography>
          </div>
          <Grid sx={{ pb: '30px' }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <TextField fullWidth label="Ingrese la busqueda" />
            </Grid>
            <Grid
              item
              xs={12}
              md={2}
              style={{ display: 'flex', alignContent: 'center' }}
            >
              <Button variant="contained" style={{ width: '100%' }}>
                Buscar
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                <Select
                  defaultValue={'Libros'}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="typeSearch"
                  name="typeSearch"
                  value={typeSearch}
                  onChange={(e) => {
                    setTypeSearch(e.target.value);
                  }}
                >
                  <MenuItem value={'Libros'}>Libros</MenuItem>
                  <MenuItem value={'Autores'}>Autores</MenuItem>
                  <MenuItem value={'Editoriales'}>Editoriales</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {typeSearch === 'Libros' ? (
              <>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Categoria
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="category"
                      name="category"
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    >
                      <MenuItem value={'Exactas'}>Exactas</MenuItem>
                      <MenuItem value={'blabla'}>blabla</MenuItem>
                      <MenuItem value={'blablabla'}>blablablac</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Año de publicacion
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="year"
                      name="year"
                      value={year}
                      onChange={(e) => {
                        setYear(e.target.value);
                      }}
                    >
                      <MenuItem value={2022}>2022</MenuItem>
                      <MenuItem value={2021}>2021</MenuItem>
                      <MenuItem value={2020}>2020</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            ) : null}
          </Grid>
          <div
            style={{
              width: '100%',
              marginTop: '40px',
              height: '450px',
              overflow: 'auto',
            }}
          >
            {dummyData.map((val, key) => {
              return (
                <Box
                  key={key}
                  sx={{
                    boxShadow: 2,
                    mb: '20px',
                    py: '20px',
                    px: '10px',
                    borderRadius: '5px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ paddingLeft: '30px' }}>
                    <Typography>Nombre: {val.nombre}</Typography>
                    <Typography>Editorial: {val.editorial}</Typography>
                    <Typography>Categoria: {val.categoria}</Typography>
                  </div>
                  <div style={{ paddingRight: '30px' }}>
                    <Typography>
                      Fecha de publicacion: {val.fecha_publicacion}
                    </Typography>
                    <Typography>Volumen: {val.volumen}</Typography>
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

export default Content;
