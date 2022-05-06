const CandidateModel = require("../models/Candidate");
const PPModel = require("../models/PoliticalParty");
const response = require("../utils/Response");
const OId = require("mongoose").Types.ObjectId;

const PartyRegister = (req, res) => {
    /**
     * BODY: name, chairman, viceChairman, description, established
     */
    const query = new PPModel({
        name: req.body.name,
        chairman: req.body.chairman,
        viceChairman: req.body.viceChairman,
        description: req.body.description,
        established: req.body.established,
    });
    query.save().then(
        (result) => {
            return response(res, true, "Registration Successful");
        },
        (err) => {
            return response(res, false, "Unable to Register", err);
        }
    );
};
const CandidateRegister = (req, res) => {
    /**
     * BODY: userId, partyId, state, description
     */
    const query = new CandidateModel({
        userId: req.body.userId,
        partyId: req.body.partyId,
        state: req.body.state,
        description: req.body.description,
    });
    query.save().then(
        (result) => {
            return response(res, true, "Registration Successful");
        },
        (err) => {
            return response(res, false, "Unable to Register", err);
        }
    );
};
const Candidate = (req, res) => {
    let query = {};
    if (req.body.candidateId) query._id = OId(req.body.candidateId);
    CandidateModel.find(query).then(
        (result) => {
            return response(res, true, "Candidate fetch Success", result);
        },
        (err) => {
            return response(res, false, "Unable to fetch candidate", err);
        }
    );
};
const Party = (req, res) => {
    let query = {};
    if (req.body.partyId) query._id = OId(req.body.partyId);
    PPModel.find(query).then(
        (result) => {
            return response(res, true, "Party fetch Success", result);
        },
        (err) => {
            return response(res, false, "Unable to fetch party", err);
        }
    );
};
const getLive = (req, res) => {
    PPModel.findOne(
        { _id: OId(req.query._id) },
        { name: 1, chairman: 1 },
        (err, result) => {
            if (err) throw err;
            response(res, true, "Live Count", result);
        }
    );
};

module.exports = {
    Candidate,
    PartyRegister,
    CandidateRegister,
    Party,
    getLive,
};
