import './ingredient.scss';
import { useState } from 'react';
import deleteIcon from '../../assets/delete-1487-svgrepo-com.svg';

const Igrendient = ({ id, ingredientName, action }) => {
  return (
    <div className="ingredient">
      {id ? (
        <img
          src={deleteIcon}
          className="ingredient-cta"
          onClick={() => action(id)}
        />
      ) : (
        <img
          src={deleteIcon}
          className="ingredient-cta"
          onClick={() => action(ingredientName)}
        />
      )}

      <p>{ingredientName}</p>
    </div>
  );
};

export default Igrendient;
