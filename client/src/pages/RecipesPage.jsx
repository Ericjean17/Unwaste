import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RecipesPage.css";

const RecipesPage = () => {
  const [recipeInput, setRecipeInput] = useState("");
  const navigate = useNavigate();
  // const hasRun = useRef(false); // useRef persists across re-renders

  // // useEffect() runs twice which happens in React Strict Mode during development
  // // React intentionally double-invokes certain lifecycle methods to help catch side effects
  // // Can put React.StrictMode in App.jsx to disable it but don't since StrictMode helps catch bugs
  // useEffect(() => {
  //   if (hasRun.current) return; // prevent rerun / prevent alert from appearing 2x
  //   hasRun.current = true;
    
  //   const preferencesSet = localStorage.getItem("setUserPreferences") === "true";
  //   if (!preferencesSet) {
  //     const userId = localStorage.getItem("userId");
  //     alert("You must set your dietary preferences first before finding recipes");
  //     navigate(`/users/${userId}/diet`);
  //   }
  // }, [])
  useEffect(() => {
  const checkDietStatus = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}/recipes`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        console.log("Saved diet row:", data);
        alert(data.error);
        navigate(`/users/${userId}/diet`)
        return;
      }

    } catch (err) {
      console.error("Failed to fetch diet info", err);
    }
  };

  checkDietStatus();
}, []);

  return (
    <div className="recipe-page">
      <div className="recipe-container">
        <h2>What are you cooking today</h2>
        <input 
          type="text"
          placeholder="Search for a recipe..."
          onChange={(e) => e.target.value}
          value={recipeInput}
          className="recipe-input"
        />
      </div>
    </div>
  )
}

export default RecipesPage;