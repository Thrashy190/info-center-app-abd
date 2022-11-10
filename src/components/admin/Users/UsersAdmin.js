import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/UserProvider';
import SideBar from '../Shared/SideBar';
import '../../../App.css';
import TextFieldRegister from './TextFieldRegister';
import UserInfoDisplayer from './UserInfoDisplayer';
import DeleteModal from '../Shared/Modals/DeleteModal';
import UpdateModal from '../Shared/Modals/UpdateModal';

import { Grid, Typography, ButtonGroup, Button } from '@mui/material';

const UsersAdmin = () => {
  const {
    signUpWithEmailPassword,
    addDataWithoutRepeat,
    getDataFromCollection,
  } = useAuth();
  const [id, setId] = useState('student');
  const [idDelete, setIdDelete] = useState();
  const [contentData, setContentData] = useState([]);
  const [baseData, setBaseData] = useState({
    type: '',
    name: '',
    lastNameFather: '',
    lastNameMother: '',
    phone: '',
    email: '',
    gender: '',
    password: '',
  });

  const [studentData, setStudentData] = useState({
    numControl: '',
    career: '',
    semester: '',
  });

  const [employeeData, setEmployeeDatas] = useState({
    numEmployee: '',
    department: '',
  });

  const [data, setData] = useState({});

  //Modals
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = (id) => {
    setIdDelete(id);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDisable(true);
  };

  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = (data) => {
    setData({ ...data });
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const [disable, setDisable] = useState(true);
  const handleCheck = () => setDisable(!disable);

  const handleChangeData = (e, setData, data) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const createUser = async (id) => {
    const email = baseData.email;
    let conn = '';
    let idUser;
    let data = {};
    let name = '';

    switch (id) {
      case 'student':
        conn = 'alumnos';
        data = { ...baseData, ...studentData, type: id };
        idUser = data.numControl;
        name = 'numControl';
        break;
      case 'employees':
        conn = 'empleado';
        data = { ...baseData, ...employeeData, type: id };
        idUser = data.numEmployee;
        name = 'numEmployee';
        break;
      default:
        conn = 'otros';
        data = { ...baseData, type: id };
        idUser = data.email;
        name = 'email';
        break;
    }

    if (id === 'admin') {
      await signUpWithEmailPassword(email, baseData.password, {
        ...baseData,
        type: id,
      });
    } else {
      await addDataWithoutRepeat(conn, idUser.toLowerCase(), data, name);
    }
  };

  const changeData = async (type) => {
    switch (type) {
      case 'student':
        setContentData(await getDataFromCollection('alumnos'));
        setId('student');
        break;
      case 'employees':
        setContentData(await getDataFromCollection('empleado'));
        setId('employees');
        break;
      case 'admin':
        setContentData(await getDataFromCollection('administrador'));
        setId('admin');
        break;
      default:
        setContentData(await getDataFromCollection('otros'));
        setId('others');
        break;
    }
  };

  useEffect(() => {
    changeData('student');
  }, []);

  return (
    <Grid container className="App">
      <Grid item xs={12} md={2}>
        <SideBar type={'admin'}></SideBar>
      </Grid>
      <Grid item xs={12} md={10}>
        <div style={{ padding: '40px' }}>
          <Grid sx={{ pb: '30px' }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography sx={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                Usuarios
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ pb: '20px' }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined primary button group"
              >
                <Button
                  onClick={() => {
                    changeData('student');
                  }}
                >
                  Alumnos
                </Button>
                <Button
                  onClick={() => {
                    changeData('employees');
                  }}
                >
                  Empleados
                </Button>
                <Button
                  onClick={() => {
                    changeData('admin');
                  }}
                >
                  Administrador
                </Button>
                <Button
                  onClick={() => {
                    changeData('others');
                  }}
                >
                  Otros
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>

          <Grid container item spacing={2}>
            <Grid item xs={12} md={9}>
              <Typography sx={{ fontSize: '1.6rem', fontWeight: 'bold' }}>
                {id === 'student'
                  ? 'Alumnos'
                  : id === 'employees'
                  ? 'Empleado'
                  : id === 'admin'
                  ? 'Administrador'
                  : 'Otros'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                size="large"
                variant="contained"
                style={{ fontSize: '1rem' }}
                onClick={() => createUser(id)}
              >
                Registrarme
              </Button>
            </Grid>
          </Grid>

          <TextFieldRegister
            baseData={baseData}
            studentData={studentData}
            employeeData={employeeData}
            setBaseData={setBaseData}
            setStudentData={setStudentData}
            setEmployeeDatas={setEmployeeDatas}
            handleChangeData={handleChangeData}
            id={id}
          />
          <Grid container item spacing={2}>
            <Grid item xs={12} md={9}>
              <Typography
                sx={{ fontSize: '1.6rem', fontWeight: 'bold', pb: '20px' }}
              >
                Informacion de{' '}
                {id === 'student'
                  ? 'Alumnos'
                  : id === 'employees'
                  ? 'Empleados'
                  : id === 'admin'
                  ? 'Administradores'
                  : 'Otros'}
              </Typography>
            </Grid>
          </Grid>
          {contentData.map((val, key) => {
            return (
              <UserInfoDisplayer
                data={val}
                key={key}
                handleOpenDelete={handleOpenDelete}
                handleOpenUpdate={handleOpenUpdate}
              />
            );
          })}
        </div>
        <DeleteModal
          open={openDelete}
          disable={disable}
          handleCheck={handleCheck}
          handleClose={handleCloseDelete}
          type={id}
          id={idDelete}
        />
        <UpdateModal
          open={openUpdate}
          handleClose={handleCloseUpdate}
          typeSearch={id}
          data={data}
          setData={setData}
        />
      </Grid>
    </Grid>
  );
};

export default UsersAdmin;
