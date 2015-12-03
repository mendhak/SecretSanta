'use strict';

angular.module('ssLayout').factory('ssMenuOptionModel', function() {
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