const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    program: {
      type: String,
      required: true
    },
    semester: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);