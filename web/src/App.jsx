import { Route, Routes } from "react-router-dom";
import './App.css'
import Login from './pages/login/login'
import Register from './pages/register/register'
import Home from "./pages/home/home";
import ListWorkout from "./pages/workout/workouts-list";
import CreateWorkout from "./pages/workout/workout-create";
import PrivateRoute from "./guards/private-route";
import { AlertProvider } from "./contexts/alert.context";
import Navbar from "./components/UI/navbar";
import Workoutdetail from "./pages/workout/workout-detail";

function App() {
  return (
    <>
    <AlertProvider>
        <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={ <PrivateRoute><Home/></PrivateRoute>} />
        <Route path="/create-workout" element={ <PrivateRoute><CreateWorkout/></PrivateRoute>} />
        <Route path="/list-workout" element={<PrivateRoute><ListWorkout/></PrivateRoute>}/>
        <Route path="/workout/:id" element={<PrivateRoute><Workoutdetail/></PrivateRoute>}/>

        </Routes>
    </AlertProvider>

    </>
  )
}

export default App
