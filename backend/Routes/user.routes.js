const express = require("express");
const axios = require("axios");
const DomainModel = require("../models/domain.models");
const DetailModel = require("../models/details.models");
const urlValidator = require("../middleware/validation.middleware");
const validateGoogleCaptcha = require("../middleware/validation.captcha");
const app = express.Router();

app.post("/DomainDetials", urlValidator, async (req, res) => {
  try {
    const { Domain, status } = req.body;
    console.log(Domain, status);
    const domain = new DomainModel({ Domain: Domain, Status: status });
    await domain.save();
    // res.status(200).send({ msg: "Domain details save successfully" });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "something went wrong unable to fetch domain" });
  }
});

app.post("/userDetials", validateGoogleCaptcha,urlValidator,  async (req, res) => {
  try {
    const userDetials = req.body;
    const user = new DetailModel(userDetials);
    await user.save();
    console.info("Data saved successfully.")
    res.status(200).json({ msg: "User details saved successfully" });
  } catch (error) {
    console.error("Error while storing user details:", error);
    res.status(500).json({ msg: "Something went wrong, unable to save details" });
  }
});

module.exports = app;
