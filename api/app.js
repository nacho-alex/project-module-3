require("dotenv").config();
require("./configs/db.config");
const express = require("express");
const router = require("./configs/routes.config")
const cors = require("./middlewares/cors.middleware");
const app = express();

app.use(express.json());
app.use(cors);

app.use('/api/v1', router)

app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
  });
  
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`Application running at port ${port}`));