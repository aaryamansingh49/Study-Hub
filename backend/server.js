const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
const path = require("path");
require("./config/redis");
const app = express();
const cors = require("cors");
// Middleware

app.use(cors({
  origin:   "http://localhost:5173",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));
app.options("*", cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const courseRoutes = require("./routes/courseRoutes");
const worksheetRoutes = require("./routes/worksheetRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const savedRoutes = require("./routes/savedRoutes");



app.use("/api/courses", courseRoutes);
app.use("/api/worksheets", worksheetRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/saved", savedRoutes);

// Static folder for PDFs
// app.use("/uploads", express.static("uploads"));
// MongoDB Atlas Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected ✅"))
  .catch((err) => console.log("DB Error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("StudyHub Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});