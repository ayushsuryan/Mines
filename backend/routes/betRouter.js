const express = require("express");
const router = express.Router();
const { resultModel } = require("../db");
const { authMiddleware } = require("../middlewares/authMiddleware");

function generateRandomArray(numOnes) {
  if (numOnes > 25 || numOnes < 0) {
    throw new Error("Input must be between 0 and 25");
  }

  // Create an array with 25 zeros
  let arr = Array(25).fill(0);

  // Add numOnes 1s at random positions
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

router.put("/mines/start", authMiddleware, async (req, res) => {
  // http://localhost:3000/v1/bet/mines/start?mines=4
  const noOfMines = req.query.mines;
  await resultModel.updateOne(
    { id: req.userId },
    { $set: { result: generateRandomArray(noOfMines) } }
  );

  res.status(200).json({
    message: "Game Started",
  });
});

router.get("/mines/open", async (req, res) => {
  const tileSelected = req.body.mineId;
  const resultInDb = await resultModel.aggregate([
    {
      $project: {
        nthElement: { $arrayElemAt: ["$result", tileSelected - 1] },
      },
    },
  ]);
  const outcome = 1 == resultInDb[0].nthElement ? false : true;
  res.send(outcome);
});

module.exports = router;
