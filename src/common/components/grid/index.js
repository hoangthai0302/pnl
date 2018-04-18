
import 'angular-ui-grid/ui-grid.min.js';
import 'angular-ui-grid/ui-grid.min.css';

import Grid from './grid';
import watcher from './watcher';

export default angular.module('hmx-ui-grid', [
    'ui.grid', 'ui.grid.selection', 'ui.grid.infiniteScroll','ui.grid.pinning', 'ui.grid.autoResize'
])
.component('watcher', watcher)
.component('hmxGrid',Grid)
.name;