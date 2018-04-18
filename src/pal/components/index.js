import angular from 'angular';

import Layout from './layout/layout';
import Sidebar from './sidebar/sidebar'
import Header from './common/header'
import Planning from './planning/planning'
import tracking from './tracking/tracking'
import update from './update/update'


export default angular.module('pal.components', [
    Header
])
.component('layout', Layout)
.component('sidebar', Sidebar)
.component('planning', Planning)
.component('tracking', tracking)
.component('update', update)
.name;