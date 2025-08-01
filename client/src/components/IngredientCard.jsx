import { useState } from "react";
import "../css/IngredientCard.css";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';

const IngredientCard = ({ category, ingredients, handleDelete }) => {
	const [isEditMode, setIsEditMode] = useState(false);
  const turnOnEditMode = () => {
    setIsEditMode(true);
  }

	return (
		<div className="card">
			<div className="card-container">
				<h4 className="category">{category}</h4>
				{ingredients.length > 0 ? (
					<ul className="ingredients">
						{ingredients.map((ingredient, i) => 
							<li key={i} className="ingredient-row">
								<span>
        					{/* ingredient text */}
									<input 
										type="text" 
										value={ingredient}
										readOnly={!isEditMode}
										onClick={turnOnEditMode}
										className="input-ingredient"
									/>
								</span>

								<div className="input-btns">
									{/* Edit icon */}
									<button className="edit-btn">
										<ModeEditIcon />
									</button>
									
									{/* Delete button */}
									{/* prop handleDelete has 2 parameters in the parent (ingredient and category) */}
									<button className="delete-btn" onClick={() => handleDelete(ingredient, category)}>
										<ClearIcon />
									</button>		
								</div>						
							</li>
						)}
					</ul>
				) : <p>No ingredients</p>}
			</div>
		</div>
	)
}

export default IngredientCard;