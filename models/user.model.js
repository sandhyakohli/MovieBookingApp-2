const { isEmail } = require("validator");
module.exports = (mongoose) => {
  const User = mongoose.model(
    "user",
    mongoose.Schema({
      userid: {
        type: Number,
        unique: true,
        required: true,
      },
      email: {
        type: String,
        required: true,
        validate: (value) => isEmail(value),
      },
      first_name: {
        type: String,
        required: true,
      },
      last_name: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        default: this.first_name + this.last_name,
      },
      contact: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["user", "admin"],
      },
      isLoggedIn: Boolean,
      uuid: String,
      accessToken: String,
      coupens: [],
      bookingRequests: [],
    })
  );
  return User;
};