import { useEffect, useRef, useState } from "react";
import { getFoods } from "../../../services/api.service";
import FoodCapsule from "../food-capsule/food-capsule";

function SearchFood({onAddFood}) {
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [results, setResults] = useState(15);
    const order = useRef("asc");
    const sortBy = useRef("name");
    const query = useRef("");
    const [page, setPage] = useState(1)
    const [actualFood, setActualFood] = useState()

    useEffect(() => {
        async function fetchFoods() {
            try {
                const response = await getFoods();
                setFoods(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchFoods();
    }, []);

    const searchFood = () => {
        const filteredAndSortedFoods = foods
            .filter(food => food.name.toLowerCase().includes(query.current.toLowerCase()))
            .sort((a, b) => {
                switch (sortBy.current) {
                    case "calories_kcal":
                        return order.current === "asc" ? a.calories_kcal - b.calories_kcal : b.calories_kcal - a.calories_kcal;
                    case "carbohydrates_g":
                        return order.current === "asc" ? a.carbohydrates_g - b.carbohydrates_g : b.carbohydrates_g - a.carbohydrates_g;
                    case "protein_g":
                        return order.current === "asc" ? a.protein_g - b.protein_g : b.protein_g - a.protein_g;
                    case "totalFat_g":
                        return order.current === "asc" ? a.totalFat_g - b.totalFat_g : b.totalFat_g - a.totalFat_g;
                    case "name":
                        return order.current === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
                }
            });

        setFilteredFoods(filteredAndSortedFoods);
    };

    const handleInputChange = (event) => {
        const { value } = event.currentTarget;
        query.current = value;
        searchFood();
        setResults(15);
    };

    const handleSortAndOrder = (event) => {
        const { name, value } = event.currentTarget;
        if (name === "sort") {
            sortBy.current = value;
        } else if (name === "order") {
            order.current = value;
        }
        searchFood();
    };

    const handleResults = (e) => {
        e.preventDefault();
        setResults(results + 15);
    };

    const handleAddFood = (data) => {
        setActualFood(data)
        setPage(2)
    }

    return (
        <>
            {page === 1 && (
                    <>
                    <label>Sort by</label>
                    <select name="sort" onChange={handleSortAndOrder} >
                        <option value="name">Name</option>
                        <option value="calories_kcal">Calories</option>
                        <option value="carbohydrates_g">Carbohydrates</option>
                        <option value="protein_g">Protein</option>
                        <option value="totalFat_g">Total fat</option>           
                    </select>

                    <label>Order</label>
                    <select name="order" onChange={handleSortAndOrder}>
                        <option value="asc">Ascending</option>
                        <option value="des">Descending</option>
                    </select>

                    <input type="text" name="name" onChange={handleInputChange} className="form-control" placeholder="Search..." />

                    {!filteredFoods.length ?
                        <p>search food</p>
                        :
                        <>
                            <p>{filteredFoods.length} results</p>

                            {filteredFoods.slice(0, results).map(food => <FoodCapsule key={food._id} food={food} onAddFood={handleAddFood} />)}

                            {results < filteredFoods.length && <button onClick={handleResults}>+ Results</button>}
                        </>
                    }
                </>
            )}
            {page === 2 && (
                <>
                
                
                </>


            )}
            
        </>
    );
}

export default SearchFood;