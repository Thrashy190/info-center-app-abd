import React, {
  Fragment,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import Notification from "../helpers/Notification";
import firebase from "../utils/firebase";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  setDoc,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { Info } from "@mui/icons-material";

const UserContext = createContext();

export const useAuth = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const logOutUser = () => {
    return {
      type: "LOGOUT_USER",
    };
  };

  const signUpWithEmailPassword = (email, password, data) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setDoc(doc(db, "administrador", userCredential.user.uid), data)
          .then(() => {
            setCurrentUser(userCredential.user.uid);
            setNotify({
              isOpen: true,
              message: "Se creo la cuenta de adminitrador correctamente",
              type: "success",
            });
          })
          .catch((error) => {
            setNotify({
              isOpen: true,
              message: "Hubo un error al agregar el usuario a la bd",
              type: "error",
            });
          });
      })
      .catch((error) => {
        console.log(error);
        setNotify({
          isOpen: true,
          message: "Hubo un error al crear usuario",
          type: "error",
        });
      });
  };

  const login = (email, password, type) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const docRef = doc(db, "administrador", userCredential.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCurrentUser(docSnap.data());
        }

        setNotify({
          isOpen: true,
          message: "Se inicio sesion correctamente",
          type: "success",
        });
        navigate("/admin/dashboard/contenido");
      })
      .catch((error) => {
        setNotify({
          isOpen: true,
          message: "Hubo un error al iniciar sesión",
          type: "error",
        });
      });
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setCurrentUser(null);
        setNotify({
          isOpen: true,
          message: "Sesión terminada correctamente",
          type: "success",
        });
        logOutUser();
        navigate("/login");
      })
      .catch(() => {
        setNotify({
          isOpen: true,
          message: "Error al momento de cerrar sesión intentalo mas tarde",
          type: "error",
        });
      });
  };

  // eslint-disable-next-line no-lone-blocks
  {
    /** 
      LISTA DE GETTERS GENERALES #################################
  */
  }

  //!! getters
  const getBooks = async () => {
    const booksRef = collection(db, "libros");
    const q = query(booksRef, where("status", "==", true));
    let books = [];
    try {
      const booksSnap = await getDocs(q);
      if (booksSnap.docs.length > 0) {
        booksSnap.forEach((doc) => {
          books.push({ ...doc.data(), id: doc.id });
        });
      }
      return books;
    } catch (error) {
      console.log(error);
    }
  };
  //!! getters
  const getStudents = async () => {
    const studentReference = collection(db, "alumnos");
    let students = [];
    try {
      const studentsSnap = await getDocs(studentReference);
      if (studentsSnap.docs.length > 0) {
        studentsSnap.forEach((doc) => {
          students.push({ ...doc.data(), id: doc.id });
        });
      }
      return students;
    } catch (error) {
      console.log(error);
    }
  };
  //!! getters
  const getEmployees = async () => {
    const employeeReference = collection(db, "empleado");

    let employees = [];
    try {
      const employeesSnap = await getDocs(employeeReference);
      if (employeesSnap.docs.length > 0) {
        employeesSnap.forEach((doc) => {
          employees.push({ ...doc.data(), id: doc.id });
        });
      }
      return employees;
    } catch (error) {
      console.log(error);
    }
  };
  //!! getters
  const getEditorial = async () => {
    const editorialRef = collection(db, "editorial");

    const q = query(editorialRef);

    let editorial = [];

    try {
      const editorialSnap = await getDocs(q);
      if (editorialSnap.docs.length > 0) {
        editorialSnap.forEach(async (docItem) => {
          await getDoc(doc(db, "editorial", docItem.id));

          editorial.push({
            id: docItem.id,
            ...docItem.data(),
          });
        });
      }
      return editorial;
    } catch (error) {
      console.log(error);
    }
  };
  //!! getters
  const getCategoria = async () => {
    const categoriaRef = collection(db, "categorias");

    const q = query(categoriaRef);

    let categoria = [];

    try {
      const categoriaSnap = await getDocs(q);
      if (categoriaSnap.docs.length > 0) {
        categoriaSnap.forEach(async (docItem) => {
          await getDoc(doc(db, "categorias", docItem.id));

          categoria.push({
            id: docItem.id,
            ...docItem.data(),
          });
        });
      }
      return categoria;
    } catch (error) {
      console.log(error);
    }
  };
  //!! getters
  const getAutores = async () => {
    const autoresRef = collection(db, "autores");

    const q = query(autoresRef);

    let autores = [];

    try {
      const autoresSnap = await getDocs(q);
      if (autoresSnap.docs.length > 0) {
        autoresSnap.forEach(async (docItem) => {
          await getDoc(doc(db, "autores", docItem.id));

          autores.push({
            id: docItem.id,
            ...docItem.data(),
          });
        });
      }
      return autores;
    } catch (error) {
      console.log(error);
    }
  };
  //!! getters
  const getNacionalidad = async () => {
    const nacionalidadRef = collection(db, "nacionalidad");

    const q = query(nacionalidadRef);

    let nacionalidad = [];

    try {
      const nacionalidadSnap = await getDocs(q);
      if (nacionalidadSnap.docs.length > 0) {
        nacionalidadSnap.forEach(async (docItem) => {
          await getDoc(doc(db, "nacionalidad", docItem.id));

          nacionalidad.push({
            id: docItem.id,
            ...docItem.data(),
          });
        });
      }
      return nacionalidad;
    } catch (error) {
      console.log(error);
    }
  };
  //!! getters
  const getDepartments = async () => {
    const departmentsRef = collection(db, "departamento");

    const q = query(departmentsRef);

    let departments = [];

    try {
      const departmentsSnap = await getDocs(q);
      if (departmentsSnap.docs.length > 0) {
        departmentsSnap.forEach(async (docItem) => {
          await getDoc(doc(db, "departamento", docItem.id));

          departments.push({
            id: docItem.id,
            ...docItem.data(),
          });
        });
      }
      return departments;
    } catch (error) {
      console.log(error);
    }
  };
  //!! getters
  const getCarrers = async () => {
    const carrerRef = collection(db, "carrera");

    const q = query(carrerRef);

    let carrer = [];

    try {
      const carrerSnap = await getDocs(q);
      if (carrerSnap.docs.length > 0) {
        carrerSnap.forEach(async (docItem) => {
          await getDoc(doc(db, "carrera", docItem.id));

          carrer.push({
            id: docItem.id,
            ...docItem.data(),
          });
        });
      }
      return carrer;
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line no-lone-blocks
  {
    /** 
      ################################# PRESTAMOS #####################################
  */
  }

  const getLendings = async () => {
    const q = query(
      collection(db, "prestamos"),
      orderBy("fechaPrestamo", "desc")
    );
    let prestamos = [];
    let docRef = {};

    try {
      const prestamosSnap = await getDocs(q);
      if (prestamosSnap.docs.length > 0) {
        prestamosSnap.forEach(async (docItem) => {
          if (docItem.data().userType === "S") {
            docRef = "alumnos";
          } else {
            docRef = "empleado";
          }

          let userSnap = await getDoc(
            doc(db, docRef, docItem.data().idUsuario)
          );

          prestamos.push({
            ...docItem.data(),
            ...userSnap.data(),
            id: docItem.id,
          });
        });
      }
      return prestamos;
    } catch (error) {
      console.log(error);
    }
  };

  const addLendings = async (user, lista, type) => {
    try {
      await addDoc(collection(db, "prestamos"), {
        idUsuario: user.id,
        fechaPrestamo: Math.floor(new Date() / 1000),
        fechaDevolucion: Math.floor(
          new Date().setDate(new Date().getDate() + 5) / 1000
        ),
        empleado: currentUser,
        booksList: lista,
        userType: type,
        estanDevueltos: false,
      })
        .then(() => {
          lista.forEach(async (item) => {
            await updateDoc(doc(db, "libros", item.id), {
              status: false,
            });
          });
          setNotify({
            isOpen: true,
            message: "Prestamo creado correctamente",
            type: "success",
          });
        })
        .catch((err) => {
          setNotify({
            isOpen: true,
            message: "Error al momento de crear el prestamo",
            type: "error",
          });
        });
    } catch (error) {
      console.log(error);
      setNotify({
        isOpen: true,
        message: "Error al momento de crear el prestamo",
        type: "error",
      });
    }
  };

  const cerrarPrestamos = async (data, id) => {
    try {
      await setDoc(doc(db, "prestamos", id), {
        idUsuario: data.idUsuario,
        fechaPrestamo: data.fechaPrestamo,
        fechaDevolucion: data.fechaDevolucion,
        empleado: data.empleado,
        booksList: data.booksList,
        userType: data.userType,
        estanDevueltos: true,
      })
        .then(() => {
          data.booksList.forEach(async (item) => {
            await updateDoc(doc(db, "libros", item.id), {
              status: true,
            });
          });
          setNotify({
            isOpen: true,
            message: "Libros devueltos con exito",
            type: "success",
          });
        })
        .catch((error) => {
          setNotify({
            isOpen: true,
            message: "Ocurrio un error al re ingresar libros",
            type: "error",
          });
        });
    } catch (error) {
      console.log(error);
      setNotify({
        isOpen: true,
        message: "Ocurrio un error",
        type: "error",
      });
    }
  };

  // eslint-disable-next-line no-lone-blocks
  {
    /** 
        ################################# ADMISIONES #####################################
    */
  }

  const getAdmissions = async () => {
    const q = query(collection(db, "ingreso"), orderBy("fechaIngreso", "desc"));

    let ingresos = [];
    let docRef = {};

    try {
      const ingresosSnap = await getDocs(q);
      if (ingresosSnap.docs.length > 0) {
        ingresosSnap.forEach(async (docItem) => {
          if (docItem.data().tipoIngreso === "S") {
            docRef = doc(db, "alumnos", docItem.data().idUsuario);
          } else {
            docRef = doc(db, "empleado", docItem.data().idUsuario);
          }
          let docSnap = await getDoc(docRef);
          ingresos.push({
            ...docItem.data(),
            idCol: docItem.id,
            ...docSnap.data(),
          });
        });
      }
      return ingresos;
    } catch (error) {
      console.log(error);
    }
  };

  const addAdmissionToInfoCenter = async (data, type) => {
    try {
      const ingresosRef = collection(db, "ingreso");
      const q = query(
        ingresosRef,
        where("idUsuario", "==", data.id),
        where("fechaSalida", "==", null)
      );
      const ingresosSnap = await getDocs(q);
      if (ingresosSnap.docs.length === 0) {
        const datas = await addDoc(collection(db, "ingreso"), {
          idUsuario: data.id,
          fechaIngreso: Math.floor(new Date() / 1000),
          fechaSalida: null,
          tipoIngreso: type,
        });
        setNotify({
          isOpen: true,
          message: "Ingreso agregado correctamente",
          type: "success",
        });

        return;
      }
      setNotify({
        isOpen: true,
        message: "No se registro salida",
        type: "error",
      });
    } catch (error) {
      console.log(error);
      setNotify({
        isOpen: true,
        message: "Error al momento de agregar un ingreso",
        type: "error",
      });
    }
  };

  const fechaSalida = async (data, id) => {
    try {
      await setDoc(doc(db, "ingreso", id), {
        idUsuario: data.idUsuario,
        fechaIngreso: data.fechaIngreso,
        tipoIngreso: data.tipoIngreso,
        fechaSalida: Math.floor(new Date() / 1000),
      })
        .then(() => {
          setNotify({
            isOpen: true,
            message: "Fecha generada",
            type: "success",
          });
        })
        .catch((error) => {
          setNotify({
            isOpen: true,
            message: "Error",
            type: "error",
          });
        });
    } catch (error) {
      console.log(error);
      setNotify({
        isOpen: true,
        message: "Error",
        type: "error",
      });
    }
  };

  // eslint-disable-next-line no-lone-blocks
  {
    /** 
        ################################# FUNCIONES CRUD #####################################
    */
  }

  const updateCollection = async (type, id, data) => {
    try {
      setDoc(doc(db, type, id), data);
      setNotify({
        isOpen: true,
        message: "Actualizado correctamente",
        type: "success",
      });
    } catch (error) {
      console.log(error);
      setNotify({
        isOpen: true,
        message: "Error al actualizar",
        type: "error",
      });
    }
  };

  const deletFromCollection = async (type, id) => {
    try {
      if (type === "libros") {
        const docRef = doc(db, "libros", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          if (!docSnap.data().status) {
            setNotify({
              isOpen: true,
              message: "No se puede eliminar ya que esta prestado",
              type: "error",
            });
          } else {
            await deleteDoc(doc(db, "libros", id));
            setNotify({
              isOpen: true,
              message: "Se elimino correctamente",
              type: "success",
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      setNotify({
        isOpen: true,
        message: "Error al momento de eliminar",
        type: "error",
      });
    }
  };

  const addData = async (data, type) => {
    try {
      await addDoc(collection(db, type), data);
      setNotify({
        isOpen: true,
        message: "Informacion agregada correctamente",
        type: "success",
      });
    } catch (error) {
      console.log(error);
      setNotify({
        isOpen: true,
        message: "Error al momento de agregar",
        type: "error",
      });
    }
  };

  const getDataFromCollection = async (col) => {
    let data = [];

    const collectionRef = collection(db, col);
    try {
      const querySnapshot = await getDocs(collectionRef);
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getDataFiltered = async (id, type, desde, hasta) => {
    let data = [];
    const collectionRef = collection(db, "prestamos");

    let q;

    if (type === "L") {
      q = query(
        collectionRef,
        where("fechaPrestamo", ">=", desde),
        where("fechaPrestamo", "<=", hasta)
      );
    } else {
      q = query(collectionRef, where("idUsuario", "==", id));
    }

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line no-lone-blocks
  {
    /** 
        ################################# AGREGAR SIN REPETIR #####################################
    */
  }

  const addDataWithoutRepeat = async (type, id, data, key) => {
    try {
      const docRef = collection(db, type);
      const q = query(docRef, where(key, "==", id));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length === 0) {
        setDoc(doc(db, type, id), data);
        setNotify({
          isOpen: true,
          message: "Se agrego un ususario correctamente",
          type: "success",
        });
        return;
      }
      setNotify({
        isOpen: true,
        message: "Usuario existente intente agregar uno nuevo",
        type: "error",
      });
    } catch (error) {
      console.log(error);
      setNotify({
        isOpen: true,
        message: "Hubo un problema al agregar al usuario",
        type: "error",
      });
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //setCurrentUser(user.uid);
      } else {
        //setCurrentUser(null);
      }
    });
  }, [currentUser]);

  const values = {
    currentUser,
    signUpWithEmailPassword,
    login,
    logout,
    getStudents,
    getEmployees,
    addAdmissionToInfoCenter,
    getAdmissions,
    getBooks,
    addLendings,
    getLendings,
    getEditorial,
    getCategoria,
    getAutores,
    getNacionalidad,
    getCarrers,
    getDepartments,
    getDataFromCollection,
    deletFromCollection,
    addData,
    updateCollection,
    addDataWithoutRepeat,
    fechaSalida,
    cerrarPrestamos,
    getDataFiltered,
  };

  return (
    <Fragment>
      <UserContext.Provider value={values}>{children}</UserContext.Provider>
      <Notification notify={notify} setNotify={setNotify} position={"top"} />
    </Fragment>
  );
};

export default UserProvider;
