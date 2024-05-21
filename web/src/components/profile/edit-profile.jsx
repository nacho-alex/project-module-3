import { useContext, useState } from "react";
import AuthContext from "../../contexts/auth.context";
import { Link, useNavigate } from "react-router-dom";
import exampleImg from '../../assets/3e79edd8850e4f1d73052f548f2f399d.jpg';
import gainIMG from '../../assets/gain.png';
import loseIMG from '../../assets/loseDES.png';
import imgBG from '../../assets/1446b5db-6afb-47a6-9949-d61105fbf62d.png';
import './edit-profile.css'




function EditProfile() {

    const context = useContext(AuthContext);
    const { doUpdate } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {
            email: context.user.email,
            avatar: context.user.avatar,
            avtScale: context.user.avtScale,
            weight: context.user.weight,
            height: context.user.height,
            activityLevel: context.user.activityLevel,
            goal: context.user.goal
        });
    
    const [scale, setScale] = useState(context.user.avtScale);
    const [avatarOpen, setAvatarOpen] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.currentTarget; 
        setFormData({...formData, [name]: value});
    }
    
      async function handleSubmit(event) {
        event.preventDefault();
        try {
            await doUpdate(formData);
            navigate("/profile");
        } catch (err) {
           console.log(err);
        }

      }
    
      const handleScale = (event) => {
        setScale(event.target.value);
        setFormData({ ...formData, avtScale: event.target.value});
      };
    
    const handleAvatarClick = (e) => {
        e.preventDefault();
        setAvatarOpen(!avatarOpen);
    }

    const handleActivitySelect = (activityLevel) => {
        setFormData({ ...formData, activityLevel });
    };

    const handleGoalSelect = (goal) => {
        setFormData({ ...formData, goal });
    };

  return (
    <div className="profile-page">
        <img className="infinite-bg" src={imgBG} alt="Background" />
        <Link className="back-btn" to={'/profile'}> <i className="fa-solid fa-arrow-left"></i> Back </Link>

        <div className="plane-box edit-box">

          <h1>EDIT PROFILE</h1>
         
          <form onSubmit={handleSubmit}>


        <div className="main-edit-profile">
        <div className="edit-pro-img">
                <div className="profile-img">
                    <div onClick={handleAvatarClick}  className="avatar-profile-overlay">
                        <i className="fa-solid fa-pencil"></i>
                    </div>
                    <img src={context.user.avatar} style={{ transform: `scale(${scale})`}} alt="Avatar" />
                </div>


                <div className="range-input">
                    <i className="fa-solid fa-magnifying-glass-minus"></i>
                    <input type="range" min="1" max="2" step="0.1" name='avtScale' value={scale} onChange={handleScale}/>
                    <i className="fa-solid fa-magnifying-glass-plus"></i>
                </div>
            </div>

            <div className="edit-pro-inps">
                <div className="input-group">
                    <input className={"avatarinput" + (avatarOpen ? " openinp" : "")} id='avatarinp' onChange={handleChange} name='avatar' type="text" value={formData.avatar} placeholder='Introduce an URL image...'/>
                </div>
                <div className="input-group">
                <label htmlFor="">E-mail</label>
                <i className="inp-icon fa-solid fa-envelope" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail address..."/>
                </div>
                <div className="input-group">
                <label htmlFor="">Height</label>
                <i className="inp-icon fa-solid fa-ruler-vertical" />
                <input type="number" name="height" value={formData.height} onChange={handleChange} min={0} placeholder="height (cm)"/>
                </div>
                <div className="input-group">
                <label htmlFor="">Weight</label>
                <i className="inp-icon fa-solid fa-weight-scale" />
                <input type="number"name="weight" value={formData.weight} onChange={handleChange} min={0} placeholder="weight (kg)"/>
                </div>
            </div>
        </div>
          
           <label className='activitylabel' htmlFor="genreinp"> Choose your daily activity level </label>
            <div className="activity-buttons">
                <button type='button'
                    className={`activity-button ${formData.activityLevel === '1.2' ? 'selected-btn-ac' : ''}`}
                    onClick={() => handleActivitySelect('1.2')}>
                    Sedentary
                </button>
                <button type='button'
                    className={`activity-button ${formData.activityLevel === '1.375' ? 'selected-btn-ac' : ''}`}
                    onClick={() => handleActivitySelect('1.375')}>
                    slightly active
                </button>
                <button type='button'
                    className={`activity-button ${formData.activityLevel === '1.55' ? 'selected-btn-ac' : ''}`}
                    onClick={() => handleActivitySelect('1.55')}>
                    Moderate
                </button>
                <button type='button'
                    className={`activity-button ${formData.activityLevel === '1.725' ? 'selected-btn-ac' : ''}`}
                    onClick={() => handleActivitySelect('1.725')}>
                    High
                </button>
                <button type='button'
                    className={`activity-button ${formData.activityLevel === '1.9' ? 'selected-btn-ac' : ''}`}
                    onClick={() => handleActivitySelect('1.9')}>
                    Very high
                </button>
            </div>

            <div className="edit-pro-goal">
                <label className="activitylabel"> Your goal </label>
                    <div className="goal-buttons">  
                        <div>
                                <button type='button'
                                    className={`goal-button ${formData.goal === 'gain' ? 'selected-btn-goal' : ''}`}
                                    onClick={() => handleGoalSelect('gain')}>
                                    <img src={gainIMG} alt="" />
                                </button>
                                <h2 className={`${formData.goal === 'gain' ? 'selected-btn-goal-text' : ''}`} >Gain muscle</h2>
                        </div> 
                        <div>
                                <button type='button'
                                    className={`goal-button ${formData.goal === 'lose' ? 'selected-btn-goal' : ''}`}
                                    onClick={() => handleGoalSelect('lose')} >
                                    <img src={loseIMG} alt="" />
                                </button>
                                <h2 className={`${formData.goal === 'lose' ? 'selected-btn-goal-text' : ''}`} >Lose weight</h2>
                        </div>
                    </div>                       
                </div>
            <div className="submit-edit-pro">
                 <button className='btn-green' type='submit'>Update</button>
            </div>
           
          </form>
    </div>
    </div>
  );
}

export default EditProfile;