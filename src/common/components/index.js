import hmxChips from './chips';
import hmxGrid from './grid';
import WrapFrame from './wrap-frame/wrap-frame'

import cardItem from './card-item/card-item';
import inputsearch from './input-search/input-search.component'
import SelectBox from './select-box/selectbox'

export default angular.module('hmx-common.components', [
    hmxChips, hmxGrid
])
.component('hmxCardItem', cardItem)
.component('hmxInputSearch', inputsearch)
.component('hmxWrapFrame',WrapFrame)
.component('hmxSelectBox',SelectBox)
.name;

