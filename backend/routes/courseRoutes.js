    const express = require("express");
    const router = express.Router();

    const { getCourses, createCourse } = require('../controllers/courseController');
    router.get("/", getCourses);
    router.get("/recent", async (req, res) => {
        try {
      
          const courses = await Course
            .find()
            .sort({ createdAt: -1 })
            .limit(6);
      
          res.json(courses);
      
        } catch (error) {
          res.status(500).json({ message: "Server error" });
        }
      });
    
    router.post("/", createCourse);
   
    module.exports = router;