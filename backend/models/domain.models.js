const mongoose = require("mongoose");

const DomainSchema = mongoose.Schema({
  Domain: { type: String, require: true },
  Status: { type: String, require: true },
});

const DomainModel = mongoose.model("DomainDetail", DomainSchema);

module.exports = DomainModel;
