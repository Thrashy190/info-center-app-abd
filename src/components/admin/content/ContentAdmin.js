import React, { useState } from 'react';
import SideBar from '../../shared/SideBar';
import ItemEditorial from './ContentItem/ItemEditorial';
import ItemAuthor from './ContentItem/ItemAuthor';
import ItemBooks from './ContentItem/ItemBook';
import DeleteModal from './Modals/DeleteModal';
import UpdateModal from './Modals/UpdateModal';
import { useNavigate } from 'react-router-dom';
import '../../../App.css';

import {
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

const ContentAdmin = () => {
  const navigate = useNavigate();

  const dummyDataBooks = [
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

  const dummyDataAuthors = [
    {
      apellido_materno: 'Martinez',
      apellido_paterno: 'Lopez',
      correo: 'correo@correo',
      fecha_nacimiento: '02/07/02',
      genero: 'Masculino',
      nacionalidad: 'Mexicana',
      nombre: 'Diego',
      telefono: '84401039924',
    },
    {
      apellido_materno: 'Martinez',
      apellido_paterno: 'Lopez',
      correo: 'correo@correo',
      fecha_nacimiento: '02/07/02',
      genero: 'Masculino',
      nacionalidad: 'Mexicana',
      nombre: 'Diego',
      telefono: '84401039924',
    },
    {
      apellido_materno: 'Martinez',
      apellido_paterno: 'Lopez',
      correo: 'correo@correo',
      fecha_nacimiento: '02/07/02',
      genero: 'Masculino',
      nacionalidad: 'Mexicana',
      nombre: 'Diego',
      telefono: '84401039924',
    },
    {
      apellido_materno: 'Martinez',
      apellido_paterno: 'Lopez',
      correo: 'correo@correo',
      fecha_nacimiento: '02/07/02',
      genero: 'Masculino',
      nacionalidad: 'Mexicana',
      nombre: 'Diego',
      telefono: '84401039924',
    },
  ];

  const dummyDataEditorial = [
    {
      correo: 'correoEditorial@gmail.com',
      nombre: 'Azul',
      telefono: '8111039924 ',
    },
    {
      correo: 'correoEditorial@gmail.com',
      nombre: 'Rojo',
      telefono: '8111039924 ',
    },
    {
      correo: 'correoEditorial@gmail.com',
      nombre: 'Verde',
      telefono: '8111039924 ',
    },
    {
      correo: 'correoEditorial@gmail.com',
      nombre: 'Negro',
      telefono: '8111039924 ',
    },
    {
      correo: 'correoEditorial@gmail.com',
      nombre: 'Azul',
      telefono: '8111039924 ',
    },
  ];

  const [typeSearch, setTypeSearch] = useState('Libros');
  const [category, setCategory] = useState('Todas');
  const [year, setYear] = useState(2022);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDisable(true);
  };

  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const [disable, setDisable] = useState(true);
  const handleCheck = () => setDisable(!disable);

  return (
    <Grid container className="App">
      <Grid item xs={12} md={2}>
        <SideBar type={'admin'}></SideBar>
      </Grid>
      <Grid item xs={12} md={10}>
        <div style={{ padding: '50px' }}>
          <Grid sx={{ pb: '30px' }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography sx={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                Contenido de la plataforma
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={2}
              style={{ display: 'flex', alignContent: 'center' }}
            >
              <Button
                variant="contained"
                style={{ width: '100%' }}
                onClick={() => {
                  navigate('/admin/dashboard/contenido/agregar');
                }}
              >
                Agregar contenido
              </Button>
            </Grid>
          </Grid>
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
                      <MenuItem value={'Todas'}>Todas</MenuItem>
                      <MenuItem value={'Exactas'}>Exactas</MenuItem>
                      <MenuItem value={'blabla'}>blabla</MenuItem>
                      <MenuItem value={'blablabla'}>blablablac</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Año</InputLabel>
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
              height: '550px',
              overflow: 'auto',
            }}
          >
            {typeSearch === 'Libros'
              ? dummyDataBooks.map((val, key) => {
                  return (
                    <ItemBooks
                      data={val}
                      key={key}
                      handleOpenDelete={handleOpenDelete}
                      handleOpenUpdate={handleOpenUpdate}
                    />
                  );
                })
              : typeSearch === 'Autores'
              ? dummyDataAuthors.map((val, key) => {
                  return (
                    <ItemAuthor
                      data={val}
                      key={key}
                      handleOpenDelete={handleOpenDelete}
                      handleOpenUpdate={handleOpenUpdate}
                    />
                  );
                })
              : dummyDataEditorial.map((val, key) => {
                  return (
                    <ItemEditorial
                      data={val}
                      key={key}
                      handleOpenDelete={handleOpenDelete}
                      handleOpenUpdate={handleOpenUpdate}
                    />
                  );
                })}
          </div>
        </div>
      </Grid>
      <DeleteModal
        open={openDelete}
        disable={disable}
        handleCheck={handleCheck}
        handleClose={handleCloseDelete}
      />
      <UpdateModal
        open={openUpdate}
        handleClose={handleCloseUpdate}
        typeSearch={typeSearch}
      />
    </Grid>
  );
};

export default ContentAdmin;
