const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Mongo Connected"))
.catch(err => console.log("Mongo Error:", err));

const createAdmin = async () => {
  try {

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword
    });

    console.log("Admin Created Successfully");
    process.exit();

  } catch (err) {
    console.log("Error:", err);
  }
};

createAdmin();