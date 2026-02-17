import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router";
import router from "./app/router";

import "./index.css";
import ContextDataProvider from "@/store/ContextDataProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ContextDataProvider>
      <RouterProvider router={router} />
    </ContextDataProvider>
  </React.StrictMode>,
);
