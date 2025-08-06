import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import { GoogleGenAI } from "@google/genai";
import { generateRecipeSuggestions } from "../services/gemini.js";
import Navbar from "../components/Navbar";
import "../css/RecipesPage.css";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipeInput, setRecipeInput] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    setRecipeInput(e.target.value);
  }

  const handleGenerateRecipes = async (e) => {
    if (e.key === 'Enter') {
      setIsLoading(true);
      setError(null);

      try {
        const ingredients = ["chicken", "rice", "vegetables"];
        const response = await generateRecipeSuggestions(ingredients);

        const recipeData = JSON.parse(response);
        setRecipes(recipeData);
      } catch (error) {
        console.error("Failed to generate recipes:", error);
        setError("Failed to generate recipes. Try again.");
      } finally {
        setIsLoading(false);
        alert("Generated recipes");
      }
    }
  }

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
    <>
      <Navbar />
      <div className="recipe-page">
        <div className="recipe-input-container">
          <h2>What are you cooking today?</h2>
          <input 
            type="text"
            placeholder="Search for a recipe..."
            onChange={handleInput}
            value={recipeInput}
            className="recipe-input"
            onKeyDown={handleGenerateRecipes}
          />
        </div>
        <div className="generated-recipes">
          <div className={`${isLoading ? "loader" : ""}`}>
            <div className={`${isLoading ? "inner-circle" : ""}`}></div>
          </div>
          {/* {recipes.map((recipe, index) => (
            <div key={index}>
              <h3>{recipe.name}</h3>
              <p>Ingredients {recipe.ingredients}</p>
              <p>Instructions: {recipe.instructions}</p>
            </div>
          ))} */}
        </div>
      </div>
    </>
  )
}

export default RecipesPage;