import React from "react";
import { Link } from "react-router-dom";
import "./meal.scss";
import editIcon from "../../assets/edit-button-svgrepo-com.svg";

const Meal = ({ id, name, prepTime, ingredients, lastPrep }) => {
  let formatedName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="meal-card">
      <h2>{formatedName}</h2>
      <Link to={`/meal/${id}`}>
        <img src={editIcon} className="edit-icon" alt="edit-icon" />
      </Link>
      <p>Temps de préparation : {prepTime} minutes</p>
      <div className="ingredient-container-mealcard">
        <h3>Ingrédients :</h3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <p>Dernière préparation : {lastPrep}</p>
      <button className="cta">MIAM</button>
    </div>
  );
};

export default Meal;
