import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions/index";
import "./DetailStyles.css"

export default function Detail(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const myDog = useSelector((state) => state.detail);
  if (myDog.length === 0) {
    return null; // Si el perro aún no se ha cargado, mostrar null para que no se renderice nada
  }

  return (
    <div className="detail-container">
      <div className="logoName">
        <h1 >DoggyPedia</h1>
      </div>
      <div className="detail-card">
        <div className="top-row background-top-row">
          <h1> {myDog[0].name}</h1>
        </div>
        <article className="article">
          <h1 className="temp">Temperaments: </h1>
          <h2 className="temperaments">
            {myDog[0].temperaments.map((temperament) => temperament).join(", ")}
          </h2>
          <h1>
            Weight: {myDog[0].weightMin} - {myDog[0].weightMax}
          </h1>
          <h1>
            Height: {myDog[0].heightMin} - {myDog[0].heightMax}
          </h1>
          <h1>Life Span: {myDog[0].life_span}</h1>
        </article>
        <Link to="/home">
          <button className="back">
            <strong>
              <h1 className="font">Back</h1>
            </strong>
          </button>
        </Link>
      </div>
    </div>
  );
}
