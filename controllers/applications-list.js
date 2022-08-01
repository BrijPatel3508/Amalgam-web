const Schema = require('../models/mongooseConnection');

exports.getApplicationList = async (req, res) => {
    try {
        const applications = await Schema.Application.find({});
        if (applications && applications.length > 0) {
            res.status(200).send({
                status: "Success",
                message: "Applications Successfully Found",
                data: {
                    applications
                }
            });
        } else {
            res.status(400).send({
                status: "Failed",
                message: "No Applications Found"
            });
        }
    } catch (err) {
        res.status(404).send({
            status: 'Failed',
            message: 'Failed to load Applications ' + err,
        })
    }
}

exports.addApplication = async (req, res) => {
    try {
        const data = req.body.data;
        const applications = await Schema.Application.create(data);
        res.send({
            status: "Success",
            statusCode: "200",
            message: "Application Successfully Added",
            data: applications
        });
    } catch (err) {
        res.send({
            status: 'Failed',
            statusCode: 404,
            message: 'Failed to add Application' + err,
        })
    }
}

exports.deleteApplication = async (req, res) => {
    try {
        const id = req.params.id;
        const applications = await Schema.Application.deleteOne({ _id: id });
        res.send({
            status: "Success",
            statusCode: "200",
            message: "Application Successfully Deleted",
            data: {
                applications
            }
        });
    } catch (err) {
        res.send({
            status: 'Failed',
            statusCode: 404,
            message: 'Failed to delete Application' + err,
        })
    }
}

exports.updateApplication = async (req, res) => {
    try {
        const data = req.body.data;
        const id = req.params.id;
        const applications = await Schema.Application.updateOne({ _id: id }, data);
        res.send({
            status: "Success",
            statusCode: "200",
            message: "Applications Successfully Updated",
            data: {
                applications
            }
        });
    } catch (err) {
        res.send({
            status: 'Failed',
            statusCode: 404,
            message: 'Failed to Update Application' + err,
        })
    }
}