import React from "react";
import "./meal.scss";

const Meal = ({ id, name, prepTime, ingredients, lastPrep }) => {
  let formatedName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div className="meal-card">
      <h2>{formatedName}</h2>
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
    </div>
  );
};

export default Meal;
