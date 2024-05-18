
import { useState } from 'react';
import FoodDetail from '../food-detail/food-detail';
import './food-capsule.css'

function FoodCapsule(props) {

    const {food, onAddFood, onRemove, onEdit } = props;
    const [expandedFoods, setExpandedFoods] = useState([]);
    //const [foodAmount, setFoodAmount] = useState({quantity: "", unit: ""})

    const handleChange = (event) => {
        const { name, value } = event.currentTarget;
        if (onEdit) {
            onEdit({ ...food.amount, [name]: value }, food._id);
        }
    };

    return (
        <div >
            
           

            <div className='meal-capsule-sch'>
                <div className='d-flex'>
                    <i>{food.emoji}</i>
                    <h3>{food.name}</h3>
                </div>             

                {onAddFood &&
                <button className='add-ex-btn' type="button" onClick={() => onAddFood(food)}>
                    add
                </button>
                }
            </div>


          
        </div>
    )
}

export default FoodCapsule;