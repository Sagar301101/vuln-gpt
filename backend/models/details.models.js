const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  Name: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: Number, require: true },
  Domain: { type: String, require: true },
  company_name: { type: String, require: true },
});

const DetailModel = mongoose.model("UserDetail", userSchema);

module.exports = DetailModel;
//phone
//domain
// compnay name
