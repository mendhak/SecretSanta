'use strict';

angular.module('ssNiceList').directive('ssCreateNiceList', [function() {
	return {
		require: '^form',
		templateUrl: 'niceList/createNiceList.html',
		link: function(formCtrl) {
			
		}
	};
}]);