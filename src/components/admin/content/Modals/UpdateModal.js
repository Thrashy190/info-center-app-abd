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

const UpdateBooks = () => {
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
          <TextField label="Categoria" />
        </Grid>
      </Grid>
    </div>
  );
};

const UpdateAuthor = () => {
  const [value, setValue] = React.useState(dayjs('2022-09-24T21:11:54'));

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

const UpdateEditorial = () => {
  return (
    <div>
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
      </Grid>
    </div>
  );
};

const UpdateModal = ({ open, handleClose, typeSearch }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
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

          {typeSearch === 'Libros' ? (
            <UpdateBooks />
          ) : typeSearch === 'Autores' ? (
            <UpdateAuthor />
          ) : (
            <UpdateEditorial />
          )}

          <Button
            variant="contained"
            sx={{ mt: 5, width: '100%' }}
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
