import React from "react";
import { useState } from "react";
import Igrendient from "../../components/ingredient/Igrendient.jsx";
const Addmeal = () => {
  const [name, setName] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [prepTime, setPrepTime] = useState("");

  const handleAddIngredient = (e) => {
    e.preventDefault();
    console.log(ingredient);
    setIngredients([...ingredients, ingredient]);
    setIngredient("");
  };

  const handleAddMeal = async () => {
    const meal = {
      name,
      prepTime,
      ingredients,
      created: new Date(),
      lastDate: new Date(),
    };
    console.log(meal);
  };

  return (
    <>
      <h1>Ajouter un repas</h1>
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
      <form>
        <input
          type="text"
          onChange={(e) => setIngredient(e.target.value)}
          value={ingredient}
          required
        ></input>
        <button onClick={(e) => handleAddIngredient(e)}>Ajouter ingredient</button>
      </form>
      <ul>
        {ingredients.map((ingredient, index) => (
          <Igrendient key={index} ingredientName={ingredient} />
        ))}
      </ul>
    </>
  );
};

export default Addmeal;
