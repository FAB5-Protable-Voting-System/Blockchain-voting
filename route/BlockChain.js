const BCRoute = require("express").Router();
const { isValidChain, Vote, LiveCount } = require("../controller/BlockChain");

BCRoute.get("/isValidChain", isValidChain);
BCRoute.post("/vote", Vote);
BCRoute.get("/live_count", LiveCount);
module.exports = BCRoute;
