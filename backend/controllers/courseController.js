const Course = require("../models/Course");

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
};

// Create new course
exports.createCourse = async (req, res) => {
  try {
    const { name, semester, department } = req.body;

    const newCourse = new Course({
      name,
      semester,
      department
    });

    await newCourse.save();

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: "Error creating course", error });
  }
};