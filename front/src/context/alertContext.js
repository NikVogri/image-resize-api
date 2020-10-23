import { createContext } from "react";

const AlertContext = createContext({
  addAlert: () => {},
  removeAlert: () => {},
  alert: "",
});

export default AlertContext;
