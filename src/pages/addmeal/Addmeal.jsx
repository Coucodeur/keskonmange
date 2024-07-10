import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseIngredients } from '../../data/base_ingredients/baseIngredients';
import Igrendient from '../../components/ingredient/Igrendient.jsx';
import Header from '../../components/header/Header';
import './Addmeal.scss';

const Addmeal = () => {
  const navigate = useNavigate();
  //variables for inputs
  const [ingredientsList, setIngredientsList] = useState([]);
  const [biggerMealId, setBiggerMealId] = useState(0);
  const [name, setName] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [newIngredientName, setNewIngredientName] = useState('');
  const [recette, setRecette] = useState('');
  const [isWritting, setIsWritting] = useState(false);
  // gestion des erreurs
  const [nameError, setNameError] = useState(false);
  const [preptimeError, setpreptimeError] = useState(false);

  useEffect(() => {
    const ingredientsListStored = JSON.parse(
      localStorage.getItem('ingredients')
    );
    if (!ingredientsListStored) {
      localStorage.setItem('ingredients', JSON.stringify(baseIngredients));
      setIngredientsList(baseIngredients);
    }
    const mealsStored = JSON.parse(localStorage.getItem('meals'));
    if (mealsStored) {
      let biggerID = 0;
      mealsStored.forEach((meal) => {
        if (meal.id > biggerID) {
          biggerID = meal.id;
        }
      });
      setBiggerMealId(biggerID);
    }
    setIngredientsList(ingredientsListStored);
  }, []);

  const handleAddIngredient = (value) => {
    const ingredientsCopy = [...ingredients];
    const newIngredients = [...ingredientsCopy, value];
    setIngredients(newIngredients);
  };

  const handleDeleteIngredient = (name) => {
    const ingredientsCopy = [...ingredients];
    const newIngredients = ingredientsCopy.filter(
      (ingredient) => ingredient !== name
    );
    setIngredients(newIngredients);
  };

  const handleAddIngredientName = (e) => {
    e.preventDefault();
    const ingredientsCopy = [...ingredients];
    const newIngredients = [...ingredientsCopy, newIngredientName];
    setIngredients(newIngredients);
    setNewIngredientName('');
  };

  const handleAddMeal = async () => {
    //check if inputs are empty
    if (!name && !prepTime) {
      setNameError(true);
      setpreptimeError(true);
      return;
    } else if (!name) {
      setNameError(true);
      return;
    } else if (!prepTime) {
      setpreptimeError(true);
      return;
    } else {
      //create meal object
      const meal = {
        id: Number(biggerMealId) + 1,
        name,
        prepTime,
        ingredients,
        recette,
        created: Date.now(),
        lastDate: Date.now(),
      };
      //go to local storage for meals
      const mealsStored = JSON.parse(localStorage.getItem('meals'));
      if (!mealsStored) {
        localStorage.setItem('meals', JSON.stringify([meal]));
        //reset inputs
        navigate('/');
        return;
      }
      //add meal to meals
      const newMeals = [...mealsStored, meal];
      localStorage.setItem('meals', JSON.stringify(newMeals));
      // return to home
      navigate('/');
    }
  };

  return (
    <>
      <Header title="Ajout d'un repas" />
      <div className="content addmeal-page">
        <h2>Entrez les informations du repas</h2>
        <div className="input-section">
          <div>Nom du repas</div>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name-input"
            required
          />
          <br />
          {nameError ? (
            <p className="error-message">* Le nom du repas est requis *</p>
          ) : null}
        </div>
        <div className="input-section">
          <div>Temps de préparation (minutes)</div>
          <input
            onChange={(e) => setPrepTime(e.target.value)}
            type="number"
            name="prep-time-input"
            required
          />
          <br />

          {preptimeError ? (
            <div className="error-message">
              * Le temps de préparation est requis *
            </div>
          ) : null}
        </div>

        <div className="ingrendient-input-container">
          <div>
            <div>Ajouter un ingrédient favoris</div>
            <select
              className="ingredient-list-select"
              name="ingredient-list"
              id="ingredient-list-select"
              onChange={(e) => handleAddIngredient(e.target.value)}
            >
              <option value="">--Choisissez vos ingrédients</option>
              {ingredientsList
                ? ingredientsList
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((ingredient) => (
                      <option
                        key={ingredient.id}
                        value={ingredient.value}
                        name={ingredient.name}
                        className="ingredient-list-option"
                      >
                        {ingredient.name}
                      </option>
                    ))
                : null}
            </select>
          </div>
          <form
            className="input-section"
            onSubmit={(e) => handleAddIngredientName(e)}
            name="ingredient-adder-form"
          >
            <div>Ajouter ingredient à la volée</div>
            <input
              value={newIngredientName}
              onChange={(e) => setNewIngredientName(e.target.value)}
              type="text"
              name="ingredient-name-input"
              required
            />
            <input
              type="submit"
              className="addIngredientOnFly"
              value="Ajouter"
            />
          </form>
        </div>
        <div className="action-container">
          <div className="actions">
            <button
              style={{ backgroundColor: isWritting ? '' : '#ff7979' }}
              onClick={() => setIsWritting(false)}
            >
              Ingredients
            </button>
            <button
              style={{ backgroundColor: isWritting ? '#ff7979' : '' }}
              onClick={() => setIsWritting(true)}
            >
              Recette
            </button>
          </div>
          <button className="cta" onClick={handleAddMeal}>
            Ajout repas et retourner à la liste
          </button>
        </div>
        {isWritting ? (
          <div className="recap-recette-container">
            <h3>Recette</h3>
            <textarea
              autoFocus={true}
              className="recette-input"
              value={recette}
              onChange={(e) => setRecette(e.target.value)}
              name="recette-text-area"
            ></textarea>
          </div>
        ) : (
          <div>
            <h3>Ingrédients</h3>
            <div className="recap-ingredient-container">
              {ingredients.map((ingredient, index) => (
                <Igrendient
                  key={index}
                  ingredientName={ingredient}
                  action={handleDeleteIngredient}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Addmeal;
