"use strict";

var mainController = function() {
    this.registerNewOrganiser = function() {
        console.log("registerNewOrganiser" + new Date());
    };
};

angular.module('ssMainPage').controller('MainController', mainController);
