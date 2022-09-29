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
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { PasswordOutlined } from "@mui/icons-material";
import { User } from "../models/User";
import { Books } from "../models/Books";

const UserContext = createContext();

export const useAuth = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loginType, setLoginType] = useState();
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

  const signUpWithEmailPassword = (email, password, data, type) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        setCurrentUser(userCredential.user.uid);
        setNotify({
          isOpen: true,
          message: "Se creo la cuenta de alumno correctamente",
          type: "success",
        });
        const {
          name,
          lastNameFather,
          lastNameMother,
          phone,
          email,
          gender,
          password,
        } = data;

        if (type === "student") {
          const { career, numControl, semester } = data;
          const newAlumno = await addDoc(collection(db, "alumnos"), {
            name,
            lastNameFather,
            lastNameMother,
            phone,
            email,
            gender,
            password,
            career,
            numControl,
            semester,
          });
        } else {
          if (type === "employees") {
            const { numEmployee, department } = data;
            const newEmployee = await addDoc(collection(db, "empleado"), {
              name,
              lastNameFather,
              lastNameMother,
              phone,
              email,
              gender,
              password,
              numEmployee,
              department,
            });
          } else {
            const newOther = await addDoc(collection(db, "otros"), {
              name,
              lastNameFather,
              lastNameMother,
              phone,
              email,
              gender,
              password,
            });
          }
        }
        navigate("/dashboard/inicio");
      })
      .catch((error) => {
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
      .then((userCredential) => {
        setCurrentUser(userCredential.user.uid);
        setNotify({
          isOpen: true,
          message: "Se inicio sesion correctamente",
          type: "success",
        });
        type === "admin"
          ? navigate("/admin/dashboard/inicio")
          : navigate("/dashboard/inicio");
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
        navigate("/usertype");
      })
      .catch(() => {
        setNotify({
          isOpen: true,
          message: "Error al momento de cerrar sesión intentalo mas tarde",
          type: "error",
        });
      });
  };

  const getBooks = async () => {
    const booksRef = collection(db, "libros");
    let books = [];
    try {
      const booksSnap = await getDocs(booksRef);
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

  const getAdmissions = async () => {
    const ingresosRef = collection(db, "ingreso");

    let ingresos = [];
    let docRef = {};

    try {
      const ingresosSnap = await getDocs(ingresosRef);
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
            id: docItem.id,
            ...docSnap.data(),
          });
        });
      }
      console.log(ingresos);
      return ingresos;
    } catch (error) {
      console.log(error);
    }
  };

  const getLendings = async () => {
    //cosnt lendings
  };

  // const getOther = () => {
  //   const otherReference = collection(db, "alumnos");
  //   getDocs(otherReference)
  //     .then((snapshot) => {
  //       snapshot.docs.map((doc) => {
  //         setOthers([...others, { ...doc.data(), id: doc.id }]);
  //       });
  //       console.log(others);
  //       return others;
  //     })
  //     .catch((err) => {
  //       console.log("Hubo un error al traer los datos");
  //     });
  // };

  const addAdmissionToInfoCenter = async (data, type) => {
    console.log(data);
    try {
      await addDoc(collection(db, "ingreso"), {
        idUsuario: data.id,
        fechaIngreso: Math.floor(new Date() / 1000),
        tipoIngreso: type,
      });
      setNotify({
        isOpen: true,
        message: "Ingreso agregado correctamente",
        type: "success",
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

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setCurrentUser(user.uid);

        // ...
      } else {
        // User is signed out
        // ...
        setCurrentUser(null);
      }
    });
  }, [currentUser]);

  const values = {
    currentUser,
    loginType,
    signUpWithEmailPassword,
    login,
    logout,
    getStudents,
    getEmployees,
    addAdmissionToInfoCenter,
    getAdmissions,
    getBooks,
  };

  return (
    <Fragment>
      <UserContext.Provider value={values}>{children}</UserContext.Provider>
      <Notification notify={notify} setNotify={setNotify} position={"top"} />
    </Fragment>
  );
};

export default UserProvider;

const searchAllBooks = async (type) => {
  try {
    const bookConverter = {
      toFirestore: (book) => {
        return {
          nombre: book.nombre,
          categoria: book.categoria,
          editorial: book.editorial,
          volumen: book.volumen,
          fecha_publicacion: book.fecha_publicacion,
        };
      },
      fromFirestore: (snapshot, options) => {
        const book = snapshot.data(options);
        return new Books(
          book.nombre,
          book.categoria,
          book.editorial,
          book.volumen,
          book.fecha_publicacion
        );
      },
    };

    const bookReference = collection(db, type);
    const q = query(bookReference);
    let id = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      id.push(doc.id);
    });

    for (let i = 0; i < id.length; i++) {
      const ref = doc(db, type, id[i]).withConverter(bookConverter);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        // Convert to book object
        const book = docSnap.data();
        // Use a book instance method
        console.log(book.toString());
      } else {
        console.log("No such document!");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const searchBook = async (input, data) => {
  try {
    const bookConverter = {
      toFirestore: (book) => {
        return {
          nombre: book.nombre,
          categoria: book.categoria,
          editorial: book.editorial,
          volumen: book.volumen,
          fecha_publicacion: book.fecha_publicacion,
        };
      },
      fromFirestore: (snapshot, options) => {
        const book = snapshot.data(options);
        return new Books(
          book.nombre,
          book.categoria,
          book.editorial,
          book.volumen,
          book.fecha_publicacion
        );
      },
    };

    const bookReference = collection(db, "libros");
    const q = query(bookReference, where(input, "==", data));
    var id;

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      id = doc.id;
    });

    const ref = doc(db, "libros", id).withConverter(bookConverter);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      // Convert to book object
      const book = docSnap.data();
      // Use a book instance method
      console.log(book.toString());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error);
  }
};

const searchUser = async (type, input, data) => {
  try {
    const userConverter = {
      toFirestore: (user) => {
        return {
          name: user.name,
          lastNameFather: user.lastNameFather,
          lastNameMother: user.lastNameMother,
          phone: user.phone,
          email: user.email,
          gender: user.gender,
          password: user.password,
        };
      },
      fromFirestore: (snapshot, options) => {
        const user = snapshot.data(options);
        return new User(
          user.name,
          user.lastNameFather,
          user.lastNameMother,
          user.phone,
          user.email,
          user.gender,
          user.password
        );
      },
    };

    const userReference = collection(db, type);
    const q = query(userReference, where(input, "==", data));
    var id;

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      id = doc.id;
    });

    const ref = doc(db, "alumnos", id).withConverter(userConverter);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      // Convert to user object
      const user = docSnap.data();
      // Use a user instance method
      console.log(user.toString());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error);
  }
};

//Metodo para añadir informacion a una collecion, este metodo recibe
//los datos, y la collecion donde se introducira
const addDataToCollection = async (data, type) => {
  await addDoc(collection(db, type), {
    data,
  });
};

const deletFromCollection = async (type, id) => {
  await deleteDoc(doc(db, type, id));
};

export { searchAllBooks, searchBook, addDataToCollection, searchUser };
