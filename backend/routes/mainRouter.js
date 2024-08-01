const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const betRouter = require("./betRouter");

router.use("/user", userRouter);
router.use("/bet", betRouter);

module.exports = router;
