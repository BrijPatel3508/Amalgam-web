const mongoose = require("mongoose");
const applicationsSchemaJson = require("../schemas/applicationSchema.json");
const usersSchemaJson = require("../schemas/usersSchema.json");

mongoose.connect("mongodb://localhost:27017/app").then(() => {
    console.log("DB connection successfull");
});

const applicationSchema = new mongoose.Schema(applicationsSchemaJson);
const usersSchema = new mongoose.Schema(usersSchemaJson);

exports.Application = mongoose.model('applications', applicationSchema);
exports.Users = mongoose.model('users', usersSchema);