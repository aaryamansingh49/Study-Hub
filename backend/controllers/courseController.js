const Course = require("../models/Course");
const redisClient = require("../config/redis");

// GET Courses
exports.getCourses = async (req, res) => {
  try {

    const { program, semester } = req.query;
    const cacheKey = `courses:${program || "all"}:${semester || "all"}`;

    let cachedData;

    try {
      cachedData = await redisClient.get(cacheKey);
    } catch (err) {
      console.log("Redis read error:", err.message);
    }

    if (cachedData) {
      console.log("Cache Hit ✅");

      const data =
        typeof cachedData === "string"
          ? JSON.parse(cachedData)
          : cachedData;

      return res.status(200).json(data);
    }

    let filter = {};
    if (program) filter.program = program;
    if (semester) filter.semester = semester;

    const courses = await Course.find(filter).sort({ createdAt: -1 });

    try {
      await redisClient.set(cacheKey, JSON.stringify(courses), { ex: 3600 });
    } catch (err) {
      console.log("Redis write error:", err.message);
    }

    console.log("MongoDB Hit ❌");

    res.status(200).json(courses);

  } catch (error) {
    console.log("Controller error:", error);
    res.status(500).json({
      message: "Error fetching courses"
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

    // 🔥 Clear related course cache
    await redisClient.del(`courses:${program || "all"}:${semester || "all"}`);
    await redisClient.del(`courses:${program || "all"}:all`);
    await redisClient.del(`courses:all:${semester || "all"}`);
    await redisClient.del(`courses:all:all`);

    res.status(201).json(newCourse);

  } catch (error) {
    res.status(500).json({
      message: "Error creating course",
      error
    });
  }
};