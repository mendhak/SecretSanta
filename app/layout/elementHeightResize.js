'use strict';

// Obtained from: http://stackoverflow.com/questions/23044338/window-resize-directive
angular.module('ssLayout').directive('ssElementHeightResize', ['$document', '$window',
    function($document, $window) {
        return {
        	scope: {
        		offset: "@"
        	},
            link: function($scope, element, attrs) {
                $scope.onResize = function() {
                    element.windowHeight = $window.innerHeight - $scope.offset;
                    $(element).height(element.windowHeight);
                }
                $scope.onResize();

                angular.element($window).bind('resize', function() {
                    $scope.onResize();
                })
            }
        }
    }
]);
