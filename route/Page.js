const PageRoute = require("express").Router();

PageRoute.get("/new", (req, res) => {
    res.sendFile("../public/template/Index.html");
});
// Old path
PageRoute.get("/", (req, res) => {
    res.sendFile("../public/index.html");
});
PageRoute.get("/login", (req, res) => {
    res.sendFile("../public/login.html");
});
PageRoute.get("/register", (req, res) => {
    res.sendFile("../public/register.html");
});
PageRoute.get("/dashboard", (req, res) => {
    res.sendFile("../public/dashboard.html");
});
PageRoute.get("/candidates", (req, res) => {
    res.sendFile("../public/candidates.html");
});
module.exports = PageRoute;
