// Importing the requirements.
const express = require("express");
const session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
const path = require("path");
// Defining the constants.
const app = express();
// Configuring the app.
app.use(
    require("cors")({
        origin: ["http://localhost:8501/"],
        credentials: true,
        optionSuccessStatus: 200,
    })
);
app.use(require("compression")());
app.use(express.static("public"));
app.use("/public", express.static("public"));
app.use(require("cookie-parser")());
app.use(
    session({
        secret: "None_of_Your_Buisness_Ok",
        resave: false,
        saveUninitialized: true,
        rolling: true,
        proxy: true,
        cookie: { secure: false },
        store: new MongoDBStore({
            uri: require("./configs/db.config").localUrl,
            collection: "sessions",
        }),
    })
);
app.use(express.urlencoded({ extended: !0 }));
app.use(express.json());
app.set("trust proxy", 1);

// Sharing pages.
const PageRoute = require("express").Router();

PageRoute.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
PageRoute.get("/Live", (req, res) => {
    res.sendFile(path.join(__dirname, "public/liveResult.html"));
});
PageRoute.get("/Candidate", (req, res) => {
    res.sendFile(path.join(__dirname, "public/candidate.html"));
});
PageRoute.get("/Login", (req, res) => {
    res.sendFile(path.join(__dirname, "public/login.html"));
});
PageRoute.get("/Vote", (req, res) => {
    if (req.session?.user?.isAuthenticated)
        res.sendFile(path.join(__dirname, "public/vote.html"));
    else res.redirect("/");
});
PageRoute.get("/Redirect", (req, res) => {
    res.sendFile(path.join(__dirname, "public/redirect.html"));
});
PageRoute.get("/ErrorVote", (req, res) => {
    res.sendFile(path.join(__dirname, "public/errorVote.html"));
});
PageRoute.get("/Register/User", (req, res) => {
    res.sendFile(path.join(__dirname, "public/registerUser.html"));
});
PageRoute.get("/Register/Candidate", (req, res) => {
    res.sendFile(path.join(__dirname, "public/registerCandidate.html"));
});
PageRoute.get("/Register/Party", (req, res) => {
    res.sendFile(path.join(__dirname, "public/registerParty.html"));
});

// Configuring the routes
// app.use("/", require("./route/Page"));
app.use("/user", require("./route/User"));
app.use("/pp", require("./route/PP"));
app.use("/bc", require("./route/BlockChain"));
app.use("/", PageRoute);

app.listen(process.env.PORT || 8501, "0.0.0.0", () => {
    console.log("Server started on ", process.env.PORT || 8501);
});
