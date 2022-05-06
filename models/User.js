const db = require("../db");
const mongoose = require("mongoose");

const UserModel = db.model(
    "User",
    new mongoose.Schema({
        fname: { type: String, required: true, maxlength: 20 },
        lname: { type: String, required: true, maxlength: 20 },
        aadharId: {
            type: String,
            required: true,
            unique: true,
            minlength: 12,
            maxlength: 12,
        },
        voterId: {
            type: String,
            required: true,
            unique: true,
            minlength: 10,
            maxlength: 10,
        },
        panId: {
            type: String,
            required: true,
            unique: true,
            minlength: 10,
            maxlength: 10,
        },
        dob: { type: String, required: true },
        mobile: {
            type: String,
            required: true,
            unique: true,
            minlength: 10,
            maxlength: 10,
        },
        email: { type: String, required: true, unique: true },
        isVerified: { type: Boolean, default: false },
        otp: { type: Number, default: null },
    }),
    "User"
);

module.exports = UserModel;
