import './nav.scss';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar">
      <NavLink to={'/'} className="navLink">
        Liste repas
      </NavLink>
      <NavLink to={'/addmeal'} className="navLink">
        Ajout repas
      </NavLink>
      <NavLink to={'/ingredients'} className="navLink">
        Ingredients
      </NavLink>
    </nav>
  );
};

export default Nav;
