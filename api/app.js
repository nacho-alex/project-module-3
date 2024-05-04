require("dotenv").config();

const express = require("express");

require("./configs/db.config");

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`Application running at port ${port}`));