require("dotenv").config();

const express = require("express");
const cors = require("./middlewares/cors.middleware");

require("./configs/db.config");

const app = express();

// Middlewares

app.use(express.json());
app.use(cors);

// Routes
app.use("/api/v1", require("./configs/routes.config"));


const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`Application running at port ${port}`));