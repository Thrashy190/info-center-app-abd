import React from "react";
import { Typography, Box, Button } from "@mui/material";

const ItemCarrer = ({ data, key, handleOpenDelete, handleOpenUpdate }) => {
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
        <Typography>Nombre carrera: {data.nombre}</Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          paddingRight: "30px",
        }}
      >
        <Button variant="contained" sx={{ mr: 4 }} onClick={handleOpenUpdate}>
          Editar
        </Button>
        <Button variant="contained" onClick={handleOpenDelete}>
          Eliminar
        </Button>
      </div>
    </Box>
  );
};

export default ItemCarrer;
