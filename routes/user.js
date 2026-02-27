const express = require("express");
const router = express.Router();
const User = require("../models/user");

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.setHeader("x-myName", "garima");
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// CREATE user
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, jobTittle, gender } = req.body;

    if (!firstName || !email || !jobTittle) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      jobTittle,
      gender,
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {

    return res.status(500).json({ error: err.message });
  }
});

// UPDATE user
router.patch("/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    return res.json({ status: "updated" }); 
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "deleted" });
  }
  catch (err) {
    return res.status(500).json({ error: err.message });
  }  
});

module.exports = router;
