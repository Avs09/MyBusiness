import React from "react";
import "../styles/step.css";

function Step({ icon, stepNumber, title, description }) {
  return (
    <div className="step">
      <div className="step-icon">{icon}</div>
      <h4>{`${stepNumber}. ${title}`}</h4>
      <p>{description}</p>
    </div>
  );
}

export default Step;
