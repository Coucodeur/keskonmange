import React, { useEffect, useState } from "react";
import "./Mealdetail.scss";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Ingredient from "../../components/ingredient/Igrendient";

const Mealdetail = () => {
    const { id } = useParams();
    const [mealName, setMealName] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [mealPrepTime, setMealPrepTime] = useState(0);
    const [mealRecette, setMealRecette] = useState("");
    const [mealCreated, setMealCreated] = useState("");
    const [mealLastDate, setMealLastDate] = useState("");

    const formatedCreated = new Date(mealCreated).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const formatedLastDate = new Date(mealLastDate).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
    });

    useEffect(() => {
        getMealDAta(id);
    }, []);

    const getMealDAta = (id) => {
        const mealsListStored = JSON.parse(localStorage.getItem("meals"));
        const meal = mealsListStored.find((meal) => meal.id == id);
        setMealName(meal.name);
        setIngredients(meal.ingredients);
        setMealPrepTime(meal.prepTime);
        setMealRecette(meal.recette);
        setMealCreated(meal.created);
        setMealLastDate(meal.lastDate);
    };

    const handleDeleteIngredient = (name) => {
        const ingredientsCopy = [...ingredients];
        const newIngredients = ingredientsCopy.filter(
            (ingredient) => ingredient !== name
        );
        setIngredients(newIngredients);
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
        const mealsListStored = JSON.parse(localStorage.getItem("meals"));
        const updatedMealsList = mealsListStored.map((meal) => {
            if (meal.id == id) {
                return upDatedRecette;
            } else {
                return meal;
            }
        });
        localStorage.setItem("meals", JSON.stringify(updatedMealsList));
        //redirection vers la page d'accueil
        window.location.href = "/";
    };

    return (
        <>
            <Header title="Détail du repas" />
            <div className="meal-detail-page content">
                <div className="recap-container-detail-page">
                    <h2 className="meal-name">{mealName}</h2>
                    <p>Date de création : {formatedCreated}</p>
                    <p>Dernière dégustation : {formatedLastDate}</p>
                    <p>Temps de préparation : {mealPrepTime} minutes</p>
                </div>
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
                <button onClick={handleUpdateRecette}>
                    Mettre à jour et retourner au menu
                </button>
            </div>
        </>
    );
};

export default Mealdetail;
