import React from "react";
import { Link } from "react-router-dom";
import "./CardStyles.css"
  
const Card = ({ id, image, name, temperaments, weightMin, weightMax }) => {
  return (
    <div className="card">
      <Link to={`/detail/${id}`} className="card-link">
        <div className="card-image">
          <img src={image} alt={name} />
        </div>
        <div className="card-content">
          <h2>{name}</h2>
          <div className="card-details">
            <div className="detail">
              <span className="detail-label">Temperament:</span>
              <span className="detail-value">{` ${temperaments?.join(", ")}`}</span>
            </div>
            <div className="detail">
              <span className="detail-label">Weight:</span>
              <span className="detail-value">
                {` ${weightMin} - ${weightMax} kg`}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
