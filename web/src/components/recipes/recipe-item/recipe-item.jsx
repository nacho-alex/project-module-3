
import { Link } from 'react-router-dom';

function RecipeItem(props) {
    const {recipe, onSelectRecipe} = props
    
    const handleAdd = () => {
        onSelectRecipe(recipe._id)
    }
  return (
    <div className='workout-item'>
        <div className="workout-image">
            <img src={recipe.image}></img>
        </div>
        <div className="workout-text">
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <p>{recipe.ownername}</p>
        </div>
        <button type='button' onClick={handleAdd}>Add to my plan</button>
        <Link to={`/recipe/${recipe._id}`}><button type='button'>Go to recipe</button></Link> 
    </div>
  )
}

export default RecipeItem;