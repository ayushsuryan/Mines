const express = require("express");
const router = express.Router();

router.post("/mines", (req, res) => {
  console.log(req);
});

module.exports = router;
