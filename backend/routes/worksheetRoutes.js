const express = require("express");
const router = express.Router();
const {
  getWorksheets,
  createWorksheet,
  incrementDownload
} = require("../controllers/worksheetController");

router.get("/", getWorksheets);
router.post("/", createWorksheet);
router.put("/:id/download", incrementDownload);

module.exports = router;