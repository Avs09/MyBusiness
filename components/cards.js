import React from "react";
import "../styles/cards.css";

function Card({ icon, title, description }) {
  return (
    <div className="card">
      <div className="card-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Card;
