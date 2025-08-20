import CloseIcon from '@mui/icons-material/Close';
import "../css/RecipeModal.css";

const RecipeModal = ({ name, image, ingredients, amount, steps, description, nutrition, missing, onClose }) => {
  const nutritionArr = [];
  function capitalizeFirstChar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  for (const [key, value] of Object.entries(nutrition)) {
    nutritionArr.push(`${capitalizeFirstChar(key)}: ${value}`);
  }

  const updatedIngredients = [];
  let amountIdx = 0;
  for (const ingredient of ingredients) {
    updatedIngredients.push(`${capitalizeFirstChar(ingredient)} (${amount[amountIdx]})`)
    amountIdx++;
  }
  
  return (
    <div className='recipe-modal-backdrop' onClick={onClose}>
      <div className='recipe-modal' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h3>{name}</h3>
          <CloseIcon className='close-btn' onClick={onClose}/>
        </div>
        <img src={image} alt="Recipe image" className='modal-img' />
        
        <div>
          <h3>Ingredients:</h3>
          <ul>
            {/* {ingredients?.map((ingredient, i) => <li key={i}>{ingredient}</li>)} */}
            {updatedIngredients.map((ingredient, i) => <li key={i}>{ingredient}</li>)}
          </ul>
        </div>
        
        <div>
          <h3>Steps:</h3>
          <ol className='modal-steps'>
            {steps.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </div>
        
        <div>
          <h3>Description:</h3>
          <p>{description}</p>
        </div>
        
        <div>
          <h3>Nutrition:</h3>
          <ul>
            {nutritionArr.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        
        <div>
          <h3>Missing:</h3>
          <ul>
            {missing?.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default RecipeModal;