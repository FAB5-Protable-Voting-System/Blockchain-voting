const UserRoute = require("express").Router();
const { Register, Login, Logout, OTP } = require("../controller/User");

UserRoute.post("/register", Register);
UserRoute.post("/login", Login);
UserRoute.post("/otp", OTP);
UserRoute.get("/logout", Logout);

module.exports = UserRoute;
