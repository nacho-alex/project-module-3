
import { useState, useEffect, useContext } from 'react'
import AuthContext from '../../../contexts/auth.context'
import { postPlan, getRecipes } from '../../../services/api.service'
import { Link } from 'react-router-dom'
import RecipeItem from '../../../components/recipes/recipe-item/recipe-item'

function ListRecipe() {
const [page, setPage] = useState(1)
const [recipes, setRecipes] = useState([])
const context = useContext(AuthContext)



useEffect(() => {
    async function fetch() {
        try {
          const recipesData = await getRecipes();
          setRecipes(recipesData.data);
          
        } catch (error) {
          console.error(error);
        } 
      }
      fetch();
    }, []
);

const handlePage = (page) => {
    setPage(page)
    
}

async function handleSelectedPlan(id) {

    const updatedUser = {...context.user, planning: id}
    try {
        console.log(updatedUser)
        await postPlan(updatedUser)
    }catch(err){
        console.log(err)
    }

}

  return (
    <>
        <h1>Recipes</h1>
        <Link to='/create-recipe'>Create recipe</Link>
        <div>
            <button onClick={() => handlePage(1)} >All recipes</button>
            <button onClick={() => handlePage(2)} >My recipes</button>
        </div>

        {page === 1 && (
            <>
                <h1>holi</h1>

                {recipes.length > 0 && (
                    recipes.map((recipe) => (
                        <RecipeItem key={recipe._id} recipe={recipe} onSelectWorkout={handleSelectedPlan}/>
                    ))
                )}
               
            </>
        )}

        {page === 2 && (

        <>
            <h1>Hello</h1>

            {recipes.length > 0 && (
                recipes.filter((recipe) => recipe.owner === context.user.id).map((recipe) => (
                    <RecipeItem key={recipe._id} recipe={recipe} onSelectRecipe={handleSelectedPlan}/>
                ))
            )}

        </>
        )}


    </>
  )
}

export default ListRecipe;