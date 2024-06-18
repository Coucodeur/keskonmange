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
  return (
    <>
      <Header title="Liste des repas" />
      <div className="meal-list-container content">
        {meals.map((meal) => (
          <Meal
            key={meal.id}
            id={meal.id}
            name={meal.name}
            prepTime={meal.prepTime}
            ingredients={meal.ingredients}
            lastPrep={meal.lastDate}
          />
        ))}
      </div>
    </>
  );
};

export default Meallist;
