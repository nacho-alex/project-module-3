
import SearchFood from "../../../components/food/search-food/search-food";
import FoodCapsule from "../../../components/food/food-capsule/food-capsule";
import { createRecipe } from "../../../services/api.service";
import AuthContext from '../../../contexts/auth.context'
import { useState, useContext } from "react";

function CreateRecipe() {
    
    const context = useContext(AuthContext);
    const initialState = {
        image:'',
        title: '',
        description: '',
        ingredients: [],
        time: '',
        steps: ''
    }
    
    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState(initialState);
    const [errors, setValidateErrors] = useState({});
     
    const handleChange = (event) => {
        const{name, value} = event.currentTarget;
        setFormData({...formData, [name]: value});
    }

    const handlePageAddIngredient = (event) => {
        event.preventDefault();
        setPage(2)
    }

    const handlePageBack = (event) => {
        event.preventDefault();
        setPage(1);
    }

    const handleAddIngredient = (ingredient) => {
        const exist = formData.ingredients.some(ing => ing._id === ingredient._id);
            if (!exist) {
            const updatedIngredients = [...formData.ingredients, {...ingredient, amount: { quantity: '', unit: '' } }];
                setFormData({...formData, ingredients: updatedIngredients});
                setPage(1)
        } else {
                alert(`${ingredient.name} has already been added to your recipe`);
        }
    }

    const handleRemove = (id) => {
        const updatedIngredients = formData.ingredients.filter(ing => ing._id !== id);
        setFormData({...formData, ingredients: updatedIngredients});
        setPage(1);
        console.log(formData);
    }

    const handleEdit = (ingredientAmount, id) => {
        const updatedIngredients = formData.ingredients.map(ingredient => {
            if (ingredient._id === id) {
                return {...ingredient, amount: ingredientAmount};
            }
            return ingredient;
        });
        setFormData({...formData, ingredients: updatedIngredients});
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const validateErrors = {};
        if (!formData.title) validateErrors.title = "Title is required";
        if (!formData.description) validateErrors.description = "Description is required";
        if (!formData.ingredients.length) validateErrors.ingredients = "Add at least 1 ingredient";
        if (!formData.steps) validateErrors.steps ="Steps is required";

        if (formData.ingredients.length) {
            formData.ingredients.forEach(ingredient => {
                if (!ingredient.amount || !ingredient.amount.quantity) validateErrors.quantity = "quantity is required";
                if (!ingredient.amount || !ingredient.amount.unit) validateErrors.unit = "unit is required";
            });
        }
        
        if (!Object.keys(validateErrors).length) {
            setFormData({...formData, owner: context.user.id})

            try {
                await createRecipe(formData);
                setFormData(initialState);
                setValidateErrors({});
            } catch (err) {
                console.log(err)
            }
        } else {
            setValidateErrors(validateErrors);
        }
    }
  
    return (
        <>
            <h2>New recipe</h2>

            {page === 1 && (
                <>
                    {Object.values(errors).length > 0 && Object.values(errors).map((error, index) => <p key={index}>{error}</p>)}

                    <form onSubmit={handleSubmit}>
                    
                        <div className="container">
                            <input type="text" name="image" value={formData.image} placeholder="image URL" onChange={handleChange}/>
                            <input type="text" name="title" value={formData.title} placeholder="title" onChange={handleChange}/>
                            <textarea name="description" value={formData.description} placeholder="description" onChange={handleChange}/>
                            <input type="number" name="time" value={formData.time} placeholder="time (min)" min={0} onChange={handleChange} />
                            <textarea name="steps" value={formData.steps} placeholder="steps" onChange={handleChange}/>
                        </div>
                        <div>
                            <h4>Ingredients</h4>
                            <p>Add ingredient</p>

                            {formData.ingredients.map((ing) => 
                            
                            <FoodCapsule key={ing._id} food={ing}  onEdit={handleEdit} onRemove={handleRemove} />
                            )}
                            
                            <button onClick={handlePageAddIngredient}>+</button>
                        </div>
                        <button type="submit"> Create recipe</button>

                    </form>
                </>
            )}

            {page=== 2 && (
                <>
                    <div>
                        <button onClick={handlePageBack}>Back</button>
                    </div>
                    <SearchFood onAddFood={handleAddIngredient}/>
                </>
            )} 
        </>
    );
}

export default CreateRecipe;