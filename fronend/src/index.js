
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { SessionProvider } from "SessionContext";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <SessionProvider>

  <BrowserRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>
  </SessionProvider>
);
