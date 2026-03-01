const Course = require("../models/Course");

// GET Courses (with optional filters)
exports.getCourses = async (req, res) => {
  try {
    const { program, semester } = req.query;

    let filter = {};

    if (program) {
      filter.program = program;
    }

    if (semester) {
      filter.semester = semester;
    }

    const courses = await Course.find(filter).sort({ createdAt: -1 });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
};

// CREATE Course
exports.createCourse = async (req, res) => {
  try {
    const { program, semester, subject } = req.body;

    const newCourse = new Course({
      program,
      semester,
      subject
    });

    await newCourse.save();

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: "Error creating course", error });
  }
};