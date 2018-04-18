import template from './grid.html';
import './grid.scss';
import perfectScrollbar from 'perfect-scrollbar';

export default {
    bindings: {
        options: '=',
        selectedRows: '=?',
        showSelectionStatus: '<?'
    },
    template,
    controller: class Controller {
        /* @ngInject */
        constructor($scope, $stateParams, $q, $timeout, $templateCache, uiGridConstants) {

            Object.assign(this, {
                $scope,
                $stateParams,
                $timeout,
                $q,
                $templateCache,
                uiGridConstants
            });
        }

        $onInit() {
            var self = this;
            this.isLoading = false;

            this.options = this.options || {};

            this.options.data = this.options.data || [];
            this.options.id = this.options.id || Math.random().toString(36).substr(2, 16);

            this.$templateCache.put('ui-grid/ui-grid-row',
                    `
                        <div ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.uid\" ui-grid-one-bind-id-grid=\"rowRenderIndex + '-' + col.uid + '-cell'\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell layout-row layout-align-center-center': col.isRowHeader }\" role=\"{{col.isRowHeader ? 'rowheader' : 'gridcell'}}\" ui-grid-cell></div>
                    `
                );

            this.gridOptions = {
                id: this.options.id,
                cssClass: this.options.cssClass || 'grid',
                enableColumnMenus: this.options.enableColumnMenus || false,
                enableSorting: this.options.enableSorting || false,
                enableHorizontalScrollbar: false,
                maxRow: this.options.maxRow || 15,
                enableRowSelection: !!this.options.enableRowSelection,
                enableSelectAll: !!this.options.enableRowSelection,
                infiniteScrollDown: this.options.infiniteScrollDown,
                data: this.options.data,
                columnDefs: this.options.columnDefs,
                isLoading:false,
                adjustHeight: () => {
                    let length = this.options.data.length;
                    let maxRow = this.options.maxRow;
                    let cssClass = this.gridOptions.cssClass;
                    this.options.rowHeight = this.options.rowHeight || 30;
                    let rowHeight = this.options.rowHeight;

                    let mainGrid = document.querySelector('hmx-grid > div.grid');

                    if (length && maxRow) {
                        length = Math.min(length, maxRow);

                        let height = length * this.options.rowHeight;
                        console.log(length)
                        if(mainGrid) {
                            mainGrid.style.height = height + 30 + 10;
                            mainGrid.style.overflow = 'hidden';
                        }

                        let viewport = document.querySelector('.ui-grid-render-container-body .ui-grid-viewport');
                        if(viewport){
                            viewport.height = height + 11;
                        }

                        let selectionViewport = document.querySelector('.ui-grid-render-container-left .ui-grid-viewport');
                        height = Math.max(height, 30);
                        if(selectionViewport) {
                            selectionViewport.style.height = height + 11;
                        }
                    } else {
                        if(mainGrid){
                            mainGrid.style.height = 150;
                        }
                    }

                },
                onRegisterApi: (gridApi) => {

                    this.$templateCache.put('ui-grid/selectionSelectAllButtons',
                        `
                        <div class="ui-grid-selection-row-header-buttons" 
                            ng-if="grid.options.enableSelectAll" >
                            <md-checkbox class="md-primary" ng-model="grid.selection.selectAll" ng-click="headerButtonClick($event); grid.selection.selectAll = !grid.selection.selectAll" type="checkbox"  ></md-checkbox>
                        </div>
                        `
                  );
                this.$templateCache.put('ui-grid/selectionRowHeaderButtons',
                `
                <div class="ui-grid-selection-row-header-buttons">
                    <md-checkbox class="md-primary" ng-model="row.isSelected" type="checkbox" ng-click="selectButtonClick(row, $event);grid.appScope.gridOptions.onRowSelectionClickedCb(row);row.isSelected = !row.isSelected" ></md-checkbox>
                </div>
                `
            );

                   
                    this.options.gridApi = gridApi;
                    gridApi.core.on.rowsRendered(null, () => {
                        this.gridOptions.adjustHeight();
                        if(this.options.data.length > 0 && !this.firstLoad){
                            console.log("first load : " + this.options.data.length);
                            this.firstLoad = true;
                            if(this.options.onFirstLoadComplete){
                                this.options.onFirstLoadComplete(gridApi);

                            }
                            //replace default window scrollbar with custom scrollbar
                            let viewportContainer = document.querySelector('.ui-grid-render-container-body .ui-grid-viewport');
                            viewportContainer.style.overflow = 'hidden';
                            viewportContainer.style.position = 'relative';
                            new perfectScrollbar(viewportContainer);
                        }

                    });

                    if (this.options.enableRowSelection) {
                        gridApi.selection.on.rowSelectionChangedBatch(this.$scope, handleSelectedBatch);
                        gridApi.selection.on.rowSelectionChanged(this.$scope, handleSelectedSingle);
                    }
                    
                    if (this.options.getData && this.options.getTotalRecord) {
                        if(gridApi.infiniteScroll){
                            gridApi.infiniteScroll.on.needLoadMoreData(this.$scope, getDataDown);
                        } 
                    }
                    
                    if (this.options.onRegisterApiComplete) {
                        this.options.onRegisterApiComplete(gridApi);
                    }

                    this.options.onRowSelectionClickedCb = (row)=>{
                        if(this.options.onRowSelectionClick){
                            this.options.onRowSelectionClick(row);
                        }
                    }

                }
            }

            this.options = Object.assign(this.options, this.gridOptions);

            this.options.reload = () => {
                this.pageIndex = 1;
                this.options.data = [];
                if(this.options.gridApi.infiniteScroll){
                    getDataDown();
                } 

            }

            this.options.showLoading = (isLoading) => {
                this.isLoading = isLoading;
            }

            function handleSelectedBatch() {
                self.selectedRows = self.options.gridApi.selection.getSelectedRows();
            }

            function handleSelectedSingle(row) {
                self.selectedRows = self.options.gridApi.selection.getSelectedRows();
                if (self.options.onSelectRow) {
                    self.options.onSelectRow(row);
                }
            }

            function getDataDown() {
                let deferred = self.$q.defer();


                if (self.pageIndex) {
                    self.isLoading = true;
                    self.options.isLoading = true;
                    self.options.getData(self.pageIndex).then((res) => {
                        self.isLoading = false;
                        self.options.isLoading = false;
                        if (self.pageIndex == 1) {
                            self.options.data = []; //reset data
                            self.selectedRows = [];
                            if(self.options.gridApi.infiniteScroll) {
                                self.options.gridApi.infiniteScroll.resetScroll();  
                            } 
                            setTimeout(() => {
                                let viewports = document.querySelectorAll('.ui-grid-viewport');
                                for(let i = 0; i < viewports.length; i++){
                                    viewports[i].style.scrollTop = 0;
                                }
                            }, 50)
                        }

                        self.pageIndex++; //increase pageIndex for next load

                        if (res && res.length) {
                            self.options.data = self.options.data.concat(res);
                            deferred.resolve();

                            let totalRecord = self.options.getTotalRecord();
                            let currentRecord = self.options.data.length;
                            let needLoadMore = currentRecord < totalRecord;

                            if(self.options.gridApi.infiniteScroll) {
                                self.options.gridApi.infiniteScroll.dataLoaded(false, needLoadMore);
                            } 
                        }
                    })
                }

                return deferred.promise;

            }

            this.$scope.$on('deletedRow', (event, args) => {

                this.selectedRows.forEach(row => {
                    this.options.data.splice(this.options.data.indexOf(row), 1);
                });

                this.selectedRows = [];
            });
        }

    },
    restrict: 'E'
}