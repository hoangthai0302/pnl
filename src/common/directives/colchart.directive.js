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
				colors: ['#0099ff', 'orange', '#f45b5b', '#7798BF', 'brown', '#ff0066',
                '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
              ]
            }
            
            Highcharts.setOptions(Highcharts.theme);

            let {title, categories, data, stacked} = scope.options;

            let stacking = stacked ? 'column' : null

            let defaultOps = {
                chart: {
					type: 'column'
				},
				title: {
					text: title
				},
				xAxis: {
					categories: categories
				},
                yAxis: {
                    className: 'highcharts-color-0',
                    min: 0,
                    // gridLineWidth: 0,       //this will hide the gridlines
                    // minorGridLineWidth: 0,
                    title: {
                        text: ''
                    },
                    stackLabels: {
                        enabled: false,  //hide number display on top of column
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                plotOptions: {
                    column: {
                        stacking: stacking,
                        dataLabels: {
                            enabled: false,  //hide number display inside column
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                        },
                        borderWidth: 0  //hide the border of each rectangle
                    }
                },
                series: data,
                credits: {
                    enabled: false
                }
            }


            Highcharts.chart(element[0], defaultOps);

        }
    }
}