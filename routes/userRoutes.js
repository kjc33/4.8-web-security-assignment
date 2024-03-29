const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

// POST - /register - Register New User
router.post("/register", async (req, res) => {
  try {
    // Define Salt Rounds
    const saltRounds = 10;

    // Hash the Password
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create the User
    const user = await User.create({
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    // Send the User Back
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while registering the user.");
  }
});

// POST - /login - Login Existing User
router.post("/login", async (req, res) => {
  try {
    // Find the User
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    // Check If the User Exists
    if (!user) {
      return res.status(400).send("User not found.");
    }

    // Check If the Password is Correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).send("Invalid password.");
    }

    // Create and Assign a Token
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ id: user.id, firstName: user.firstName, lastName: user.lastName }, process.env.TOKEN_SECRET);
      res.status(200).send({ token });
    } else {
      res.status(400).send("Invalid password");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while logging in.");
  }
});

exports.modules = router;
