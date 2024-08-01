const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ayush:Ayush%408962@cluster0.6rwkptj.mongodb.net/Mines-User",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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

const userModel = new mongoose.model("userSchema", userSchema);

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

const balanceModel = new mongoose.model("balanceSchema", balanceSchema);

module.exports = { userModel, balanceModel };
