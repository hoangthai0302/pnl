import template from './layout.html';
import './layout.scss'

export default {
	template,
	controller: class Controller {
		/* @ngInject */
		constructor($log, DialogService, $timeout, $q, $state) {
			Object.assign(this, {
				$log,
				DialogService,
                $timeout,
                $state,
				$q
			})

		}

		$onInit() {

            this.users = null;
            console.log('redirect')
            let name = this.$state.current.name;
            if(name === 'app'){
                this.$state.go('app.overview');
            }
           
		}


		


	}

};
