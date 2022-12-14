import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { useAuth } from '../../../context/UserProvider';


const TextFieldRegister = ({
  baseData,
  studentData,
  employeeData,
  setBaseData,
  setStudentData,
  setEmployeeDatas,
  handleChangeData,
  id,
}) => {
  const { getCarrers, getDepartments } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [carrerList, setCarrerList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);

  const getData = async() => {
    setCarrerList(await getCarrers());
    setDepartmentList(await getDepartments());
  };
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      getData().then(() => {
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  return (
    <Grid
      container
      spacing={3}
      sx={{ py: '1.5em' }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
      }}
    >
      <Grid
        item
        xs={10}
        md={4}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          id="name"
          label="Nombre"
          variant="outlined"
          name="name"
          value={baseData.name}
          onChange={(e) => {
            handleChangeData(e, setBaseData, baseData);
          }}
          fullWidth
          sx={{ fontSize: '1.5rem' }}
        />
      </Grid>
      <Grid
        item
        xs={10}
        md={4}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          id="lastNameFather"
          label="Apellido paterno"
          variant="outlined"
          name="lastNameFather"
          value={baseData.lastNameFather}
          onChange={(e) => {
            handleChangeData(e, setBaseData, baseData);
          }}
          fullWidth
          sx={{ fontSize: '1.5rem' }}
        />
      </Grid>
      <Grid
        item
        xs={10}
        md={4}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          id="lastNameMother"
          label="Apellido materno"
          variant="outlined"
          name="lastNameMother"
          value={baseData.lastNameMother}
          onChange={(e) => {
            handleChangeData(e, setBaseData, baseData);
          }}
          fullWidth
          sx={{ fontSize: '1.5rem' }}
        />
      </Grid>
      <Grid
        item
        xs={10}
        md={5}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          name="email"
          type="email"
          value={baseData.email}
          onChange={(e) => {
            handleChangeData(e, setBaseData, baseData);
          }}
          fullWidth
          sx={{ fontSize: '1.5rem' }}
        />
      </Grid>
      <Grid
        item
        xs={10}
        md={5}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          id="phone"
          label="Telefono"
          variant="outlined"
          name="phone"
          value={baseData.phone}
          onChange={(e) => {
            handleChangeData(e, setBaseData, baseData);
          }}
          fullWidth
          sx={{ fontSize: '1.5rem' }}
        />
      </Grid>

      <Grid
        item
        xs={10}
        md={2}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Genero</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="gender"
            name="gender"
            value={baseData.gender}
            onChange={(e) => {
              handleChangeData(e, setBaseData, baseData);
            }}
          >
            <MenuItem value={'Hombre'}>Hombre</MenuItem>
            <MenuItem value={'Mujer'}>Mujer</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {id === 'employees' ? (
        <>
          <Grid
            item
            xs={10}
            md={6}
            // style={{
            //   display: 'flex',
            // }}
          >
            <Autocomplete
                fullWidth
                disablePortal
                multiple={false}
                id="combo-box-departament"
                value={employeeData.department}
                onChange={(e, newValue ) => {
                  setEmployeeDatas({
                    ...baseData,
                    department: departmentList.filter(
                      (data) => data.nombre === newValue
                    )[0]
                    });
                }}
                options={departmentList.map((option) => option.nombre)}
                renderInput={(params) => (
                  <TextField {...params} label="Departamento" variant='outlined'/>
                )}
                getOptionLabel={(option) => option}
              />
          </Grid>
          <Grid
            item
            xs={10}
            md={6}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TextField
              id="numEmployee"
              label="Numero de empleado"
              variant="outlined"
              name="numEmployee"
              value={employeeData.numEmployee}
              onChange={(e) => {
                handleChangeData(e, setEmployeeDatas, employeeData);
              }}
              fullWidth
              sx={{ fontSize: '1.5rem' }}
            />
          </Grid>
        </>
      ) : id === 'student' ? (
        <>
          <Grid
            item
            xs={10}
            md={4}
            // style={{
            //   display: 'flex',
            //   justifyContent: 'center',
            //   alignItems: 'center',
            // }}
          >
            <Autocomplete
                fullWidth
                disablePortal
                multiple={false}
                id="combo-box-carrer"
                value={studentData.carrer}
                onChange={(e) => {
                  handleChangeData(e, setStudentData, studentData);
                }}
                options={carrerList.map((option) => option.nombre)}
                renderInput={(params) => (
                  <TextField {...params} label="Carrera" variant='outlined'/>
                )}
                getOptionLabel={(option) => option}
              />
          </Grid>
          <Grid
            item
            xs={10}
            md={4}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TextField
              id="numControl"
              label="Numero de control"
              variant="outlined"
              name="numControl"
              value={studentData.numControl}
              onChange={(e) => {
                handleChangeData(e, setStudentData, studentData);
              }}
              fullWidth
              sx={{ fontSize: '1.5rem' }}
            />
          </Grid>
          <Grid
            item
            xs={10}
            md={4}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Semestre</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="semester"
                name="semester"
                value={studentData.semester}
                onChange={(e) => {
                  handleChangeData(e, setStudentData, studentData);
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </>
      ) : null}
      {id === 'admin' ? (
        <>
          <Grid
            item
            xs={10}
            md={5}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TextField
              id="password"
              label="Contrase??a"
              variant="outlined"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={baseData.password}
              onChange={(e) => {
                handleChangeData(e, setBaseData, baseData);
              }}
              fullWidth
              sx={{ fontSize: '1.5rem' }}
            />
          </Grid>
          <Grid
            item
            xs={10}
            md={5}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              size="large"
              style={{ height: '100%', fontSize: '1rem' }}
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </Button>
          </Grid>
          <Grid
            item
            xs={10}
            md={2}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          ></Grid>
        </>
      ) : null}
    </Grid>
  );
};

export default TextFieldRegister;