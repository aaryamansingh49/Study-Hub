const Worksheet = require("../models/Worksheet");

// Get all worksheets
exports.getWorksheets = async (req, res) => {
  try {

    // 🔥 If IDs are provided (Saved Collection use-case)
    if (req.query.ids) {
      const idsArray = req.query.ids.split(",");

      const worksheets = await Worksheet.find({
        _id: { $in: idsArray }
      })
      .populate("course")   // ✅ YAHI ADD KARNA THA
      .sort({ createdAt: -1 });

      return res.status(200).json(worksheets);
    }

    // 🔥 Normal fetch (All Worksheets)
    const worksheets = await Worksheet.find()
      .populate("course")   // ✅ Isme bhi daal do future safety ke liye
      .sort({ createdAt: -1 });

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
    console.log("Incoming Course ID:", req.params.courseId);

    const worksheets = await Worksheet.find({
      course: req.params.courseId
    });

    console.log("Found Worksheets:", worksheets);

    res.status(200).json(worksheets);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching course worksheets",
      error
    });
  }
};


// Get unique worksheet numbers (groups)
exports.getWorksheetGroups = async (req, res) => {
  try {
    const { courseId } = req.params;

    const groups = await Worksheet.distinct("worksheetNumber", {
      course: courseId
    });

    res.json(groups.sort((a, b) => a - b));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get worksheets inside one group
exports.getWorksheetsByGroup = async (req, res) => {
  try {
    const { courseId, number } = req.params;

    const worksheets = await Worksheet.find({
      course: courseId,
      worksheetNumber: number
    });

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
    res.status(500).json({ message: "Error creating worksheet", error });
  }
};

// Increase download count
exports.incrementDownload = async (req, res) => {
  try {
    const worksheet = await Worksheet.findById(req.params.id);

    if (!worksheet) {
      return res.status(404).json({ message: "Worksheet not found" });
    }

    worksheet.downloads += 1;
    await worksheet.save();

    res.status(200).json({ message: "Download count updated", worksheet });
  } catch (error) {
    res.status(500).json({ message: "Error updating download count", error });
  }
};



// Get Recent Worksheets (Homepage use)
exports.getRecentCoursesWithWorksheets = async (req, res) => {
  try {
    const recentWorksheets = await Worksheet.find()
      .sort({ createdAt: -1 })
      .populate("course");

    // Unique courses nikalna
    const uniqueCourses = [];
    const seen = new Set();

    for (let ws of recentWorksheets) {
      if (!seen.has(ws.course._id.toString())) {
        seen.add(ws.course._id.toString());
        uniqueCourses.push(ws.course);
      }
    }

    res.status(200).json(uniqueCourses.slice(0, 6)); // latest 6 courses
  } catch (error) {
    res.status(500).json({
      message: "Error fetching recent courses",
      error: error.message
    });
  }
};


//Upload Worksheet
exports.uploadWorksheet = async (req, res) => {
  try {
    const { courseId, worksheetNumber, title } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "PDF required" });
    }

    const fileUrl = `uploads/${req.file.filename}`;

    const worksheet = await Worksheet.create({
      course: courseId,
      worksheetNumber,
      title,
      fileUrl
    });

    res.status(201).json({
      message: "Worksheet Uploaded",
      worksheet
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};