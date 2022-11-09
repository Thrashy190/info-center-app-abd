import React, { useState, useEffect } from "react";
import SideBar from "../Shared/SideBar";
import "../../../App.css";
import { Grid } from "@mui/material";

const Reportes = () => {
  return (
    <Grid container className="App">
      <Grid item xs={12} md={2}>
        <SideBar type={"admin"}></SideBar>
      </Grid>
    </Grid>
  );
};

export default Reportes;
