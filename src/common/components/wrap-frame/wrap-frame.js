import template from './wrap-frame.html';
import './style.scss';

const Component = {
	restrict: 'E',
	bindings: {
		src: '@',
		width: '<',
		height: '<',
	},
	template,
	controller: class Controller {
		/* @ngInject */
		constructor($stateParams, $element, $window, DialogService, $rootScope, $scope, MessageService) {
			Object.assign(this, {
				DialogService,
                $rootScope,
                $scope,
                MessageService
			});
		}

		$onInit() {
			this.src = this.src || '/GPWeb/MarketingZone/PnL/PNL_Request/PNLRequestList.aspx';
			this.width = this.width || '100%';
            this.height = this.height || '300px';

            this.showLoading = true;

            this.MessageService.on('IFRAME_LOADED', ()=>{
                this.showLoading = false;
            })
			// window.addEventListener("message",  (e)=> {
			// 	let msg = e.data;
			// 	if (msg === 'IFRAME_LOADED') {
            //         this.showLoading = false;
            //         this.$scope.$apply();
			// 	}
			// }, false);
		}

		$onChanges() {

		}

		$onDestroy() {

		}

	}
};

export default Component;
