import React, {
  Fragment,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import Notification from "../helpers/Notification";
import firebase from "../utils/firebase";

const UserContext = createContext();

export const useAuth = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const signUpWithEmailPassword = (email, password, data, type) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setNotify({
          isOpen: true,
          message: "Se creo la cuenta de alumno correctamente",
          type: "success",
        });
        setCurrentUser(userCredential.user.uid);
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
        setNotify({
          isOpen: true,
          message: "Se inicio sesion correctamente",
          type: "success",
        });
      })
      .catch((error) => {
        // setNotify({
        //   isOpen: true,
        //   message: "Hubo un error al iniciar sesión",
        //   type: "error",
        // });
      });
  };

  // const logout = () => {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       setCurrentUser(null);
  //       setNotify({
  //         isOpen: true,
  //         message: "Sesión terminada correctamente",
  //         type: "success",
  //       });
  //       logOutUser();
  //     })
  //     .catch(() => {
  //       setNotify({
  //         isOpen: true,
  //         message: "Error al momento de cerrar sesión intentalo mas tarde",
  //         type: "error",
  //       });
  //     });
  // };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        currentUser(user.uid);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, [currentUser]);

  const values = { currentUser, signUpWithEmailPassword, login };

  return (
    <Fragment>
      <UserContext.Provider value={values}>{children}</UserContext.Provider>
      <Notification notify={notify} setNotify={setNotify} position={"top"} />
    </Fragment>
  );
};

export default UserProvider;
