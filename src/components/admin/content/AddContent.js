import React, { useEffect, useState } from "react";
import SideBar from "../Shared/SideBar";
import { useNavigate } from "react-router-dom";
import "../../../App.css";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Autocomplete,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { useAuth } from "../../../context/UserProvider";

const AddContent = () => {
  const { addData, getEditorial, getCategoria, getNacionalidad, getAutores } =
    useAuth();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(dayjs("2022-09-24T21:11:54"));

  const [autores, setAutores] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    fecha_nacimiento: dayjs("2022-09-24T21:11:54"),
    correo: "",
    telefono: "",
  });
  const [editoriales, setEditoriales] = useState({
    nombre: "",
    correo: "",
    telefono: "",
  });
  const [libros, setLibros] = useState({});

  const [carreras, setCarreras] = useState({ nombre: "", codigo: "" });
  const [deapartamentos, setDepartamentos] = useState({ nombre: "" });
  const [categorias, setCategorias] = useState({ nombre: "" });

  const [editorialList, setEditorialList] = useState([]);
  const [categoriaList, setCategoriaList] = useState([]);
  const [nacionalidadList, setNacionalidadList] = useState([]);
  const [autoresList, setAutoresList] = useState([]);

  const getData = async () => {
    setEditorialList(await getEditorial());
    setAutoresList(await getAutores());
    setCategoriaList(await getCategoria());
    setNacionalidadList(await getNacionalidad());
  };

  const handleChangeData = (e, setData, data) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const [isLoading, setIsLoading] = useState(true);
  const sendDataToFireStore = async (type, data) => {
    console.log(data);
    await addData(data, type);
  };

  // const generateLists = () => {
  //   setIsLoading(true);
  // };

  useEffect(() => {
    if (isLoading) {
      getData().then(() => {
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  // generateLending();

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
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Nombre Libro"
                name="nombre"
                value={libros.nombre}
                onChange={(e) => {
                  handleChangeData(e, setLibros, libros);
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Volumen"
                name="volumen"
                value={libros.volumen}
                onChange={(e) => {
                  handleChangeData(e, setLibros, libros);
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DesktopDatePicker
                label="Fecha de publicacion"
                inputFormat="MM/DD/YYYY"
                value={value}
                onChange={(newValue) => {
                  console.log(
                    newValue.get("date"),
                    newValue.get("month"),
                    newValue.get("year")
                  );
                  setValue(newValue);
                  setLibros({
                    ...libros,
                    fecha_publicacion:
                      (newValue.get("date"),
                      newValue.get("month"),
                      newValue.get("year")),
                  });
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                fullWidth
                disablePortal
                multiple={false}
                id="combo-box-book"
                name="editorial"
                value={libros.editorial}
                onChange={(e, newValue) => {
                  setLibros({
                    ...libros,
                    [e.target.name]: editorialList.filter(
                      (data) => data.nombre === newValue
                    )[0],
                  });
                }}
                options={editorialList.map((option) => option.nombre)}
                renderInput={(params) => (
                  <TextField {...params} label="Editorial" variant="outlined" />
                )}
                getOptionLabel={(option) => option}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-book"
                value={libros.autores}
                onChange={(e, newValue) => {
                  setLibros({
                    ...libros,
                    autores: autoresList.filter(
                      (data) => data.nombre === newValue
                    )[0],
                  });
                }}
                options={autoresList.map((option) => option.nombre)}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField {...params} label="Autores" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-cate"
                value={libros.categoria}
                onChange={(e, newValue) => {
                  setLibros({
                    ...libros,
                    categoria: categoriaList.filter(
                      (data) => data.nombre === newValue
                    )[0],
                  });
                }}
                options={categoriaList.map((option) => option.nombre)}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField {...params} label="Categoria" />
                )}
              />
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
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={autores.nombre}
                onChange={(e) => {
                  handleChangeData(e, setAutores, autores);
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Apellido paterno"
                name="apellido_paterno"
                value={autores.apellido_paterno}
                onChange={(e) => {
                  handleChangeData(e, setAutores, autores);
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Apellido materno"
                name="apellido_materno"
                value={autores.apellido_materno}
                onChange={(e) => {
                  handleChangeData(e, setAutores, autores);
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DesktopDatePicker
                label="Fecha de nacimiento"
                inputFormat="MM/DD/YYYY"
                name="fecha_nacimiento"
                value={autores.fecha_nacimiento.toDate()}
                onChange={(e) => {
                  handleChangeData(e, setAutores, autores);
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Genero</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="gender"
                  name="gender"
                  value={autores.genero}
                  onChange={(e) => {
                    handleChangeData(e, setAutores, autores);
                  }}
                >
                  <MenuItem value={"Hombre"}>Hombre</MenuItem>
                  <MenuItem value={"Mujer"}>Mujer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-book"
                value={autores.nacionalidad}
                onChange={(e, newValue) => {
                  setAutores({
                    ...autores,
                    nacionalidad: nacionalidadList.filter(
                      (data) => data.nombre === newValue
                    )[0],
                  });
                }}
                options={nacionalidadList.map((option) => option.nombre)}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField {...params} label="Nacionalidad" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Correo"
                name="correo"
                value={autores.correo}
                onChange={(e) => {
                  handleChangeData(e, setAutores, autores);
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
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
              <Typography
                fullWidth
                sx={{ fontSize: "1.4rem", fontWeight: "bold" }}
              >
                Agregar editorial
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Nombre Editorial"
                name="nombre"
                value={editoriales.nombre}
                onChange={(e) => {
                  handleChangeData(e, setEditoriales, editoriales);
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Correo"
                name="correo"
                value={editoriales.correo}
                onChange={(e) => {
                  handleChangeData(e, setEditoriales, editoriales);
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
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
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
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
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="nombre"
                label="Nombre de la Carrera"
                name="nombre"
                value={carreras.nombre}
                onChange={(e) => {
                  handleChangeData(e, setCarreras, carreras);
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
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

          <Grid sx={{ py: "20px" }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                Agregar Departamentos
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
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
