const Course = require("../models/Course");
const Worksheet = require("../models/Worksheet");

exports.getDashboardStats = async (req, res) => {
  try {

    const worksheetCount = await Worksheet.countDocuments();

    // 🔥 Program Count (MCA, BCA, BTech)
    const programCount = (await Course.distinct("program")).length;

    // 🔥 Subject Count
    const subjectCount = await Course.countDocuments();

    res.json({
      worksheetCount,
      programCount,
      subjectCount
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};