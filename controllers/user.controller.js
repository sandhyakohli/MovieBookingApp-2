const { User } = require("../models");
const TokenGenerator = require("uuid-token-generator");
const { uuid } = require("uuidv4");
const { atob, btoa } = require("b2a");
const tokenGenerator = new TokenGenerator();

async function signUp(req, res) {
  const {
    email_address: email,
    first_name,
    last_name,
    mobile_number: contact,
    password,
  } = req.body;
  const newUser = new User({
    userid: uuid(),
    email,
    first_name,
    last_name,
    contact,
    password,
  });
  User.findOne({ email: email }, (err, user) => {
    if (err || user === null) {
      newUser.save((err, user) => {
        if (err)
          return res.status("400").send(err.message || "some error occurred");
        res.status(200).send("OK");
      });
    } else {
      res.status(400).send("User Already Exists.");
    }
  });
}

async function login(req, res) {
  //decrypt username and password by seperating the basic word
  const userNameAndPassword = atob(req.headers["Authorization"]).split(" ")[1];
  const { username, password } = userNameAndPassword.split(":");
  try {
    const user = await User.findOne({ username: username });
    if (user === null) throw new Error("user not found");
    if (user.password === password) {
      user.isLoggedIn = true;
      user.uuid = uuid();
      user.accesstoken = tokenGenerator.generate();
      User.findOneAndUpdate({ username: username }, user, {
        useFindAndModify: false,
      })
        .then((updateUser) => {
          if (updateUser === null) throw new Error("Unable to update user");
          res.status(200).send(updateUser);
        })
        .catch((err) => {
          res.status(500).send(err.message || "login failed");
        });
    } else {
      res.status(401).send("username and password dont match");
    }
  } catch (err) {
    res.status(500).send(err.message || "user not found");
  }
}

async function logout(req, res) {
  const uuid = req.body.uuid;
  const update = { isLoggedIn: false, accesstoken: "", uuid: "" };
  User.findOneAndUpdate({ uuid: uuid }, update)
    .then((data) => {
      if (data === null) throw new error("unable to logout");
      res.send({ message: "Logged Out successfully." });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
}
async function getCouponCode(req, res) {
  const accesstoken = req.header["Authorization"].split(" ")[1];
  if (!uuid) {
    return res.status(401).send("user not logged in");
  }
  try {
    const users = await User.find({ accesstoken: accesstoken });
    if (users[0].coupens) {
      res.send(users[0].coupens);
    } else {
      res.send([]);
    }
  } catch (err) {
    return res.status(500).send(err.message || "user not found");
  }
}

async function bookShow(req, res) {
  try {
    const accessToken = req.header["Authorization"].split(" ")[1];
    if (!accessToken) throw new Error("user not logged in");
    const uuid = req.body.uuid;
    const bookingRequest = req.body.bookingRequest;
    User.findOneAndUpdate(
      { uuid: uuid },
      { $push: { bookingRequests: bookingRequest } }
    )
      .then((data) => {
        if (!data) throw new Error("unable to book show");
        res.status(200).send(bookingRequest);
      })
      .catch((err) => {
        res.status(500).send(err.message || "unable to book show");
      });
  } catch (err) {
    res.status(500).send(err.message || "unable to book show");
  }
}

module.exports = {
  signUp,
  login,
  logout,
  getCouponCode,
  bookShow,
};