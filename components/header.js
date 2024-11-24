import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/header.css";

const Header = ({ setCurrentPage }) => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li onClick={() => setCurrentPage("home")}>
            <FontAwesomeIcon icon={faHome} /> Inicio
          </li>
          <li onClick={() => setCurrentPage("register")}>
            <FontAwesomeIcon icon={faUserPlus} /> Registrarse
          </li>
          <li onClick={() => setCurrentPage("login")}>
            <FontAwesomeIcon icon={faSignInAlt} /> Iniciar sesión
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
