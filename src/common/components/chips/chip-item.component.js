import template from './chip-item.html';
import './chip-item.scss';

export default {
    bindings: {
        data: '<',
        display: '@',
        active: '@',
        editable: '<',
        closeable: '<',
        onclose: '&',
        onedit: '&'
    },
    template,
    controller: class Controller {
        /* @ngInject */ 
        constructor($timeout, $scope) {
            Object.assign(this, {
                $scope,
                $timeout
            })
        }

        $onInit() {
            function df(obj, path) {
                if (!path) {
                    return obj;
                }
                let paths = path.split('.'),
                    current = obj;                    

                for (var i = 0; i < paths.length; ++i) {
                    if (current[paths[i]] == undefined) {
                        return undefined;
                    } else {
                        current = current[paths[i]];
                    }
                }
                return current;
            }

            this.text = df(this.data, this.display);

            if (this.active) {
                this.isActive = df(this.data, this.active);
            }
            //default closeable
            if(this.closeable === undefined){
                this.closable = true;
            }
            //update active prop
            this.$scope.$on('itemclick', (event, args) => {
                this.isActive = df(this.data, this.active);
            });

        }

        close() {
            this.onclose();
        }

        edit() {
            this.onedit({
                item: this.data
            });
        }
    },
    restrict: 'E'
};