import { Link } from "react-router-dom";
import "./Mealcard.scss";
import deleteIcon from "../../assets/delete-1487-svgrepo-com.svg";

const Mealcard = ({ id, name, prepTime, ingredients, lastPrep, action, deleteMeal }) => {
    const formatedName = name.charAt(0).toUpperCase() + name.slice(1);
    const formatedDate = new Date(lastPrep).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
    });

    const handleAddToShoppingCard = (mealName, ingredients) => {
        const newShopItem = [
            {
                mealName,
                ingredients,
            },
        ];
        console.log(newShopItem);
        const shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
        if (!shoppingList) {
            localStorage.setItem("shoppingList", JSON.stringify([...newShopItem]));
            return;
        }
        const newShoppingList = [...shoppingList, ...newShopItem];
        localStorage.setItem("shoppingList", JSON.stringify(newShoppingList));
    };

    const numberOfDaysCalculator = (lastPrep) => {
        const today = new Date();
        const lastPrepDate = new Date(lastPrep);
        const timeDifference = today.getTime() - lastPrepDate.getTime();
        return Math.floor(timeDifference / (1000 * 3600 * 24));
    };

    const numberOfDays = numberOfDaysCalculator(lastPrep);

    return (
        <div className="meal-card">
            <h2>{formatedName}</h2>
            <div className="meal-icon-container">
                <img
                    src={deleteIcon}
                    alt="delete-icon"
                    className="cta-icon cta-delete"
                    onClick={() => deleteMeal(id)}
                />
            </div>
            <div className="last-prep-container">
                <p>Dernière préparation :</p>
                <p className="nbOfDays">{numberOfDays} jour(s)</p>
            </div>
            <div className="last-prep-container">
                <p>Temps de préparation :</p>
                <p>{prepTime} minutes</p>
            </div>
            <div className="ingredient-container-mealcard">
                <h3>Ingrédients :</h3>
                <ul className="meallist-ingredient-container">
                    {ingredients.map(
                        (ingredient, index) =>
                            index < 5 && (
                                <li key={index}>
                                    <span>{index + 1} - </span>
                                    {ingredient}
                                </li>
                            )
                    )}
                </ul>
            </div>

            <Link className="cta-details" to={`/meal/${id}`}>
                Modifier - Consulter
            </Link>
            <button
                className="cta-details"
                onClick={() => handleAddToShoppingCard(name, ingredients)}
            >
                Ajouter les ingredients à la liste de courses
            </button>
            <button className="cta-miam" onClick={() => action(id)}>
                MIAM
            </button>
        </div>
    );
};

export default Mealcard;
