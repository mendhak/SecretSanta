var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;

var SecretSantaListSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	secretSantas: [ObjectId]
});

var SecretSantaList = mongoose.model('SecretSantaList', SecretSantaListSchema);

// Set up bluebird promises

var Promise = require('bluebird');
Promise.promisifyAll(SecretSantaList);
Promise.promisifyAll(SecretSantaList.prototype);

//  ------------------------

var create = function(details) {
	var newSecretSantaList = new SecretSantaList();
	newSecretSantaList.name = details.name;

	return newSecretSantaList.save();
};