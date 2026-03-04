const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/google-login", async (req, res) => {

  const { name, email, photo, uid } = req.body;

  try {

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        photo,
        uid
      });

      await user.save();
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }

});

module.exports = router;