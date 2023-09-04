import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "../styles/Header.css"; // CSS 파일 import

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="header-container">
      <div className="logo">MMS</div>

      <div className="user" onClick={handleLoginToggle}>
        {isLoggedIn ? (
          <>
            <FontAwesomeIcon icon={faSignOutAlt} /> 로그아웃
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faUser} /> 로그인
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
