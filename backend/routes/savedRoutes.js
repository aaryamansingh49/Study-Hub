const express = require("express");
const router = express.Router();

const {
  saveWorksheet,
  removeWorksheet,
  getUserSaved
} = require("../controllers/savedController");


// SAVE WORKSHEET
router.post("/save", saveWorksheet);


// REMOVE WORKSHEET
router.post("/remove", removeWorksheet);


// GET USER SAVED WORKSHEETS
router.get("/user/:email", getUserSaved);


module.exports = router;