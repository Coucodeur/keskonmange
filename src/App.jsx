import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/nav/Nav.jsx";
import Meallist from "./pages/mealslist/Meallist.jsx";
import Addmeal from "./pages/addmeal/Addmeal.jsx";
import Addingredient from "./pages/addingredient/Addingredient.jsx";

function App() {
  return (
    <div className="app">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Meallist />} />
          {/* <Route path="/meal/:id" element={< />} /> */}
          <Route path="/addmeal" element={<Addmeal />} />
          <Route path="/ingredients" element={<Addingredient />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
