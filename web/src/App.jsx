import { Route, Routes } from "react-router-dom";
import './App.css';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile.jsx"
import ListWorkout from "./pages/workout/workout-list/workouts-list";
import CreateWorkout from "./pages/workout/workout-create/workout-create";
import PrivateRoute from "./guards/private-route";
import { AlertProvider } from "./contexts/alert.context";
import Workoutdetail from "./pages/workout/workout-detail/workout-detail";
import ExercisesPage from "./pages/exercises/ExercisesPage";
import EditWorkout from "./pages/workout/workout-edit/workout-edit";
import SearchFood from "./components/food/search-food/search-food";
import CreateRecipe from "./pages/recipes/recipe-create/recipe-create";
import ListRecipe from "./pages/recipes/recipe-list/recipe-list";
// import RecipeDetail from "./pages/recipes/recipe-detail/recipe-detail";
import Page404 from "./pages/page404/page404";
import Footer from "./components/UI/footer/footer";
import PageLayout from "./layouts/PageLayout";
import CalendarPage from "./pages/calendar/calendar";
import EditProfile from "./components/profile/edit-profile.jsx";


function App() {
  return (
    <>
    <AlertProvider>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={ <PrivateRoute><PageLayout><Home/></PageLayout></PrivateRoute>} />
          <Route path="/create-workout" element={ <PrivateRoute><PageLayout><CreateWorkout/></PageLayout></PrivateRoute>} />
          <Route path="/list-workout" element={<PrivateRoute><PageLayout><ListWorkout/></PageLayout></PrivateRoute>}/>
          <Route path="/workout/:id" element={<PrivateRoute><PageLayout ><Workoutdetail/></PageLayout></PrivateRoute>}/>
          <Route path="/edit-workout/:id" element={<PrivateRoute><PageLayout><EditWorkout/></PageLayout></PrivateRoute>}/>
          <Route path="/search-exercises" element={<PrivateRoute><PageLayout><ExercisesPage/></PageLayout></PrivateRoute> } />
          <Route path="/list-recipe" element={<PrivateRoute><ListRecipe/></PrivateRoute>}/>
          <Route path="/create-recipe" element={<PrivateRoute><CreateRecipe/></PrivateRoute>} />
          <Route path="/search-food" element={<PrivateRoute><SearchFood/></PrivateRoute>} />
          <Route path="/calendar" element={<PrivateRoute><PageLayout ><CalendarPage/></PageLayout></PrivateRoute>}/> 
          <Route path="/profile" element={<PrivateRoute><PageLayout ><Profile/></PageLayout></PrivateRoute>}/>
          <Route path="/edit-profile" element={<PrivateRoute><PageLayout ><EditProfile/></PageLayout></PrivateRoute>}/>
          <Route path="/*" element={<Page404/>} />
        </Routes>
    </AlertProvider>

    

    </>
  )
}

export default App
