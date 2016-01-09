'use strict';

angular.module('ssSecretSantaList').factory('ssSecretSantaListModel', function() {
	function SecretSantaList() {
		this.name = "";
		this.secretSantas = [];
	}

	return {
		create: function() {
			return new SecretSantaList();
		}
	}
});