import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

const TextFieldRegister = ({
  baseData,
  studentData,
  employeeData,
  handleChange,
  handleChangeStudent,
  handleChangeEmployee,
  setPassword,
  password,
  errorText,
  errorValidation,
  id,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Grid
      container
      spacing={3}
      sx={{ py: "1.5em" }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
      }}
    >
      <Grid
        item
        xs={10}
        md={4}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          id="name"
          label="Nombre"
          variant="outlined"
          name="name"
          value={baseData.name}
          onChange={handleChange}
          helperText={errorValidation.name ? errorText.name : ""}
          error={errorValidation.name}
          fullWidth
          sx={{ fontSize: "1.5rem" }}
        />
      </Grid>
      <Grid
        item
        xs={10}
        md={4}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          id="lastNameFather"
          label="Apellido paterno"
          variant="outlined"
          name="lastNameFather"
          value={baseData.lastNameFather}
          onChange={handleChange}
          helperText={
            errorValidation.lastNameFather ? errorText.lastNameFather : ""
          }
          error={errorValidation.lastNameFather}
          fullWidth
          sx={{ fontSize: "1.5rem" }}
        />
      </Grid>
      <Grid
        item
        xs={10}
        md={4}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          id="lastNameMother"
          label="Apellido materno"
          variant="outlined"
          name="lastNameMother"
          value={baseData.lastNameMother}
          onChange={handleChange}
          helperText={
            errorValidation.lastNameMother ? errorText.lastNameMother : ""
          }
          error={errorValidation.lastNameMother}
          fullWidth
          sx={{ fontSize: "1.5rem" }}
        />
      </Grid>
      <Grid
        item
        xs={10}
        md={5}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
            handleChange(e);
          }}
          helperText={errorValidation.email ? errorText.email : ""}
          error={errorValidation.email}
          fullWidth
          sx={{ fontSize: "1.5rem" }}
        />
      </Grid>
      <Grid
        item
        xs={10}
        md={5}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          id="phone"
          label="Telefono"
          variant="outlined"
          name="phone"
          value={baseData.phone}
          onChange={handleChange}
          helperText={errorValidation.phone ? errorText.phone : ""}
          error={errorValidation.phone}
          fullWidth
          sx={{ fontSize: "1.5rem" }}
        />
      </Grid>

      <Grid
        item
        xs={10}
        md={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
            onChange={handleChange}
            helperText={errorValidation.gender ? errorText.gender : ""}
            error={errorValidation.gender}
          >
            <MenuItem value={"Hombre"}>Hombre</MenuItem>
            <MenuItem value={"Mujer"}>Mujer</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {id === "employees" ? (
        <>
          <Grid
            item
            xs={10}
            md={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Departamento
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="department"
                name="department"
                value={employeeData.department}
                onChange={handleChangeEmployee}
                helperText={
                  errorValidation.department ? errorText.department : ""
                }
                error={errorValidation.department}
              >
                <MenuItem value={"Ciencias basicas"}>Ciencias basicas</MenuItem>
                <MenuItem value={"Escolares"}>Escolares</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={10}
            md={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              id="numEmployee"
              label="Numero de empleado"
              variant="outlined"
              name="numEmployee"
              value={employeeData.numEmployee}
              onChange={handleChangeEmployee}
              helperText={
                errorValidation.numEmployee ? errorText.enumEmployee : ""
              }
              error={errorValidation.numEmployee}
              fullWidth
              sx={{ fontSize: "1.5rem" }}
            />
          </Grid>
        </>
      ) : id === "student" ? (
        <>
          <Grid
            item
            xs={10}
            md={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Carrera</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="career"
                name="career"
                value={studentData.career}
                onChange={handleChangeStudent}
                helperText={errorValidation.career ? errorText.career : ""}
                error={errorValidation.career}
              >
                <MenuItem value={"Sistemas computacionales"}>
                  Sistemas computacionales
                </MenuItem>
                <MenuItem value={"Industrial"}>Industrial</MenuItem>
                <MenuItem value={"Mecatronica"}>Mecatronica</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={10}
            md={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              id="numControl"
              label="Numero de control"
              variant="outlined"
              name="numControl"
              value={studentData.numControl}
              onChange={handleChangeStudent}
              helperText={
                errorValidation.numControl ? errorText.numControl : ""
              }
              error={errorValidation.numControl}
              fullWidth
              sx={{ fontSize: "1.5rem" }}
            />
          </Grid>
          <Grid
            item
            xs={10}
            md={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
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
                onChange={handleChangeStudent}
                helperText={
                  errorValidation.semester ? errorText.numControl : ""
                }
                error={errorValidation.numControl}
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
      {id === "admin" ? (
        <>
          <Grid
            item
            xs={10}
            md={5}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              id="password"
              label="Contraseña"
              variant="outlined"
              name="password"
              type={showPassword ? "text" : "password"}
              helperText={errorValidation.password ? errorText.password : ""}
              error={errorValidation.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ fontSize: "1.5rem" }}
            />
          </Grid>
          <Grid
            item
            xs={10}
            md={5}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              style={{ height: "100%", fontSize: "1rem" }}
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </Button>
          </Grid>
          <Grid
            item
            xs={10}
            md={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Grid>
        </>
      ) : null}
    </Grid>
  );
};

export default TextFieldRegister;
