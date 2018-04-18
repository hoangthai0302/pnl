import routes from './routes'
/* @ngInject */
export default function appConfig(
	$stateProvider,
	$locationProvider,
	$urlRouterProvider,
	$httpProvider,
	$mdAriaProvider,
	$mdThemingProvider,
    $mdDateLocaleProvider,
    $qProvider
) {
	// Globally disables all ARIA warnings.
	$mdAriaProvider.disableWarnings();
	$mdThemingProvider.theme('default')
        .primaryPalette('blue')
        
    //$locationProvider.html5Mode(true); // setting html5 mode to remove !# from url
    $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise(''); // setting default route
    
    //fix issue when cancel dialog (https://github.com/angular/material/issues/10369)
    $qProvider.errorOnUnhandledRejections(false);

	routes.forEach((route) => {
		$stateProvider.state(route);
    });
    


}
