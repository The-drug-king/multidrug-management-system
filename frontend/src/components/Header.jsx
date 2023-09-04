import React, { useState } from "react";
import "../styles/Header.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="header-container">
      <div className="logo">MMS</div>

      <div className="user" onClick={handleLoginToggle}>
        {isLoggedIn ? <> 로그아웃</> : <>로그인</>}
      </div>
    </div>
  );
};

export default Header;
