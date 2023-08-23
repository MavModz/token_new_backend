const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
  name: { type: String, required: true },
  DOB: { type: String, required: true },
  mobile: { type: String, required: true, immutable: true },
  email: { type: String, required: true },
<<<<<<< HEAD
=======
  gender:{type:String},
  address:{type:String},
  profleImage:{type:Object}
  
>>>>>>> 4505e6e60440de9ca3d59aa85e03762febae6726
});

const userModel = new mongoose.model("user_data", user_schema);
module.exports = { userModel };
