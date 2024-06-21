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
    const [newIngredientName, setNewIngredientName] = useState("");
    const [recette, setRecette] = useState("");
    const [isWritting, setIsWritting] = useState(false);

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
        setNewIngredientName("");
    };

    const handleAddMeal = async () => {
        const meal = {
            id: Number(biggerMealId) + 1,
            name,
            prepTime,
            ingredients,
            recette,
            created: Date.now(),
            lastDate: Date.now(),
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
            <div className="content addmeal-page">
                <h2>Entrez les informations du repas</h2>
                <div>Nom du repas</div>
                <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="name"
                    name="name"
                    required
                />
                <div>Temps de préparation</div>
                <input
                    onChange={(e) => setPrepTime(e.target.value)}
                    type="number"
                    required
                />
                <form onSubmit={(e) => handleAddIngredientName(e)}>
                    <div>Ajouter ingredients</div>
                    <input
                        value={newIngredientName}
                        onChange={(e) => setNewIngredientName(e.target.value)}
                        type="text"
                    />
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
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((ingredient) => (
                            <option key={ingredient.id} value={ingredient.value}>
                                {ingredient.name}
                            </option>
                        ))}
                </select>
                <div className="action-container">
                    <div className="actions">
                        <button onClick={() => setIsWritting(false)}>
                            Voir ingredients
                        </button>
                        <button onClick={() => setIsWritting(true)}>
                            Editer recette
                        </button>
                    </div>
                    <button onClick={handleAddMeal}>Ajout repas</button>
                </div>
                {isWritting ? (
                    <div className="recap-recette-container">
                        <h3>Recette</h3>
                        <textarea
                            className="recette-input"
                            value={recette}
                            onChange={(e) => setRecette(e.target.value)}
                        ></textarea>
                    </div>
                ) : (
                    <div className="recap-ingredient-container">
                        <h3>Liste des ingrédients</h3>
                        {ingredients.map((ingredient, index) => (
                            <Igrendient
                                key={index}
                                ingredientName={ingredient}
                                action={handleDeleteIngredient}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Addmeal;
