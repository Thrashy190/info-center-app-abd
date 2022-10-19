import React from "react";
import SideBar from "../../shared/SideBar";
import "../../../App.css";
import { Grid } from "@mui/material";

const ProfileAdmin = () => {
  return (
    <Grid container className="App">
      <Grid item xs={12} md={2}>
        <SideBar type={"admin"}></SideBar>
      </Grid>
      <Grid item xs={12} md={10}>
        <div style={{ padding: "50px" }}> Home perfil </div>
      </Grid>
    </Grid>
  );
};

export default ProfileAdmin;
