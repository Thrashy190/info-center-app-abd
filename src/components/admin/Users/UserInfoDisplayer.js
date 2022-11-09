import React from "react";
import { Typography, Box, Button, Grid } from "@mui/material";

const UserInfoDisplayer = ({
  data,
  key,
  handleOpenDelete,
  handleOpenUpdate,
}) => {
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
      <Grid
        container
        style={{
          paddingLeft: "30px",
          display: "flex",
          justifyContent: "space-around",
          direction: "column",
        }}
      >
        <Typography
          style={{
            display: "flex",
            direction: "row",
          }}
        >
          <Typography sx={{ fontWeight: "bold", pr: "10px" }}>
            Nombre:
          </Typography>
          <Typography>
            {data.name} {data.lastNameFather} {data.lastNameMother}
          </Typography>
        </Typography>
        <Typography
          style={{
            display: "flex",
            direction: "row",
          }}
        >
          <Typography sx={{ fontWeight: "bold", pr: "10px" }}>
            Email:{" "}
          </Typography>
          {data.email}
        </Typography>

        <Typography
          style={{
            display: "flex",
            direction: "row",
          }}
        >
          <Typography sx={{ fontWeight: "bold", pr: "10px" }}>
            Telefono:{" "}
          </Typography>
          {data.phone}
        </Typography>

        <Typography
          style={{
            display: "flex",
            direction: "row",
          }}
        >
          <Typography sx={{ fontWeight: "bold", pr: "10px" }}>
            Genero:{" "}
          </Typography>
          {data.gender}
        </Typography>
      </Grid>
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

export default UserInfoDisplayer;
