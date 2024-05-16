import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

http.interceptors.request.use(function (config) {
  config.headers.authorization = `BEARER ${localStorage.getItem("token")}`;
  return config;
});


// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response.status === 401 &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      // navigate refreshing page
      localStorage.removeItem("token");
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export function createUser(data) {
    return http.post("/users", data)
      .catch(error => {
        if (error.response.status === 400) {
          const errorMessage = error.response.data.message || "Error occurred"; 
          throw new Error(errorMessage); 
        } else {
          throw error; 
        }
      });
  }

export function login(data) {
  return http.post("/login", data)
  .then((response) => {
    localStorage.setItem("token", response.data.accessToken);
    return response;
  })
    .catch((err) => {
      console.log(err)
    })
  
}

export function getProfile() {
  return http.get("/profile");
}

export function logout() {
  localStorage.removeItem("token");
}

export function createWorkout(data) {
  return http.post("/workouts", data)
      .catch(error => {
        if (error) {
          const errorMessage = error.response.data.message || "Error occurred"; 
          throw new Error(errorMessage); 
        } else {
          throw error; 
        }
      });
}

export function getExercises() {
  return http.get("/exercises");
}

export function getWorkouts() {
  return http.get("/workouts");
}

export function postPlan(data) {
  return http.patch("/profile", data)
      .catch(error => {
        if (error) {
          const errorMessage = error.response.data.message || "Error occurred"; 
          throw new Error(errorMessage); 
        } else {
          throw error; 
        }
      });
}

export function updateWorkout(params, data) {
  return http.patch(`/workouts/${params.id}`, data)
      .catch(error => {
        if (error) {
          const errorMessage = error.response.data.message || "Error occurred"; 
          throw new Error(errorMessage); 
        } else {
          throw error; 
        }
      });
}


export function getWorkout(params) {
  return http.get(`/workouts/${params.id}`)
}

export function getPlanning(params) {
  console.log(params)
  return http.get(`/workouts/${params}`)
}

export function delWorkout(id) {
  return http.delete(`/workouts/${id}`)
}

export function getFoods() {
  return http.get("/foods");
}

export function createRecipe(data) {
  return http.post("/recipes", data)
      // .catch(error => {
      //   if (error) {
      //     const errorMessage = error.response.data.message || "Error occurred"; 
      //     throw new Error(errorMessage); 
      //   } else {
      //     throw error; 
      //   }
      // });
}

export function getRecipes() {
  return http.get("/recipes");
}



export function updateEntry(data) {
  
  return http.post("/calendar-entries", data);
}