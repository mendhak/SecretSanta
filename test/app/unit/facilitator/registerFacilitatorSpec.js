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

    // var spies = {
    // 	state: jasmine.createSpy()
    // }

    beforeEach(module('ssFacilitator'));
    beforeEach(module('registerFacilitator.html'));

    it('test', function() {

        var element, compiledElement, scope;

        // module() takes functions or strings (module aliases)
        module(function($provide) {
            $provide.service('$state', fakes.state);
            $provide.service('ssFacilitatorModel', fakes.facilitatorModel);
            $provide.service('ssFacilitatorRepository', fakes.facilitatorRepository);
        });


        inject(function($rootScope, $compile) {
	        scope = $rootScope;
        	element = angular.element('<ss-register-facilitator></ss-register-facilitator>');

        	compiledElement = $compile(element)(scope);
        	scope.$digest();
        });

        expect(compiledElement).toBe('');
    });
});
