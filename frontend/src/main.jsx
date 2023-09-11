import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "./screens/SignIn.jsx";
import SignUp from "./screens/SignUp.jsx";
import Medical from "./screens/Medical.jsx";
import Header from "./components/Header.jsx";
import Patient from "./screens/Patient.jsx";
import PatientPost from "./screens/PatientPost.jsx";
import PatientFollow from "./screens/PatientFollow.jsx";
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
        <Route path="/patient" element={<Patient />} />
        <Route path="/patient/follow" element={<PatientFollow />} />
        <Route path="/patient/post" element={<PatientPost />} />
        <Route path="/patient/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
