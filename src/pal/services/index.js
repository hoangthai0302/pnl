import angular from 'angular';

import CommonService from './CommonService';


const ServicesModule = angular
  .module('pal.services', [])
  .service('CommonService', CommonService) 
  .name;

export default ServicesModule;