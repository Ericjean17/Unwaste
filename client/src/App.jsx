import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TitlePage from "./pages/TitlePage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TitlePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
