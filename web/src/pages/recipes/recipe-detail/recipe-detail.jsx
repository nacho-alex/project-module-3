
// import { useState, useEffect, useContext } from 'react';
// import { getRecipe } from '../../../services/api.service';
// import { Link, useParams } from 'react-router-dom';
// import AuthContext from '../../../contexts/auth.context';
// import WeekDay from '../../../components/workouts/WeekDay/WeekDay';
// import FoodCapsule from '../../../components/food/food-capsule/food-capsule';
// import RecipeItem from '../../../components/recipes/recipe-item/recipe-item';
// import '../../workout/workout-detail/workout-detail.css';

// function RecipeDetail() {

//     const context = useContext(AuthContext)
//     const [recipe, setRecipe] = useState({})
//     const params = useParams();
//     //const [actualDay, setDay] = useState('mon')
//     const hideBtns = true;


//     useEffect(() => {
//         async function fetch() {
//             try {
//             const recipeData = await getRecipe(params);
//             setRecipe(recipeData.data);
//             } catch (error) {
            
//             } 
//         }
//         fetch();
        
//         }, []
//     );

//     const handleSetDay = (day) => {
//         setDay(day)
//     }

//     return (

//         <div className='detail-page'>
//         <Link className='back-btn' to={'/list-recipe'}><i className="fa-solid fa-arrow-left"></i> Back </Link>

//                         {recipe  && (
//                         <RecipeItem key={recipe._id} recipe={recipe} hideBtns={hideBtns} />                 
//                         )}

//             <div className='plane-box' style={{ backgroundColor: 'rgba(46, 46, 46, 0.894)', color: 'white' }}>
//             <h2>description</h2>
//             <div>{recipe.description}</div>
//             </div>
            
//             <div className='plane-box'>
//             <h2>Recipes</h2>
//             {/* <WeekDay onSelectDay={handleSetDay} actualDay={actualDay}></WeekDay> */}
            
//             {recipe.ingredients && recipe.ingredients
                
//                 .map((ing) => 
//                     <FoodCapsule 
//                         key={ing._id } 
//                         food={ing}  
//                     />
//             )}

//             </div>

            


            
//         </div>
        
//     )
// }

// export default RecipeDetail;