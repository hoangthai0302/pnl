
import angular from 'angular';

import ChipItem from './chip-item.component';
import Chips from './chips.component';


export default angular.module('hmx-chips', [
])
.component('hmxChipItem',ChipItem)
.component('hmxChips',Chips)
.name;
