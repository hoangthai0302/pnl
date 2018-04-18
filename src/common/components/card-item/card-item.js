import template from './card-item.html';
import './card-item.scss';

export default {
    bindings: {
        header: '<',
        number: '<',
    },
    template,
    controller: class Controller{
          /* @ngInject */ 
        constructor(){

        }

        $onInit(){
                
        }
    },
    restrict: 'E'
};


