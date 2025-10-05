const validator = require("validator");
const dns = require("dns");
const axios = require("axios");
const { hostname } = require("os");
const urlValidator = async (req, res, next) => {
  let { Domain } = req.body;

  //check whether the url having https or http attached with it.

  if (!Domain.startsWith("http://") && !Domain.startsWith("https://")) {
    //check whether the url start with www or not
    if (!Domain.startsWith("www")) {
      Domain = "http://www." + Domain;
    } else {
      Domain = "http://" + Domain;
    }
  }
  const options = {
    protocols: ["http", "https"],
    require_protocol: true,
  };

  if (!validator.isURL(Domain, options)) {
    return res.status(400).send({ error: "Invalid URL" });
  }

  // Extract hostname from URL
  const hostname = new URL(Domain).hostname;

  // DNS Lookup
  dns.lookup(hostname, async (err) => {
    if (err) {
      return res.status(400).send({ error: "Domain name does not exist" });
    }

    try {
      // HTTP Request to check site accessibility
      const response = await axios.get(Domain);
      if (response.status >= 200 && response.status < 400) {
        res.send({ message: "Domain is valid and accessible" });
      } else {
        res.status(400).send({ error: "Domain is not accessible" });
      }
      req.body.status = response.status;
      req.body.Domain = hostname;
      next();
    } catch (error) {
      res.status(400).send({ error: "Domain is not accessible" });
    }
  });
};
module.exports = urlValidator;
