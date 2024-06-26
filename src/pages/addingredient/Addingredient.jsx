import { useState, useEffect } from 'react';
import Igrendient from '../../components/ingredient/Igrendient';
import Header from '../../components/header/Header';
import './Addingredient.scss';

const Addingredient = () => {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [biggerID, setBiggerID] = useState('');
  const [newIngredientName, setNewIngredientName] = useState('');

  //chargement des ingredients au montage du composant
  useEffect(() => {
    getIngredientsList();
  }, []);

  const getIngredientsList = () => {
    const ingredientsListStored = JSON.parse(
      localStorage.getItem('ingredients')
    );
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
      console.log('no ingredients');
    }
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    const newIngredient = {
      id: Number(biggerID) + 1,
      name:
        newIngredientName.charAt(0).toUpperCase() + newIngredientName.slice(1),
      addDate: Date.now(),
    };
    const ingredientsListCopy = [...ingredientsList];
    const newIngredientsList = [...ingredientsListCopy, newIngredient];
    //reset newIngredient
    setNewIngredientName('');
    //to local storage
    localStorage.setItem('ingredients', JSON.stringify(newIngredientsList));
    //to state
    getIngredientsList();
  };

  const handleDeleteIngredient = (id) => {
    const ingredientsListCopy = [...ingredientsList];
    const newIngredientsList = ingredientsListCopy.filter(
      (ingredient) => ingredient.id !== id
    );
    //to local storage
    localStorage.setItem('ingredients', JSON.stringify(newIngredientsList));
    //to state
    getIngredientsList();
  };

  return (
    <>
      <Header title="Ingrédients" />
      <div className="add-ingredient-page content">
        <h2>Entrez un nouvel ingredient favoris</h2>
        <form onSubmit={(e) => handleAddIngredient(e)}>
          <input
            type="text"
            name="ingredient-adder-input"
            onChange={(e) => setNewIngredientName(e.target.value)}
            value={newIngredientName}
            required
          ></input>
          <button type="submit">Ajouter ingrédient</button>
        </form>
        {/* ingredients list */}
        <div className="ingredient-container">
          {ingredientsList
            .sort((a, b) => b.addDate - a.addDate)
            .map((ingredient) => (
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
