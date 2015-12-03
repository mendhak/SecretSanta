'use strict';

angular.module('ssLayout').factory('ssFacilitatorModel', function() {
	function MenuOption(action, text) {
		this.action = action;
		this.text = text;
	}

	return {
		create: function(action, text) {			
			return new MenuOption(action, text);
		}
	};
});