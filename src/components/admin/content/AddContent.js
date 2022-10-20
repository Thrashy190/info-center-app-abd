import React, { useState } from "react";
import SideBar from "../../shared/SideBar";
import { useNavigate } from "react-router-dom";
import "../../../App.css";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Autocomplete,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { useAuth } from "../../../context/UserProvider";

const AddContent = () => {
  const { addData } = useAuth();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(dayjs("2022-09-24T21:11:54"));

  const [autores, setAutores] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    fecha_nacimiento: dayjs("2022-09-24T21:11:54"),
    genero: "",
    nacionalidad: "",
    correo: "",
    telefono: "",
  });
  const [editoriales, setEditoriales] = useState({
    nombre: "",
    correo: "",
    telefono: "",
  });
  const [libros, setLibros] = useState({
    nombre: "",
    volumen: "",
    fecha_publicacion: "",
    editorial: "",
    autores: "",
    categoria: "",
  });
  const [carreras, setCarreras] = useState({ nombre: "", codigo: "" });
  const [deapartamentos, setDepartamentos] = useState({ nombre: "" });
  const [categorias, setCategorias] = useState({ nombre: "" });

  const handleChangeData = (e, setData, data) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const sendDataToFireStore = async (type, data) => {
    console.log(data);
    await addData(data, type);
  };

  return (
    <Grid container className="App">
      <Grid item xs={12} md={2}>
        <SideBar type={"admin"}></SideBar>
      </Grid>
      <Grid item xs={12} md={10}>
        <div style={{ padding: "50px" }}>
          <Grid sx={{ pb: "25x" }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography sx={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                Agregar contenido
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button variant="outlined" onClick={() => navigate(-1)}>
                Volver
              </Button>
            </Grid>
          </Grid>

          {/* Libros */}
          <Grid sx={{ py: "20px" }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                Agregar libros
              </Typography>
            </Grid>
          </Grid>

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
            <Grid item style={{ display: "flex", alignContent: "center" }}>
              <Button
                variant="contained"
                style={{ width: "100%" }}
                onClick={() => {
                  sendDataToFireStore("libros", libros);
                }}
              >
                Agregar
              </Button>
            </Grid>
          </Grid>

          {/* Autores */}
          <Grid sx={{ py: "20px" }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                Agregar autores
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item>
              <TextField
                label="Nombre"
                name="nombre"
                value={autores.nombre}
                onChange={(e) => {
                  handleChangeData(e, setAutores, autores);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Apellido paterno"
                name="apellido_paterno"
                value={autores.apellido_paterno}
                onChange={(e) => {
                  handleChangeData(e, setAutores, autores);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Apellido materno"
                name="apellido_materno"
                value={autores.apellido_materno}
                onChange={(e) => {
                  handleChangeData(e, setAutores, autores);
                }}
              />
            </Grid>
            <Grid item>
              <DesktopDatePicker
                label="Fecha de nacimiento"
                inputFormat="MM/DD/YYYY"
                name="fecha_nacimiento"
                value={autores.fecha_nacimiento.toDate()}
                onChange={(e) => {
                  handleChangeData(e, setAutores, autores);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Genero"
                name="genero"
                value={autores.genero}
                onChange={(e) => {
                  handleChangeData(e, setAutores, autores);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Nacionalidad"
                name="nacionalidad"
                value={autores.nacionalidad}
                onChange={(e) => {
                  handleChangeData(e, setAutores, autores);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Correo"
                name="correo"
                value={autores.correo}
                onChange={(e) => {
                  handleChangeData(e, setAutores, autores);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Telefono"
                name="telefono"
                value={autores.telefono}
                onChange={(e) => {
                  handleChangeData(e, setAutores, autores);
                }}
              />
            </Grid>
            <Grid item style={{ display: "flex", alignContent: "center" }}>
              <Button
                variant="contained"
                style={{ width: "100%" }}
                onClick={() => {
                  sendDataToFireStore("autores", autores);
                }}
              >
                Agregar
              </Button>
            </Grid>
          </Grid>

          {/* Editorial */}
          <Grid sx={{ py: "20px" }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                Agregar editorial
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item>
              <TextField
                label="Nombre Editorial"
                name="nombre"
                value={editoriales.nombre}
                onChange={(e) => {
                  handleChangeData(e, setEditoriales, editoriales);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Correo"
                name="correo"
                value={editoriales.correo}
                onChange={(e) => {
                  handleChangeData(e, setEditoriales, editoriales);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Telefono"
                name="telefono"
                value={editoriales.telefono}
                onChange={(e) => {
                  handleChangeData(e, setEditoriales, editoriales);
                }}
              />
            </Grid>

            <Grid item style={{ display: "flex", alignContent: "center" }}>
              <Button
                variant="contained"
                style={{ width: "100%" }}
                onClick={() => {
                  sendDataToFireStore("editorial", editoriales);
                }}
              >
                Agregar
              </Button>
            </Grid>
          </Grid>
          {/* Categorias */}
          <Grid sx={{ py: "20px" }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                Agregar Categorias
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item>
              <TextField
                label="Nombre de la categoria"
                name="nombre"
                value={categorias.nombre}
                onChange={(e) => {
                  handleChangeData(e, setCategorias, categorias);
                }}
              />
            </Grid>

            <Grid item style={{ display: "flex", alignContent: "center" }}>
              <Button
                variant="contained"
                style={{ width: "100%" }}
                onClick={() => {
                  sendDataToFireStore("categorias", categorias);
                }}
              >
                Agregar
              </Button>
            </Grid>
          </Grid>

          {/* Carreras */}
          <Grid sx={{ py: "20px" }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                Agregar Carreras
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item>
              <TextField
                id="nombre"
                label="Nombre de la Carrera"
                name="nombre"
                value={carreras.nombre}
                onChange={(e) => {
                  handleChangeData(e, setCarreras, carreras);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                id="codigo"
                label="Codigo"
                name="codigo"
                value={carreras.codigo}
                onChange={(e) => {
                  handleChangeData(e, setCarreras, carreras);
                }}
              />
            </Grid>

            <Grid item style={{ display: "flex", alignContent: "center" }}>
              <Button
                variant="contained"
                style={{ width: "100%" }}
                onClick={() => {
                  sendDataToFireStore("carrera", carreras);
                }}
              >
                Agregar
              </Button>
            </Grid>
          </Grid>

          {/* Departamentos */}
          <Grid sx={{ py: "20px" }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                Agregar Departamentos
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item>
              <TextField
                label="Nombre del departamento"
                name="nombre"
                value={deapartamentos.nombre}
                onChange={(e) => {
                  handleChangeData(e, setDepartamentos, deapartamentos);
                }}
              />
            </Grid>

            <Grid item style={{ display: "flex", alignContent: "center" }}>
              <Button
                variant="contained"
                style={{ width: "100%" }}
                onClick={() => {
                  sendDataToFireStore("departamento", deapartamentos);
                }}
              >
                Agregar
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default AddContent;
