const validator = require("validator");
const dns = require("dns");
const axios = require("axios");
const { hostname } = require("os");
const urlValidator = async (req, res, next) => {
  let { domain } = req.body;

  //check whether the url having https or http attached with it.

  if (!domain.startsWith("http://") && !domain.startsWith("https://")) {
    //check whether the url start with www or not
    if (!domain.startsWith("www")) {
      domain = "http://www." + domain;
    } else {
      domain = "http://" + domain;
    }
  }
  const options = {
    protocols: ["http", "https"],
    require_protocol: true,
  };

  if (!validator.isURL(domain, options)) {
    return res.status(400).send({ error: "Invalid URL" });
  }

  // Extract hostname from URL
  const hostname = new URL(domain).hostname;

  // DNS Lookup
  dns.lookup(hostname, async (err) => {
    if (err) {
      return res.status(400).send({ error: "domain name does not exist" });
    }

    try {
      // HTTP Request to check site accessibility
      const response = await axios.get(domain);
      if (response.status< 200 && response.status >= 400) {
        return res.status(400).send({ error: "domain is not accessible" });
      } 
      req.body.status = response.status;
      req.body.domain = hostname;
      next();
    } catch (error) {
      res.status(400).send({ error: "domain is not accessible" });
    }
  });
};
module.exports = urlValidator;
