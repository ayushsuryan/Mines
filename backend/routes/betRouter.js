const express = require("express");
const router = express.Router();
const { resultModel, successRateModel, balanceModel } = require("../db");
const { authMiddleware } = require("../middlewares/authMiddleware");

function generateRandomArray(numOnes) {
  if (numOnes > 25 || numOnes < 0) {
    throw new Error("Input must be between 0 and 25");
  }
  let arr = Array(25).fill(0);
  let onesAdded = 0;
  while (onesAdded < numOnes) {
    let randomIndex = Math.floor(Math.random() * 25);
    if (arr[randomIndex] === 0) {
      arr[randomIndex] = 1;
      onesAdded++;
    }
  }
  return arr;
}

//Starting Game

router.put("/mines/start", authMiddleware, async (req, res) => {
  const noOfMines = req.query.mines;
  await resultModel.updateOne(
    { id: req.userId },
    { $set: { result: generateRandomArray(noOfMines) } }
  );

  res.status(200).json({
    message: "Game Started",
  });
});

//Opening Mines

router.post("/mines/open", authMiddleware, async (req, res) => {
  const tileSelected = req.body.mineId;
  const objectId = await resultModel.findOne({
    id: req.userId,
  });
  const resultInDb = await resultModel.aggregate([
    {
      $match: {
        _id: objectId._id,
      },
    },
    {
      $project: {
        nthElement: { $arrayElemAt: ["$result", tileSelected - 1] },
      },
    },
  ]);
  const outcome = 1 == resultInDb[0].nthElement ? true : false;
  await successRateModel.updateOne(
    { id: req.userId },
    { $push: { result: outcome } }
  );
  if (outcome) {
    await successRateModel.updateOne(
      { id: req.userId },
      { $set: { result: [] } }
    );
    await resultModel.updateOne({ id: req.userId }, { $set: { result: [] } });
  }
  res.send(outcome);
});

//Cashing Out
router.post("/mines/end", authMiddleware, async (req, res) => {
  const successRateCheck = await successRateModel.findOne({
    id: req.userId,
  });
  const results = successRateCheck.result;
  let failureChecks = false;

  for (let i = 0; i < results.length; i++) {
    if (results[i] !== false) {
      failureChecks = true;
      break;
    }
  }

  if (!failureChecks) {
    const currentBalanceUser = await balanceModel.findOne({
      id: req.userId,
    });
    const balance = currentBalanceUser.balance;
    await balanceModel.updateOne(
      { id: req.userId },
      { $set: { balance: balance * (results.length + 1) } }
    );
  }

  res.status(200).json({
    message: "success",
  });
});

module.exports = router;
