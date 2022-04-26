const db = require("../db");
const mongoose = require("mongoose");

const CandidateModel = db.model(
    "Candidate",
    new mongoose.Schema({
        userId: { type: mongoose.Types.ObjectId, required: true, unique: true },
        partyId: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        state: { type: String, required: true },
        description: { type: String },
        image: { type: String, required: false },
    }),
    "Candidate"
);

module.exports = CandidateModel;
