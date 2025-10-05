const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: Number, require: true },
  domain: { type: String, require: true },
  company_name: { type: String, require: true },
},{
  versionKey: false, // Enables the "__v" field
  timestamps: true, // Adds "createdAt" and "updatedAt" fields
});

const DetailModel = mongoose.model("UserDetail", userSchema);

module.exports = DetailModel;
//phone
//domain
// compnay name
