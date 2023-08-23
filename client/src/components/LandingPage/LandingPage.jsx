import React from "react";
import { Link } from "react-router-dom";
import "./LandingPageStyles.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <h1> Bienvenidos a DoggyPedia </h1>
      <div className="buttonContainer">
        <Link to="/home">
          <button>INGRESAR</button>
        </Link>
      </div>
    </div>
  );
}
