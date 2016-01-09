'use strict';

angular.module('ssFacilitator').factory('ssFacilitatorModel', function() {
	function Facilitator() {
		this.name = "";
		this.email = "";
		this.secretSantaLists = [];
	}

	return {
		create: function() {
			return new Facilitator();
		}
	};
});