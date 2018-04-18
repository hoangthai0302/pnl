import './style.scss';
import template from './template.html';

export default {
    bindings: {
        model:'=',
        data: '<',
        path:'@',
        placeholder:'@',
        onOpen:'&?',
        onChange:'&?'
    },
    template,
    restrict: 'E',
    transclude: true,
    controller: class Controller {
        /* @ngInject */ 
        constructor($timeout, $scope){
            Object.assign(this,{
                $timeout,
                $scope
            })
        }
        $onInit() {
        }

        deepfind(obj, path) {
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

        getItemValue(item){
            if(!this.path){
                return item;
            }

            return this.deepfind(item, this.path);
        }

        _onChange(){
            if(this.onChange){
                //if don't wrap onChange in timeout, the model will not update in container 
                this.$timeout(()=>{
                    this.onChange({item:this.model});
                })
            }
        }
        
    }
};