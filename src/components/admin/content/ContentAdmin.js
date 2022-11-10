import React, { useState, useEffect } from 'react';
import SideBar from '../Shared/SideBar';
import ItemEditorial from './ContentItem/ItemEditorial';
import ItemAuthor from './ContentItem/ItemAuthor';
import ItemBooks from './ContentItem/ItemBook';
import ItemCategorie from './ContentItem/ItemCategorie';
import ItemDepartments from './ContentItem/ItemDepartments';
import ItemCarrer from './ContentItem/ItemCarrer';
import DeleteModal from '../Shared/Modals/DeleteModal';
import UpdateModal from '../Shared/Modals/UpdateModal';
import { useNavigate } from 'react-router-dom';
import '../../../App.css';

import { useAuth } from '../../../context/UserProvider';

import { Grid, Typography, Button, ButtonGroup } from '@mui/material';

const ContentAdmin = () => {
  const navigate = useNavigate();
  const { getDataFromCollection } = useAuth();

  const [typeSearch, setTypeSearch] = useState('Libros');
  const [contentData, setContentData] = useState([]);
  const [id, setId] = useState();
  const [data, setData] = useState({});

  //Modals
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = (id) => {
    setId(id);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDisable(true);
  };

  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = (data) => {
    setData({ ...data });
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const [disable, setDisable] = useState(true);
  const handleCheck = () => setDisable(!disable);

  const changeData = async (type) => {
    switch (type) {
      case 'Libros':
        setContentData(await getDataFromCollection('libros'));
        setTypeSearch(type);
        break;
      case 'Autores':
        setContentData(await getDataFromCollection('autores'));
        setTypeSearch(type);
        break;
      case 'Editoriales':
        setContentData(await getDataFromCollection('editorial'));
        setTypeSearch(type);
        break;
      case 'Categorias':
        setContentData(await getDataFromCollection('categorias'));
        setTypeSearch(type);
        break;
      case 'Carreras':
        setContentData(await getDataFromCollection('carrera'));
        setTypeSearch(type);
        break;
      default:
        setContentData(await getDataFromCollection('departamento'));
        setTypeSearch(type);
        break;
    }
  };

  useEffect(() => {
    changeData('Libros');
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
          {/* <Grid sx={{ pb: "30px" }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <TextField fullWidth label="Ingrese la busqueda" />
            </Grid>
            <Grid
              item
              xs={12}
              md={2}
              style={{ display: "flex", alignContent: "center" }}
            >
              <Button variant="contained" style={{ width: "100%" }}>
                Buscar
              </Button>
            </Grid>
          </Grid> */}

          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button
                  onClick={() => {
                    changeData('Libros');
                  }}
                >
                  Libros
                </Button>
                <Button
                  onClick={() => {
                    changeData('Autores');
                  }}
                >
                  Autores
                </Button>
                <Button
                  onClick={() => {
                    changeData('Editoriales');
                  }}
                >
                  Editoriales
                </Button>
                <Button
                  onClick={() => {
                    changeData('Categorias');
                  }}
                >
                  Categorias
                </Button>
                <Button
                  onClick={() => {
                    changeData('Carreras');
                  }}
                >
                  Carreras
                </Button>
                <Button
                  onClick={() => {
                    changeData('Departamentos');
                  }}
                >
                  Departamentos
                </Button>
              </ButtonGroup>
            </Grid>
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
              ? contentData.map((val, key) => {
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
              ? contentData.map((val, key) => {
                  return (
                    <ItemAuthor
                      data={val}
                      key={key}
                      handleOpenDelete={handleOpenDelete}
                      handleOpenUpdate={handleOpenUpdate}
                    />
                  );
                })
              : typeSearch === 'Editoriales'
              ? contentData.map((val, key) => {
                  return (
                    <ItemEditorial
                      data={val}
                      key={key}
                      handleOpenDelete={handleOpenDelete}
                      handleOpenUpdate={handleOpenUpdate}
                    />
                  );
                })
              : typeSearch === 'Editoriales'
              ? contentData.map((val, key) => {
                  return (
                    <ItemEditorial
                      data={val}
                      key={key}
                      handleOpenDelete={handleOpenDelete}
                      handleOpenUpdate={handleOpenUpdate}
                    />
                  );
                })
              : typeSearch === 'Categorias'
              ? contentData.map((val, key) => {
                  return (
                    <ItemCategorie
                      data={val}
                      key={key}
                      handleOpenDelete={handleOpenDelete}
                      handleOpenUpdate={handleOpenUpdate}
                    />
                  );
                })
              : typeSearch === 'Carreras'
              ? contentData.map((val, key) => {
                  return (
                    <ItemCarrer
                      data={val}
                      key={key}
                      handleOpenDelete={handleOpenDelete}
                      handleOpenUpdate={handleOpenUpdate}
                    />
                  );
                })
              : typeSearch === 'Departamentos'
              ? contentData.map((val, key) => {
                  return (
                    <ItemDepartments
                      data={val}
                      key={key}
                      handleOpenDelete={handleOpenDelete}
                      handleOpenUpdate={handleOpenUpdate}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </Grid>
      <DeleteModal
        open={openDelete}
        disable={disable}
        handleCheck={handleCheck}
        handleClose={handleCloseDelete}
        type={typeSearch}
        id={id}
      />
      <UpdateModal
        open={openUpdate}
        handleClose={handleCloseUpdate}
        typeSearch={typeSearch}
        data={data}
        setData={setData}
      />
    </Grid>
  );
};

export default ContentAdmin;
