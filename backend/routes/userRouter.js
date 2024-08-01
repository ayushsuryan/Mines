const express = require("express");
const router = express.Router();
const { userModel } = require("../db");
const { balanceModel } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: "Invalid Input" });
  }

  const user = await userModel.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      "secretKey",
      { expiresIn: "30m" }
    );
    res.json({
      token: token,
    });
    return;
  } else {
    const user = await userModel.create({
      username: req.body.username,
      password: req.body.password,
    });
    const userId = user._id;

    await balanceModel.create({
      userId,
      balance: Math.floor(1 + Math.random() * 10000),
    });
  }
});

module.exports = router;
