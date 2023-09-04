import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import MedicalsMain from "./components/MedicalsMain.jsx";
import Header from "./components/Header.jsx";
import PatientMain from "./components/PatientMain.jsx"; // PatientMain 컴포넌트 추가
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/MedicalsMain" element={<MedicalsMain />} />
        <Route path="/patient/:patientNumber" element={<PatientMain />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
