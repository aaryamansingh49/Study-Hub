const Worksheet = require("../models/Worksheet");


// Get all worksheets
exports.getWorksheets = async (req, res) => {
  try {

    // If IDs are provided (Saved Collection use-case)
    if (req.query.ids) {
      const idsArray = req.query.ids.split(",");

      const worksheets = await Worksheet.find({
        _id: { $in: idsArray }
      })
        .populate("course")
        .sort({ worksheetNumber: 1, title: 1 });

      return res.status(200).json(worksheets);
    }

    // Normal fetch (All Worksheets)
    const worksheets = await Worksheet.find()
      .populate("course")
      .sort({ worksheetNumber: 1, title: 1 });

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

    const worksheets = await Worksheet.find({
      course: req.params.courseId
    })
      .sort({ worksheetNumber: 1, title: 1 });

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

    res.status(200).json(uniqueCourses.slice(0, 6));

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

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const existingWorksheets = await Worksheet.find({
      course: courseId,
      worksheetNumber: worksheetNumber
    });

    const startIndex = existingWorksheets.length;

    const sortedFiles = req.files.sort((a, b) =>
      a.originalname.localeCompare(b.originalname)
    );

    for (let i = 0; i < sortedFiles.length; i++) {

      const file = sortedFiles[i];

      const variantIndex = startIndex + i;

      if (variantIndex >= alphabet.length) {
        return res.status(400).json({
          message: "Variant limit exceeded (max 26)"
        });
      }

      const variantLetter = alphabet[variantIndex];

      await Worksheet.create({
        course: courseId,
        worksheetNumber: worksheetNumber,
        title: `Set ${variantLetter}`,
        fileUrl: `uploads/${file.filename}`
      });

    }

    res.status(201).json({
      message: "Worksheet Uploaded Successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error uploading worksheet",
      error: error.message
    });
  }
};