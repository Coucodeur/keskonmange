import React from "react";
import "./mealCard.scss";

const MealCard = ({ name, preptime, ingredients }) => {
  return (
    <div className="meal-card">
      <h3>{name}</h3>
      <p>Temps de préparation: {preptime} minutes</p>
      <ul>
        {ingredients.map((ingredient, index) => {
          return <li key={index}>{ingredient}</li>;
        })}
      </ul>
    </div>
  );
};

export default MealCard;
