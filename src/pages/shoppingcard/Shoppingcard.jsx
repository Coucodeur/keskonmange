import "./Shoppingcard.scss";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Igrendient from "../../components/ingredient/Igrendient";

const Shoppingcard = () => {
    const [shoppingList, setShoppingList] = useState([]);
    const [ingredientsToShop, setIngredientsToShop] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        getStoredShoppingList();
    }, []);
    const getStoredShoppingList = () => {
        const storedShoppingList = JSON.parse(localStorage.getItem("shoppingList"));
        if (storedShoppingList && storedShoppingList.length > 0) {
            const ingredients = storedShoppingList.map((item) => item.ingredients);
            const flatIngredients = ingredients.flat();
            setIngredientsToShop(flatIngredients);
            setShoppingList(storedShoppingList);
            setIsEmpty(false);
        } else {
            setIsEmpty(true);
        }
    };

    const handleDeleteIngredientFromShoppingList = (name) => {
        const ingredientsToShopCopy = [...ingredientsToShop];
        const newIngredientsToShop = ingredientsToShopCopy.filter(
            (ingredient) => ingredient !== name
        );
        setIngredientsToShop(newIngredientsToShop);
    };

    const handleResetShoppingList = () => {
        localStorage.removeItem("shoppingList");
        setIngredientsToShop([]);
        setShoppingList([]);
        setIsEmpty(true);
    };

    return (
        <>
            <Header title="Liste des courses" />
            <div className="shoppingcart-page content">
                <h2>Liste des repas prévus:</h2>
                {isEmpty ? (
                    <div className="error-message">PANIER VIDE POUR LE MOMENT</div>
                ) : (
                    <div className="shoppingcart-container">
                        <button
                            className="reset-list-btn"
                            onClick={() => {
                                handleResetShoppingList();
                            }}
                        >
                            Effacer ma liste
                        </button>
                        <ul className="shoppingcart-list">
                            {shoppingList.map((item, index) => (
                                <div key={index} className="meal-to-shop">
                                    <h3>{item.mealName}</h3>
                                    <ul>
                                        {item.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </ul>
                        <div className="recap-all-ingredients-container">
                            <h2>Récapitulatif des ingrédients à acheter:</h2>
                            <ul className="recap-all-ingredients">
                                {ingredientsToShop.map((ingredient, index) => (
                                    <Igrendient
                                        key={index}
                                        ingredientName={ingredient}
                                        action={handleDeleteIngredientFromShoppingList}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Shoppingcard;
