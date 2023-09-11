import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "./screens/SignIn.jsx";
import SignUp from "./screens/SignUp.jsx";
import Medical from "./screens/Medical.jsx";
import Header from "./components/Header.jsx";
import PatientMain from "./screens/PatientMain.jsx";
import PatientPost from "./screens/PatientPost.jsx";
import Result from "./screens/Result";

import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/medical" element={<Medical />} />
        <Route path="/patient" element={<PatientMain />} />
        <Route path="/patient/upload" element={<PatientPost />} />
        <Route path="/Result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
