import "../css/IngredientCard.css";

const IngredientCard = ({ category, ingredients }) => {
	return (
		<div className="card">
			<div className="card-container">
				<h4 className="category">{category}</h4>
				<ul className="ingredients">
					{ingredients.map((ingredient, i) => 
						<li key={i} >{ingredient}</li>
					)}
				</ul>
			</div>
		</div>
	)
}

export default IngredientCard;