import React, {
  Fragment,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import Notification from '../helpers/Notification';
import firebase from '../utils/firebase';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const useAuth = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
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
        if (type == 'student') {
          const newAlumno = await addDoc(collection(db, "alumnos"), {
            data,
          });
        } else {
          if (type == "employees") {
            const newEmployee = await addDoc(collection(db, "docente"), {
              data
            });
          } else {
            const newOther = await addDoc(collection(db, "otros"), {
              data
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

  const login = (email, password) => {
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
        navigate('/dashboard/inicio');
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
      }
    });
  }, [currentUser]);

  const values = { currentUser, signUpWithEmailPassword, login, logout };

  return (
    <Fragment>
      <UserContext.Provider value={values}>{children}</UserContext.Provider>
      <Notification notify={notify} setNotify={setNotify} position={'top'} />
    </Fragment>
  );
};

export default UserProvider;
