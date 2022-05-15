const { signUp, login, logout } = require("../controllers/user.controller");
const userRouter = require("express").Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

module.exports = userRouter;