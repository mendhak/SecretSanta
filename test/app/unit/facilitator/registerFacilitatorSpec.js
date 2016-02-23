'use strict';

describe('Directive:: registerFacilitator', function() {

    var fakes = {
        state: {
            go: function() {}
        },
        facilitatorModel: {

        },
        facilitatorRepository: {

        }
    }

    var scope, compile;

    // // var spies = {
    // // 	state: jasmine.createSpy()
    // // }

    // beforeEach(module('ssDataAccessLayer'));
    beforeEach(module('ssFacilitator'));

    beforeEach(module('html/registerFacilitator.html'));
    // beforeEach(inject(function($rootScope, $compile) {
    // 	scope = $rootScope;
    // 	compile = $compile;
    // }));

    it('test', function() {

        var element, compiledElement, scope, compile;

    	// element = angular.element('<ss-register-facilitator></ss-register-facilitator>');

    	// compiledElement = $compile(element)(scope);
    	// scope.$digest();

        // module() takes functions or strings (module aliases)
        // angular.mock.module(function($provide) {
        //     $provide.service('$state', fakes.state);
        //     $provide.service('ssFacilitatorModel', fakes.facilitatorModel);
        //     $provide.service('ssFacilitatorRepository', fakes.facilitatorRepository);
        // });

        inject(function($rootScope, $compile) {
        	scope = $rootScope;
        	compile = $compile;
        });

        // inject((['$rootScope', '$compile', function($rootScope, $compile) {        
	       //  scope = $rootScope;
        	element = angular.element('<ss-register-facilitator></ss-register-facilitator>');

        	compiledElement = compile(element)(scope);
        	scope.$digest();
        // }]));

        // inject(function($rootScope, $compile) {
        // 	scope = $rootScope;
        // 	element = angular.element('<ss-register-facilitator></ss-register-facilitator>');

        // 	compiledElement = $compile(element)(scope);
        // 	scope.$digest();        	
        // })

        expect(1).toBe(1);
    });
});
