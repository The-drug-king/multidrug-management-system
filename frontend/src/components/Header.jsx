import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleLogout = async () => {
    // 로그아웃 요청을 보낼 API 엔드포인트 URL
    const logoutApiUrl = "API_LOGOUT_URL_HERE";

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    try {
      const response = await fetch(logoutApiUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({}),
      });

      if (response.ok) {
        setIsLoggedIn(false);
      } else {
        console.error("로그아웃 실패:", response.status);
        alert("로그아웃 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="header-container">
      <div className="logo">MMS</div>

      <div className="user">
        {isLoggedIn ? (
          <button onClick={handleLogout}>로그아웃</button>
        ) : (
          <Link to="/">로그인</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
