import React from "react";
import SideBar from "./components/SideBar";
import "../../App.css";
import { Grid } from "@mui/material";

const Lendings = () => {
  return (
    <Grid container className="App">
      <Grid item xs={12} md={2}>
        <SideBar></SideBar>
      </Grid>
      <Grid item>
        <div xs={12} md={10}>
          Prestamos
        </div>
      </Grid>
    </Grid>
  );
};

export default Lendings;
