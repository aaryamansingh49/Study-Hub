const mongoose = require("mongoose");

const savedCollectionSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  worksheet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worksheet",
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("SavedCollection", savedCollectionSchema);