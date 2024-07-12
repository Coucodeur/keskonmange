import './nav.scss';
import { NavLink } from 'react-router-dom';
import addMealIcon from '../../assets/add_new_meal.svg';
import menuPageIcon from '../../assets/meal_page.svg';
import shoppingCart from '../../assets/shopping_cart.svg';
import ingrendientPageIcon from '../../assets/ingredient_list_icon.svg';
const Nav = () => {
  return (
    <nav className="navbar">
      <NavLink to={'/'} className="navLink">
        <img src={menuPageIcon} className="nav-icon" alt="menu-page-icon" />
      </NavLink>
      <NavLink to={'/addmeal'} className="navLink">
        <img src={addMealIcon} className="nav-icon" alt="addmeal-page-icon" />
      </NavLink>
      <NavLink to={'/ingredients'} className="navLink">
        <img
          src={ingrendientPageIcon}
          className="nav-icon"
          alt="ingredeint-page-icon"
        />
      </NavLink>
      <NavLink to={'/shoppingcart'} className="navLink">
        <img
          src={shoppingCart}
          className="nav-icon"
          alt="shopping-card-page-icon"
        />
      </NavLink>
    </nav>
  );
};

export default Nav;
