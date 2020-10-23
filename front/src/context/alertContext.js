import { createContext } from "react";

const alertContext = createContext({
  addAlert: () => {},
  removeAlert: () => {},
  alert: "",
});

export default alertContext;
