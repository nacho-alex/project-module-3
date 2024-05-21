import React, { useState } from 'react';
import SearchFood from '../search-food/search-food';

function Meal() {
    const [mealState, setMeal] = useState([]);
    

    const handleAddFood = (data) => {
        setMeal(prevMealState => [...prevMealState, data]);
    };

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const newMealState = [...mealState];
        newMealState[index][name] = value;
        setMeal(newMealState);
        console.log(mealState);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(mealState);
    };

    return (
        <div>
            <div className="meal-name">
                <h1>meal name</h1>
            </div>

            <div className="meal-items">
                <form onSubmit={handleSubmit}>
                    {mealState?.map((me, index) => (
                        <div key={index}>
                            <h1>{me.name}</h1>
                            <div className="inp-box">
                                <p>Quantity</p>
                                <input
                                    onChange={(e) => handleInputChange(index, e)}
                                    name="qty"
                                    type="number"
                                    min={0}
                                />
                            </div>
                            <div className="inp-box">
                                <p>Unit</p>
                                <select
                                    onChange={(e) => handleInputChange(index, e)}
                                    name="unit"
                                >
                                    <option value="gr">Gr</option>
                                    <option value="Ml">Ml</option>
                                </select>
                            </div>
                        </div>
                    ))}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Meal;
