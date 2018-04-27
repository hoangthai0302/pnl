import template from './planning.html';
/* @ngInject */
export default {
	template: template,
	controller: class Controller {
		/* @ngInject */
		constructor($log, DialogService, $timeout, $q, $state, $element, uiGridConstants, CommonService) {
			Object.assign(this, {
				$log,
				DialogService,
				$timeout,
				$state,
				$q,
				$element,
                uiGridConstants,
                CommonService
			})

		}

		$onInit() {
            this.CommonService.getUserMenu().then((res)=>{
                console.log(res);
            })
			this.data = [{
					id: 1,
					name: 'Scooby Doo',
					active: false
				},
				{
					id: 2,
					name: 'Shaggy Rodgers'
				},
				{
					id: 3,
					name: 'Fred Jones',
					active: false
				}


			];

			this.myData = [{
					firstName: "Cox",
					lastName: "Carney",
					company: "Enormo",
					employed: true
				},
				{
					firstName: "Lorraine",
					lastName: "Wise",
					company: "Comveyer",
					employed: false
				},
				{
					firstName: "Nancy",
					lastName: "Waters",
					company: "Fuelton",
					employed: false
				}
			];

			let data = [];
			for (let i = 0; i < 28; i++) {
				data.push({
					actualId: 'asdf asdf',
					status: 'complete',
					stringValueEng: Math.random().toString(36).substr(2, 16)
				})
			}
			let self = this;
			this.gridOptions = {
				appScopeProvider: this,
				data: data,
				maxRow: 10,
				enableSorting: true,
				cssClass: 'import-string-grid',
				enableRowSelection: true,
				onRowSelectionClick(row) {

				}
			}

			let uiGridConstants = this.uiGridConstants;

			this.gridOptions.columnDefs = [{
					field: 'actualId',
					displayName: 'Actual ID',
					width: 200,
					pinnedLeft: true

				},
				{
					field: 'stringValueEng',
					displayName: 'English (US)',
					sort: {
						direction: uiGridConstants.DESC,
						priority: 1
					},
					width: 200
				}, {
					field: 'stringValueEng',
					displayName: 'English (US)',
					sort: {
						direction: uiGridConstants.DESC,
						priority: 1
					},
					width: 200
				},
				{
					field: 'stringValueEng',
					displayName: 'English (US)',
					sort: {
						direction: uiGridConstants.DESC,
						priority: 1
					},
					width: 200
				},
				{
					name: 'Status',
					cellTemplate: `
                                <div class="ui-grid-cell-contents text-center">
                                    {{row.entity.status}}
                                </div>
                            `,
					width: '80',
					headerCellClass: 'text-center'
				},
				{
					field: 'View',
					width: '60',
					cellTemplate: `
                        <div layout="row" layout-align="center center">
                            <md-button class="md-icon-button md-primary" ng-click="grid.appScope.detailView(row)" aria-label="Settings">
                            <ng-md-icon icon="visibility"></md-icon>
                            </md-button>
                        </div>
                    `,
					headerCellClass: 'text-center'
				}

            ];
            
			
			this.chartOptions = {
				title: 'Cumulative Sales',
				categories: ['AnC', 'EMEA', 'NW', 'Retail CPE', 'SM'],
				data: [{
					name: 'BP',
					data: [49.9, 71.5, 106.4, 129.2, 144.0]
				}, {
					name: 'Target',
					data: [83.6, 78.8, 98.5, 93.4, 106.0]
				}, {
					name: 'Actual',
					data: [48.9, 38.8, 39.3, 41.4, 47.0]
				}]
            };
            
            //stacked column
            this.chartOptions2 = {
				title:  'Productized rate',
                categories: ['Total', 'STB', 'OTT', 'Network', 'Automotive'],
                stacked: true,
				data: [{
					name: 'Productized count',
					data: [16, 3, 4, 7, 2]
				}, {
					name: '',
					data: [8, 2, 3, 2, 1]
				}]
            };
            
            this.piechartOptions = {
                title:"Piechart Example",
                data: [
                    { name:'Chrome', value : 5 },
                    { name:'Firefox', value : 7 },
                    { name:'Edge', value : 3 }
                ]
            }

		}
		addChip() {
			this.data.push({
				id: Math.floor(Math.random() * 1000),
				name: Math.random().toString(36).substr(2, 16),
				active: false
			})
		}

		toggleActive(item) {
			item.active = !item.active;
        }
        
        generateScheduleChart(){
            let totalItem = 5000;
            const data = [];
            for (let i = 0; i < totalItem; i++) {
                let childCount = Math.floor(Math.random() * 3) + 1;
                let item = {
                    name: Math.random().toString(36).substr(2, 16),
                    children: []
                }
                for (let j = 0; j < childCount; j++) {

                    let dateObj = randomDate(new Date(2012, 4, 1), new Date());
                    

                    //step duration in days
                    let step1 = Math.floor(Math.random() * 120) + 14;
                    let step2 = Math.floor(Math.random() * 120) + 14;
                    let step3 = Math.floor(Math.random() * 120) + 14;
                    

                    item.children.push({
                        name: Math.random().toString(36).substr(2, 16),
                        start: dateObj,
                        steps: [ step1, step2, step3 ]
                    })

                    
                }
                data.push(item);

            }

            function randomDate(start, end) {
                return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            }
            
            this.scheduleData =  data;
        }

		searchUsers(text) {

			let deferred = this.$q.defer();

			if (!this.users) {


				this.$timeout(() => {

					this.users = [{
							id: 1,
							name: 'Scooby Doo'
						},
						{
							id: 2,
							name: 'Shaggy Rodgers'
						},
						{
							id: 3,
							name: 'Fred Jones'
						},
						{
							id: 4,
							name: 'Daphne Blake'
						},
						{
							id: 5,
							name: 'Velma Dinkley'
						},
						{
							id: 6,
							name: 'Fred Jones'
						},
						{
							id: 7,
							name: 'Daphne Blake'
						},
						{
							id: 8,
							name: 'Velma Dinkley'
						}
					];
					if (!text) {
						deferred.resolve(this.users);
					} else {
						deferred.resolve(this.users.filter((u) => {
							return u.name.indexOf(text) !== -1;
						}));
					}


				}, 650);
			} else {
				if (!text) {
					deferred.resolve(this.users);
				} else {
					deferred.resolve(this.users.filter((u) => {
						return u.name.indexOf(text) !== -1;
					}));
				}
			}

			return deferred.promise;
		}

		changeState() {
			this.$state.go('app.overview')
		}

		loadUsers() {
			if (this.users) {
				return this.users
			}

			return this.$timeout(() => {

				this.users = [{
						id: 1,
						name: 'Scooby Doo'
					},
					{
						id: 2,
						name: 'Shaggy Rodgers'
					},
					{
						id: 3,
						name: 'Fred Jones'
					},
					{
						id: 4,
						name: 'Daphne Blake'
					},
					{
						id: 5,
						name: 'Velma Dinkley'
					}
				];

			}, 650);
		};

		showDialog() {
			this.DialogService.showComponent('<h3>Hello world</h3>', null, {})

		}

		showConfirm() {
			this.DialogService.confirm({
				title: 'Please confirm',
				message: `<p>Custom html content here <a href='#'>Link</a></p>`
			}).then(() => {
				alert('You;ve click OK');
			})
		}

		showAlert() {
			this.DialogService.alert({
				title: 'Alert',
				message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
			}).then(() => {
				alert('You;ve click OK');
			})
		}

	}
};
