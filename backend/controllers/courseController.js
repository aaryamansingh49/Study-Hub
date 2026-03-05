const Course = require("../models/Course");
const redisClient = require("../config/redis");

// GET Courses
exports.getCourses = async (req, res) => {
  try {

    const { program, semester } = req.query;

    const cacheKey = `courses:${program || "all"}:${semester || "all"}`;

    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Cache Hit ✅");
      return res.status(200).json(JSON.parse(cachedData));
    }

    let filter = {};

    if (program) {
      filter.program = program;
    }

    if (semester) {
      filter.semester = semester;
    }

    const courses = await Course.find(filter).sort({ createdAt: -1 });

    await redisClient.setEx(
      cacheKey,
      3600,
      JSON.stringify(courses)
    );

    console.log("MongoDB Hit ❌");

    res.status(200).json(courses);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching courses",
      error
    });
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

    // 🔥 Clear cache when new course added
    await redisClient.flushAll();

    res.status(201).json(newCourse);

  } catch (error) {
    res.status(500).json({
      message: "Error creating course",
      error
    });
  }
};