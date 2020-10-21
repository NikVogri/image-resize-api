import "./src/css/style.css";

import React from "react";
import AlertProvider from "./src/components/Providers/AlertProvider";

export const wrapRootElement = ({ element }) => (
  <AlertProvider>{element}</AlertProvider>
);
