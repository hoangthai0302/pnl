
import './step-headline.scss';
export default {
    bindings: {
        step: '@',
    },
    transclude:true,
    template: `
        <div class="step-headline" layout="row" layout-align="start center" class="headline">
            <h1>{{$ctrl.step}}</h1>
            <div class="styled" ng-transclude></div>
        </div>
    `,
    restrict: 'E',
    controller: class Controller {
        /* @ngInject */ 
        constructor ($scope) {
            Object.assign(this, {$scope});
            //this.checkall = true;
        };

        

    }
    
};


