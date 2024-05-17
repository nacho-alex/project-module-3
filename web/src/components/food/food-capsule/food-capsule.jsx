
import { useState } from 'react';
import FoodDetail from '../food-detail/food-detail';

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
            <p>{food.emoji} {food.name}</p>
            {onEdit && 
                <>
                    <input name='quantity' type="number" placeholder='Quantity...' onChange={handleChange}  value={food.amount.quantity} />
                    <input name='unit' type="text" placeholder='Unit...' onChange={handleChange}  value={food.amount.unit} />
                </>
            }

            {onAddFood &&
            <button type="button" onClick={() => onAddFood(food)}>
                add
            </button>
            }

            {onRemove &&
            <button type="button" onClick={() => onRemove(food._id)}>
                remove
            </button>
            }
            
            {expandedFoods.includes(food._id) && (
            <FoodDetail food={food} />
            )}
        </div>
    )
}

export default FoodCapsule;