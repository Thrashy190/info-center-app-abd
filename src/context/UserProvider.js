import React, {
  Fragment,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import Notification from '../helpers/Notification';
import firebase from '../utils/firebase';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
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

  const signUpWithEmailPassword = (email, password, data, type) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        setCurrentUser(userCredential.user.uid);
        setNotify({
          isOpen: true,
          message: 'Se creo la cuenta de alumno correctamente',
          type: 'success',
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

        if (type === 'student') {
          const { career, numControl, semester } = data;
          const newAlumno = await addDoc(collection(db, 'alumnos'), {
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
          if (type === 'employees') {
            const { numEmployee, department } = data;
            const newEmployee = await addDoc(collection(db, 'docente'), {
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
            const newOther = await addDoc(collection(db, 'otros'), {
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
        navigate('/dashboard/inicio');
      })
      .catch((error) => {
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
        type === 'admin'
          ? navigate('/admin/dashboard/inicio')
          : navigate('/dashboard/inicio');
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
        navigate('/usertype');
      })
      .catch(() => {
        setNotify({
          isOpen: true,
          message: 'Error al momento de cerrar sesión intentalo mas tarde',
          type: 'error',
        });
      });
  };

  const getUserAdmissions = () => {};

  // const addUserAdmissions = async (data) => {
  //   const newEmployee = await addDoc(collection(db, 'ingreso'), {});
  // };

  const getUsers = async () => {
    const studentReference = collection(db, 'alumnos');
    const employeeReference = collection(db, 'docentes');
    const otherReference = collection(db, 'alumnos');

    getDocs(studentReference)
      .then((snapshot) => {
        let students = [];
        snapshot.docs.map((doc) => {
          students.push({ ...doc.data(), id: doc.id });
        });
        console.log(students);
      })
      .catch((err) => {
        console.log('Hubo un error al traer los datos');
      });

    getDocs(employeeReference)
      .then((snapshot) => {
        let employees = [];
        snapshot.docs.map((doc) => {
          employees.push({ ...doc.data(), id: doc.id });
        });
        console.log(employees);
      })
      .catch((err) => {
        console.log('Hubo un error al traer los datos');
      });

    getDocs(otherReference)
      .then((snapshot) => {
        let others = [];
        snapshot.docs.map((doc) => {
          others.push({ ...doc.data(), id: doc.id });
        });
        console.log(others);
      })
      .catch((err) => {
        console.log('Hubo un error al traer los datos');
      });

    // const students = query(studentReference, where('nombre', '!=', ''));
    // const employees = query(employeeReference, where('nombre', '==', true));
    // const others = query(otherReference, where('nombre', '==', true));
    // console.log(students);
    // const querySnapshot = await getDocs(students);
    // console.log(querySnapshot);

    // console.log('======', students);
    // console.log('======', employees);
    // console.log('======', others);
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
    getUsers,
  };

  return (
    <Fragment>
      <UserContext.Provider value={values}>{children}</UserContext.Provider>
      <Notification notify={notify} setNotify={setNotify} position={'top'} />
    </Fragment>
  );
};

export default UserProvider;

const searchAll = async (type) => {
  const q = query(collection(db, type));

  const querySnapShot = await getDocs(q);
  querySnapShot.forEach((doc) => {
    console.log(doc.id, doc.data());
  });
};

const searchBook = async (data) => {
  const bookReference = collection(db, 'libros');
  const q = query(bookReference, where('nombre', '==', data));

  console.log('======', q);
};

const searchUser = async (type, input, data) => {
  const userReference = collection(db, type);
  const q = query(userReference, where(input, '==', data));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data());
  });
};

//Metodo para añadir informacion a una collecion, este metodo recibe
//los datos, y la collecion donde se introducira
const addDataToCollection = async (data, type) => {
  await addDoc(collection(db, type), {
    data,
  });
};

export { searchAll, searchBook, addDataToCollection, searchUser };
