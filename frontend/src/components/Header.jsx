import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUser,
  faSignOutAlt,
  faUserCog,
  faAlignCenter,
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";
import icon from "../assets/pillLogo.png";

const Header = () => {
  const [userToggled, setUserToggled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <StyledHeader userToggled={userToggled}>
      <div className="logo">MMS</div>

      <div
        className="user"
        onClick={() => {
          setUserToggled(!userToggled);
        }}
      >
        <FontAwesomeIcon icon={userToggled ? faTimes : faUser} />
        {userToggled && (
          <ul className="user__menu">
            <li>
              <FontAwesomeIcon icon={faUserCog} /> 개인정보
            </li>
            <li onClick={handleLoginToggle}>
              <FontAwesomeIcon icon={isLoggedIn ? faSignOutAlt : faUser} />{" "}
              {isLoggedIn ? "로그아웃" : "로그인"}
            </li>
          </ul>
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
  background-color: black;
  height: 80px;
  position: relative; /* 부모 컨테이너를 상대 위치로 설정 */

  .logo {
    font-size: 2rem;
    font-weight: bold;
    position: absolute; /* 로고를 절대 위치로 설정 */
    left: 50%; /* 로고를 수평 가운데로 이동 */
    transform: translateX(-50%); /* 로고를 가운데로 정렬 */
  }

  .user {
    font-size: 1rem;
    padding: 1rem 2rem;
    cursor: pointer;
    position: absolute;
    right: 5%;
    display: flex;
    align-items: center;
  }

  .user svg {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }

  .user__menu {
    width: 200px;
    position: absolute; /* 메뉴를 절대 위치로 설정 */
    top: 100%; /* 부모 컨테이너 아래에 위치 */
    right: 0; /* 부모 컨테이너의 오른쪽에 위치 */
    background-color: black;
    display: ${(props) => (props.userToggled ? "block" : "none")};
    list-style: none;
    border: 1px solid white;
  }

  .user__menu li {
    color: white;
    padding: 0.5rem 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .user__menu li:hover {
    background-color: #333;
  }

  .user__menu li svg {
    font-size: 1rem;
    margin-right: 1rem;
  }
`;

export default Header;
