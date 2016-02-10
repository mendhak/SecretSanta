// set up ========================
var express = require('express');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var moment = require('moment');
var underscore = require('underscore');

var fileSystem = require('fs');
var http = require('http');
var https = require('https');


var secret = 'top secret';

// create our app w/ express

var app = express(); 

// app.use('/ss-api', expressJwt({secret: secret}));

app.use(express.static(__dirname + '/app')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console

// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({'extended': 'true'})); 

// parse application/json

app.use(bodyParser.json()); 

// parse application/vnd.api+json as json

app.use(bodyParser.json({type: 'application/vnd.api+json'})); 

app.use(methodOverride());

// configuration =================

mongoose.connect('mongodb://localhost/SecretSantaDb'); // connect to mongoDB database on modulus.io

// models ========================

// var Facilitator = require('./server/models/facilitator');
// var SecretSantaList = require('./server/models/secretSantaList');

// Redirect app
var redirectApp = express();
var redirectServer = http.createServer(redirectApp);

redirectApp.use(function requireHTTPS(req, res, next) {
  if (!req.secure) {
    // return res.redirect('https://' + req.headers.host + req.url);
    return res.redirect('https://localhost:443');
  }
  next();
})

redirectServer.listen(8080);


// listen (start app with node server.js) ======================================

var privateKey = fileSystem.readFileSync('./server/configuration/ssl/secretsanta.key', 'utf8');
var certificate = fileSystem.readFileSync('./server/configuration/ssl/secretsanta.crt', 'utf8');

var credentials = {
    key: privateKey,
    cert: certificate
};

var httpsServer = https.createServer(credentials, app);
var securePort = 443;
httpsServer.listen(securePort, function() {
    console.log('Secured HTTPS Server listening on localhost:%s', securePort);
});


// REGISTER OUR ROUTES -------------------------------
// NOTE: Don't  need to set up the '/' route as this is defaulted via the static files
// all of our routes will be prefixed with /ss-api

var facilitator = require('./server/routes/facilitator');

app.use('/ss-api', facilitator);



// // api ---------------------------------------------------------------------
// // var logger = require('tracer').colorConsole();

// // function validateLogin(username, password) {
// //     // TODO: Validate username and password
// //     return true;
// // }

// // function getFacilitator(username, password) {
// //     return  {
// //         id: 1,
// //         name: '',
// //         email: ''
// //     };
// // }

// // app.post('/authenticate', function(req, res) {
// //     if (validateLogin(req.body.username, req.body.password)) {
// //         res.send(401, 'Invalid username or password');
// //         return;
// //     }

// //     // Get the user details from the database.
// //     var  profile = getFacilitator(username, password);

// //     var token = jwt.sign(profile, secret, { expiresInMinutes: 60*10 });

// //     res.json({ token: token });
// // });

// // // 
// // app.post('/ss-api/facilitator/create', function(req, res) {

// //     // Check that the facilitator does not already exist.
// //     Facilitator.findByEmail(req.body.email)
// //         .then(function(facilitators) {
// //             if (underscore.isNull(facilitators) || facilitators.length == 0) {
// //                 // Create a new facilitator

// //                 logger.debug("create a new facilitator");

// //                 return Facilitator.create(req.body);
// //             } else {
// //                 logger.debug("Facilitator with that email already exists.");
// //                 res.send({
// //                     message: "Facilitator with that email already exists.",
// //                     status: -1
// //                 });
// //             }
// //         })
// //         .then(function(newFacilitator) {
// //             console.log(newFacilitator);
// //             if (!underscore.isUndefined(newFacilitator)) {
// //                 res.send({
// //                     data: newFacilitator,
// //                     message: "Facilitator created",
// //                     status: 0
// //                 });
// //             }
// //         })
// //         .catch(function(error) {
// //             logger.debug("catch: " + JSON.stringify(error));
// //         })
// //         .done();
// // });

// // app.get('/ss-api/facilitator/get', function(req, res) {    
// //     Facilitator.findById(req.query.facilitatorId)
// //         .then(function(facilitators) {
// //             if (facilitators.length === 0) {
// //                 throw new Error("Facilitator does not exist");
// //             }

// //             res.send({
// //                 status: 0,
// //                 data: facilitators[0]
// //             });
// //         })
// //         .catch(function(e) {
// //             res.send(e);
// //         })
// //         .done();
// // });

// // app.post('/ss-api/facilitator/createList', function(req, res) {
// //     logger.debug("req.body: " + JSON.stringify(req.body));

// //     var facilitatorId = req.body.facilitatorId;
// //     var secretSantaList = req.body.secretSantaList;

// //     SecretSantaList.create(secretSantaList).then(function(newSecretSantaList) {
// //         secretSantaList._id = newSecretSantaList._id;
// //         return Facilitator.findById(facilitatorId);
// //     })
// //     .then(function(facilitator) {
// //         facilitator.secretSantaLists.add(secretSantaList._id);
// //         facilitator.update();
// //         res.send({
// //             data: secretSantaList,
// //             message: "SecretSantaList created",
// //             status: 0
// //         })
// //     })
// //     .catch(function(error) {
// //         logger.debug("catch: " + JSON.stringify(error));
// //     })
// //     .done();
// // });

// // app.post('/ss-api/facilitator/saveList', function(req, res) {
// //     logger.debug("req.body: " + JSON.stringify(req.body));

// //     var facilitatorId = req.body.facilitatorId;
// //     var secretSantaList = req.body.secretSantaList;

// //     // Create/Save the secret santa list object
// //     if (_.isUndefined(secretSantaList._id)) {

// //     }
// // });


// // app.post('/ss-api/facilitator/saveList', function(req, res) {
// //     function updateFacilitator(facilitatorId, secretSantaListId, dateTime) {
// //         facilitator.findOne({
// //                 _id: facilitatorId
// //             },
// //             function(err, facilitatorItem) {
// //                 if (err) {
// //                     res.send(err);
// //                     return;
// //                 }

// //                 facilitatorItem.secretSantaLists.push(secretSantaListId);

// //                 facilitatorItem.save(function(error, data) {
// //                     var response = {
// //                         status: -1
// //                     };

// //                     if (error) {
// //                         res.send(response);

// //                         // TODO: log/show error?

// //                         return;
// //                     }

// //                     response = {
// //                         data: secretSantaListId,
// //                         status: 0
// //                     };

// //                     res.send(response);
// //                 });
// //             });
// //     }

// //     // Find if the list exists.

// //     var response = {
// //         statue: 0
// //     };

// //     var secretSantaListDetails = req.body;

// //     // Save new list

// //     if (underscore.isUndefined(secretSantaListDetails.secretSantaList._id)) {
// //         // Create secret santa list
// //         var newSecretSantaList = new secretSantaList();
// //         var currentDateTime = moment.utc().format();
// //         secretSantaListDetails.secretSantaList.dateCreated = currentDateTime;
// //         newSecretSantaList.facilitatorId = secretSantaListDetails.facilitatorId;
// //         newSecretSantaList.secretSantaList = secretSantaListDetails.secretSantaList;

// //         newSecretSantaList.save(function(err, item) {
// //             updateFacilitator(secretSantaListDetails.facilitatorId, item._id, currentDateTime);

// //             underscore.each(secretSantaListDetails.secretSantaList.)
// //         });
// //     }

// //     // Find existing list, update it, and save it
// // });



// var https = require('https');
// var fileSystem = require('fs');

// // var privateKey = fileSystem.readFileSync('./server/configuration/ssl/secretsanta.key', 'utf8');
// // var certificate = fileSystem.readFileSync('./server/configuration/ssl/secretsanta.crt', 'utf8');

// var privateKey = fileSystem.readFileSync('./server/configuration/ssl/key.pem', 'utf8');
// var certificate = fileSystem.readFileSync('./server/configuration/ssl/cert.pem', 'utf8');

// var credentials = {
//     key: privateKey,
//     certificate: certificate
// };

// var a = https.createServer(credentials, function (req, res) {
//   res.writeHead(200);
//   res.end("hello world\n");
// }).listen(8000);