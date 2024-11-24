import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaLock,
  FaBuilding,
  FaShieldAlt,
  FaExclamationTriangle,
  FaExclamationCircle,
} from "react-icons/fa";
import "../styles/register.css";

const Register = () => {
  const [step, setStep] = useState(1);
  const [logo, setLogo] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    password: "",
    businessName: "",
    logo: null,
  });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
      // Actualizar formData con el logo cargado
      setFormData((prevState) => ({
        ...prevState,
        logo: file,
      }));
      // Validar el campo logo
      validateField("logo", file);
    }
  };

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    password: "",
    businessName: "",
    logo: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files[0] : value,
    }));
    // Validar el campo correspondiente en el mismo momento
    validateField(name, type === "file" ? files[0] : value);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
        error = !value
          ? "El nombre no puede estar vacío."
          : /\d/.test(value)
          ? "EL nombre debe contener solo letras."
          : "";
        break;
      case "lastName":
        error = !value
          ? "El apellido no puede estar vacío."
          : /\d/.test(value)
          ? "El apellido debe contener solo letras."
          : "";
        break;
      case "email":
        const emailPattern = /^[^\s@]+@gmail\.com$/;
        error = !value
          ? "El Correo electrónico no puede estar vacío."
          : !emailPattern.test(value)
          ? "Correo electrónico inválido."
          : "";
        break;
      case "birthDate":
        if (!value) {
          error = "La fecha de nacimiento no puede estar vacía.";
        } else {
          const birthDate = new Date(value);
          const age = new Date().getFullYear() - birthDate.getFullYear();
          error = age < 18 ? "Debes ser mayor de 18 años." : "";
        }
        break;
      case "password":
        const passwordPattern =
          /^(?=.*[a-zA-Z]{8})(?=.*\d.*\d.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{12,}$/;
        error = !value
          ? "La contraseña no puede estar vacía."
          : !passwordPattern.test(value)
          ? "La contraseña debe tener al menos 8 letras, 3 números y 1 carácter especial (permitidos: !@#$%^&*()_+)."
          : "";
        break;
      case "businessName":
        error =
          step === 2 && !value
            ? "EL ombre del negocio no puede estar vacío."
            : "";
        break;
      case "logo":
        error = step === 2 && !value ? "Debes subir un logo." : "";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fieldsToValidate = [
      "firstName",
      "lastName",
      "email",
      "birthDate",
      "password",
      ...(step === 2 ? ["businessName", "logo"] : []),
    ];

    let hasErrors = false;
    for (let field of fieldsToValidate) {
      const error = validateField(field, formData[field]);
      if (error) {
        hasErrors = true;
      }
    }

    if (hasErrors) {
      return;
    }

    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      console.log("Formulario enviado", formData);
    }
  };

  const getPasswordStrengthClass = (password) => {
    if (password.length < 12) return "weak";
    const hasLetters = /[a-zA-Z]{8}/.test(password);
    const hasDigits = (password.match(/\d/g) || []).length >= 3;
    const hasSpecial = /[!@#$%^&*()_+]/.test(password);
    if (hasLetters && hasDigits && hasSpecial) return "strong";
    if (hasLetters && hasDigits) return "medium";
    return "weak";
  };

  const getPasswordStrengthText = (password) => {
    if (password.length === 0) return "";
    const strength = getPasswordStrengthClass(password);
    switch (strength) {
      case "strong":
        return (
          <div className="password-strength strong">
            <FaShieldAlt className="strength-icon" />
            Contraseña fuerte
          </div>
        );
      case "medium":
        return (
          <div className="password-strength medium">
            <FaExclamationTriangle className="strength-icon" />
            Contraseña media
          </div>
        );
      default:
        return (
          <div className="password-strength weak">
            <FaExclamationCircle className="strength-icon" />
            Contraseña débil
          </div>
        );
    }
  };

  const isStep1Valid = () => {
    return (
      !errors.firstName &&
      !errors.lastName &&
      !errors.email &&
      !errors.birthDate &&
      !errors.password &&
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.birthDate &&
      formData.password
    );
  };

  const isStep2Valid = () => {
    return (
      !errors.businessName &&
      !errors.logo &&
      formData.businessName &&
      formData.logo
    );
  };

  return (
    <div className="register-container">
      <h2>{step === 1 ? "Formulario de Registro" : "Detalles del Negocio"}</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-step">
            <div className="form-group">
              <FaUser className="icon-inside-input" />
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Nombre completo"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </div>
            <div className="form-group">
              <FaUser className="icon-inside-input" />
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Apellidos completos"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>
            <div className="form-group">
              <FaEnvelope className="icon-inside-input" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="birthDate">
                <FaCalendarAlt className="icon-inside-input" />
                <input
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  title="Introduce tu fecha de nacimiento"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
                {errors.birthDate && (
                  <span className="error">{errors.birthDate}</span>
                )}
              </label>
            </div>
            <div className="form-group password-group">
              <FaLock className="icon-inside-input" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />
              {getPasswordStrengthText(formData.password)}
              {errors.password && (
                <span className="error error-password">{errors.password}</span>
              )}
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="form-step">
            <div className="form-group">
              <FaBuilding className="icon-inside-input" />
              <input
                type="text"
                name="businessName"
                id="businessName"
                placeholder="Nombre del negocio"
                value={formData.businessName}
                onChange={handleChange}
              />
              {errors.businessName && (
                <span className="error">{errors.businessName}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="logo-upload">Carga tu logo</label>
              <div
                className="logo-upload-container"
                onClick={() => document.getElementById("logo-upload").click()}
              >
                {logo ? (
                  <img src={logo} alt="logo" className="logo-preview" />
                ) : (
                  <span className="logo-placeholder">logo</span>
                )}
              </div>
              <input
                type="file"
                id="logo-upload"
                accept="image/*"
                onChange={handleLogoChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
        )}
        <div className="form-group">
          {step === 1 && (
            <button
              type="button"
              className="next-btn"
              onClick={() => {
                if (isStep1Valid()) {
                  setStep(2);
                }
              }}
              disabled={!isStep1Valid()}
            >
              Siguiente
            </button>
          )}
          {step === 2 && (
            <>
              <button
                type="button"
                className="prev-btn"
                onClick={() => setStep(1)}
              >
                Atrás
              </button>
              <button
                type="submit"
                className="submit-btn"
                disabled={!isStep2Valid()}
              >
                Enviar
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;
