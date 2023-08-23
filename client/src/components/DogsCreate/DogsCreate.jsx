import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperaments } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./DogsCreateStyles.css";

function validate(input) {
  let errors = {};
  if (!input.name) errors.name = "Se requiere un Nombre";
  if (input.name.length < 3 || input.name.length > 30)
    errors.name = "Name must contain between 3 and 30 characters";
  if (!/^[a-zA-Z\s]+$/.test(input.name))
    errors.name = "Invalid name, must only contain letters";
  if (!input.temperaments) errors.temperaments = "Chosse a temperament";
  if (input.temperaments.length > 6)
    errors.temperaments = "You cant select more than 7 temperaments";
  if (input.weightMin < 1) errors.weightMin = "Must be a positive number";
  if (input.weightMin > 70)
    errors.weightMin = "Min value must be less than 70 kg";
  if (input.weightMin > input.weightMax)
    errors.weightMin = "Min value must be less than Max value";
  if (input.weightMax < 1) errors.weightMax = "Value must be a positive number";
  if (input.weightMax > 100)
    errors.weightMax = "Max value must be less than 100 kg";
  if (input.weightMax < input.weightMin)
    errors.weightMax = "Max value must be higher than Min value";
  if (input.heightMin < 1) errors.heightMin = "Value must be a positive number";
  if (input.heightMin > 100)
    errors.heightMin = "Min value must be less than 100 kg";
  if (input.heightMin > input.heightMax)
    errors.heightMin = "Min value must be less than Max value";
  if (input.heightMax < 1) errors.heightMax = "Value must be a positive number";
  if (input.heightMax > 150)
    errors.heightMax = "Max value must be less than 150 kg";
  if (input.heightMax < input.heightMin)
    errors.heightMax = "Max value must be higher than Min value";
  if (input.lifespan < "1")
    errors.lifespan = "The age must be a positive number ";
  if (input.lifespan > "80")
    errors.lifespan = "the value must be less than 80 years";

  return errors;
}

const defaultInput = {
  name: "",
  weightMin: 0,
  weightMax: 0,
  heightMin: 0,
  heightMax: 0,
  life_span: 0,
  image: "",
  temperaments: [],
};

export default function DogsCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState(defaultInput);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleSelectTemperaments(e) {
    setInput({
      ...input,
      temperaments: input.temperaments.includes(e.target.value)
        ? input.temperaments
        : [...input.temperaments, e.target.value],
    });
  }
  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postDog(input));
    alert("Perro Creado con Exito");
    setInput(defaultInput);
    history.push("/home");
  }

  function handleDelete(e) {
    e.preventDefault();
    setInput({
      ...input,
      temperaments: input.temperaments.filter((t) => t !== e.target.id),
    });
  }

  function isReadyForSubmission() {
    if (Object.keys(errors).length === 0 && input.temperaments.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="form-container">
      <div>
        <h1 className="logoNameForm">DoggyPedia</h1>
      </div>
      <div className="created-card">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="texto">Name</label>
            <input
              className="input-name"
              type="text"
              placeholder="name..."
              value={input.name}
              name="name"
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div>
            <label className="texto">Image</label>
            <input
              className="input-name"
              type="text"
              placeholder="url..."
              value={input.image}
              name="image"
              onChange={handleChange}
            />
            {errors.image && <p className="error">{errors.image}</p>}
          </div>
          <div>
            <label className="texto">Height Min </label>
            <input
              className="input-form"
              type="number"
              placeholder="height min ..."
              value={input.heightMin}
              name="heightMin"
              min="1"
              max="70"
              step={1}
              onChange={(e) => handleChange(e)}
            />
            {errors.heightMin && <p className="error">{errors.heightMin}</p>}
          </div>
          <div className="label">
            <label className="texto">Height Max </label>
            <input
              className="input-form"
              type="number"
              placeholder="height max..."
              value={input.heightMax}
              name="heightMax"
              min="1"
              max="100"
              step={1}
              onChange={handleChange}
            />
            {errors.heightMax && <p className="error">{errors.heightMax}</p>}
          </div>
          <div>
            <label className="texto">Weight Min </label>
            <input
              className="input-form"
              type="number"
              placeholder="weight min..."
              value={input.weightMin}
              name="weightMin"
              onChange={handleChange}
            />
            {errors.weightMin && <p className="error">{errors.weightMin}</p>}
          </div>
          <div>
            <label className="texto">Weight Max </label>
            <input
              className="input-form"
              type="number"
              placeholder="weight max..."
              value={input.weightMax}
              name="weightMax"
              onChange={handleChange}
            />
            {errors.weightMax && <p className="error">{errors.weightMax}</p>}
          </div>
          <div>
            <label className="lifeSpan">Life Span </label>
            <input
              className="input-form-lifeSpan"
              type="number"
              placeholder="life span..."
              value={input.life_span}
              name="life_span"
              onChange={handleChange}
            />
            {errors.life_span && <p className="error">{errors.life_span}</p>}
          </div>
          <div>
            <label className="temps-div">Temperaments </label>
            <select className="select-form" onChange={handleSelectTemperaments}>
              <option>Select Temperaments </option>
              {temperaments?.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
            {errors.temperaments && (
              <p className="error">{errors.temperaments}</p>
            )}
            <ul className="list">
              {input.temperaments.map((t) => (
                <li className="x-button" key={t}>
                  {t}
                  <button
                    className="button"
                    id={t}
                    type="button"
                    onClick={handleDelete}
                  >
                    X
                  </button>
                </li>
              ))}
              {errors.temperaments && (
                <p className="error">{errors.temperaments}</p>
              )}
            </ul>
            <div className="submit-form">
              <button className="submit-button" type="submit" disabled={!isReadyForSubmission()} >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="back-container">
        <Link to="/home">
          <button className="button-back">Back </button>
        </Link>
      </div>
    </div>
  );
}
