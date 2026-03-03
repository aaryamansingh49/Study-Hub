const express = require("express");
const router = express.Router();

const worksheetController = require("../controllers/worksheetController");

const {
  getRecentCoursesWithWorksheets,
  getWorksheets,
  getWorksheetsByCourse,
  getWorksheetGroups,
  getWorksheetsByGroup,
  incrementDownload,
  uploadWorksheet
} = worksheetController;

const protectAdmin = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Public Routes
router.get("/recent-courses", getRecentCoursesWithWorksheets);
router.get("/", getWorksheets);
router.get("/course/:courseId", getWorksheetsByCourse);

// 🔥 NEW GROUP ROUTES
router.get("/groups/:courseId", getWorksheetGroups);
router.get("/group/:courseId/:number", getWorksheetsByGroup);

router.put("/:id/download", incrementDownload);

// Admin Upload
router.post(
  "/upload",
  protectAdmin,
  upload.array("files"),
  uploadWorksheet
);

module.exports = router;