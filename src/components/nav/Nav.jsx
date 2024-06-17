import "./nav.scss";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="navbar">
      <NavLink to={"/"} className="navLink">
        Meal list
      </NavLink>
      <NavLink to={"/addmeal"} className="navLink">
        Add meal
      </NavLink>
    </div>
  );
};

export default Nav;
