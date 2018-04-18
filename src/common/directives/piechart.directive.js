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

            let {title, data} = scope.options;
            data = data.map((item)=>{
                return {
                    name: item.name,
                    y: item.value
                }
            })


            let defaultOps =  {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: title
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    },
                    series: {
                        dataLabels: {
                            enabled: true,
                            formatter: function() {
                                return Math.round(this.percentage*100)/100 + ' %';
                            },
                            distance: -40,
                            color:'white'
                        }
                    }
                   
                },
                series: [{
                    name: '',
                    colorByPoint: true,
                    data: data
                }],
                credits: {
                    enabled: false
                }
            }

            Highcharts.chart(element[0], defaultOps);

        }
    }
}