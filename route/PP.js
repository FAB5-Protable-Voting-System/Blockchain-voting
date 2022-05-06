const PPRoute = require("express").Router();
const {
    Candidate,
    PartyRegister,
    CandidateRegister,
    Party,
    getLive,
} = require("../controller/PP");

PPRoute.get("/candidate", Candidate);
PPRoute.get("/party", Party);
PPRoute.get("/live", getLive);
PPRoute.post("/registerCandidate", CandidateRegister);
PPRoute.post("/registerParty", PartyRegister);

module.exports = PPRoute;
