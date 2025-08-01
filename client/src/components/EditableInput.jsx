import { useState } from "react";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';

const EditableInput = ({ value }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const turnOnEditMode = () => {
    setIsEditMode(true);
  }
  
  return (
    <div className="ingredient-row">
      <span>
        {/* ingredient text */}
        <input 
          type="text" 
          value={value}
          readOnly={!isEditMode}
          onClick={turnOnEditMode}
        />
      </span>

      {/* Edit icon */}
      <button>
        <ModeEditIcon />
      </button>
      
      {/* Delete button */}
      <button>
        <ClearIcon />
      </button>
    </div>
  )
}