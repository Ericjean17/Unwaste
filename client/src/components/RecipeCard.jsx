import { motion } from "framer-motion";
import "../css/RecipeCard.css";
import RecommendIcon from '@mui/icons-material/Recommend';

const RecipeCard = ({ image, recipe, description, recommended, onClick, delay}) => {
  return (
    <motion.div 
      className="recipe-card" 
      onClick={onClick} 
      initial={{ y: 20, opacity: 0 }} // starts slightly below
      animate={{ y: 0, opacity: 1, transition: { duration: 0.5 }, delay: delay}} 
      transition={{ delay: delay }}
      whileHover={{ scale: 1.025, transition: { duration: 0.01 }}} 
    >
      <div className="recipe-card-container">
        <div>
          <img src={image} alt="Recipe image" />
        </div>
        <div className="recipe-details">
          <h4>{recipe}</h4>
          <p>{description}</p>
        </div>
        <div className="recommend-recipe">
          {recommended 
            ? <span>
                Recommended&nbsp;
                <RecommendIcon fontSize="small" className="recommend-icon"/>
              </span>
            : ""
          }
        </div>
      </div>
    </motion.div>
  )
}

export default RecipeCard;