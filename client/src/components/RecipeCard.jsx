import "../css/RecipeCard.css";
import RecommendIcon from '@mui/icons-material/Recommend';

const RecipeCard = ({ image, recipe, description, recommended, onClick }) => {
  return (
    <section className="recipe-card" onClick={onClick}>
      <div className="recipe-card-container">
        <div>
          <img src={image} alt="Recipe image" />
        </div>
        <div className="recipe-details">
          <h4>{recipe}</h4>
          <p>{description}</p>
        </div>
        <div className="recommend-recipe">
          {recommended ? <span>Recommended&nbsp;<RecommendIcon fontSize="small" className="recommend-icon"/></span>: ""}
        </div>
      </div>
    </section>
  )
}

export default RecipeCard;