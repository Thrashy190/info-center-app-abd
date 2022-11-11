import React from 'react';
import {
  Box,
  Modal,
  Fade,
  Typography,
  Button,
  Backdrop,
  Grid,
  TextField,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { useAuth } from '../../../../context/UserProvider';
import TextFieldRegister from '../../Users/TextFieldRegister';

const UpdateBooks = ({ handleChangeData, data, setData }) => {
  const [value, setValue] = React.useState(dayjs('2022-09-24T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <div>
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
          <TextField label="Autores" />
        </Grid>
        <Grid item>
          <TextField label="Categoria" />
        </Grid>
      </Grid>
    </div>
  );
};

const UpdateAuthor = ({ handleChangeData, data, setData }) => {
  const [value, setValue] = React.useState(dayjs('2022-09-24T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <TextField
            label="Nombre"
            name="nombre"
            value={data.nombre}
            onChange={(e) => {
              handleChangeData(e, setData, data);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Apellido paterno"
            name="apellido_paterno"
            value={data.apellido_paterno}
            onChange={(e) => {
              handleChangeData(e, setData, data);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Apellido materno"
            name="apellido_materno"
            value={data.apellido_materno}
            onChange={(e) => {
              handleChangeData(e, setData, data);
            }}
          />
        </Grid>
        <Grid item>
          <DesktopDatePicker
            label="Fecha de nacimiento"
            inputFormat="MM/DD/YYYY"
            name="fecha_nacimiento"
            value={data.fecha_nacimiento.toDate()}
            onChange={(e) => {
              handleChangeData(e, setData, data);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Genero"
            name="genero"
            value={data.genero}
            onChange={(e) => {
              handleChangeData(e, setData, data);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Nacionalidad"
            name="nacionalidad"
            value={data.nacionalidad}
            onChange={(e) => {
              handleChangeData(e, setData, data);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Correo"
            name="correo"
            value={data.correo}
            onChange={(e) => {
              handleChangeData(e, setData, data);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Telefono"
            name="telefono"
            value={data.telefono}
            onChange={(e) => {
              handleChangeData(e, setData, data);
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const UpdateEditorial = ({ handleChangeData, data, setData }) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <TextField
            label="Nombre Editorial"
            name="nombre"
            value={data.nombre}
            onChange={(e) => {
              handleChangeData(e, setData, data);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Correo"
            name="correo"
            value={data.correo}
            onChange={(e) => {
              handleChangeData(e, setData, data);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Telefono"
            name="telefono"
            value={data.telefono}
            onChange={(e) => {
              handleChangeData(e, setData, data);
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const UpdateCarrera = ({ handleChangeData, data, setData }) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <TextField
            id="nombre"
            label="Nombre de la Carrera"
            name="nombre"
            value={data.nombre}
            onChange={(e) => {
              handleChangeData(e, setData, data);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            id="codigo"
            label="Codigo"
            name="codigo"
            value={data.codigo}
            onChange={(e) => {
              handleChangeData(e, setData, data);
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const UpdateDepartamento = ({ handleChangeData, data, setData }) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <TextField
            label="Nombre del departamento"
            name="nombre"
            value={data.nombre}
            onChange={(e) => {
              handleChangeData(e, setData, data);
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const UpdateCategoria = ({ handleChangeData, data, setData }) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <TextField
            label="Nombre de la categoria"
            name="nombre"
            value={data.nombre}
            onChange={(e) => {
              handleChangeData(e, setData, data);
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

const UpdateModal = ({ open, handleClose, typeSearch, data, setData }) => {
  const { updateCollection } = useAuth();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleChangeData = (e, setData, data) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const updateContent = async (type) => {
    let collection;
    switch (type) {
      case 'Libros':
        collection = 'libros';
        break;
      case 'Autores':
        collection = 'autores';
        break;
      case 'Editoriales':
        collection = 'editorial';
        break;
      case 'Categorias':
        collection = 'categorias';
        break;
      case 'Carreras':
        collection = 'carrera';
        break;
      case 'student':
        collection = 'alumnos';
        break;
      case 'employees':
        collection = 'empleado';
        break;
      case 'others':
        collection = 'otros';
        break;
      default:
        collection = 'departamento';
        break;
    }

    await updateCollection(collection, data.id, data);
    handleClose();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            sx={{ pb: 3 }}
          >
            Actualizar informacion
          </Typography>

          {typeSearch === 'Libros' ? (
            <UpdateBooks
              handleChangeData={handleChangeData}
              data={data}
              setData={setData}
            />
          ) : typeSearch === 'Autores' ? (
            <UpdateAuthor
              handleChangeData={handleChangeData}
              data={data}
              setData={setData}
            />
          ) : typeSearch === 'Editoriales' ? (
            <UpdateEditorial
              handleChangeData={handleChangeData}
              data={data}
              setData={setData}
            />
          ) : typeSearch === 'Carreras' ? (
            <UpdateCarrera
              handleChangeData={handleChangeData}
              data={data}
              setData={setData}
            />
          ) : typeSearch === 'Departamentos' ? (
            <UpdateDepartamento
              handleChangeData={handleChangeData}
              data={data}
              setData={setData}
            />
          ) : typeSearch === 'Categorias' ? (
            <UpdateCategoria
              handleChangeData={handleChangeData}
              data={data}
              setData={setData}
            />
          ) : typeSearch === 'student' ? (
            <TextFieldRegister
              baseData={data}
              studentData={data}
              setBaseData={setData}
              setStudentData={setData}
              handleChangeData={handleChangeData}
              id={typeSearch}
            />
          ) : typeSearch === 'employees' ? (
            <TextFieldRegister
              baseData={data}
              employeeData={data}
              setBaseData={setData}
              setEmployeeDatas={setData}
              handleChangeData={handleChangeData}
              id={typeSearch}
            />
          ) : typeSearch === 'others' ? (
            <TextFieldRegister
              baseData={data}
              setBaseData={setData}
              handleChangeData={handleChangeData}
              id={typeSearch}
            />
          ) : (
            'Edicion no disponible por el momento '
          )}

          <Button
            variant="contained"
            sx={{ mt: 5, width: '100%' }}
            onClick={() => {
              updateContent(typeSearch);
            }}
          >
            Actualizar
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UpdateModal;
