var path = require('path');
var express = require('express');
var homeRoutes = express.Router();

homeRoutes.get('/', function(req, res) {
	console.log('Running homeRoutes');
	console.log('Running path.resolve(__dirname + ../app/index.html): ' + path.resolve(__dirname + '/../../app/index.html'));
	res.sendFile(path.resolve(__dirname + '/../../app/index.html'));
    // res.sendFile(__dirname + '../app/index.html');
});

module.exports = homeRoutes;
