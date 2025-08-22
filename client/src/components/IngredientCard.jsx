import { useState } from "react";
import "../css/IngredientCard.css";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const IngredientCard = ({ category, ingredients, handleDelete, handleUpdate }) => { 
	const [editingIndex, setEditingIndex] = useState(null);
	const [editValue, setEditValue] = useState("");
	const [isCollapsed, setIsCollapsed] = useState(false);

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

	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
	}

	return (
		<div className="ingredient-card">
			<div className="card-container">
				<div className="category-header">
					<div className="left"></div>
					<h4 className="category">{category}</h4>
					<span className={`right`} onClick={toggleCollapse}>
						<ExpandMoreIcon 
							style={{
								transition: 'transform 0.3s ease',
								transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
								marginTop: '2px'
        			}}
							className={`expand-icon ${isCollapsed ? "rotated" : ""}`}/>
					</span>
				</div>
				<div className={`category-content ${isCollapsed ? "collapsed" : ""}`} style={{
					transition: isCollapsed ? "max-height 0.5s ease-out" : "max-height 0.5s ease-in"
				}}>
					{ingredients.length > 0 ? (
						<ul className="ingredients">
							{ingredients.map((ingredient, i) => 
								<li key={i} className="ingredient-row">
									<span>
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
										{/* Edit - show update or cancel edit */}
										{editingIndex === i ? (
											<>
												<button className="save-btn" onClick={saveEdit}>
													<CheckIcon />
												</button>
												<button className="cancel-btn" onClick={cancelEdit}>
													<CloseIcon />
												</button>
											</>
										) : (
											// View - show edit or delete ingredient button
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
		</div>
	)
}

export default IngredientCard;