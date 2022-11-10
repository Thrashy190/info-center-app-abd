import React, { useState, useEffect } from 'react';
import SideBar from '../Shared/SideBar';
import '../../../App.css';
import {
  Grid,
  Button,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Divider,
  Autocomplete,
  LinearProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../../context/UserProvider';
import {
  convertUnixToCompleteDate,
  getTodayDate,
} from '../../../helpers/DateConverter';

const LendingAdmin = () => {
  const {
    getStudents,
    getEmployees,
    getBooks,
    addLendings,
    getLendings,
    currentUser,
    cerrarPrestamos,
  } = useAuth();
  const [user, setUser] = useState('A');
  const [bookList, setBookList] = useState([]);

  const [selectedBooks, setSelectedBooks] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);
  const [book, setBook] = useState([]);

  const [userType, setUserType] = useState('S');
  const [prestamos, setPrestamos] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setStudentsList(await getStudents());
    setEmployeesList(await getEmployees());
    setBookList(await getBooks());
    setPrestamos(await getLendings());
  };

  const handleAddLibro = () => {
    setSelectedBooks([
      ...selectedBooks,
      { id: book[0].id, nombre: book[0].nombre },
    ]);
  };

  const onDeleteBloque = (bloque) => {
    const copia = [...selectedBooks];
    let indiceABorrar = copia.findIndex(
      (block) => bloque.nombre === block.nombre
    );
    copia.splice(indiceABorrar, 1);
    setSelectedBooks(copia);
  };

  const generateLending = () => {
    addLendings(user[0], selectedBooks, userType);
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      getData().then(() => {
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  return (
    <Grid container className="App">
      <Grid item xs={12} md={2}>
        <SideBar type={'admin'}></SideBar>
      </Grid>
      <Grid item xs={12} md={10}>
        <div style={{ padding: '40px' }}>
          <Grid sx={{ pb: '20px' }} container item spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography sx={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                Prestamos de libros
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                style={{ width: '100%' }}
                onClick={generateLending}
              >
                Agregar
              </Button>
            </Grid>
          </Grid>
          <Grid sx={{ pb: '40px' }} container item spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                Te atiende: {currentUser.name} {currentUser.lastNameFather}{' '}
                {currentUser.lastNameMother}
              </Typography>
              <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                Fecha de hoy: {getTodayDate()}
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ pb: '30px' }} container item spacing={2}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Ususario</InputLabel>
                <Select
                  defaultValue={'S'}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Usuarios"
                  name="user"
                  value={userType}
                  onChange={(e) => {
                    setUser('');
                    setUserType(e.target.value);
                  }}
                >
                  <MenuItem value={'S'}>Alumnos</MenuItem>
                  <MenuItem value={'E'}>Empleados</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {userType === 'S' ? (
              <>
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-student"
                    value={user.numControl}
                    onChange={(e, newValue) => {
                      setUser(
                        studentsList.filter(
                          (data) => data.numControl === newValue
                        )
                      );
                    }}
                    options={studentsList.map((option) => option.numControl)}
                    renderInput={(params) => (
                      <TextField {...params} label="Numero de control" />
                    )}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-employee"
                    value={user.numEmployee}
                    onChange={(e, newValue) => {
                      setUser(
                        employeesList.filter(
                          (data) => data.numEmployee === newValue
                        )
                      );
                    }}
                    options={employeesList.map((option) => option.numEmployee)}
                    renderInput={(params) => (
                      <TextField {...params} label="Numero de empleado" />
                    )}
                  />
                </Grid>
              </>
            )}
            {/* <Grid item xs={12} md={4}>
              <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                Nombre ususario: {user.name}
              </Typography>
            </Grid> */}
          </Grid>
          <Grid sx={{ pb: '30px' }} container item spacing={2}>
            <Grid item xs={12} md={4}>
              <Autocomplete
                disablePortal
                id="combo-box-employee"
                value={bookList.nombre}
                onChange={(e, newValue) => {
                  setBook(bookList.filter((data) => data.nombre === newValue));
                }}
                options={bookList.map((option) => option.nombre)}
                renderInput={(params) => (
                  <TextField {...params} label="Libros" />
                )}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={3}
              style={{ display: 'flex', alignContent: 'center' }}
            >
              <Button
                variant="contained"
                disabled={selectedBooks.length >= 3 ? true : false}
                style={{ width: '100%' }}
                onClick={() => {
                  handleAddLibro();
                }}
              >
                Agregar libro
              </Button>
            </Grid>
          </Grid>
          <Grid sx={{ pb: '20px' }} container item spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography sx={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                Libros
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ pb: '40px' }} container item>
            <Grid
              item
              xs={12}
              md={12}
              spacing={2}
              sx={{ display: 'flex', direction: 'row' }}
            >
              {selectedBooks.map((data, key) => {
                return (
                  <Grid
                    xs={12}
                    md={2}
                    key={key}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      direction: 'row',
                      border: '2px solid black',
                      textAlign: 'center',
                      borderRadius: '10px',
                      padding: '10px',
                      marginRight: '10px',
                    }}
                  >
                    <Typography>{data.nombre}</Typography>
                    <CloseIcon
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        onDeleteBloque(data);
                      }}
                    ></CloseIcon>
                  </Grid>
                );
              })}
            </Grid>
            {selectedBooks.length === 0 ? (
              <Grid item xs={12} md={4}>
                <Typography sx={{ fontWeight: 'light' }}>
                  Agregar libros
                </Typography>
              </Grid>
            ) : null}
          </Grid>
          <Divider />
          <Grid sx={{ py: '20px' }} container item spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography sx={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                Lista de prestamos
              </Typography>
            </Grid>
          </Grid>

          <div
            style={{
              width: '100%',
              marginTop: '40px',
              height: '500px',
              overflow: 'auto',
            }}
          >
            {isLoading ? (
              <LinearProgress />
            ) : (
              prestamos.map((data, key) => {
                return (
                  <Box
                    key={key}
                    sx={{
                      boxShadow: 2,
                      mb: '20px',
                      py: '20px',
                      px: '10px',
                      borderRadius: '5px',
                    }}
                  >
                    <div
                      style={{
                        paddingLeft: '30px',
                        display: 'flex',
                        direction: 'row',
                        justifyContent: 'space-around',
                      }}
                    >
                      <Typography sx={{ fontSize: '1rem' }}>
                        <Typography
                          sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                        >
                          Identificador:
                        </Typography>
                        {data.userType === 'S'
                          ? data.numControl
                          : data.numEmployee}
                      </Typography>
                      <Typography sx={{ fontSize: '1rem' }}>
                        <Typography
                          sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                        >
                          Fecha del prestamos:
                        </Typography>
                        {convertUnixToCompleteDate(data.fechaPrestamo)}
                      </Typography>
                      <Typography sx={{ fontSize: '1rem' }}>
                        <Typography
                          sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                        >
                          Fecha de devolucion:
                        </Typography>
                        {convertUnixToCompleteDate(data.fechaDevolucion)}
                      </Typography>
                      <Typography sx={{ fontSize: '1rem' }}>
                        <Typography
                          sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                        >
                          Empleado que hizo el prestamo:
                        </Typography>
                        {data.empleado.name} {data.empleado.lastNameFather}{' '}
                        {data.empleado.lastNameMother}
                      </Typography>
                      <Typography key={key} sx={{ fontSize: '1rem' }}>
                        <Typography
                          sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                        >
                          Lista de libros:
                        </Typography>
                        {data.booksList.map((book, key) => {
                          return (
                            <Typography key={key} sx={{ fontSize: '1rem' }}>
                              {book.nombre}
                            </Typography>
                          );
                        })}
                      </Typography>
                      <Button
                        disabled={data.estanDevueltos}
                        variant="contained"
                        onClick={() => {
                          cerrarPrestamos(data, data.id);
                          setIsLoading(true);
                        }}
                      >
                        {data.estanDevueltos ? 'Entregados' : 'Entregar'}
                      </Button>
                    </div>
                  </Box>
                );
              })
            )}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default LendingAdmin;
