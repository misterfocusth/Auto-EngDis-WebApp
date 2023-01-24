import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// React Router
import { BrowserRouter } from "react-router-dom";

// Student Data Context
import StudentContextProvider from "./contexts/studentContext";

// CSS
import "./index.css";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StudentContextProvider>
    <MantineProvider withNormalizeCSS withGlobalStyles withCSSVariables>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </MantineProvider>
  </StudentContextProvider>
);
