import React from "react";
import {
  Box,
  Modal,
  Fade,
  Typography,
  Button,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Backdrop,
} from "@mui/material";
import { useAuth } from "../../../../context/UserProvider";

const DeleteModal = ({ disable, handleCheck, open, handleClose, id, type }) => {
  const { deletFromCollection } = useAuth();

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

  const deleteContent = (type, id) => {
    let conn = "";
    switch (type) {
      case "Libros":
        conn = "libros";
        break;
      case "Autores":
        conn = "autores";
        break;
      case "Editoriales":
        conn = "editorial";
        break;
      case "Categorias":
        conn = "categorias";
        break;
      case "Carreras":
        conn = "carrera";
        break;
      case "student":
        conn = "alumnos";
        break;
      case "employees":
        conn = "empleado";
        break;
      case "others":
        conn = "otros";
        break;
      case "admin":
        conn = "administrador";
        break;
      default:
        conn = "departamento";
        break;
    }
    deletFromCollection(conn, id);
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
          <Typography id="transition-modal-title" variant="h6" component="h2">
            ¿Estas seguro que Deseas eliminar este contenido?
          </Typography>

          <FormGroup sx={{ mt: 3 }}>
            <FormControlLabel
              control={<Checkbox onClick={handleCheck} />}
              label="Aceptar"
            />
          </FormGroup>

          <Button
            disabled={disable}
            variant="contained"
            sx={{ mt: 5, width: "100%" }}
            onClick={() => {
              deleteContent(type, id);
            }}
          >
            Eliminar
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteModal;
