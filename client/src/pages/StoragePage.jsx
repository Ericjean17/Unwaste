import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../css/StoragePage.css";
import IngredientCard from "../components/IngredientCard";

const [ingredient, setIngredient] = useState({
	name: "", 
	category: ""
});

const handleChange = (e) => {
	const { name, value } = e.target;
	setIngredient((prevInput) => ({
		...prevInput, [name]: value
	}))
}

const handleSubmit = () => {
	e.preventDefault();
	if (ingredient.name === "" || ingredient.category === "") {
		alert("Input missing for ingredient or category");
		return;
	}
}

const StoragePage = () => {
	return (
		<>
			<Navbar />
			<section id="page">
				<div className="ingredients-container text-font fw-bold">
					<h3>My Ingredients</h3>	
					<div className="input-container">
						<div className="ingredients-input">
							<div className="category-add">
								<form onSubmit={handleSubmit}>
									<input className="ingredient-add" type="text" placeholder="Add Ingredient" value={ingredient.name} onChange={handleChange} name="name"/>
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
					</div>
					<IngredientCard category="Vegetables" ingredients={["Broccoli", "Choi"]}/>
					<IngredientCard category="Fruits" ingredients={["Broccoli", "Choi"]}/>
					<IngredientCard category="Meat" ingredients={["Broccoli", "Choi"]}/>
					<IngredientCard category="Seafood" ingredients={["Broccoli", "Choi"]}/>
					<IngredientCard category="Dairy" ingredients={["Broccoli", "Choi"]}/>
					<IngredientCard category="Grains" ingredients={["Broccoli", "Choi"]}/>
					<IngredientCard category="Baking" ingredients={["Broccoli", "Choi"]}/>
					<IngredientCard category="Oils & Fats" ingredients={["Broccoli", "Choi"]}/>
					<IngredientCard category="Spices & Herbs" ingredients={["Broccoli", "Choi"]}/>
					<IngredientCard category="Condiments" ingredients={["Broccoli", "Choi"]}/>
					<IngredientCard category="Beverages" ingredients={["Broccoli", "Choi"]}/>
					<IngredientCard category="Canned Goods" ingredients={["Broccoli", "Choi"]}/>
					<IngredientCard category="Frozen Foods" ingredients={["Broccoli", "Choi"]}/>
					<IngredientCard category="Snacks" ingredients={["Broccoli", "Choi"]}/>
					<IngredientCard category="Legumes" ingredients={["Broccoli", "Choi"]}/>
					<IngredientCard category="Miscellaneous" ingredients={["Broccoli", "Choi"]}/>
				</div>
			</section>
		</>
	)
}

export default StoragePage;