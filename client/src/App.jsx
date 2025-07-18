import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TitlePage from "./pages/TitlePage";
import RegisterPage from "./pages/RegisterPage";
import StoragePage from "./pages/StoragePage";
import LoginPage from "./pages/LoginPage";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TitlePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<StoragePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
