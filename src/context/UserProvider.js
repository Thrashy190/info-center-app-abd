import React, { Fragment, createContext, useState, useContext } from "react";
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

  function signUpWithEmailPasswordStudent(email, password) {
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
        // ...
      })
      .catch((error) => {
        setNotify({
          isOpen: true,
          message: "Hubo un error intente nuevamente en otro momento",
          type: "error",
        });
        // ..
      });
    // [END auth_signup_password]
  }

  const values = { currentUser, signUpWithEmailPasswordStudent };

  return (
    <Fragment>
      <UserContext.Provider value={values}>{children}</UserContext.Provider>
      <Notification notify={notify} setNotify={setNotify} position={"top"} />
    </Fragment>
  );
};

export default UserProvider;
