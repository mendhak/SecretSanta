var Facilitator = require('../models/facilitator');
var express = require('express');
var router = express.Router();
var logger = require('tracer').colorConsole();
var _ = require('underscore');


// Get a facilitator by Id

router.route('/facilitator/:facilitatorId').get(function(req, res) {
    Facilitator.findById(req.query.facilitatorId)
        .then(function(facilitators) {
            if (facilitators.length === 0) {
                throw new Error("Facilitator does not exist");
            }

            res.send({
                status: 0,
                data: facilitators[0]
            });
        })
        .catch(function(e) {
            res.send(e);
        })
        .done();
});


// Create a new facilitator

router.route('/facilitator').post(function(req, res) {
    Facilitator.findByEmail(req.body.email)
        .then(function(facilitators) {
        	console.log("facilitator: " + JSON.stringify(facilitators));
            if (_.isNull(facilitators) || facilitators.length == 0) {
                // Create a new facilitator

                logger.debug("create a new facilitator");

                return Facilitator.create(req.body);
            } else {
                logger.debug("Facilitator with that email already exists.");
                res.send({
                    message: "Facilitator with that email already exists.",
                    status: -1
                });
            }
        })
        .then(function(newFacilitator) {
        	console.log('creating a new facilitator');
            console.log(newFacilitator);
            if (!_.isUndefined(newFacilitator)) {
                res.send({
                    data: newFacilitator,
                    message: "Facilitator created",
                    status: 0
                });
            }
        })
        .catch(function(error) {
            logger.debug("catch: " + JSON.stringify(error));
        })
        .done();
});


module.exports = router;