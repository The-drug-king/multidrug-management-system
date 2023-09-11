import React, { useState } from "react";
import { Link } from "react-router-dom";
import icon from "../assets/images/pill.png";

function SignUp() {
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    name: "",
    userType: "",
  });

  const [formErrors, setFormErrors] = useState({
    loginId: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    name: "",
    userType: "",
  });

  // 입력 값 변경 핸들러
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 사용자 유형 변경 핸들러
  const handleUserTypeChange = (selectedType) => {
    setFormData({
      ...formData,
      userType: selectedType,
    });
  };

  // 폼 유효성 검사
  const validateForm = () => {
    const errors = {
      loginId: "",
      password: "",
      confirmPassword: "",
      birthday: "",
      name: "",
      userType: "",
    };

    let isValid = true;

    if (!formData.loginId) {
      errors.loginId = "아이디를 입력하세요.";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "비밀번호를 입력하세요.";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      isValid = false;
    }

    if (!formData.name) {
      errors.name = "이름을 입력하세요.";
      isValid = false;
    }

    if (!formData.birthday) {
      errors.birthday = "생년월일을 입력하세요.";
      isValid = false;
    }

    if (!formData.userType) {
      errors.userType = "사용자 유형을 선택하세요.";
      isValid = false;
    }

    setFormErrors(errors);

    return isValid;
  };

  const handleSubmit = async (event) => {
    if (validateForm()) {
      const formDataToSend = new FormData();
      formDataToSend.append("loginId", formData.loginId);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("confirmPassword", formData.confirmPassword);
      formDataToSend.append("birthday", formData.birthday);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("userType", formData.userType);

      console.log(formDataToSend);

      try {
        // API 호출
        const response = await fetch("API_URL", {
          method: "POST",
          body: formDataToSend,
        });

        if (response.ok) {
          // 성공적인 응답 처리
          const data = await response.json();
          console.log("API 응답:", data);
        } else {
          // 실패한 경우
          console.error("API 요청 실패:", response.status);
        }
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
    } else {
      console.log("Form validation failed.");
    }
  };

  return (
    <div
      className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8"
      style={{ marginTop: "70px" }}
    >
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
              onClick={() => handleUserTypeChange("medical_person")}
              className={`${
                formData.userType === "medical_person"
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

          {["loginId", "password", "confirmPassword", "name", "birthday"].map(
            (fieldName) => (
              <div key={fieldName}>
                <label
                  htmlFor={fieldName}
                  className="block text-sm font-bold leading-6 text-gray-900"
                >
                  {fieldName === "confirmPassword"
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
                          fieldName === "confirmPassword"
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
                {formErrors[fieldName] && (
                  <p className="mt-2 text-red-600">{formErrors[fieldName]}</p>
                )}
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
