import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import TitlePage from "./pages/TitlePage";
import RegisterPage from "./pages/RegisterPage";
import StoragePage from "./pages/StoragePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/DietPage";
import RecipesPage from "./pages/RecipesPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TitlePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/users/:id/ingredients" element={<StoragePage />} />
            <Route path="/users/:id/diet" element={<ProfilePage />} />
            <Route path="/users/:id/recipes" element={<RecipesPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
