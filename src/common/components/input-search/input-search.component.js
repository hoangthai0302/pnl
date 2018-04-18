import './style.scss';
import template from './template.html';

export default {
    bindings: {
        model:'=',
        onChange: '&',
        typingDelay:'<',
        placeholder: '<'
    },
    template,
    restrict: 'E',
    controller: class Controller {
        /* @ngInject */ 
        constructor($timeout, $scope){
            Object.assign(this,{
                $timeout,
                $scope
            })
        }
        $onInit() {
            this.timeout = null;
            this.typingDelay = this.typingDelay || 500;
            this.placeholder = this.placeholder || '';
        }

        onInputChange(e) {
            clearTimeout(this.timeout);

            let self = this;
            this.model = e.target.value;
            this.timeout = setTimeout(() => {
                this.$scope.$apply(()=>{
                    this.onChange();
                })
            }, this.typingDelay);

        }
    }
};