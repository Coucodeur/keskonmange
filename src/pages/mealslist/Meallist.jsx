import React, { useEffect } from "react";
import { useState } from "react";
import Meal from "../meal/Meal";
import Header from "../../components/header/Header";
import "./meallist.scss";

const Meallist = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        getMealsList();
    }, []);

    const getMealsList = () => {
        const mealsListStored = JSON.parse(localStorage.getItem("meals"));
        if (mealsListStored) {
            setMeals(mealsListStored);
        } else {
            console.log("no meals");
        }
    };

    const updateLastPrep = (id) => {
        const mealsCopy = [...meals];
        const newMealsUpdated = mealsCopy.map((meal) => {
            if (meal.id === id) {
                meal.lastDate = Date.now();
            }
            return meal;
        });
        localStorage.setItem("meals", JSON.stringify(newMealsUpdated));
        setMeals(newMealsUpdated);
    };

    return (
        <>
            <Header title="Liste des repas" />
            <div className="meal-list-container content">
                {meals
                    .sort((a, b) => b.lastDate - a.lastDate)
                    .map((meal) => (
                        <Meal
                            key={meal.id}
                            id={meal.id}
                            name={meal.name}
                            prepTime={meal.prepTime}
                            ingredients={meal.ingredients}
                            lastPrep={meal.lastDate}
                            action={updateLastPrep}
                        />
                    ))}
            </div>
        </>
    );
};

export default Meallist;
