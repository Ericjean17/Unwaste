import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../css/StoragePage.css";
import IngredientCard from "../components/IngredientCard";
import { useNavigate } from "react-router-dom";

const StoragePage = () => {
  // Tracks the ingredient and category value that the user wants to input
	const [ingredient, setIngredient] = useState({
		ingredient: "", 
		category: "",
	});
	const [ingredients, setIngredients] = useState([]); // Tracks all ingredients
	const navigate = useNavigate(); // Allows the user to be redirected to different URLs
	const [categorizedIngredients, setCategorizedIngredients] = useState({
		Meat: [],
		Vegetable: [],
		Grain: [],
		Fruit: [],
		Dairy: [],
		Beverage: [],
		Nut: [],
		Condiment: [],
		Seafood: [],
		Spice: [],
		Sauce: [],
		Sweetener: [],
		Oil: [],
		Legume: [],
		Starch: [],
		Other: []
	});

	// GET request for displaying all the user's ingredients
	const fetchIngredients = async () => {
		const userId = localStorage.getItem("userId");
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(`http://localhost:3000/users/${userId}/ingredients`, {
				headers: {
					"Authorization": `Bearer ${token}` // Makes sure that the user can only send REST api if they have a token
				}
			});
			const data = await response.json(); // data becomes object[] containing { id, ingredient, category, user_id }
			setIngredients(data);
		
		} catch (err) {
			console.error("Failed to fetch ingredents:", err.message);
      navigate("/login"); // Goes to login page if they don't have a token
		}
	}
	
  // Updates the ingredient and/or category value when it changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setIngredient((prevInput) => ({
			...prevInput, [name]: value
		}))
	}

  // POST request for entering an ingredient with a category
	const handleSubmit = async (e) => {
		e.preventDefault();
		const userId = localStorage.getItem("userId");
		const token = localStorage.getItem("token");
		if (ingredient.ingredient === "" || ingredient.category === "") {
			alert("Input missing for ingredient or category");
			return;
		}

		try {
			const response = await fetch(`http://localhost:3000/users/${userId}/ingredients`, {
			method: "POST",
			headers: { 
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify(ingredient)
		});
		
    // If the response is successful, then clear the input but leave the category the same.
    // Then, update the card that contains the new ingredient by sending a GET request
    if (response.ok) {
			setIngredient({ ingredient: "", category: ingredient.category }) // the category stays the same after a user inputs an ingredient
			fetchIngredients();
			//navigate(`/users/${userId}/ingredients`);
		}
		} catch (err) {
			console.error(err.message);
      navigate("/login");
		}
	}

  // Logout of the account by removing the token and sending them back to the login screen
	const logout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	}

	// Group ingredients by category in the form of (e.g., {Fruits: [...], Dairy: [...]}
	const groupedIngredients = ingredients.reduce((accumulator, ingredient) => {
    // Get the category of the ingredient, if it is not in the accumulator, add the category as a key
    // and initialize it to an empty list of ingredients. Push the ingredient to it's own category
		const category = ingredient.category;
		if (!accumulator[category]) {
			accumulator[category] = [];
		}
		accumulator[category].push(ingredient.ingredient);
		return accumulator;
	}, {})
	
  // DELETE request is sent when a user wants to delete an ingredient in a card
	const handleDeleteIngredient = async (ingredient, category) => {
		const userId = localStorage.getItem("userId");
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(`http://localhost:3000/users/${userId}/ingredients`, {
				method: "DELETE",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ ingredient: ingredient, category: category }) // the ingredient and category to delete
			});
      const data = await response.json();
      
      // Remove from local state after deleting ingredient from database
			if (response.ok) {
        alert(`Ingredient deleted: ${data.deleted}`); // CONSIDER MAKING THIS A DIFFERENT POPUP AT BOTTOM OF SCREEN

        // Display all current ingredients where the one that should be deleted isn't shown
				setIngredients(prevIngredients => prevIngredients.filter(item => !(item.ingredient === ingredient && item.category === category)));
			} else {
				console.error("Failed to delete ingredient");
			}
		} catch (err) {
			console.error("Did not delete ingredient for some reason", err.message);
      navigate("/login");
		}
	}

	// Load ingredients from backend when user first visits the ingredients page
	useEffect(() => {
		fetchIngredients();
	}, [])
	
	return (
		<>
			<Navbar />
			<section id="page">
				<div className="ingredients-container text-font fw-bold">
					<h3>My Ingredients</h3>	
					<div className="input-container">
						<div className="category-add">
							<form className="ingredient-form" onSubmit={handleSubmit}>
								<input className="ingredient-add" type="text" placeholder="Add ingredient" value={ingredient.ingredient} onChange={handleChange} name="ingredient"/>
								<div className="categories">
									<select className="dropdown" name="category" id="category" onChange={handleChange}>
										<option value="">Select category</option>
										<option value="Vegetables">Vegetables</option>
										<option value="Fruits">Fruits</option>
										<option value="Meat">Meat</option>
										<option value="Seafood">Seafood</option>
										<option value="Dairy">Dairy</option>
										<option value="Grains">Grains</option>
										<option value="Baking">Baking</option>
										<option value="Oils & Fats">Oils & Fats</option>
										<option value="Spices">Spices & Herbs</option>
										<option value="Condiments">Condiments</option>
										<option value="Beverages">Beverages</option>
										<option value="Canned">Canned Goods</option>
										<option value="Frozen">Frozen Foods</option>
										<option value="Snacks">Snacks</option>
										<option value="Nuts">Legumes</option>
										<option value="Miscellaneous">Miscellaneous</option>
									</select>
									<button className="ingredient-submit" type="submit">Add</button>
								</div>
							</form>
						</div>
					</div>
					<div className="cards">
						{Object.entries(groupedIngredients).map(([category, ingredient]) => (
							<IngredientCard
								key={category}
								category={category}
								ingredients={ingredient}
								handleDelete={handleDeleteIngredient}
							/>
						))}
					</div>
				</div>
			</section>
		</>
	)
}

export default StoragePage;