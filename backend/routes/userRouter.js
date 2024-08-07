require("dotenv").config();
const express = require("express");
const router = express.Router();
const {
  userModel,
  resultModel,
  balanceModel,
  successRateModel,
} = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middlewares/authMiddleware");

const userInputValidation = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

// Signin

router.post("/signin", async (req, res) => {
  const { success } = userInputValidation.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: "Invalid Input" });
  }

  try {
    const user = await userModel.findOne({
      username: req.body.username,
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    if (req.body.password !== user.password) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );
    res.json({
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Signup

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

  try {
    const user = await userModel.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password, // Store plain text password
    });
    const userId = user._id;

    await balanceModel.create({
      id: userId,
      balance: 1000,
    });

    await resultModel.create({
      id: userId,
      result: [],
    });
    await successRateModel.create({
      id: userId,
      result: [],
    });

    res.status(200).json({ message: "Account created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Get UserBalance

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const accountBalanceUser = await balanceModel.findOne({
      id: req.userId,
    });
    return res.status(200).json({ message: accountBalanceUser.balance });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
