import axios from "axios";

const http = axios.create({
  baseURL:  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
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

  export function updateUser(data) {
    return http.patch("/profile", data)
      .catch(error => console.log(error));
  }

export function login(data) {
  return http.post("/login", data)
  .then((response) => {
    localStorage.setItem("token", response.data.accessToken);
    return response;
  })
    .catch((err) => {
      throw error
    })
  
}

export function getProfile() {
  return http.get("/profile");
}

export function logout() {
  localStorage.removeItem("token");
}

export function deleteUser(id) {
  return http.delete(`/profile/${id}`)
      .then(() => localStorage.removeItem("token"))
      .catch(err => console.log(err))
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

// export function getRecipe(params) {
//   return http.get(`/recipes/${params.id}`)
// }

export function updateEntry(data) {
  return http.post("/calendar-entries", data);
}

export function getEntry() {
  return http.get(`/calendar-entries`);
}

export function deleteEntry(data) {
     return http.post('/entries-edit', data)
 
}

export function getCalendarEntry(ownerId, date) {
  if (date) {
    return http.get(`/calendar-data/${ownerId}?date=${date}`);
  } else {
    return http.get(`/calendar-data/${ownerId}`);
  }
}

export function getCalendarLineChart(ownerId, exerciseId) {
  return http.get(`/calendar-data/${ownerId}?exercise=${exerciseId}`);
}

export function getCalendarDataChart(ownerId, chartInfo) {
  return http.get(`/calendar-data/chart/${ownerId}?info=${chartInfo}`);
}

export function submitNewMeal(data) {
  return http.post('/new-meal', data)
}

export function submitNewDayMeal(data) {
  return http.post('/new-daymeal', data)
}

export function deleteDayMeal() {
  return http.get('/del-daymeal')
}

export function getMyMeals() {
  return http.get('/mymeals')
}

export function deleteMeal(name) {
  
  return http.delete(`/meals/${name}`)
}

export function getHistory() {
  return http.get("/foods-history")
}