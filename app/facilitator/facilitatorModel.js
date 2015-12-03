'use strict';

angular.module('ssLayout').factory('ssFacilitatorModel', function() {
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