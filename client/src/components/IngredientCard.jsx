import "../css/IngredientCard.css";

const IngredientCard = ({ category, ingredients }) => {
	return (
		<>
			<div className="card">
				<div className="card-container">
					<div className="ingredient-name">
						<h4>{category}</h4>
					</div>
					<ul className="ingredients">
						{ingredients.map((ingredient, i) => 
							<li key={i} >{ingredient}</li>
						)}
					</ul>
				</div>
			</div>
		</>
	)
}

export default IngredientCard;