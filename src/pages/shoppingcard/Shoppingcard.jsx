import './Shoppingcard.scss';
import { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Igrendient from '../../components/ingredient/Igrendient';

const Shoppingcard = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  useEffect(() => {
    getStoredSelectedIngredients();
  }, []);
  const getStoredSelectedIngredients = () => {
    const selectedIngredients = JSON.parse(
      localStorage.getItem('shoppingList')
    );
    if (selectedIngredients && selectedIngredients.length > 0) {
      setSelectedIngredients(selectedIngredients);
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  };

  const handleDeleteIngredientFromShoppingList = (name) => {
    const selectedIngredientsCopy = [...selectedIngredients];
    const newSelectedIngredients = selectedIngredientsCopy.filter(
      (ingredient) => ingredient !== name
    );
    localStorage.setItem(
      'shoppingList',
      JSON.stringify(newSelectedIngredients)
    );
    setSelectedIngredients(newSelectedIngredients);
    getStoredSelectedIngredients();
  };

  return (
    <>
      <Header title="Liste des courses" />
      <div className="shoppingcart-page content">
        <h2>Liste des courses:</h2>
        {isEmpty ? (
          <div className="error-message">PANIER VIDE POUR LE MOMENT</div>
        ) : (
          <div className="shoppingcart-container">
            <ul className="shoppingcart-list">
              {selectedIngredients.map((ingredient, index) => (
                <Igrendient
                  className="shoppingcart-ingredient"
                  key={index}
                  ingredientName={ingredient}
                  action={handleDeleteIngredientFromShoppingList}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Shoppingcard;
