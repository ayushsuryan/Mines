const express = require("express");
const router = express.Router();
const { resultModel } = require("../db");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.put("/mines/start", authMiddleware, async (req, res) => {
  // const objectId = await resultModel.findOne({ id:  });

  await resultModel.updateOne({ id: req.userId }, { $set: { result: [1] } });

  res.status(200).json({
    message: "Game Started",
  });
});

router.post("/mines/open", (req, res) => {
  console.log(req);
});

module.exports = router;
