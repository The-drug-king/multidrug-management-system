import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  Routes,
  Route,
} from "react-router-dom"; // Routes 및 Route 가져오기
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
