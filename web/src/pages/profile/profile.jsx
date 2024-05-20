import { useContext, useState } from "react";
import ChartBar from "../../components/charts/bar-chart/bar-chart";
import ChartPie from "../../components/charts/pie-chart/pie-chart";
import ChartRadar from "../../components/charts/radar-chart/radar-chart";
import ChartLine from "../../components/charts/line-chart/line-chart";
import AuthContext from "../../contexts/auth.context";
import { Link, useNavigate } from "react-router-dom";
import gainIMG from '../../assets/gain.png'
import loseIMG from '../../assets/loseDES.png'



function Profile() {

  const context = useContext(AuthContext);
  const { doDelete } = useContext(AuthContext);
 
  const [chartBody, setChartBody] = useState("radar");
  const [chartMuscle, setChartMuscle] = useState("bar");
  const [chartMacro, setChartMacro] = useState("pie");
  const [toggleDeleteAcc, setToggleDeleteAcc] = useState(false);

  const handleChangeChartBody = (event) => {
    setChartBody(event.currentTarget.value);
  }

  const handleChangeChartMuscle = (event) => {
    setChartMuscle(event.currentTarget.value);
  }

  const handleChangeChartMacro = (event) => {
    setChartMacro(event.currentTarget.value);
  }

  const handleToggleDelete = () => {
    setToggleDeleteAcc(!toggleDeleteAcc);
  }

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
    }
  }

  const goal = (value) => {
    if (value === "gain") {
      return <>
              <p>gain muscle</p>
              <img src={gainIMG} style={{width: "100px"}} />
            </>
    } else if (value === "lose") {
      return <>
              <p>lose weight</p>
              <img src={loseIMG} style={{width: "100px"}} />
            </>
    }
  }

  return (
    <>
        <div className='plane-box' >
        <h1>PROFILE</h1>
        <img src={context.user.avatar} /> 
        <p>username: {context.user.username}</p>
        <p>name: {context.user.name}</p>
        <p>email: {context.user.email}</p>
        <p>birth date: {context.user.birthDate.slice(0, 10)}</p>
        <p>height: {context.user.height}</p>
        <p>weight: {context.user.weight}</p>
        <p>activity level: {activityLevel(context.user.activityLevel)}</p>
        <p><b>your goal is:</b></p>
        {goal(context.user.goal)}
        <Link to={"/edit-profile"}><button>Edit profile</button></Link>
        {!toggleDeleteAcc ? 
        <button onClick={handleToggleDelete}>Delete account</button>
        : (
          <>
            <p>Are you sure you want to delete your account?</p>
            <button onClick={handleToggleDelete}>Cancel</button>
            <button onClick={handleDeleteAcc}>Delete</button>
          </>
        )
        }
      </div>

      <div className='plane-box'>
          
          <h3>Charts</h3>

          <h5>Body work</h5>
          <label>Select chart</label>
          <select onChange={handleChangeChartBody} value={chartBody}>
            <option value="radar">Radar chart</option>
            <option value="bar">Bar chart</option>
            <option value="pie">Pie chart</option>
          </select>
          {chartBody === "bar" && <ChartBar info="body"/>}
          {chartBody === "radar" && <ChartRadar info="body"/>}
          {chartBody === "pie" && <ChartPie info="body"/>}

          <h5>Target muscle</h5>
          <label>Select chart</label>
          <select onChange={handleChangeChartMuscle} value={chartMuscle}>
            <option value="radar">Radar chart</option>
            <option value="bar">Bar chart</option>
            <option value="pie">Pie chart</option>
          </select>
          {chartMuscle === "bar" && <ChartBar info="muscle"/>}
          {chartMuscle === "pie" && <ChartPie info="muscle"/>}
          {chartMuscle === "radar" && <ChartRadar info="muscle"/>}

          <h5>Macros</h5>
          <label>Select chart</label>
          <select onChange={handleChangeChartMacro} value={chartMacro}>
            <option value="pie">Pie chart</option>
            <option value="bar">Bar chart</option>
            <option value="radar">Radar chart</option>
          </select>
          {chartMacro === "bar" && <ChartBar info="macro"/>}
          {chartMacro === "pie" && <ChartPie info="macro"/>}
          {chartMacro === "radar" && <ChartRadar info="macro"/>}

          <h5>Calories</h5>
          <ChartLine />
      </div>
        
    </>
  );
}

export default Profile;