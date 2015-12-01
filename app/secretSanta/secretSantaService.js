'use strict';

angular.module('ssSecretSanta').factory('ssSecretSantaService', function() {
    function SecretSanta() {
        this.email = "";
        this.name = "";
    }

    SecretSanta.prototype.isSameData = function(secretSanta) {
        return this.email === secretSanta.email && this.name === secretSanta.name;
    };

    return {
        create: function() {
            return new SecretSanta();
        }
    };
});
