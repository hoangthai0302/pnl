import template from './sidebar.html';
import './sidebar.scss'

export default {
	template,
	controller: class Controller {
		/* @ngInject */
		constructor($log, $state) {
			Object.assign(this,{
                $log,
                $state
			})

		}
	
		$onInit(){
			
		}


	}
	
};
