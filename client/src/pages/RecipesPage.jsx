import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateRecipeSuggestions } from "../services/gemini.js";
import Navbar from "../components/Navbar";
import "../css/RecipesPage.css";
import RecipeCard from "../components/RecipeCard.jsx";
import RecipeModal from "../components/RecipeModal.jsx";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recipeInput, setRecipeInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [diet, setDiet] = useState({
    // veganType: "",
    meatConsumption: "",
    fishConsumption: "",
    vegetableConsumption: "",
    spicinessLevel: "",
    allergies: []
  });
  const [temp, setTemp] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setRecipeInput(e.target.value);
  }

  const handleGenerateRecipes = async (e) => {
    if (e.key === 'Enter') {
      setIsLoading(true);

      try {
        const userIngredients = ingredients.map(ingredient => ingredient.ingredient);
        console.log(userIngredients);
        console.log(diet);
        
        const dietArray = [];
        for (const [key, value] of Object.entries(diet)) {
          dietArray.push(`${key}: ${value}`);
        }

        const response = await generateRecipeSuggestions(recipeInput, userIngredients, dietArray);
        const fetchedRecipes = JSON.parse(response); // fetchedRecipes is [{...}, {...}] from JSON string
        console.log(fetchedRecipes);
        setRecipes(fetchedRecipes || []);

        // Remove the alert - it's showing [object Object]
        // alert(`Generated recipes: ${fetchedRecipes}`);
        console.log(`Generated ${fetchedRecipes?.length || 0} recipes`);
      } catch (error) {
        console.error("Failed to generate recipes:", error);
        alert("Failed to generated recipes. Try again.");
        // setError("Failed to generate recipes. Try again.");
      
      } finally {
        setIsLoading(false);
        console.log("Finally generated recipes");
      }
    }
  }

  // Search images based on recipe name
  const searchImages = async (recipe) => {
    if (!recipe) return null;

    try {
      const searchEngineId = import.meta.env.VITE_SEARCH_ENGINE_ID; 
      const query = encodeURIComponent(recipe); // e.g., " " = %20
      const apiUrl = `https://www.googleapis.com/customsearch/v1?key=AIzaSyCH_lBWErpsaDTxlv7Xl9rkjHWITbT1sbg&cx=${searchEngineId}&q=${query}&searchType=image`;
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        // alert("Error finding image");
        // throw new Error(`HTTP error! Status: ${response.status}`);
        console.error(`Image search failed for "${recipe}": ${response.status}`);
        return null;
      }

      // If data.items exists, return the first item and it's link. Otherwise, return null.
      const data = await response.json();

      const blockedDomains = ["instagram.com", "tiktok.com", "pinterest.com", "facebook.com", "lookaside.fbsbx.com"]; // Popups and redirects prevents image fetching

      // Find first usable URL that shows image with no redirects or popups
      let itemIndex = 0;
      for (const item of data.items) {
        // const url = item.link;
        const url = new URL(item.link); // safer than string includes
        if (blockedDomains.some(domain => url.hostname.includes(domain))) {
          itemIndex++;
          continue;
        }
        return item.link;
      }
      // const imageUrl = data.items?.[0]?.link || null;
      // const imageUrl = data.items?.[itemIndex]?.link || null;
      // console.log(`Image for "${recipe}": ${imageUrl}`);
      // return imageUrl;
    } catch (error) {
      console.error("Error fetching images:", error);
      return null;
    }
  }

  const fetchRecipesImages = async () => {
    // if (recipes.length === 0) return; // Only get recipe images if Gemini returns recipes
    if (!Array.isArray(recipes) || recipes.length === 0) {
      console.log("No recipes to fetch images for");
      return;
    }
    // Promise.all runs all promises in parallel and waits for all to finish
    // Turns each recipe into a promise with async (async returns a promise)
    // console.log(Array.isArray(recipes), recipes);
    // console.log("recipes in fetchRecipesImages:", recipes);
    console.log("Starting to fetch images for recipes:", recipes);
    const updatedRecipes = await Promise.all(
      recipes.map(async (recipe, index) => {
        console.log(`Fetching image for recipe ${index + 1}: ${recipe.name}`);
        const imgUrl = await searchImages(recipe.name); // need to get recipe name
        console.log(`Got image: ${imgUrl} for ${recipe.name}`)
        const updatedRecipe = {
          ...recipe, 
          img: imgUrl || defaultImage
        };
        console.log(`Updated recipe ${index + 1}:`, updatedRecipe);
        return updatedRecipe; // Update img field for each recipe
      })
    );
    
    // console.log(`New recipe images: ${updatedImgs}`) // Outputs [object Object * 4]
    setTemp(updatedRecipes);
    // setRecipes(updatedImgs);
  };

  // Fetch images when user prompts for recipes
  useEffect(() => {
    console.log("Fetching images for ", recipes);
    if (recipes.length > 0) {
      fetchRecipesImages();
    }
  }, [recipes])

  // Add this temporarily to debug the state changes
  useEffect(() => {
    console.log("=== RECIPES STATE DEBUG ===");
    console.log("recipes:", recipes);
    console.log("typeof recipes:", typeof recipes);
    console.log("Array.isArray(recipes):", Array.isArray(recipes));
    console.log("recipes.length:", recipes?.length);
    console.log("===========================");
  }, [recipes]);

  useEffect(() => {
    const loadUserData = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      try {
        // Get user diet
        const diet = await fetch(`http://localhost:3000/users/${userId}/recipes?data=diet`, {
          headers: { "Authorization" : `Bearer ${token}`}
        });

        if (diet.status === 403) { // Forbidden
          // User hasn't set diet preferences - go to diet page
          alert(diet.error || "Please set your diet preferences first");
          navigate(`/users/${userId}/diet`);
          return;
        }

        if (diet.status === 401) { // Unauthorized
          // Token expired or invalid - go to login
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/login");
          return;
        }
        // console.log(JSON.stringify(diet));
        // alert(`Diet is: ${dietData.pref_meats}, ${dietData.pref_fish}, ${dietData.pref_veggies}, ${dietData.pref_spicy}, ${dietData.allergies}`)
        const dietData = await diet.json();
        setDiet(prevDiet => ({
          ...prevDiet, 
          meatConsumption: dietData.pref_meats,
          fishConsumption: dietData.pref_fish,
          vegetableConsumption: dietData.pref_veggies,
          spicinessLevel: dietData.pref_spicy,
          allergies: dietData.allergies || []
        }));
        
        if (!diet.ok) {
          alert("Something went wrong");
          return;
        }
        console.log(dietData);
        // setDiet(dietData);

        // Get user ingredients
        const ingredients = await fetch(`http://localhost:3000/users/${userId}/recipes?data=ingredients`, {
          headers: { "Authorization" : `Bearer ${token}`}
        });

        if (!ingredients.ok) {
          alert("Failed to fetch ingredients");
          return;
        }
        
        const ingredientsData = await ingredients.json();
        if (ingredientsData.length === 0) {
          alert("Please add some ingredients first before searching for recipes");
          navigate(`/users/${userId}/ingredients`)
          return;
        }
        console.log(ingredientsData);
        setIngredients(ingredientsData)

        console.log("Recipes:", recipes);
      } catch (error) {
        console.error(error);
        return;
      }
    };
    loadUserData();
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
          {isLoading && (
            <div className="loader">
              <div className="inner-circle"></div>
            </div>
          )}
          {!isLoading && (
            <div className="recipes-cards">
              {temp.map((recipe, index) => (
                <RecipeCard key={index} image={recipe.img} recipe={recipe.name} description={recipe.description} recommended={recipe.recommended} onClick={() => setSelectedRecipe(recipe)}/>
              ))}
            </div>
          )}

          {selectedRecipe && (
            <RecipeModal 
              name={selectedRecipe.name}
              image={selectedRecipe.img}
              ingredients={selectedRecipe.ingredients}
              amount={selectedRecipe.amount}
              steps={selectedRecipe.steps}
              description={selectedRecipe.description}
              nutrition={selectedRecipe.nutrition}
              missing={selectedRecipe.missing}
              onClose={() => setSelectedRecipe(null)}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default RecipesPage;