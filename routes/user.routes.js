const {
    signUp,
    login,
    logout,
    getCouponCode,
    bookShow,
  } = require("../controllers/user.controller");
const userRouter = require("express").Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/coupons", getCouponCode);
userRouter.post("/bookings", bookShow);

module.exports = userRouter;