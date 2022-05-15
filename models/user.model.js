const { isEmail } = require("validator");
module.exports = (mongoose) => {
  const userSchema = mongoose.Schema({
    userid: {
      type: String,
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
    username: String,
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
      default: "user",
    },
    isLoggedIn: Boolean,
    uuid: String,
    accesstoken: String,
    coupens: [],
    bookingRequests: [],
  });
  userSchema.pre("save", function (next) {
    this.username = this.first_name + this.last_name;
    next();
  });
  const User = mongoose.model("user", userSchema);

  return User;
};