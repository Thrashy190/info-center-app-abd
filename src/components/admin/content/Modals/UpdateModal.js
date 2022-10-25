import React from "react";
import {
  Box,
  Modal,
  Fade,
  Typography,
  Button,
  Backdrop,
  Grid,
  TextField,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";

const UpdateBooks = () => {
  const [value, setValue] = React.useState(dayjs("2022-09-24T21:11:54"));

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
          <TextField label="Categoria" />
        </Grid>
      </Grid>
    </div>
  );
};

const UpdateAuthor = () => {
  const [value, setValue] = React.useState(dayjs("2022-09-24T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <div>
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
      </Grid>
    </div>
  );
};

const UpdateEditorial = (data) => {
  return (
    <div>
      <Grid container spacing={2}>
        {data.nombre}
        <Grid item>
          <TextField label="Nombre Editorial" value={data.nombre} />
        </Grid>
        <Grid item>
          <TextField label="Correo" value={data.correo} />
        </Grid>
        <Grid item>
          <TextField label="Telefono" value={data.telefono} />
        </Grid>
      </Grid>
    </div>
  );
};

const UpdateCarrera = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <TextField label="Nombre Carrera" />
        </Grid>
        <Grid item>
          <TextField label="Codigo de carrera" />
        </Grid>
      </Grid>
    </div>
  );
};

const UpdateDepartamento = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <TextField label="Nombre Departamento" />
        </Grid>
      </Grid>
    </div>
  );
};

const UpdateCategoria = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <TextField label="Nombre Categoria" />
        </Grid>
      </Grid>
    </div>
  );
};

const UpdateModal = ({ open, handleClose, typeSearch, data, setData }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const UpdateContent = () => {
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

          {typeSearch === "Libros" ? (
            <UpdateBooks />
          ) : typeSearch === "Autores" ? (
            <UpdateAuthor />
          ) : typeSearch === "Editoriales" ? (
            <UpdateEditorial data={data} />
          ) : typeSearch === "Carreras" ? (
            <UpdateCarrera />
          ) : typeSearch === "Departamentos" ? (
            <UpdateDepartamento />
          ) : typeSearch === "Categorias" ? (
            <UpdateCategoria />
          ) : null}

          <Button
            variant="contained"
            sx={{ mt: 5, width: "100%" }}
            onClick={UpdateContent}
          >
            Actualizar
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UpdateModal;
