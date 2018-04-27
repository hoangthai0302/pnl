import angular from 'angular';

import ApiService from './api.service';
import DialogService from './dialog.service';
import CacheService from './cache.service';
import MessageService from './message.service';
import VirtualList from './virtual-list';

const ServicesModule = angular
  .module('hmx-common.services', [])
  .service('ApiService', ApiService)  
  .service('DialogService', DialogService)
  .service('CacheService', CacheService)
  .service('MessageService', MessageService)
  .service('VirtualList', VirtualList)
  .name;

export default ServicesModule;
