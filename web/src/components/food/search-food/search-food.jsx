import { useEffect, useRef, useState } from "react";
import { getFoods, getMyMeals, deleteMeal, getHistory} from "../../../services/api.service"; // Importa la función deleteMeal
import FoodCapsule from "../food-capsule/food-capsule";
import FoodDetail from "../food-detail/food-detail";
import './search-food.css';
import img404 from '../../../assets/druit404.png'

function SearchFood({ onAddFood }) {
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [results, setResults] = useState(15);
    const order = useRef("asc");
    const sortBy = useRef("name");
    const query = useRef("");
    const [page, setPage] = useState(1);
    const [actualFood, setActualFood] = useState({ qty: 0, unit: 'gr' });

    const [expandData, setExpandData] = useState('search');
    const [myMeals, setMyMeals] = useState([]);
    const [selectedMealIndex, setSelectedMealIndex] = useState(null); // Estado para el índice de la comida seleccionada
    const [history, setHistory] = useState([])

    const handleShowData = (page) => {
        setExpandData(page);

        if (page === 'history') {
            HandleGetHistory()
        }
    };

    const HandleGetHistory = async () => {
        try {
            const response = await getHistory()
            setHistory(response.data)
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching history:', error);
            throw error; 
        }
    };

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

    useEffect(() => {
        if (expandData === 'mymeals') {
            handleShowMeals('mymeals');
        }
    }, [expandData]);

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
                    default:
                        return 0;
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
        setActualFood(data);
        setPage(2);
    };

    const handleInputChangeDet = (e) => {
        const { name, value } = e.target;
        setActualFood({ ...actualFood, [name]: name === 'qty' ? Number(value) : value });
    };

    const handleSendFood = () => {
        onAddFood(actualFood);
    };

    async function handleShowMeals(page) {
        setExpandData(page);
        try {
            const response = await getMyMeals();
            setMyMeals(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleExpandMeal = (index) => {
        setSelectedMealIndex(selectedMealIndex === index ? null : index); // Toggle selección
    };

    const handleDeleteMeal = async (mealName) => {
        
        try {
            await deleteMeal(mealName);
            setMyMeals(myMeals.filter((meal) => meal.name !== mealName));
        } catch (error) {
            console.error('Error deleting meal:', error);
        }
    };

    return (
        <>
            <div className="filters-food-btns">
                <button className={`${expandData === 'search' ? 'btn-selected' : ''}`} onClick={() => handleShowData('search')}>Search</button>
                <button className={`${expandData === 'history' ? 'btn-selected' : ''}`} onClick={() => handleShowData('history')}>History</button>
                <button className={`${expandData === 'mymeals' ? 'btn-selected' : ''}`} onClick={() => handleShowMeals('mymeals')}>My meals</button>
            </div>

            {expandData === 'search' && (
                <div className="search-div">
                    {page === 1 && (
                        <>
                            <div className="div-filters">
                                <div className="input-box-flt">
                                    <p className="filter-name">Sort by</p>
                                    <select name="sort" onChange={handleSortAndOrder}>
                                        <option value="name">Name</option>
                                        <option value="calories_kcal">Calories</option>
                                        <option value="carbohydrates_g">Carbohydrates</option>
                                        <option value="protein_g">Protein</option>
                                        <option value="totalFat_g">Total fat</option>
                                    </select>
                                </div>
                                <div className="input-box-flt">
                                    <p className="filter-name">Order</p>
                                    <select name="order" onChange={handleSortAndOrder}>
                                        <option value="asc">Ascending</option>
                                        <option value="des">Descending</option>
                                    </select>
                                </div>
                            </div>

                            <input type="text" name="name" onChange={handleInputChange} className="search-bar" placeholder="Search..." />

                            {filteredFoods.length === 0 ? (
                            <div className="notfound-div">
                                <h4>Sorry, we cant find that food</h4>
                                <img src={img404} alt="Not Found" />
                            </div>
                            ) : (
                            <>
                                <p className="write-smt">{filteredFoods.length} results</p>
                                {filteredFoods.slice(0, results).map(food => (
                                <FoodCapsule key={food._id} food={food} onAddFood={handleAddFood} />
                                ))}
                                {results < filteredFoods.length && (
                                <button onClick={handleResults}>+ Results</button>
                                )}
                            </>
                            )}

                        </>
                    )}
                    {page === 2 && (
                        <>
                            <div className="detail-div">
                                <FoodDetail food={actualFood} />
                                <div className="food-inputs">
                                    <h3>Quantity:</h3>
                                    <div className="inp-box-flt">
                                        <input
                                            onChange={(e) => handleInputChangeDet(e)}
                                            name="qty"
                                            type="number"
                                            value={actualFood.qty || ''}
                                        />
                                    </div>
                                    <div className="inp-box-flt">
                                        <select
                                            onChange={(e) => handleInputChangeDet(e)}
                                            name="unit"
                                            value={actualFood.unit || ''}
                                        >
                                            <option>Unit..</option>
                                            <option value="gr">Gr</option>
                                            <option value="ml">Ml</option>
                                        </select>
                                    </div>
                                    <button className="add-ex-btn button" onClick={handleSendFood}><i className="fa-solid fa-plus"></i> Add</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
            {expandData === 'mymeals' && (
                <div className="showmeals">
                    {myMeals.map((me, i) => (
                        <div key={i}>
                            <div className='meal-capsule' onClick={() => handleExpandMeal(i)}>
                                <h3>{me.name}</h3>
                                <button className="delete-btn" onClick={(event) => {
                                    event.stopPropagation(); // Evita que se expanda el meal al hacer clic en el botón
                                    handleDeleteMeal(me.name);
                                }}>
                                    <i className="fa-solid fa-trash-can red-text button-trash" />
                                </button>
                            </div>
                            {selectedMealIndex === i && (
                                <div className="expanded-meal">
                                    {me.food.map((fd, j) => (
                                        <div key={j} className="meal-capsule">
                                            <div>
                                                <i>{fd.emoji}</i>
                                                <h3>{fd.name}</h3>
                                            </div>
                                            <div className="qty-div">
                                                <p>{fd.qty} {fd.unit ? fd.unit : 'Gr'}</p>
                                                <p>{Math.round(fd.calories_kcal * fd.qty)} KCAL</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {expandData === 'history' && (
                <>
                {history.length !== 0 && (
                    <>
                     {history.map(food => (
                        <FoodCapsule key={food._id} food={food} onAddFood={handleAddFood} />
                        ))}
                    </>
                )}
                </>
            )}
        </>
    );
}

export default SearchFood;
