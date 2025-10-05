const axios = require("axios");

const validateGoogleCaptcha = async (req, res, next) => {
  const { token } = req?.body;
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${token}`
    );

    if (response.data.success) {
      next();
    } else {
      res
        .status(400)
        .send("Please fill the captcha before process the request.");
    }
  } catch (error) {
    res.status(400).send("Please fill the captcha before process the request.");
  }
};
module.exports = validateGoogleCaptcha;
