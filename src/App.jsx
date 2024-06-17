import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Nav from "./components/nav/Nav.jsx";
import Meallist from "./pages/mealslist/Meallist.jsx";
import Addmeal from "./pages/addmeal/Addmeal.jsx";

function App() {
  return (
    <div className="app">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Meallist />} />
          {/* <Route path="/meal/:id" element={< />} /> */}
          <Route path="/addmeal" element={<Addmeal />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
