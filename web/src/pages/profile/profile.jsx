import { useContext, useEffect, useState } from "react";
import ChartBar from "../../components/charts/bar-chart/bar-chart";
import ChartPie from "../../components/charts/pie-chart/pie-chart";
import ChartRadar from "../../components/charts/radar-chart/radar-chart";
import ChartLine from "../../components/charts/line-chart/line-chart";
import AuthContext from "../../contexts/auth.context";
import { Link } from "react-router-dom";
import gainIMG from '../../assets/gain.png';
import loseIMG from '../../assets/loseDES.png';
import './profile.css';
import imgBG from '../../assets/1446b5db-6afb-47a6-9949-d61105fbf62d.png';
import { LineChart } from "recharts";
import WorkoutItem from "../../components/workouts/Workout-Item/workoutItem";
import { getWorkouts, getPlanning, getMyMeals, deleteMeal } from "../../services/api.service";
import ChartLineCalories from "../../components/charts/line-chart/line-chart-calories";

function Profile() {
  const context = useContext(AuthContext);
  const { doDelete } = useContext(AuthContext);

  const [chartBody, setChartBody] = useState("radar");
  const [chartMuscle, setChartMuscle] = useState("bar");
  const [chartMacro, setChartMacro] = useState("pie");
  const [toggleDeleteAcc, setToggleDeleteAcc] = useState(false);
  const [page, setPage] = useState(1);
  const [myWorkouts, setMyWorkouts] = useState([]);
  const [planning, setPlanning] = useState({});
  const [myMeals, setMyMeals] = useState([]);
  const [selectedMealIndex, setSelectedMealIndex] = useState(null);

  const handleChangeChartBody = (event) => {
    setChartBody(event.currentTarget.value);
  };

  const handleChangeChartMuscle = (event) => {
    setChartMuscle(event.currentTarget.value);
  };

  const handleChangeChartMacro = (event) => {
    setChartMacro(event.currentTarget.value);
  };

  const handleToggleDelete = () => {
    setToggleDeleteAcc(!toggleDeleteAcc);
  };

  const handleSetPage = (page) => {
    setPage(page);
  };

  async function handleDeleteAcc() {
    try {
      await doDelete(context.user.id);
    } catch (err) {
      console.log(err);
    }
  }

  const activityLevel = (value) => {
    switch (value) {
      case 1.2:
        return "sedentary";
      case 1.375:
        return "slightly active";
      case 1.55:
        return "moderate";
      case 1.725:
        return "high";
      case 1.9:
        return "very high";
      default:
        return "";
    }
  };

  const goal = (value) => {
    if (value === "gain") {
      return (
        <>
          <img src={gainIMG} style={{ width: "100px" }} alt="Gain" />
          <h4 className="goal-h4">gain muscle</h4>
        </>
      );
    } else if (value === "lose") {
      return (
        <>
          <img src={loseIMG} style={{ width: "100px" }} alt="Lose" />
          <h4 className="goal-h4">lose weight</h4>
        </>
      );
    }
  };

  async function handleShowMeals(page) {
    setPage(page);
    try {
        const response = await getMyMeals();
        setMyMeals(response.data);
    } catch (error) {
        console.log(error);
    }
  }

  const handleExpandMeal = (index) => {
    setSelectedMealIndex(selectedMealIndex === index ? null : index);
  };

  const fetchMyWorkouts = async () => {
    try {
      const response = await getWorkouts();
      setMyWorkouts(response.data.filter((wo) => wo.owner === context.user.id));
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const handleDeleteMeal = async (mealName) => {
    try {
      await deleteMeal(mealName);
      setMyMeals(myMeals.filter((meal) => meal.name !== mealName));
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  useEffect(() => {
    if (context.user) {
      fetchMyWorkouts();
    }

    if (context.user.planning) {
      async function fetchPlanning() {
        try {
          const workoutData = await getPlanning(context.user.planning);
          setPlanning(workoutData.data);
        } catch (error) {
          console.error('Error fetching planning:', error);
        }
      }
      fetchPlanning();
    }
  }, [context.user]);

  return (
    <div className="profile-page">
      {toggleDeleteAcc && (
        <div className="search-overlay delete-acc-overlay">
          <div className="plane-box delete-acc">
            <p>Are you sure you want to delete your account?</p>
            <div className="account-btns">
              <button onClick={handleToggleDelete}>Cancel</button>
              <button className="btn-red" onClick={handleDeleteAcc}>Delete</button>
            </div>
          </div>
        </div>
      )}
      <img className="infinite-bg" src={imgBG} alt="Background" />

      <div className="h1-div page-food">
        <h1 className="page-title">Profile</h1>
      </div>

      <div className="plane-box plane-box-profile">
        <div className="profile-info-container">
          <div className="profile-img">
            <Link to="/edit-profile">
              <div className="avatar-profile-overlay">
                <i className="fa-solid fa-pencil"></i>
              </div>
            </Link>
            <img src={context.user.avatar} style={{ transform: `scale(${context.user.avtScale})` }} alt="Avatar" />
          </div>
          <div className="profile-info">
            <div>
              <i className="fa-solid fa-user"></i><strong>username: </strong><p>{context.user.username}</p>
            </div>
            <div>
              <i className="fa-solid fa-face-smile"></i><strong>name:</strong><p> {context.user.name}</p>
            </div>
            <div>
              <i className="fa-solid fa-envelope" /><strong>email: </strong><p>{context.user.email}</p>
            </div>
            <div>
              <i className="fa-solid fa-cake"></i><strong>birth date:</strong><p> {context.user.birthDate.slice(0, 10)}</p>
            </div>
            <div>
              <i className="fa-solid fa-ruler-vertical"></i><strong>height:</strong> <p> {context.user.height}</p>
            </div>
            <div>
              <i className="fa-solid fa-weight-scale"></i><strong>weight:</strong><p> {context.user.weight}</p><Link to="/edit-profile"><button className="edit-profile-btn"><i className="fa-solid fa-pencil"></i></button></Link>
            </div>
            <div>
              <i className="fa-solid fa-chart-line"></i><strong>activity level:</strong><p className="activity-btn-prf"> {activityLevel(context.user.activityLevel)}</p><Link to="/edit-profile"><button className="edit-profile-btn"><i className="fa-solid fa-pencil"></i></button></Link>
            </div>
          </div>
          <div className="goal-div">
            <p><i className="fa-solid fa-bullseye"></i><strong>&ensp;Your goal is:</strong></p>
            {goal(context.user.goal)}
          </div>
        </div>
        <div className="account-btns">
          <Link to="/edit-profile"><button>Edit profile</button></Link>
          <button className="btn-red" onClick={handleToggleDelete}>Delete account</button>
        </div>
      </div>

      <div className="plane-box profile-main-info">
        <aside className="profile-aside">
          <h2>Profile info</h2>
          <button onClick={() => handleSetPage(1)}><i className="fa-solid fa-dumbbell"></i> Exercise charts</button>
          <button onClick={() => handleSetPage(2)}><i className="fa-solid fa-scale-unbalanced-flip"></i>Nutrition charts</button>
          <button onClick={() => handleSetPage(3)}><i className="fa-solid fa-medal"></i> Your performance</button>
          <button onClick={() => handleSetPage(4)}><i className="fa-solid fa-rectangle-list"></i>Your workouts</button>
          <button onClick={() => handleShowMeals(5)}><i className="fa-solid fa-bowl-food"></i>Your meals</button>
          <button onClick={() => handleSetPage(6)}><i className="fa-solid fa-circle-check"></i>Your planning</button>
        </aside>

        <main className="profile-content">
          {page === 1 && (
            <>
              <h2><i className="fa-solid fa-dumbbell"></i>&ensp; Exercise charts</h2>
              <div className="chart-div">
                <div className="charts-header">
                  <h5>Body part work</h5>
                  <div className="profile-select">
                    <label>Type</label>
                    <select onChange={handleChangeChartBody} value={chartBody}>
                      <option value="radar">Radar chart</option>
                      <option value="bar">Bar chart</option>
                      <option value="pie">Pie chart</option>
                    </select>
                  </div>
                </div>
                {chartBody === "bar" && <ChartBar info="body" />}
                {chartBody === "radar" && <ChartRadar info="body" />}
                {chartBody === "pie" && <ChartPie info="body" />}
              </div>
              <div className="chart-div">
                <div className="charts-header">
                  <h5>Target muscle</h5>
                  <div className="profile-select">
                    <label>Select chart</label>
                    <select onChange={handleChangeChartMuscle} value={chartMuscle}>
                      <option value="radar">Radar chart</option>
                      <option value="bar">Bar chart</option>
                      <option value="pie">Pie chart</option>
                    </select>
                  </div>
                </div>
                {chartMuscle === "bar" && <ChartBar info="muscle" />}
                {chartMuscle === "pie" && <ChartPie info="muscle" />}
                {chartMuscle === "radar" && <ChartRadar info="muscle" />}
              </div>
            </>
          )}
          {page === 2 && (
            <>
            <h2><i className="fa-solid fa-scale-unbalanced-flip"></i>&ensp; Nutrition charts</h2>
              <div className="chart-div">
                <div className="charts-header">
                  <h5>Macros</h5>
                  <div className="profile-select">
                    <label>Select chart</label>
                    <select onChange={handleChangeChartMacro} value={chartMacro}>
                      <option value="pie">Pie chart</option>
                      <option value="bar">Bar chart</option>
                      <option value="radar">Radar chart</option>
                    </select>
                  </div>
                </div>
                {chartMacro === "bar" && <ChartBar info="macro" />}
                {chartMacro === "pie" && <ChartPie info="macro" />}
                {chartMacro === "radar" && <ChartRadar info="macro" />}
              </div>
              <div className="chart-div">
                <div className="charts-header">
                  <h5>Calories</h5>
                </div>
                <ChartLineCalories />
              </div>
            </>
          )}
          {page === 3 && (
            <>
              
              <h2><i className="fa-solid fa-medal"></i>&ensp; Your performance</h2>
              <h5>Barbell bench press</h5>
              <ChartLine exerciseId='66487188fb26ce23ebb015c5' ></ChartLine>
              <h5>Barbell bent over row</h5>
              <ChartLine exerciseId='66487188fb26ce23ebb015c8' ></ChartLine>
              <h5>Barbell alternate biceps curl</h5>
              <ChartLine exerciseId='66487188fb26ce23ebb015c3' ></ChartLine>

            </>
          )}
          {page === 4 && (
            <>
              <h2><i className="fa-solid fa-rectangle-list"></i>&ensp; Your workouts</h2>
              {myWorkouts.map((workout, index) => (
                <WorkoutItem key={index} workout={workout} showMini={true} />
              ))}
            </>
          )}
          {page === 5 && (
            <>
              <h2><i className="fa-solid fa-bowl-food"></i>&ensp; Your meals</h2>
              <div className="plane-box">
                {myMeals.map((me, i) => (
                  <div key={i}>
                    <div className='meal-capsule'>
                      <h3 onClick={() => handleExpandMeal(i)}>{me.name}</h3>
                      <div>
                        <button className="delete-btn" onClick={(event) => {
                          event.stopPropagation();
                          handleDeleteMeal(me.name);
                        }}>
                          <i className="fa-solid fa-trash-can red-text button-trash" />
                        </button>
                      </div>
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
            </>
          )}
          {page === 6 && (
            <>
              <h2><i className="fa-solid fa-circle-check"></i>&ensp; Your planning</h2>
              <WorkoutItem workout={planning} showMini={true} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Profile;
