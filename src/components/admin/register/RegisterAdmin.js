import React, { useState } from "react";
import { useAuth } from "../../../context/UserProvider";
import SideBar from "../../shared/SideBar";
import "../../../App.css";
import TextFieldRegister from "../../auth/register/RegisterTypes/TextFieldRegister";
import { Grid, Typography, ButtonGroup, Button } from "@mui/material";

const RegisterAdmin = () => {
  const [id, setId] = useState("student");
  const { signUpWithEmailPassword } = useAuth();

  const [baseData, setBaseData] = useState({
    type: id,
    name: "",
    lastNameFather: "",
    lastNameMother: "",
    phone: "",
    email: "",
    gender: "",
    password: "",
  });

  const [studentData, setStudentData] = useState({
    numControl: "",
    career: "",
    semester: "",
  });

  const [employeeData, setEmployeeDatas] = useState({
    numEmployee: "",
    department: "",
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
    name: "Solo pudes ingresar texto",
    lastNameFather: "Solo pudes ingresar texto",
    lastNameMother: "Solo pudes ingresar texto",
    phone: "El telefono solo puede tener numeros",
    email: "Correo incorrecto",
    gender: "No puede estar vacio el campo",
    password: "No puede estar vacio el campo",
    repeatPassword: "No puede estar vacio el campo",
    numControl: "",
    career: "No puede estar vacio el campo",
    semester: "No puede estar vacio el campo",
    numEmployee: "",
    department: "No puede estar vacio el campo",
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

  const createUser = async () => {
    const email = baseData.email;
    const password = baseData.password;
    if (id === "student") {
      console.log({ ...baseData, ...studentData });
      signUpWithEmailPassword(
        email,
        password,
        { ...baseData, ...studentData },
        id
      );
    } else if (id === "employees") {
      console.log({ ...baseData, ...employeeData });
      signUpWithEmailPassword(
        email,
        password,
        { ...baseData, ...employeeData },
        id
      );
    } else if (id === "other") {
      console.log(baseData);
      signUpWithEmailPassword(email, password, baseData, id);
    }
  };
  return (
    <Grid container className="App">
      <Grid item xs={12} md={2}>
        <SideBar type={"admin"}></SideBar>
      </Grid>
      <Grid item xs={12} md={10}>
        <div style={{ padding: "50px" }}>
          <Grid sx={{ pb: "30px" }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography sx={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                Registrar usuarios
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ pb: "40px" }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined primary button group"
              >
                <Button
                  onClick={() => {
                    setId("student");
                  }}
                >
                  Alumnos
                </Button>
                <Button
                  onClick={() => {
                    setId("employees");
                  }}
                >
                  Empleados
                </Button>
                <Button
                  onClick={() => {
                    setId("admin");
                  }}
                >
                  Administrador
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>

          <Grid sx={{ pb: "20px" }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <Typography sx={{ fontSize: "1.6rem", fontWeight: "bold" }}>
                {id === "student"
                  ? "Alumnos"
                  : id === "employees"
                  ? "Empleado"
                  : "Administrador"}
              </Typography>
            </Grid>
          </Grid>

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

          <Grid sx={{ pb: "20px" }} container item spacing={2}>
            <Grid item xs={12} md={10}>
              <Button
                size="large"
                variant="contained"
                style={{ fontSize: "1rem" }}
                onClick={() => createUser()}
              >
                Registrarme
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default RegisterAdmin;
