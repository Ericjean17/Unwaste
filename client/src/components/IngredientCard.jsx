import { useState } from "react";
import "../css/IngredientCard.css";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const IngredientCard = ({ category, ingredients, handleDelete, handleUpdate }) => { 
	const [editingIndex, setEditingIndex] = useState(null);
	const [editValue, setEditValue] = useState("");

	const startEdit = (index, currentValue) => {
		setEditingIndex(index);
		setEditValue(currentValue);
	};

	const saveEdit = () => {
		if (editValue.trim() && handleUpdate) {
			handleUpdate(editingIndex, editValue.trim(), category);
		}
		cancelEdit();
	}
	
	const cancelEdit = () => {
		setEditingIndex(null);
		setEditValue("");
	}

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			saveEdit();
		} else if (e.key === 'Escape') {
			cancelEdit();
		}
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
									{/* <input 
										type="text" 
										name={`ingredient-${category}-${i}`}
										id={`ingredient-${category}-${i}`}
										value={ingredient}
										readOnly={!isEditMode}
										onClick={turnOnEditMode}
										className="input-ingredient"
									/> */}
									{editingIndex === i ? (
										// Edit - show ingredient as input
										<input 
											type="text" 
											name={`ingredient-${category}-${i}`}
											id={`ingredient-${category}-${i}`}
											value={editValue}
											onChange={(e) => setEditValue(e.target.value)}
											onKeyDown={handleKeyPress}
											className="input-ingredient"
											autoFocus
										/>
									) : (
										// View - show ingredient as text
										<span className="ingredient-text">{ingredient}</span>
									)}
								</span>

								<div className="input-btns">
									{/* Edit icon
									<button className="edit-btn">
										<ModeEditIcon />
									</button> */}
									
									{/* Delete button */}
									{/* prop handleDelete has 2 parameters in the parent (ingredient and category) */}
									{/* <button className="delete-btn" onClick={() => handleDelete(ingredient, category)}>
										<ClearIcon />
									</button> */}

									{editingIndex === i ? (
										<>
											{/* <button className="save-btn" onClick={saveEdit}> */}
											<button className="save-btn" onClick={saveEdit}>
												<CheckIcon />
											</button>
											<button className="cancel-btn" onClick={cancelEdit}>
												<CloseIcon />
											</button>
										</>
									) : (
										<>
											<button className="edit-btn" onClick={() => startEdit(i, ingredient)}>
												<ModeEditIcon />
											</button>
											<button className="delete-btn" onClick={() => handleDelete(ingredient, category)}>
												<ClearIcon />
											</button>
										</>
									)}
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