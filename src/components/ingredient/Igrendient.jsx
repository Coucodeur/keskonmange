import "./ingredient.scss";
import { useState } from "react";

const Igrendient = ({ id, ingredientName, action }) => {
  return (
    <div className="ingredient">
      {id ? (
        <button onClick={() => action(id)}>x</button>
      ) : (
        <button onClick={() => action(ingredientName)}>-</button>
      )}

      <p>{ingredientName}</p>
    </div>
  );
};

export default Igrendient;
