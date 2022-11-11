import React, { useState, useEffect } from 'react';
import SideBar from '../Shared/SideBar';
import '../../../App.css';
import {
  Grid,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  Autocomplete,
  LinearProgress,
  Box,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { useAuth } from '../../../context/UserProvider';
import {
  convertUnixToCompleteDate,
  convertDateToUnix,
} from '../../../helpers/DateConverter';

const Reportes = () => {
  const { getStudents, getEmployees, getDataFiltered, currentUser } = useAuth();

  const [from, setFrom] = useState(dayjs('2022-09-24T21:11:54'));
  const [to, setTo] = useState(dayjs('2022-09-24T21:11:54'));

  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('A');

  const [studentsList, setStudentsList] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);

  const [dataFiltered, setDataFiltered] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const getInitData = async () => {
    setStudentsList(await getStudents());
    setEmployeesList(await getEmployees());
  };

  const getSearchData = async () => {
    if (searchType === 'L') {
      setDataFiltered(
        await getDataFiltered(
          0,
          'L',
          convertDateToUnix(from),
          convertDateToUnix(to)
        )
      );
    } else {
      setDataFiltered(await getDataFiltered(search[0].id, 'O', 0, 0));
    }
  };

  useEffect(() => {
    if (isLoading) {
      getInitData().then(() => {
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
          <Grid sx={{ pb: '30px' }} container item spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography sx={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                Reportes
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
                  label="Busquedas"
                  name="user"
                  value={searchType}
                  onChange={(e) => {
                    setSearch('');
                    setSearchType(e.target.value);
                  }}
                >
                  <MenuItem value={'A'}>Alumnos</MenuItem>
                  <MenuItem value={'E'}>Empleados</MenuItem>
                  <MenuItem value={'L'}>Fechas</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {searchType === 'A' ? (
              <>
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-student"
                    value={search.numControl}
                    onChange={(e, newValue) => {
                      setSearch(
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
            ) : searchType === 'E' ? (
              <>
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-employee"
                    value={search.numEmployee}
                    onChange={(e, newValue) => {
                      setSearch(
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
            ) : (
              <>
                <Grid item xs={12} md={2}>
                  <DesktopDatePicker
                    label="Desde"
                    inputFormat="MM/DD/YYYY"
                    value={from}
                    onChange={(newValue) => {
                      setFrom(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <DesktopDatePicker
                    label="Hasta"
                    inputFormat="MM/DD/YYYY"
                    value={to}
                    onChange={(newValue) => {
                      setTo(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </Grid>
              </>
            )}
            <Grid
              item
              xs={12}
              md={2}
              style={{ display: 'flex', alignContent: 'center' }}
            >
              <Button fullWidth variant="contained" onClick={getSearchData}>
                Buscar
              </Button>
            </Grid>
          </Grid>
          <Grid sx={{ pb: '30px' }} container item spacing={2}>
            <Grid item xs={12} md={4}></Grid>
          </Grid>

          <Divider />
          <Grid sx={{ py: '20px' }} container item spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography sx={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                Lista de reportes
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
              dataFiltered.map((data, key) => {
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
                        {data.searchType === 'A'
                          ? data.numControl
                          : data.numEmployee}
                      </Typography>
                      <Typography sx={{ fontSize: '1rem' }}>
                        <Typography
                          sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                        >
                          Fecha del prestamo:
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
                          Libros que le fueron prestados:
                        </Typography>
                        {data.booksList.map((book, key) => {
                          return (
                            <Typography key={key} sx={{ fontSize: '1rem' }}>
                              {book.nombre}
                            </Typography>
                          );
                        })}
                      </Typography>
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

export default Reportes;
