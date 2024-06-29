import React from 'react';
import { Link } from 'react-router-dom';
import './Mealcard.scss';
import editIcon from '../../assets/edit-button-svgrepo-com.svg';
import deleteIcon from '../../assets/delete-1487-svgrepo-com.svg';

const Mealcard = ({
  id,
  name,
  prepTime,
  ingredients,
  lastPrep,
  action,
  deleteMeal,
}) => {
  const formatedName = name.charAt(0).toUpperCase() + name.slice(1);
  const formatedDate = new Date(lastPrep).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
  });

  return (
    <div className="meal-card">
      <h2>{formatedName}</h2>
      <div className="meal-icon-container">
        <Link to={`/meal/${id}`}>
          <img src={editIcon} className="cta-icon" alt="edit-icon" />
        </Link>
        <img
          src={deleteIcon}
          alt="delete-icon"
          className="cta-icon cta-delete"
          onClick={() => deleteMeal(id)}
        />
      </div>
      <p>Temps de préparation : {prepTime} minutes</p>
      <div className="ingredient-container-mealcard">
        <h3>Ingrédients :</h3>
        <ul className="meallist-ingredient-container">
          {ingredients.map(
            (ingredient, index) => (
              // index < 5 && (
              <li key={index}>
                <span>{index + 1} - </span>
                {ingredient}
              </li>
            )
            // )
          )}
        </ul>
      </div>
      <div className="last-prep-container">
        <p>Dernière préparation le :</p>
        <p>{formatedDate}</p>
      </div>
      <button className="cta-miam" onClick={() => action(id)}>
        MIAM
      </button>
    </div>
  );
};

export default Mealcard;
