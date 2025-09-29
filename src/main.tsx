import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router";
import router from "./app/router";
// import "./styles/global.css"; // Uncomment if you have global styles

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
