import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../css/StoragePage.css";
import IngredientCard from "../components/IngredientCard";
import { useNavigate } from "react-router-dom";

const StoragePage = () => {
  // Tracks the ingredient and category that the user wants to input
	const [ingredient, setIngredient] = useState({
		ingredient: "", 
		category: "",
	});
	const [ingredients, setIngredients] = useState([]);
	const navigate = useNavigate();
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

	// Get request for displaying all the user's ingredients
	const fetchIngredients = async () => {
		const userId = localStorage.getItem("userId");
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(`http://localhost:3000/users/${userId}/ingredients`, {
				headers: {
					"Authorization": `Bearer ${token}`
				}
			});
			const data = await response.json(); // data becomes object[] containing { id, ingredient, category, user_id }
			setIngredients(data);
		
		} catch (err) {
			console.error("Failed to fetch ingredents:", err.message);
		}
	}
	
  // Updates the ingredient or category value when it changes
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
			setIngredient({ ingredient: "", category: ingredient.category })
			fetchIngredients();
			//navigate(`/users/${userId}/ingredients`);
		}
		} catch (err) {
			console.error(err.message);
		}
	}

  // Logout of the account by removing the token and sending them back to the login screen
	const logout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	}

	// Group ingredients by category in the form of (e.g., {Fruits: [...], Dairy: [...]}
	const groupedIngredients = ingredients.reduce((accumulator, ingredient) => {
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
				body: JSON.stringify({ ingredient: ingredient, category: category })
			});
      const data = await response.json();
      // Remove from local state after deleting ingredient from database
			if (response.ok) {
        alert(`Ingredient deleted: ${data.deleted}`);
				setIngredients(prevIngredients => prevIngredients.filter(item => !(item.ingredient === ingredient && item.category === category)));
			} else {
				console.error("Failed to delete ingredient");
			}
		} catch (err) {
			console.error("Did not delete ingredient for some reason", err.message);
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
								<input className="ingredient-add" type="text" placeholder="Add Ingredient" value={ingredient.ingredient} onChange={handleChange} name="ingredient"/>
								<div className="categories">
									<select className="dropdown" name="category" id="category" onChange={handleChange}>
										<option value="">Select category</option>
										<option value="vegetables">Vegetables</option>
										<option value="fruits">Fruits</option>
										<option value="meat">Meat</option>
										<option value="seafood">Seafood</option>
										<option value="dairy">Dairy</option>
										<option value="grains">Grains</option>
										<option value="baking">Baking</option>
										<option value="oils">Oils & Fats</option>
										<option value="spices">Spices & Herbs</option>
										<option value="condiments">Condiments</option>
										<option value="beverages">Beverages</option>
										<option value="canned">Canned Goods</option>
										<option value="frozen">Frozen Foods</option>
										<option value="snacks">Snacks</option>
										<option value="nuts">Legumes</option>
										<option value="misc">Miscellaneous</option>
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