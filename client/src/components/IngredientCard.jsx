import "../css/IngredientCard.css";

const IngredientCard = ({ category, ingredients, handleDelete }) => {
	return (
		<div className="card">
			<div className="card-container">
				<h4 className="category">{category}</h4>
				{ingredients.length > 0 ? (
					<ul className="ingredients">
						{ingredients.map((ingredient, i) => 
							<li key={i} className="row">
								{ingredient}
								{/* prop handleDelete has 2 parameters in the parent (ingredient and category) */}
								<button className="delete-btn" onClick={() => handleDelete(ingredient, category)}>
									✕
								</button>
							</li>
						)}
					</ul>
				) : <p>No ingredients</p>}
			</div>
		</div>
	)
}

export default IngredientCard;