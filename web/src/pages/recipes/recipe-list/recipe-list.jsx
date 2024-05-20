
import { useState, useEffect, useContext } from 'react'
import AuthContext from '../../../contexts/auth.context'
import { postPlan, getRecipes } from '../../../services/api.service'
import { Link } from 'react-router-dom'
import RecipeItem from '../../../components/recipes/recipe-item/recipe-item'
import SearchFood from '../../../components/food/search-food/search-food'
import PageLayout from '../../../layouts/PageLayout'
import img1 from '../../../assets/imgSU5.jpg'
import img2 from '../../../assets/imgSU6.jpg'
import './recipe-list.css'



const imgArr = [img1, img2];

function ListRecipe() {
const [page, setPage] = useState(5)
const [recipes, setRecipes] = useState([])
const context = useContext(AuthContext)
const [randomNum, setRandom] = useState(0);




useEffect(() => {
          setRandom(Math.floor(Math.random() * 2));

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
    <div className='recipe-page'>
    <PageLayout>
            <img className='infinite-bg' src={imgArr[randomNum]} alt="Background" />
                    <div className="h1-div page-food">
                        <h1 className='page-title '>Foods</h1>
                    </div>
            <div className="plane-box overlay food-box" style={{backgroundColor: 'var(--full-white-1)'}}>
                <SearchFood />
            </div>
          
    </PageLayout>       
    </div>
  )
}

export default ListRecipe;