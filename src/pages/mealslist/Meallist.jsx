import React, { useEffect } from 'react';
import { useState } from 'react';
import Mealcard from '../../components/mealcard/Mealcard';
import Header from '../../components/header/Header';
import './meallist.scss';

const Meallist = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getMealsList();
  }, []);

  const getMealsList = () => {
    const mealsListStored = JSON.parse(localStorage.getItem('meals'));
    if (mealsListStored) {
      setMeals(mealsListStored);
    } else {
      console.log('no meals');
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
    localStorage.setItem('meals', JSON.stringify(newMealsUpdated));
    setMeals(newMealsUpdated);
  };

  const deleteMeal = (id) => {
    const mealsCopy = [...meals];
    const newMeals = mealsCopy.filter((meal) => meal.id !== id);
    localStorage.setItem('meals', JSON.stringify(newMeals));
    setMeals(newMeals);
  };

  return (
    <>
      <Header title="Liste des repas" />
      <div className="meal-list-container content">
        {meals
          .sort((a, b) => b.lastDate - a.lastDate)
          .map((meal, index) => (
            <Mealcard
              key={index}
              id={meal.id}
              name={meal.name}
              prepTime={meal.prepTime}
              ingredients={meal.ingredients}
              lastPrep={meal.lastDate}
              action={updateLastPrep}
              deleteMeal={deleteMeal}
            />
          ))}
      </div>
    </>
  );
};

export default Meallist;
