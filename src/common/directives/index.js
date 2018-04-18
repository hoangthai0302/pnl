import NgEnter from './ngEnter.directive';
import perfectScroll from './perfectScrollbar.directive'
import highchart from './hightchart.directive'
import piechart from './piechart.directive'
import colchart from './colchart.directive'

export default angular
    .module('hmx-common.directives', [])
    .directive('ngEnter', NgEnter)
    .directive('perfectScroll', perfectScroll)
    .directive('hmxHighcharts', highchart)
    .directive('hmxPiechart', piechart)
    .directive('hmxColchart', colchart)
    .name;