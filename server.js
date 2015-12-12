// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var moment = require('moment');
var underscore = require('underscore');

// configuration =================

mongoose.connect('mongodb://localhost/SecretSantaDb'); // connect to mongoDB database on modulus.io

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

// Setting up mongoose types

var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;

// define schema

var secretSantaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

var secretSantaPairingsSchema = new Schema({
    senderId: {
        type: ObjectId,
        required: true
    },
    receiverId: {
        type: ObjectId,
        required: true
    }
});

var secretSantaListSchema = new Schema({
    isGenerated: Boolean,
    secretSantas: [ObjectId],
    secretSantaPairings: [secretSantaPairingsSchema]

});

var facilitatorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    secretSantaLists: [secretSantaListSchema]
});

// define model =================
var facilitator = mongoose.model('facilitator', facilitatorSchema);
var secretSanta = mongoose.model('secretSanta', secretSantaSchema);

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

// application -------------------------------------------------------------
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// routes ======================================================================

// api ---------------------------------------------------------------------

// 
app.post('/ss-api/facilitator/create', function(req, res) {
    // Check that the facilitator does not already exist.

    var query = facilitator.find({
        email: req.body.email
    });
    query.select('email');
    query.exec(function(err, foundFacilitator) {
        var response = {
            status: -1,
            message: "Facilitator with that email already exists."
        };

        if (err) {
            // Create the facilitator
            response.message = "Database error: " + err;
            res.send(response);
            return;
        }

        if (foundFacilitator.length > 0) {
            response.message = "Facilitator with that email already exists.";
            res.send(response);
            return;
        }

        var newFacilitator = new facilitator();
        newFacilitator.email = req.body.email;
        newFacilitator.name = req.body.name;

        newFacilitator.save(function(error, data) {
            if (error) {
                response.message = "Database error: " + error;
                res.send(response);
                return;
            }

            response.status = 0;
            response.message = "Facilitator created";
            response.data = data;

            res.send(response);
        });
    });
});

app.post('/ss-api/facilitator/delete', function(req, res) {
    facilitator.remove({
        _id: ObjectId(req.body.id)
    }, function(err, item) {
        if (err) {
            res.send(err);
        }

        var response = {
            status: 0
        };

        res.send(response);
    });
});

app.post('/ss-api/facilitator/get', function(req, res) {
    facilitator.findOne({
        _id: ObjectId(req.body.facilitatorId)
    },
    function(err, facilitatorItem) {
        if (err) {
            res.send(err);
            return;
        }

        var response = {
            status = 0,
            data = facilitatorItem
        };

        res.send(response);
    });
});

app.post('/ss-api/facilitator/saveList', function(req, res) {
    facilitator.findOne({
            _id: ObjectId(req.body.details.facilitatorId)
        },
        function(err, facilitatorItem) {
            if (err) {
                res.send(err);
                return;
            }

            var secretSantaList = req.body.details.secretSantaList;

            var currentDateTime = moment.utc().format();
            secretSantaList.dateCreated = currentDateTime;

            facilitatorItem.secretSantaLists.add(secretSantaList);

            facilitatorItem.save(function(error, data) {
                var response = {
                    status: -1
                };

                if (error) {
                    res.send(response);

                    // TODO: log/show error?

                    return;
                }

                var insertedSecretSantaList = underscore.find(data.secretSantaLists, function(item) {
                    return item.dateCreated === currentDateTime;
                });

                response = {
                    data: insertedSecretSantaList._id,
                    status: 0
                };

                res.send(response);
            });
        });
});
