const Worksheet = require("../models/Worksheet");
const redisClient = require("../config/redis");
const fs = require("fs");
const path = require("path");

// Get all worksheets
exports.getWorksheets = async (req, res) => {
  try {

    const cacheKey = "worksheets:all";

    const cached = await redisClient.get(cacheKey);

    if (cached) {
      console.log("Redis Cache Hit");
      return res.status(200).json(JSON.parse(cached));
    }

    const worksheets = await Worksheet.find()
      .populate("course")
      .sort({ worksheetNumber: 1, title: 1 });

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(worksheets));

    console.log("MongoDB Hit");

    res.status(200).json(worksheets);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching worksheets",
      error: error.message
    });
  }
};


// Get worksheets by course
exports.getWorksheetsByCourse = async (req, res) => {
  try {

    const courseId = req.params.courseId;

    const cacheKey = `worksheets:course:${courseId}`;

    const cached = await redisClient.get(cacheKey);

    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const worksheets = await Worksheet.find({
      course: courseId
    }).sort({ worksheetNumber: 1, title: 1 });

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(worksheets));

    res.status(200).json(worksheets);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching course worksheets",
      error
    });
  }
};


// Get worksheet groups
exports.getWorksheetGroups = async (req, res) => {
  try {

    const { courseId } = req.params;

    const worksheets = await Worksheet.find({
      course: courseId
    })
      .sort({ worksheetNumber: 1 });

    res.json(worksheets);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get worksheets by worksheetNumber
exports.getWorksheetsByGroup = async (req, res) => {
  try {

    const { courseId, number } = req.params;

    const worksheets = await Worksheet.find({
      course: courseId,
      worksheetNumber: number
    })
      .sort({ title: 1 });

    res.json(worksheets);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Create worksheet
exports.createWorksheet = async (req, res) => {
  try {

    const { courseId, fileUrl } = req.body;

    const worksheet = new Worksheet({
      course: courseId,
      fileUrl
    });

    await worksheet.save();

    res.status(201).json(worksheet);

  } catch (error) {
    res.status(500).json({
      message: "Error creating worksheet",
      error
    });
  }
};


// Increase download count
exports.incrementDownload = async (req, res) => {
  try {

    const worksheet = await Worksheet.findById(req.params.id);

    if (!worksheet) {
      return res.status(404).json({
        message: "Worksheet not found"
      });
    }

    worksheet.downloads += 1;

    await worksheet.save();

    res.status(200).json({
      message: "Download count updated",
      worksheet
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating download count",
      error
    });
  }
};


// Get Recent Worksheets (Homepage)
exports.getRecentCoursesWithWorksheets = async (req, res) => {
  try {

    const cacheKey = "worksheets:recentCourses";

    const cached = await redisClient.get(cacheKey);

    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const recentWorksheets = await Worksheet.find()
      .sort({ createdAt: 1 })
      .populate("course");

    const uniqueCourses = [];
    const seen = new Set();

    for (let ws of recentWorksheets) {
      if (!seen.has(ws.course._id.toString())) {
        seen.add(ws.course._id.toString());
        uniqueCourses.push(ws.course);
      }
    }

    const result = uniqueCourses.slice(0, 6);

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(result));

    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching recent courses",
      error: error.message
    });
  }
};

// Upload Worksheet
exports.uploadWorksheet = async (req, res) => {
  try {

    const { courseId, worksheetNumber } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "At least one PDF required"
      });
    }

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const existingWorksheets = await Worksheet.find({
      course: courseId,
      worksheetNumber: worksheetNumber
    });

    // find already used letters
    const usedLetters = existingWorksheets.map(ws =>
      ws.title.replace("Set ", "")
    );

    // available letters
    const availableLetters = alphabet.filter(
      letter => !usedLetters.includes(letter)
    );

    if (req.files.length > availableLetters.length) {
      return res.status(400).json({
        message: "Variant limit exceeded (max 26)"
      });
    }

    const sortedFiles = req.files.sort((a, b) =>
      a.originalname.localeCompare(b.originalname)
    );

    const newWorksheets = [];

    for (let i = 0; i < sortedFiles.length; i++) {

      const file = sortedFiles[i];
      const variantLetter = availableLetters[i];

      const worksheet = await Worksheet.create({
        course: courseId,
        worksheetNumber: worksheetNumber,
        title: `Set ${variantLetter}`,
        fileUrl: `uploads/${file.filename}`
      });

      newWorksheets.push(worksheet);
    }

    // Clear redis cache once
    await redisClient.flushAll();

    res.status(201).json({
      message: "Worksheet Uploaded Successfully",
      worksheets: newWorksheets
    });

  } catch (error) {
    res.status(500).json({
      message: "Error uploading worksheet",
      error: error.message
    });
  }
};


exports.deleteWorksheet = async (req, res) => {
  try {

    const worksheet = await Worksheet.findById(req.params.id);

    if (!worksheet) {
      return res.status(404).json({
        message: "Worksheet not found"
      });
    }

    // file ka full path
    const filePath = path.join(__dirname, "..", worksheet.fileUrl);

    // agar file exist karti hai to delete karo
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // DB se delete
    await Worksheet.findByIdAndDelete(req.params.id);

    // Redis cache clear
    await redisClient.flushAll();

    res.json({
      message: "Worksheet deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting worksheet",
      error: error.message
    });
  }
};