const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const mainRouter = require("./routes/mainRouter.js");

app.use("/v1", mainRouter);

app.listen(3000);
