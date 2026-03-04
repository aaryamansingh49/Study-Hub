const SavedCollection = require("../models/SavedCollection");
const User = require("../models/User");


// =====================
// SAVE WORKSHEET
// =====================

exports.saveWorksheet = async (req, res) => {

  const { email, worksheetId } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadySaved = await SavedCollection.findOne({
      user: user._id,
      worksheet: worksheetId
    });

    if (alreadySaved) {
      return res.json({ message: "Already saved" });
    }

    const saved = new SavedCollection({
      user: user._id,
      worksheet: worksheetId
    });

    await saved.save();

    res.json({ message: "Worksheet saved" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }

};



// =====================
// REMOVE WORKSHEET
// =====================

exports.removeWorksheet = async (req, res) => {

  const { email, worksheetId } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await SavedCollection.deleteOne({
      user: user._id,
      worksheet: worksheetId
    });

    res.json({ message: "Removed from saved" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }

};



// =====================
// GET USER SAVED WORKSHEETS
// =====================

exports.getUserSaved = async (req, res) => {

  try {

    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const saved = await SavedCollection
  .find({ user: user._id })
  .populate({
    path: "worksheet",
    populate: {
      path: "course"
    }
  });

    res.json(saved);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }

};