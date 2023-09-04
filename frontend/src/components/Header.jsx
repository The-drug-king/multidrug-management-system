import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <StyledHeader>
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
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  max-width: 1800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: #000716;
  height: 80px;
  position: relative;

  .logo {
    font-size: 2rem;
    font-weight: bold;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .user {
    font-size: 1rem;
    padding: 1rem 2rem;
    cursor: pointer;
    position: absolute;
    right: 5%;
    display: flex;
    align-items: center;
    color: white;
  }

  .user svg {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
`;

export default Header;
