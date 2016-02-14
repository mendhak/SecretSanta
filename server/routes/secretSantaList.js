var Facilitator = require('../models/facilitator');
var express = require('express');
var router = express.Router();
var logger = require('tracer').colorConsole();
var _ = require('underscore');

router.route('/secretSantaList/:secretSantaListId').get(function(req, res) {

});

// Create a new secret santa list

router.route('/secretSantaList').post(function(req, res) {
    logger.debug("req.body: " + JSON.stringify(req.body));

    var facilitatorId = req.body.facilitatorId;
    var secretSantaList = req.body.secretSantaList;

    SecretSantaList.create(secretSantaList).then(function(newSecretSantaList) {
        secretSantaList._id = newSecretSantaList._id;
        return Facilitator.findById(facilitatorId);
    })
    .then(function(facilitator) {
        facilitator.secretSantaLists.add(secretSantaList._id);
        facilitator.update();
        res.send({
            data: secretSantaList,
            message: "SecretSantaList created",
            status: 0
        })
    })
    .catch(function(error) {
        logger.debug("catch: " + JSON.stringify(error));
    })
    .done();	
});

// Update the secret santa list

router.route('/secretSantaList').put(function(req, res) {

});

module.exports = router;

// app.post('/ss-api/facilitator/createList', function(req, res) {
//     logger.debug("req.body: " + JSON.stringify(req.body));

//     var facilitatorId = req.body.facilitatorId;
//     var secretSantaList = req.body.secretSantaList;

//     SecretSantaList.create(secretSantaList).then(function(newSecretSantaList) {
//         secretSantaList._id = newSecretSantaList._id;
//         return Facilitator.findById(facilitatorId);
//     })
//     .then(function(facilitator) {
//         facilitator.secretSantaLists.add(secretSantaList._id);
//         facilitator.update();
//         res.send({
//             data: secretSantaList,
//             message: "SecretSantaList created",
//             status: 0
//         })
//     })
//     .catch(function(error) {
//         logger.debug("catch: " + JSON.stringify(error));
//     })
//     .done();
// });

// app.post('/ss-api/facilitator/saveList', function(req, res) {
//     logger.debug("req.body: " + JSON.stringify(req.body));

//     var facilitatorId = req.body.facilitatorId;
//     var secretSantaList = req.body.secretSantaList;

//     // Create/Save the secret santa list object
//     if (_.isUndefined(secretSantaList._id)) {

//     }
// });


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