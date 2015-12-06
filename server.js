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

    // define schema

    var Schema = mongoose.Schema;
    var facilitatorSchema = new Schema({
        _id: ObjectId,
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true},        
        secretSantaLists: [secretSantaListSchema]
    });

    var secretSantaListSchema = new Schema({
        _id: ObjectId,
        isGenerated: Boolean,
        secretSantas: [secretSantaSchema],
        secretSantaPairings: [secretSantaPairingsSchema]

    });

    var secretSantaSchema = new Schema({
        _id: ObjectId,
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true}
    });

    var secretSantaPairingsSchema = new Schema({
        _id: ObjectId,
        senderId: { type: ObjectId, required: true },
        receiverId: { type: ObjectId, required: true }
    });

    // define model =================
    var SecretSantaDb = mongoose.model('facilitator', facilitatorSchema);

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

        var 


        var json = {
            status: 0
        };
        res.send(json);
        // SecretSantaDb.find(function(error, ))

        // // create a todo, information comes from AJAX request from Angular
        // Todo.create({
        //     text: req.body.text,
        //     done: false
        // }, function(err, todo) {
        //     if (err)
        //         res.send(err);

        //     // get and return all the todos after you create another
        //     Todo.find(function(err, todos) {
        //         if (err)
        //             res.send(err);
        //         res.json(todos);
        //     });
    });

    // });

    // // delete a todo
    // app.delete('/api/todos/:todo_id', function(req, res) {
    //     Todo.remove({
    //         _id: req.params.todo_id
    //     }, function(err, todo) {
    //         if (err)
    //             res.send(err);

    //         // get and return all the todos after you create another
    //         Todo.find(function(err, todos) {
    //             if (err)
    //                 res.send(err);
    //             res.json(todos);
    //         });
    //     });
    // });
