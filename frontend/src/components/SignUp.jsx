import React, { useState } from "react";
import { Link } from "react-router-dom";
import icon from "../assets/pill.png";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    password: "",
    passwordConfirm: "",
    birthday: "",
    userType: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUserTypeChange = (selectedType) => {
    setFormData({
      ...formData,
      userType: selectedType,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-12 w-auto" src={icon} alt="MMS" />
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center space-x-4">
            <button
              type="button"
              onClick={() => handleUserTypeChange("medical")}
              className={`${
                formData.userType === "medical"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800"
              } py-1.5 px-4 rounded-md text-sm font-semibold`}
            >
              의료인
            </button>
            <button
              type="button"
              onClick={() => handleUserTypeChange("patient")}
              className={`${
                formData.userType === "patient"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800"
              } py-1.5 px-4 rounded-md text-sm font-semibold`}
            >
              환자
            </button>
          </div>

          {["name", "id", "password", "passwordConfirm", "birthday"].map(
            (fieldName) => (
              <div key={fieldName}>
                <label
                  htmlFor={fieldName}
                  className="block text-sm font-bold leading-6 text-gray-900"
                >
                  {fieldName === "passwordConfirm"
                    ? "Confirm Password"
                    : fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                </label>
                <div className="mt-2">
                  <input
                    id={fieldName}
                    name={fieldName}
                    type={
                      fieldName === "birthday"
                        ? "date"
                        : fieldName === "password" ||
                          fieldName === "passwordConfirm"
                        ? "password"
                        : "text"
                    }
                    autoComplete={fieldName}
                    value={formData[fieldName]}
                    onChange={handleInputChange}
                    required
                    style={{ paddingLeft: "10px" }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              회원가입
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          이미 계정이 있으신가요?{" "}
          <Link
            to="/"
            className="font-semibold leading-6 text-gray-800 hover:text-gray-500"
          >
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
