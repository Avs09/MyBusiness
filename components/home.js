import React from "react";
import { FaRocket, FaShieldAlt, FaUsers, FaCheckCircle } from "react-icons/fa";
import Card from "./cards";
import Step from "./step";
import "../styles/home.css";

function Home() {
  return (
    <section className="home-container">
      <div className="intro-section">
        <h1 className="animated-header">
          ¡Bienvenido a la Gestión Inteligente!
        </h1>
        <p className="animated-text">
          Descubre por qué nuestro software es la mejor opción para
          emprendedores.
        </p>
      </div>

      <div className="features-section">
        <h2>Ventajas principales</h2>
        <div className="cards-container">
          <Card
            icon={<FaRocket />}
            title="Optimización de procesos"
            description="Automatiza las tareas repetitivas y ahorra tiempo valioso."
          />
          <Card
            icon={<FaShieldAlt />}
            title="Seguridad Avanzada"
            description="Protege tus datos con la más alta tecnología de encriptación."
          />
          <Card
            icon={<FaUsers />}
            title="Fácil de Usar"
            description="Interfaz intuitiva y amigable sin complicaciones."
          />
        </div>
      </div>

      <div className="steps-section">
        <h2>Cómo empezar</h2>
        <div className="steps-container">
          <Step
            icon={<FaCheckCircle />}
            stepNumber="1"
            title="Regístrate"
            description="Crea una cuenta en segundos y explora las funcionalidades."
          />
          <Step
            icon={<FaCheckCircle />}
            stepNumber="2"
            title="Personaliza"
            description="Configura tu perfil y ajusta las opciones a tu negocio."
          />
          <Step
            icon={<FaCheckCircle />}
            stepNumber="3"
            title="Gestiona"
            description="Gestiona inventarios"
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
