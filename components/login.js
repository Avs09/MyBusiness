import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "../styles/login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "email") {
      const emailPattern = /^[^\s@]+@gmail\.com$/;
      error = !value
        ? "Correo electrónico no puede estar vacío."
        : !emailPattern.test(value)
        ? "Correo electrónico inválido. Debe ser un correo de Gmail válido."
        : "";
    } else if (name === "password") {
      error = !value ? "Contraseña no puede estar vacía." : "";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const isFormValid = () => {
    return (
      formData.email && formData.password && !errors.email && !errors.password
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
    console.log("Login exitoso", formData);
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <FaEnvelope className="icon-inside-input" />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <FaLock className="icon-inside-input" />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <button
            type="submit"
            className="submit-btn"
            disabled={!isFormValid()}
          >
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
