import template from './chips.html';
import './chip-item.scss';

export default {
    bindings: {
        data: '=',
        limit:'<',
        display: '@',
        active:'@',
        layout: '@?',
        editable: '<',
        closeable: '<',
        onEdit: '&',
        onClose: '&',
        onItemClick:'&?'
    },
    template,
    controller: class Controller {
        /* @ngInject */ 
        constructor($scope) {
            Object.assign(this, {
                $scope
            })
        }

        $onInit() {
            this.layout = this.layout || "row";
            this.data = this.data || [];
        }

        getId(item){
            if(!item.$id){
                item.$id = Math.random().toString(36).substr(2, 16);
            }
            return item.$id;
        }

        $onChanges(changes){
        }

        clickItem(item){
            if(this.onItemClick){
                this.onItemClick({item})
                this.$scope.$broadcast('itemclick', item)
            }

        }


        _onClose(item) {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].$id === item.$id) {
                    this.data.splice(i, 1);
                    break;
                }
            }
            
            if(this.onClose){
                this.onClose({
                    item
                });
            }


        }

        editItem(item) {
            this.onEdit({
                item
            })
        }


    },
    restrict: 'E'
};