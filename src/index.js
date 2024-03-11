import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import router from "./router/router";
import { RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import { userState } from "./recoil/atom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <RecoilRoot
    initializeState={({ set }) => {
      set(userState, "foo");
    }}
  >
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
