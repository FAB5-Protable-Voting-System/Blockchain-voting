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
        origin: [],
        credentials: true,
        optionSuccessStatus: 200,
    })
);
app.use(require("compression")());
app.use(express.urlencoded({ extended: !0 }));
app.use(express.json());
app.use(express.static("public"));
app.use("/public", express.static("public"));
app.use(
    session({
        secret: "None_of_Your_Buisness_Ok",
        resave: false,
        saveUninitialized: true,
        proxy: true,
        cookie: { secure: false, sameSite: "none" },
        store: new MongoDBStore({
            uri: require("./configs/db.config").LocalUrl,
            collection: "sessions",
        }),
    })
);
// Configuring the routes
// app.use("/", require("./route/Page"));
app.use("/user", require("./route/User"));
app.use("/pp", require("./route/PP"));
app.use("/bc", require("./route/BlockChain"));
// Sharing pages.
app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/template/index.html"));
});
app.use("/Live", (req, res) => {
    res.sendFile(path.join(__dirname, "public/template/liveResult.html"));
});
app.use("/Candidate", (req, res) => {
    res.sendFile(path.join(__dirname, "public/template/candidate.html"));
});
app.use("/Login", (req, res) => {
    res.sendFile(path.join(__dirname, "public/template/login.html"));
});
app.use("/Vote", (req, res) => {
    res.sendFile(path.join(__dirname, "public/template/vote.html"));
});
app.use("/Redirect", (req, res) => {
    res.sendFile(path.join(__dirname, "public/template/vote.html"));
});

app.listen(process.env.PORT || 8501, () => {
    console.log("Server started on ", process.env.PORT || 8501);
});
