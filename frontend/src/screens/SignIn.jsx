import React, { useState } from "react";
import { Link } from "react-router-dom";
import icon from "../assets/images/pill.png";

export function SignIn() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiUrl = "API_URL";

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    };

    const body = new URLSearchParams();
    body.append("loginId", id);
    body.append("password", password);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: body,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API 응답:", data);

        if (data.userType === "medical_person") {
          window.location.href = "/MedicalsMain/${data.userId}";
        } else if (data.userType === "patient") {
          window.location.href = "/PatientMain/${data.userId}";
        } else {
          // 다른 userType 처리
          console.error("알 수 없는 userType:", data.userType);
        }
      } else {
        console.error("API 요청 실패:", response.status);
        alert("ID와 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      alert("API 요청 중 오류 발생");
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-12 w-auto" src={icon} alt="MMS" />
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="id"
                className="block text-sm font-bold leading-6 text-gray-900"
              >
                ID
              </label>
              <div className="mt-2">
                <input
                  id="id"
                  name="id"
                  type="text"
                  autoComplete="username"
                  value={id}
                  onChange={handleIdChange}
                  required
                  style={{ paddingLeft: "10px" }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  style={{ paddingLeft: "10px" }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                로그인
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            아직 계정이 없으신가요?{" "}
            <Link
              to="/SignUp"
              className="font-semibold leading-6 text-gray-900 hover:text-gray-500"
            >
              회원가입하기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
