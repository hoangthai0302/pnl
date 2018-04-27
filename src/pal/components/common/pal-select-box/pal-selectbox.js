import './style.scss';
import template from './pal-select-box-template.html';

export default {
    bindings: {
        id:'@',
        default: '@',
        user: '=?ngModel'
    },
    template,
    restrict: 'E',
    transclude: true,
    controller: class Controller {
        /* @ngInject */ 
        constructor($timeout, $scope, CommonService){
            Object.assign(this,{
                $timeout,
                $scope,
                CommonService
            })
        }
        $onInit() {
            this.CommonService.loadCodeList(this.id, this.default).then((response)=>{
                this.users = response.map((value, index) => {
                    return {
                        id: index,
                        name: value.CodeName
                    };
                });
            }).catch((error)=> {
                console.error('pal-selectbox load data error =' , error);
            });

            this.users = [];

            this.modelChange = () => {
                // console.log('model change = ', this.user);
            }
        }

        
    }
};