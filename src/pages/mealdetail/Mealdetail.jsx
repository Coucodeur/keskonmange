import React, { useEffect, useState } from 'react';
import './Mealdetail.scss';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import Ingredient from '../../components/ingredient/Igrendient';

const Mealdetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mealName, setMealName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [mealPrepTime, setMealPrepTime] = useState(0);
  const [mealRecette, setMealRecette] = useState('');
  const [mealCreated, setMealCreated] = useState('');
  const [mealLastDate, setMealLastDate] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);

  const formatedCreated = new Date(mealCreated).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formatedLastDate = new Date(mealLastDate).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
  });

  useEffect(() => {
    getMealDAta(id);
    getStoredIngredients();
  }, []);

  const getMealDAta = (id) => {
    const mealsListStored = JSON.parse(localStorage.getItem('meals'));
    const meal = mealsListStored.find((meal) => meal.id == id);
    setMealName(meal.name);
    setIngredients(meal.ingredients);
    setMealPrepTime(meal.prepTime);
    setMealRecette(meal.recette);
    setMealCreated(meal.created);
    setMealLastDate(meal.lastDate);
  };
  const getStoredIngredients = () => {
    const ingredientsListStored = JSON.parse(
      localStorage.getItem('ingredients')
    );
    setIngredientsList(ingredientsListStored);
  };

  const handleDeleteIngredient = (name) => {
    const ingredientsCopy = [...ingredients];
    const newIngredients = ingredientsCopy.filter(
      (ingredient) => ingredient !== name
    );
    setIngredients(newIngredients);
  };

  //ajout d'un ingredient
  const handleAddIngredient = (value) => {
    const ingredientsCopy = [...ingredients];
    const newIngredients = [...ingredientsCopy, value];
    setIngredients(newIngredients);
  };
  const handleAddIngredientName = (e) => {
    e.preventDefault();
    handleAddIngredient(e.target[0].value);
    e.target[0].value = '';
  };

  const handleUpdateRecette = () => {
    const upDatedRecette = {
      id: id,
      name: mealName,
      ingredients: ingredients,
      prepTime: mealPrepTime,
      recette: mealRecette,
      created: mealCreated,
      lastDate: mealLastDate,
    };
    const mealsListStored = JSON.parse(localStorage.getItem('meals'));
    const updatedMealsList = mealsListStored.map((meal) => {
      if (meal.id == id) {
        return upDatedRecette;
      } else {
        return meal;
      }
    });
    localStorage.setItem('meals', JSON.stringify(updatedMealsList));
    //redirection vers la page d'accueil
    navigate('/');
  };

  return (
    <>
      <Header title="Détail du repas" />
      <div className="meal-detail-page content">
        <button className="cta" onClick={handleUpdateRecette}>
          Mettre à jour et retourner au menu
        </button>
        <div className="recap-container-detail-page">
          <h2 className="meal-name">{mealName}</h2>
          <p>Date de création : {formatedCreated}</p>
          <p>Dernière dégustation : {formatedLastDate}</p>
          <p>Temps de préparation : {mealPrepTime} minutes</p>
        </div>
        <div className="ingredient-gest-container">
          <form onSubmit={(e) => handleAddIngredientName(e)}>
            <div>Ajouter ingredients</div>
            <input required type="text" name="add-ingredient-name-input" />
            <input type="submit" value="Ajouter" />
          </form>
          <div>Ajouter un ingrédients favoris</div>
          <select
            name="ingredient-list"
            id="ingredient-list-select"
            onChange={(e) => handleAddIngredient(e.target.value)}
          >
            <option value="">--Choisissez vos ingrédients</option>
            {ingredientsList
              ? ingredientsList
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((ingredient) => (
                    <option key={ingredient.id} value={ingredient.value}>
                      {ingredient.name}
                    </option>
                  ))
              : null}
          </select>
        </div>
        {/* afficahge des ingredients */}
        <div className="ingredient-container-detail-page">
          <h3>Ingrédients</h3>
          <div className="ingredient-list-detail-page">
            {ingredients.map((ingredient, index) => (
              <Ingredient
                key={index}
                ingredientName={ingredient}
                action={handleDeleteIngredient}
              />
            ))}
          </div>
        </div>
        {/* afficahge de la recette */}
        <div className="recette-container-detail-page">
          <h3>Recette</h3>
          <textarea
            name="recette"
            id="recette"
            className="recette-input"
            value={mealRecette}
            onChange={(e) => setMealRecette(e.target.value)}
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default Mealdetail;
