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
