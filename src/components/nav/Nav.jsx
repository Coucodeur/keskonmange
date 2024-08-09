import "./nav.scss";
import { NavLink } from "react-router-dom";
import addMealIcon from "../../assets/add_new_meal.svg";
import menuPageIcon from "../../assets/meal_page.svg";
import ingrendientPageIcon from "../../assets/ingredient_list_icon.svg";
import ShoppingCartNavLink from "../shoppingCartNavLink/ShoppingCartNavLink";

const Nav = () => {
    return (
        <nav className="navbar">
            <NavLink to={"/"} className="navLink">
                <img src={menuPageIcon} className="nav-icon" alt="menu-page-icon" />
            </NavLink>

            <NavLink to={"/addmeal"} className="navLink">
                <img src={addMealIcon} className="nav-icon" alt="addmeal-page-icon" />
            </NavLink>

            <NavLink to={"/ingredients"} className="navLink">
                <img
                    src={ingrendientPageIcon}
                    className="nav-icon"
                    alt="ingredeint-page-icon"
                />
            </NavLink>

            <NavLink to={"/courses"} className="navLink">
                Courses
            </NavLink>

            <ShoppingCartNavLink />
        </nav>
    );
};

export default Nav;
