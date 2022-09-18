import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../context/UserProvider";

const ProtectedRoute = ({ component: Component, path, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <>
            <Component {...props} {...rest} />
          </>
        ) : (
          <Redirect to="/usertype" />
        );
      }}
    ></Route>
  );
};

export default ProtectedRoute;
