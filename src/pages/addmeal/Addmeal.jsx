import React, { useEffect } from "react";
import { useState } from "react";
import Igrendient from "../../components/ingredient/Igrendient.jsx";
import Header from "../../components/header/Header";
import "./Addmeal.scss";

const Addmeal = () => {
  //variables for inputs
  const [ingredientsList, setIngredientsList] = useState([]);
  const [biggerMealId, setBiggerMealId] = useState(0);
  const [name, setName] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const ingredientsListStored = JSON.parse(localStorage.getItem("ingredients"));
    const mealsStored = JSON.parse(localStorage.getItem("meals"));
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
    const newIngredients = ingredientsCopy.filter((ingredient) => ingredient !== name);
    setIngredients(newIngredients);
  };

  const handleAddMeal = async () => {
    const meal = {
      id: Number(biggerMealId) + 1,
      name,
      prepTime,
      ingredients,
      created: new Date(),
      lastDate: new Date(),
    };
    //go to local storage
    const mealsStored = JSON.parse(localStorage.getItem("meals"));
    if (!mealsStored) {
      localStorage.setItem("meals", JSON.stringify([meal]));
      console.log("meal added");
      //reset inputs
      setName("");
      setPrepTime("");
      setIngredients([]);
      return;
    }
    const newMeals = [...mealsStored, meal];
    localStorage.setItem("meals", JSON.stringify(newMeals));
    console.log("meal added");
    //reset inputs
    setName("");
    setPrepTime("");
    setIngredients([]);

    setBiggerMealId(Number(biggerMealId) + 1);
  };

  return (
    <>
      <Header title="Ajout d'un repas" />
      <button onClick={handleAddMeal}>Ajout repas</button>
      <div>Nom du repas</div>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        id="name"
        name="name"
        required
      />
      <div>Temps de préparation</div>
      <input onChange={(e) => setPrepTime(e.target.value)} type="number" required />
      <div>Ingrédients</div>
      <select
        name="ingredient-list"
        id="ingredient-list-select"
        onChange={(e) => handleAddIngredient(e.target.value)}
      >
        <option value="">--Choisissez vos ingrédients</option>
        {ingredientsList.map((ingredient) => (
          <option key={ingredient.id} value={ingredient.value}>
            {ingredient.name}
          </option>
        ))}
      </select>
      <div className="recap-ingredient-container">
        {ingredients.map((ingredient, index) => (
          <Igrendient
            key={index}
            ingredientName={ingredient}
            action={handleDeleteIngredient}
          />
        ))}
      </div>
    </>
  );
};

export default Addmeal;
