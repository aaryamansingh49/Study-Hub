const Course = require("../models/Course");
let redisClient;

try {
  redisClient = require("../config/redis");
} catch {
  console.log("Redis not available, running without cache");
}

// GET Courses
exports.getCourses = async (req, res) => {
  try {

    const { program, semester } = req.query;
    const cacheKey = `courses:${program || "all"}:${semester || "all"}`;

    // try cache
    if (redisClient) {
      try {
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
          console.log("Cache Hit ✅");
          return res.status(200).json(JSON.parse(cachedData));
        }

      } catch (err) {
        console.log("Redis read error:", err.message);
      }
    }

    let filter = {};
    if (program) filter.program = program;
    if (semester) filter.semester = semester;

    const courses = await Course.find(filter).sort({ createdAt: -1 });

    // save cache
    if (redisClient) {
      try {
        await redisClient.set(cacheKey, JSON.stringify(courses), { EX: 3600 });
      } catch (err) {
        console.log("Redis write error:", err.message);
      }
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