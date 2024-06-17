import "./ingredient.scss";
import { useState } from "react";

const Igrendient = ({ ingredientName }) => {
  return (
    <li>
      <p>{ingredientName}</p> <span>-</span>
    </li>
  );
};

export default Igrendient;
