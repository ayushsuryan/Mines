const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

const balanceSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const resultSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  result: {
    type: Array,
    required: true,
  },
});

const successRateSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  result: {
    type: Array,
    required: true,
  },
});

const userModel = new mongoose.model("userSchema", userSchema);
const balanceModel = new mongoose.model("balanceSchema", balanceSchema);
const resultModel = new mongoose.model("resultSchema", resultSchema);
const successRateModel = new mongoose.model(
  "successRateSchema",
  successRateSchema
);

module.exports = { userModel, balanceModel, resultModel, successRateModel };
