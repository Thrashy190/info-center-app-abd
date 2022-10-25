import React, {
  Fragment,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import Notification from '../helpers/Notification';
import firebase from '../utils/firebase';
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  setDoc,
  orderBy,
} from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const useAuth = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loginType, setLoginType] = useState();
  const navigate = useNavigate();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const logOutUser = () => {
    return {
      type: 'LOGOUT_USER',
    };
  };

  const signUpWithEmailPassword = (email, password, data) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setDoc(doc(db, 'administrador', userCredential.user.uid), data)
          .then(() => {
            setCurrentUser(userCredential.user.uid);
            setNotify({
              isOpen: true,
              message: 'Se creo la cuenta de adminitrador correctamente',
              type: 'success',
            });
          })
          .catch((error) => {
            setNotify({
              isOpen: true,
              message: 'Hubo un error al agregar el usuario a la bd',
              type: 'error',
            });
          });
      })
      .catch((error) => {
        console.log(error);
        setNotify({
          isOpen: true,
          message: 'Hubo un error al crear usuario',
          type: 'error',
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
          message: 'Se inicio sesion correctamente',
          type: 'success',
        });
        navigate('/admin/dashboard/contenido');
      })
      .catch((error) => {
        setNotify({
          isOpen: true,
          message: 'Hubo un error al iniciar sesión',
          type: 'error',
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
          message: 'Sesión terminada correctamente',
          type: 'success',
        });
        logOutUser();
        navigate('/login');
      })
      .catch(() => {
        setNotify({
          isOpen: true,
          message: 'Error al momento de cerrar sesión intentalo mas tarde',
          type: 'error',
        });
      });
  };

  const searchCategoria = async (input, data, id) => {
    let categoria = [];
    if (id === null) {
      const categoriaRef = doc(db, 'categorias');
      const q = query(categoriaRef, where(input, '==', data));
      var id;

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        id = doc.id;
        categoria.push({ ...doc.data(), id: doc.id });
      });
    }

    return categoria;
  };

  const seachAutores = async (input, data, id) => {
    let autores = [];
    if (id === null) {
      const autoresRef = doc(db, 'autores');
      const q = query(autoresRef, where(input, '==', data));
      var id;

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        id = doc.id;
        autores.push({ ...doc.data(), id: doc.id });
      });
    }

    return autores;
  };

  const getBooks = async () => {
    const booksRef = collection(db, 'libros');
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
    const studentReference = collection(db, 'alumnos');
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
    const employeeReference = collection(db, 'empleado');

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

  const getLendings = async () => {
    const prestamosRef = collection(db, 'prestamo');

    const q = query(
      collection(db, 'prestamo'),
      orderBy('fechaPrestamo', 'desc')
    );
    let prestamos = [];
    let docRef = {};

    //let libros = [];

    try {
      const prestamosSnap = await getDocs(q);
      if (prestamosSnap.docs.length > 0) {
        prestamosSnap.forEach(async (docItem) => {
          //libros = [];
          if (docItem.data().userType === 'S') {
            docRef = doc(db, 'alumnos', docItem.data().idUsuario);
          } else {
            docRef = doc(db, 'empleado', docItem.data().idUsuario);
          }

          let userSnap = await getDoc(docRef);

          // docItem.data().booksList.forEach(async (id) => {
          //   let bookSnap = await getDoc(doc(db, "libros", id));
          //   libros.push({ id: bookSnap.id, ...bookSnap.data() });
          // });

          //console.log(libros);

          prestamos.push({
            ...docItem.data(),
            ...userSnap.data(),
            id: docItem.id,
            //...libros,
          });
        });
      }
      console.log(prestamos);
      return prestamos;
    } catch (error) {
      console.log(error);
    }
  };

  const addLendings = async (user, lista, type) => {
    let books = lista.map((data) => {
      return data.id;
    });

    try {
      await addDoc(collection(db, 'prestamo'), {
        idUsuario: user.id,
        fechaPrestamo: Math.floor(new Date() / 1000),
        fechaDevolucion: Math.floor(
          new Date().setDate(new Date().getDate() + 5) / 1000
        ),
        empleado: currentUser,
        booksList: books,
        userType: type,
      });
      setNotify({
        isOpen: true,
        message: 'Prestamo creado correctamente',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
      setNotify({
        isOpen: true,
        message: 'Error al momento de crear el prestamo',
        type: 'error',
      });
    }
  };

  const getAdmissions = async () => {
    const q = query(collection(db, 'ingreso'), orderBy('fechaIngreso', 'desc'));

    let ingresos = [];
    let docRef = {};

    try {
      const ingresosSnap = await getDocs(q);
      if (ingresosSnap.docs.length > 0) {
        ingresosSnap.forEach(async (docItem) => {
          if (docItem.data().tipoIngreso === 'S') {
            docRef = doc(db, 'alumnos', docItem.data().idUsuario);
          } else {
            docRef = doc(db, 'empleado', docItem.data().idUsuario);
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

  const addAdmissionToInfoCenter = async (data, type) => {
    console.log(data);
    try {
      const ingresosRef = collection(db, 'ingreso');
      const q = query(
        ingresosRef,
        where('idUsuario', '==', data.id),
        where('fechaSalida', '==', null)
      );

      const ingresosSnap = await getDocs(q);
      if (ingresosSnap.docs.length === 0) {
        await addDoc(collection(db, 'ingreso'), {
          idUsuario: data.id,
          fechaIngreso: Math.floor(new Date() / 1000),
          fechaSalida: null,
          tipoIngreso: type,
        });
        setNotify({
          isOpen: true,
          message: 'Ingreso agregado correctamente',
          type: 'success',
        });

        return;
      }
      setNotify({
        isOpen: true,
        message: 'No se registro salida',
        type: 'error',
      });
    } catch (error) {
      console.log(error);
      setNotify({
        isOpen: true,
        message: 'Error al momento de agregar un ingreso',
        type: 'error',
      });
    }
  };

  const fechaSalida = async (data, id) => {
    try {
      await setDoc(doc(db, 'ingreso', id), {
        idUsuario: data.idUsuario,
        fechaIngreso: data.fechaIngreso,
        tipoIngreso: data.tipoIngreso,
        fechaSalida: Math.floor(new Date() / 1000),
      });
      setNotify({
        isOpen: true,
        message: 'Fecha generada',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
      setNotify({
        isOpen: true,
        message: 'Error',
        type: 'error',
      });
    }
  };

  const updateCollection = async (type, id, data) => {
    try {
      setDoc(doc(db, type, id), data);
      setNotify({
        isOpen: true,
        message: 'Actualizado correctamente',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
      setNotify({
        isOpen: true,
        message: 'Error al actualizar',
        type: 'error',
      });
    }
  };

  const deletFromCollection = async (type, id) => {
    try {
      await deleteDoc(doc(db, type, id));
      setNotify({
        isOpen: true,
        message: 'Eliminado correctamente',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
      setNotify({
        isOpen: true,
        message: 'Error al momento de eliminar',
        type: 'error',
      });
    }
  };

  const addData = async (data, type) => {
    try {
      await addDoc(collection(db, type), data);
      setNotify({
        isOpen: true,
        message: 'Informacion agregada correctamente',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
      setNotify({
        isOpen: true,
        message: 'Error al momento de agregar',
        type: 'error',
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

  const addDataWithoutRepeat = async (type, id, data, key) => {
    try {
      const docRef = collection(db, type);
      const q = query(docRef, where(key, '==', id));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length === 0) {
        setDoc(doc(db, type, id), data);
        setNotify({
          isOpen: true,
          message: 'Se agrego un ususario correctamente',
          type: 'success',
        });
        return;
      }
      setNotify({
        isOpen: true,
        message: 'Usuario existente intente agregar uno nuevo',
        type: 'error',
      });
    } catch (error) {
      console.log(error);
      setNotify({
        isOpen: true,
        message: 'Hubo un problema al agregar al usuario',
        type: 'error',
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
    addLendings,
    getLendings,
    getDataFromCollection,
    deletFromCollection,
    addData,
    updateCollection,
    addDataWithoutRepeat,
    fechaSalida,
  };

  return (
    <Fragment>
      <UserContext.Provider value={values}>{children}</UserContext.Provider>
      <Notification notify={notify} setNotify={setNotify} position={'top'} />
    </Fragment>
  );
};

export default UserProvider;

// const bookConverter = {
//   toFirestore: (book) => {
//     return {
//       nombre: book.nombre,
//       categoria: book.categoria,
//       editorial: book.editorial,
//       volumen: book.volumen,
//       fecha_publicacion: book.fecha_publicacion,
//     };
//   },
//   fromFirestore: (snapshot, options) => {
//     const book = snapshot.data(options);
//     return new Books(
//       book.nombre,
//       book.categoria,
//       book.editorial,
//       book.volumen,
//       book.fecha_publicacion
//     );
//   },
// };

// const searchAllBooks = async (type) => {
//   try {
//     const bookReference = collection(db, type);
//     const q = query(bookReference);
//     let id = [];

//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach(async (doc) => {
//       id.push(doc.id);
//     });

//     for (let i = 0; i < id.length; i++) {
//       const ref = doc(db, type, id[i]).withConverter(bookConverter);
//       const docSnap = await getDoc(ref);
//       if (docSnap.exists()) {
//         // Convert to book object
//         const book = docSnap.data();
//         // Use a book instance method
//         console.log(book.toString());
//       } else {
//         console.log("No such document!");
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// const searchBook = async (input, data) => {
//   try {
//     const bookReference = collection(db, "libros");
//     const q = query(bookReference, where(input, "==", data));
//     var id;
//     let book = [];

//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       id = doc.id;
//     });

//     const ref = doc(db, "libros", id).withConverter(bookConverter);
//     const docSnap = await getDoc(ref);
//     if (docSnap.exists()) {
//       // Use a book instance method
//       console.log(book.toString());
//       // Convert to book object
//       book.push({ ...docSnap.data(), id: docSnap.id });
//       return book;
//     } else {
//       console.log("No such document!");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// const searchUser = async (type, input, data, id) => {
//   try {
//     const userConverter = {
//       toFirestore: (user) => {
//         return {
//           name: user.name,
//           lastNameFather: user.lastNameFather,
//           lastNameMother: user.lastNameMother,
//           phone: user.phone,
//           email: user.email,
//           gender: user.gender,
//           password: user.password,
//         };
//       },
//       fromFirestore: (snapshot, options) => {
//         const user = snapshot.data(options);
//         return new User(
//           user.name,
//           user.lastNameFather,
//           user.lastNameMother,
//           user.phone,
//           user.email,
//           user.gender,
//           user.password
//         );
//       },
//     };

//     if (id !== null) {
//       const userReference = collection(db, type);
//       const q = query(userReference, where(input, "==", data));

//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         id = doc.id;
//       });
//     }

//     const ref = doc(db, type, id).withConverter(userConverter);
//     const docSnap = await getDoc(ref);
//     if (docSnap.exists()) {
//       // Convert to user object
//       const user = docSnap.data();
//       // Use a user instance method
//       console.log(user.toString());
//     } else {
//       console.log("No such document!");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
