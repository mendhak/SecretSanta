// Pattern from: http://zshawnsyed.com/2015/05/04/mongo-db-promise/
// and Bluebird

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;

var FacilitatorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    secretSantaLists: [{type: ObjectId}]
});

var Facilitator = mongoose.model('Facilitator', FacilitatorSchema);

// Set up bluebird promises

var Promise = require('bluebird');
Promise.promisifyAll(Facilitator);
Promise.promisifyAll(Facilitator.prototype);

// -------------------------

var create = function(details) {
    var newFacilitator = new Facilitator();
    newFacilitator.email = details.email;
    newFacilitator.name = details.name;

    return newFacilitator.save();
};

var findByEmail = function(email) {
    return this.findAsync({
        email: email
    });
};

var findById = function(id) {
    return this.findAsync({
        _id: id
    });
};

// --------------------------

Facilitator.create = create;
Facilitator.findByEmail = findByEmail;
Facilitator.findById = findById;

module.exports = Facilitator;
