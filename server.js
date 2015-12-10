// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

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
// get all todos
// app.get('/api/todos', function(req, res) {

//     // use mongoose to get all todos in the database
//     Todo.find(function(err, todos) {

//         // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//         if (err)
//             res.send(err);

//         res.json(todos); // return all todos in JSON format
//     });
// });

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
