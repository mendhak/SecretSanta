// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var moment = require('moment');
var underscore = require('underscore');

app.use(express.static(__dirname + '/app')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride());

// configuration =================

mongoose.connect('mongodb://localhost/SecretSantaDb'); // connect to mongoDB database on modulus.io

// models ========================


var Facilitator = require('./server/models/facilitator');


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

// application -------------------------------------------------------------
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// routes ======================================================================

// api ---------------------------------------------------------------------
var logger = require('tracer').colorConsole();
// 
app.post('/ss-api/facilitator/create', function(req, res) {

    // Check that the facilitator does not already exist.

    Facilitator.findByEmail(req.body.email)
        .then(function(facilitators) {
            if (underscore.isNull(facilitator) || facilitators.length === 0) {
                // Create a new facilitator

                return Facilitator.create(req.body);
            } else {
                res.send({
                    message: "Facilitator with that email already exists.",
                    status: -1
                });
            }
        })
        .then(function(newFacilitator) {
            if (!underscore.isUndefined(newFacilitator)) {
                res.send({
                    data: newFacilitator,
                    message: "Facilitator created",
                    status: 0
                });
            }
        })
        .catch(function(error) {
            logger.debug("catch:" + JSON.stringify(error));
        })
        .done();
});

app.get('/ss-api/facilitator/get', function(req, res) {
    Facilitator.findById(req.body.facilitatorId)
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

app.post('/ss-api/facilitator/saveList', function(req, res) {
});


// app.post('/ss-api/facilitator/saveList', function(req, res) {
//     function updateFacilitator(facilitatorId, secretSantaListId, dateTime) {
//         facilitator.findOne({
//                 _id: facilitatorId
//             },
//             function(err, facilitatorItem) {
//                 if (err) {
//                     res.send(err);
//                     return;
//                 }

//                 facilitatorItem.secretSantaLists.push(secretSantaListId);

//                 facilitatorItem.save(function(error, data) {
//                     var response = {
//                         status: -1
//                     };

//                     if (error) {
//                         res.send(response);

//                         // TODO: log/show error?

//                         return;
//                     }

//                     response = {
//                         data: secretSantaListId,
//                         status: 0
//                     };

//                     res.send(response);
//                 });
//             });
//     }

//     // Find if the list exists.

//     var response = {
//         statue: 0
//     };

//     var secretSantaListDetails = req.body;

//     // Save new list

//     if (underscore.isUndefined(secretSantaListDetails.secretSantaList._id)) {
//         // Create secret santa list
//         var newSecretSantaList = new secretSantaList();
//         var currentDateTime = moment.utc().format();
//         secretSantaListDetails.secretSantaList.dateCreated = currentDateTime;
//         newSecretSantaList.facilitatorId = secretSantaListDetails.facilitatorId;
//         newSecretSantaList.secretSantaList = secretSantaListDetails.secretSantaList;

//         newSecretSantaList.save(function(err, item) {
//             updateFacilitator(secretSantaListDetails.facilitatorId, item._id, currentDateTime);

//             underscore.each(secretSantaListDetails.secretSantaList.)
//         });
//     }

//     // Find existing list, update it, and save it
// });
