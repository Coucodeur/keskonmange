import "./ShoppingCartNavLink.scss";
import { NavLink } from "react-router-dom";
import shoppingCart from "../../assets/shopping_cart.svg";
import { useEffect, useState } from "react";

const ShoppingCartNavLink = () => {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        getStoredMeals();
    }, [localStorage.getItem("shoppingList")]);

    const getStoredMeals = () => {
        const storedMeals = JSON.parse(localStorage.getItem("shoppingList"));
        if (storedMeals) {
            setMeals(storedMeals);
        }
    };

    if (!meals || meals.length === 0 || meals === null) {
        console.log("ya R");
        return (
            <NavLink to={"/shoppingcart"} className="navLink">
                <div>
                    <img
                        src={shoppingCart}
                        className="nav-icon"
                        alt="shopping-card-page-icon"
                    />
                </div>
            </NavLink>
        );
    } else {
        return (
            <NavLink to={"/shoppingcart"} className="navLink">
                <div>
                    <img
                        src={shoppingCart}
                        className="nav-icon"
                        alt="shopping-card-page-icon"
                    />
                    <div className="pastilleDeNombre">{meals.length}</div>
                </div>
            </NavLink>
        );
    }
};

export default ShoppingCartNavLink;
