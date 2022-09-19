import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/UserProvider';

//mui
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

//assets
import Logo from '../../../assets/shared/its.png';

//componentes
import TextFieldRegister from './RegisterTypes/TextFieldRegister';

//Firebase
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../utils/firebase";

const Register = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { signUpWithEmailPassword } = useAuth();

  const [baseData, setBaseData] = useState({
    type: id,
    name: '',
    lastNameFather: '',
    lastNameMother: '',
    phone: '',
    email: '',
    gender: '',
    password: '',
    repeatPassword: '',
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

  const [errorValidation, setErrorValidation] = useState({
    name: false,
    lastNameFather: false,
    lastNameMother: false,
    phone: false,
    email: false,
    password: false,
    repeatPassword: false,
    numControl: false,
    numEmployee: false,
    career: false,
    semester: false,
    department: false,
  });

  const [errorText, setErrorText] = useState({
    name: 'Solo pudes ingresar texto',
    lastNameFather: 'Solo pudes ingresar texto',
    lastNameMother: 'Solo pudes ingresar texto',
    phone: 'El telefono solo puede tener numeros',
    email: 'Correo incorrecto',
    gender: 'No puede estar vacio el campo',
    password: 'No puede estar vacio el campo',
    repeatPassword: 'No puede estar vacio el campo',
    numControl: '',
    career: 'No puede estar vacio el campo',
    semester: 'No puede estar vacio el campo',
    numEmployee: '',
    department: 'No puede estar vacio el campo',
  });

  const handleError = (e, text, validation) => {
    e.preventDefault();
    setErrorText({ ...errorText, [e.target.name]: text });
    setErrorValidation({ ...errorValidation, [e.target.name]: validation });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setBaseData({ ...baseData, [e.target.name]: e.target.value });
  };

  const handleChangeStudent = (e) => {
    e.preventDefault();
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleChangeEmployee = (e) => {
    e.preventDefault();
    setEmployeeDatas({ ...employeeData, [e.target.name]: e.target.value });
  };

  const [pageRegister, setPageRegister] = useState(0);

  useEffect(() => {
    if (pageRegister) {
      navigate('/login/' + pageRegister);
    }
  }, [pageRegister, navigate]);

  const createUser = async () => {
    const email = baseData.email;
    const password = baseData.password;
    if (id === 'student') {
      console.log({ ...baseData, ...studentData });
      signUpWithEmailPassword(
        email,
        password,
        { ...baseData, ...studentData },
        id
      );
      const newAlumno = await addDoc(collection(db, "alumnos"), {
        baseData,
        studentData,
      });
      console.log("=========", newAlumno.id);
    } else if (id === "employees") {
      console.log({ ...baseData, ...employeeData });
      signUpWithEmailPassword(
        email,
        password,
        { ...baseData, ...employeeData },
        id
      );
      const newEmployee = await addDoc(collection(db, "docente"), {
        baseData,
        studentData,
      });
      console.log("=========", newEmployee.id);
    } else if (id === "other") {
      console.log(baseData);
      signUpWithEmailPassword(email, password, baseData, id);
      const newOther = await addDoc(collection(db, "otros"), {
        baseData,
        studentData,
      });
      console.log("=========", newOther.id);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '75%',
          boxShadow: 2,
          borderRadius: '16px',
          justifyContent: 'center',
          py: '3em',
          my: '3em',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={Logo}
            alt="Logo its"
            style={{
              width: '15%',
            }}
          ></img>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography style={{ fontSize: '1.8rem', fontWeight: 'lighter' }}>
              Centro de información
            </Typography>
            <Typography
              variant="h1"
              style={{ fontSize: '2.5rem', fontWeight: 'bold' }}
            >
              Registro de
              {id === 'student'
                ? ' Alumnos'
                : id === 'employees'
                ? ' Empleados'
                : id === 'other'
                ? ' Externos'
                : () => {
                    navigate('*');
                  }}
            </Typography>
          </div>

          <TextFieldRegister
            baseData={baseData}
            studentData={studentData}
            employeeData={employeeData}
            handleChange={handleChange}
            handleChangeStudent={handleChangeStudent}
            handleChangeEmployee={handleChangeEmployee}
            id={id}
            errorText={errorText}
            errorValidation={errorValidation}
            handleError={handleError}
          />

          <div>
            <Typography
              variant="subtitle1"
              style={{ fontSize: '1rem', fontWeight: 'lighter' }}
            >
              ¿Ya tiene una cuenta?{'  '}
              <Typography
                sx={{
                  textDecoration: 'underline',
                  '&:hover': {
                    cursor: 'pointer',
                    color: '#800040',
                  },
                }}
                display="inline"
                onClick={() => setPageRegister(id)}
              >
                Ingrese aqui
              </Typography>
            </Typography>
          </div>
          <Grid
            container
            spacing={3}
            sx={{ py: '2em' }}
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
              <Button
                size="large"
                variant="outlined"
                style={{ fontSize: '1rem' }}
                onClick={() => navigate(-1)}
              >
                Volver
              </Button>
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
              <Button
                size="large"
                variant="contained"
                style={{ fontSize: '1rem' }}
                onClick={() => createUser()}
              >
                Registrarme
              </Button>
            </Grid>
          </Grid>
        </div>
      </Box>
    </div>
  );
};

export default Register;
