import React, { useState } from "react";
import AlertContext from "../../context/AlertContext";
import PropTypes from "prop-types";

export default function AlertProvider({ children }) {
  const [alert, setAlert] = useState({});

  const addAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => removeAlert(), 10000);
  };

  const removeAlert = () => {
    setAlert({});
  };

  return (
    <AlertContext.Provider value={{ alert, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
