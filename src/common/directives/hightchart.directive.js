import Highcharts from 'highcharts';
window.Highcharts = Highcharts;

export default () => {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            options: '='
        },
        link: function (scope, element, attrs) {
            Highcharts.theme = {
				colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
					'#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
				]
            }
            
            Highcharts.setOptions(Highcharts.theme);
            Highcharts.chart(element[0], scope.options);

        }
    }
}