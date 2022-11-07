import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { convertUnixToCompleteDate } from "../../../../helpers/DateConverter";

const ItemBooks = ({ data, key, handleOpenDelete, handleOpenUpdate }) => {
  return (
    <Box
      key={key}
      sx={{
        boxShadow: 2,
        mb: "20px",
        py: "20px",
        px: "10px",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ paddingLeft: "30px" }}>
        <Typography>Nombre: {data.nombre}</Typography>
        <Typography>Autor(es): {data.autor}</Typography>
        <Typography>Editorial: {data.editorial.nombre}</Typography>
        <Typography>Categoria: {data.categoria}</Typography>
        <Typography>
          Fecha de publicacion:{" "}
          {convertUnixToCompleteDate(data.fecha_publicacion)}
        </Typography>
        <Typography>Volumen: {data.volumen}</Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          paddingRight: "30px",
        }}
      >
        <Button
          variant="contained"
          sx={{ mr: 4 }}
          onClick={() => {
            handleOpenUpdate(data);
          }}
        >
          Editar
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleOpenDelete(data.id);
          }}
        >
          Eliminar
        </Button>
      </div>
    </Box>
  );
};

export default ItemBooks;
