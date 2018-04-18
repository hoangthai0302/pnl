import template from './header.html';
import style from './header.scss'
/* @ngInject */
export default {
    template: template,
    controller: class Controller {
        /* @ngInject */
		constructor($log, DialogService, $timeout, $q, $state, MessageService) {
			Object.assign(this, {
				$log,
				DialogService,
                $timeout,
                $state,
                $q,
                MessageService
			})

        }
        
        $onInit(){
            this.languages = ['kr','en']
            this.currentLang = 'en'
        }

        onChange(){
            this.MessageService.send('MainFrame', {
                id:"LANGUAGE_CHANGED",
                data:this.currentLang
            })
        }
    }
};
