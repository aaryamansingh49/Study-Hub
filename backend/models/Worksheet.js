const mongoose = require("mongoose");

const worksheetSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true
    },
    semester: {
      type: String,
      required: true
    },
    fileUrl: {
      type: String,
      required: true
    },
    downloads: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Worksheet", worksheetSchema);