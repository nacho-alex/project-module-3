const express = require("express");
const router = express.Router();
const user = require('../controllers/user.controller');
const auth = require("../middlewares/auth.middleware");
const exercise = require("../controllers/exercise.controller");
const food= require("../controllers/food.controller");
const recipe = require("../controllers/recipes.controller");
const workout = require("../controllers/workout.controller");
const planning = require("../controllers/planning.controller");
const calendarEntry = require("../controllers/calendarEntry.controller");

// CRUD USER
// router.post("/login", user.login);
router.post("/users", user.create);

router.get("/users/:id", auth.checkAuth, user.profile);
router.patch("/users/:id", auth.checkAuth, user.update);
router.delete("users/:id", auth.checkAuth, user.delete);

router.get("/exercises", auth.checkAuth, exercise.list);
router.get("/exercises/:id", auth.checkAuth, exercise.detail);

router.get("/foods", auth.checkAuth, food.list);
router.get("/foods/:id", auth.checkAuth, food.list);

router.post("/recipes", auth.checkAuth, recipe.create);
router.get("/recipes", auth.checkAuth, recipe.list);
router.get("/recipes/:id", auth.checkAuth, recipe.detail);
router.patch("/recipes/:id", auth.checkAuth, recipe.update);
router.delete("recipes/:id", auth.checkAuth, recipe.delete);

router.post("/workouts", auth.checkAuth, workout.create);
router.get("/workouts", auth.checkAuth, workout.list);
router.get("/workouts/:id", auth.checkAuth, workout.detail);
router.patch("/workouts/:id", auth.checkAuth, workout.update);
router.delete("workouts/:id", auth.checkAuth, workout.delete);

router.post("/plannings", auth.checkAuth, planning.create);
router.delete("plannings/:id", auth.checkAuth, planning.delete);

router.post("/calendar-entries", auth.checkAuth, calendarEntry.create);
router.get("/calendar-entries/:id", auth.checkAuth, calendarEntry.detail);
router.patch("/calendar-entries/:id", auth.checkAuth, calendarEntry.edit);

module.exports = router;