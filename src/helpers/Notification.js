import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Notification = ({ notify, setNotify, position }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      style={{ marginTop: "3rem", marginLeft: "-0.5rem" }}
      open={notify.isOpen}
      autoHideDuration={2500}
      anchorOrigin={
        position === "top"
          ? { vertical: "top", horizontal: "right" }
          : { vertical: "bottom", horizontal: "right" }
      }
      onClose={handleClose}
    >
      <Alert severity={notify.type}>{notify.message}</Alert>
    </Snackbar>
  );
};

export default Notification;
