import './list-item.scss';
let ListItem = {
    bindings: {
        text: '<',
        number: '<',
        selected: '=',
        onChange: '&'
    },
    template: `
        <div layout="row" flex  layout-align="start center"  class="list-item">
            <div flex layout="row" layout-align="start center">
                <div class="checkbox checkbox-default">
                    <input id="{{$ctrl.$id}}" class="styled" ng-model="$ctrl.selected" ng-change="$ctrl.onInputChange()" type="checkbox" checked="">
                    <label for="{{$ctrl.$id}}"></label>
                </div>
                <label flex="auto" class="list-item-title" for="{{$ctrl.$id}}" >{{$ctrl.text}}</label>
            </div>
            <span flex="none" class="number">{{$ctrl.number}}</span>
        </div>
    `,
    restrict: 'E',
    controller: class Controller {
        /* @ngInject */
        constructor($scope) {
            Object.assign(this, {
                $scope
            });
            //this.checkall = true;
        };

        $onInit() {
            if (!this.$id) {
                this.$id = Math.random().toString(36).substr(2, 16);
            }
        }

        onInputChange() {
          
        }

    }
};

export default ListItem;