const express = require("express");
const router = express.Router();
const { userModel } = require("../db");
const { balanceModel } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const userInputValidation = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

//Signin

router.post("/signin", async (req, res) => {
  const { success } = userInputValidation.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: "Invalid Input" });
  }

  const user = await userModel.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (!user) {
    return res.status(401).json({ message: "User Not Found" });
  }

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET,
      { expiresIn: "30m" }
    );
    res.json({
      token: token,
    });
    return;
  }
});

//Signup

router.post("/signup", async (req, res) => {
  const { success } = userInputValidation.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: "Invalid Input" });
  }

  const existingUser = await userModel.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(401).json({ message: "Email already in Usage" });
  }

  const user = await userModel.create({
    username: req.body.username,
    password: req.body.password,
  });
  const userId = user._id;

  await balanceModel.create({
    id: userId,
    balance: 1000,
  });
  res.status(200).json({ message: "Account created successfully." });
});

module.exports = router;
