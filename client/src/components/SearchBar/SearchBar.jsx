import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../../actions";
import "./SearchBarStyles.css"



export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(""); // Estado local para almacenar el valor del input

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value); // Actualiza el estado local con el valor del input
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogs(name)); // Llama a la acción getDogs y pasa el valor del estado local 'name' como argumento
    setCurrentPage(1);
  }

  return (
    <div className="group">
      <input
        className="input"
        type="search"
        placeholder="   Search Dog ..."
        onChange={(e) => handleInputChange(e)}
        value={name}
      />
      <button
        className="searching"
        type="search"
        onClick={(e) => handleSubmit(e)}
      >
        <span className="nameS">SEARCH</span>
      </button>
    </div>
  );
}
