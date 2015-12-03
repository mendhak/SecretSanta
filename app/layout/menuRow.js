'use strict';

angular.module('ssLayout').directive('ssMenuRow', function() {
	return {
		scope: {
			action: '&',
			text: '@'
		},
		templateUrl: 'layout/menuRow.html'
	}
});