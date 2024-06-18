import React, { useEffect } from "react";
import { useState } from "react";
import Igrendient from "../../components/ingredient/Igrendient";
import Header from "../../components/header/Header";
import "./Addingredient.scss";

const Addingredient = () => {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [biggerID, setBiggerID] = useState("");

  //chargement des ingredients au montage du composant
  useEffect(() => {
    getIngredientsList();
  }, []);

  const getIngredientsList = () => {
    const ingredientsListStored = JSON.parse(localStorage.getItem("ingredients"));
    if (ingredientsListStored) {
      setIngredientsList(ingredientsListStored);
      //get the bigger id
      let biggerID = 0;
      ingredientsListStored.forEach((ingredient) => {
        if (ingredient.id > biggerID) {
          biggerID = ingredient.id;
        }
      });
      setBiggerID(biggerID);
    } else {
      console.log("no ingredients");
    }
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    const newIngredient = {
      id: Number(biggerID) + 1,
      name: e.target[0].value,
    };
    const ingredientsListCopy = [...ingredientsList];
    const newIngredientsList = [...ingredientsListCopy, newIngredient];
    //to local storage
    localStorage.setItem("ingredients", JSON.stringify(newIngredientsList));
    //to state
    getIngredientsList();
  };

  const handleDeleteIngredient = (id) => {
    const ingredientsListCopy = [...ingredientsList];
    const newIngredientsList = ingredientsListCopy.filter(
      (ingredient) => ingredient.id !== id
    );
    //to local storage
    localStorage.setItem("ingredients", JSON.stringify(newIngredientsList));
    //to state
    getIngredientsList();
  };

  return (
    <>
      <Header title="Ingrédients" />
      <div className="content">
        <form onSubmit={(e) => handleAddIngredient(e)}>
          <input type="text" required></input>
          <button type="submit">Ajouter ingrédient</button>
        </form>
        {/* ingredients list */}
        <div className="ingredient-container">
          {ingredientsList.map((ingredient) => (
            <Igrendient
              key={ingredient.id}
              id={ingredient.id}
              ingredientName={ingredient.name}
              action={handleDeleteIngredient}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Addingredient;
