const Worksheet = require("../models/Worksheet");

// Get all worksheets
exports.getWorksheets = async (req, res) => {
  try {
    const worksheets = await Worksheet.find().sort({ createdAt: -1 });
    res.status(200).json(worksheets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching worksheets", error });
  }
};

// Create worksheet
exports.createWorksheet = async (req, res) => {
  try {
    const { subject, semester, fileUrl } = req.body;

    const newWorksheet = new Worksheet({
      subject,
      semester,
      fileUrl
    });

    await newWorksheet.save();

    res.status(201).json(newWorksheet);
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