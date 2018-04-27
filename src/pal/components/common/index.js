
import angular from 'angular';
import HeaderComponent from './header/header.component';
import PnlSelectBox from './pal-select-box/pal-selectbox';
import pageHeading from './page-heading/page-heading';

export default angular.module('common', [

])
.component('header', HeaderComponent)
.component('pageHeading', pageHeading)
.component('palSelectBox', PnlSelectBox)
.name;
