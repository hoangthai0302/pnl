import template from './template.html';
import './style.scss';
import perfectScrollbar from 'perfect-scrollbar';

export default {
	bindings: {
        data: '<'
	},
	template,
	controller: class Controller {
		/* @ngInject */
		constructor($timeout, $scope, VirtualList) {
			Object.assign(this, {
				$scope,
                $timeout,
                VirtualList
			})
		}

		$onInit() {
            if(this.data){

                this.buildChart();
            }
        }

        $onChanges(changes){
            if(this.data){

                this.buildChart();
            }
        }

        buildScale(minDate, monthRange){
            let monthScale = this.buildMonthScale(minDate, monthRange);
            let quarterScale = this.buildQuarterScale(minDate, monthRange);
            let yearScale = this.buildYearScale(minDate, monthRange);
			
            let scaleContainer = document.getElementById('scheduler-scales');
            scaleContainer.innerHTML ='';
            scaleContainer.appendChild(monthScale);
            scaleContainer.appendChild(quarterScale);
            scaleContainer.appendChild(yearScale);
        }

        buildYearScale(minDate, monthRange){
            let yearScale = document.createElement('div');
            yearScale.className = 'year-scale';

            let yearStart = minDate.getFullYear();
            let date = new Date(minDate);
            date.setMonth(date.getMonth() + monthRange);
            let yearEnd = date.getFullYear();

            for(let y = yearStart; y <= yearEnd; y++){
                let div = document.createElement('div');
                div.innerHTML = y;
                yearScale.appendChild(div);
            }

            return yearScale;
        }

        buildQuarterScale(minDate, monthRange){

            const arr = ['Dec-Feb', 'Mar-May', 'Jun-Aug', 'Sep-Nov'];
            let quarterScale = document.createElement('div');
            quarterScale.className = 'quarter-scale';

            let monthStart = minDate.getMonth() + 1;

            let quarterStart;
            if(3 <= monthStart && monthStart <=5){
                quarterStart = 1;
            }
            if(6 <= monthStart && monthStart <=8){
                quarterStart = 2;
            }
            if(9 <= monthStart && monthStart <=11){
                quarterStart = 3;
            }
            if(monthStart >11 || monthStart <3){
                quarterStart = 0;
            }
            
            let totalQuarter = Math.ceil(monthRange/3);
            for(let i = 0; i < totalQuarter; i++){
                let div = document.createElement('div');
                let quarter = (i + quarterStart) % 4;
                div.innerHTML = arr[quarter];
                if(!arr[quarter]){
                    console.log(quarter);
                    console.log(totalQuarter);
                    console.log(monthRange);
                }
                quarterScale.appendChild(div);
            }

            let marginLeft = monthStart % 3 * 60;
            quarterScale.style.marginLeft =  - marginLeft + 'px';
            
            return quarterScale;
        }
        
        buildMonthScale(minDate, monthRange){
            let monthScale = document.createElement('div');
            monthScale.className = 'month-scale';
            
            let monthStart = minDate.getMonth() + 1;

			for (let i = 0; i < monthRange; i++) {
				let div = document.createElement('div');
				let month = (i + monthStart)  % 12 ;
				if (month == 0) {
					month = 12
				}

				if (month < 10) {
					month = '0' + month;
				}
				div.innerHTML = month + '';
				monthScale.appendChild(div);

            }
            return monthScale;
        }

        


        flatData(data, dateRange){
            let dataFlat = [];
            for (let item of data) {

                dataFlat.push({
                    name: item.name
                })
                
				if (item.children) {
                    
                    for (let child of item.children) {
                        //recalculate the min date
                        if(dateRange.minDate.getTime() > child.start.getTime() ) {
                            dateRange.minDate = new Date(child.start);
                        }
                        dataFlat.push(child);

                        //calculate the end date of each child
                        let count = 0;
                        for(let step of child.steps){
                            count += step;
                        }
                        //recalculate the maxDate
                        let childEndDate = new Date(child.start.valueOf() + 864E5*count); 
                        
                        if(childEndDate.getTime() > dateRange.maxDate.getTime()){
                            dateRange.maxDate = childEndDate;
                        }
                    }
                    
				}

            }

            return dataFlat;
        }

        buildListSchedule(dataFlat, minDate, monthRange){
            let self = this;
            let container = document.getElementById('scheduler-list-container');
            //empty the container before build the list
            while(container.firstChild){
                container.removeChild(container.firstChild);
            }
            return this.VirtualList.build({
                container,
				h: 500,
                itemHeight: 40,
                rowClass:'vrow',
				totalRows: dataFlat.length,
				renderRow:  (row) =>{
                    
					let el = document.createElement("div");
					let scheduleDiv = document.createElement('div');
					scheduleDiv.className = 'schedule-item';
					el.appendChild(scheduleDiv);

					let item = dataFlat[row];
					if (item.start) {
                        let days = item.start.getDate();
                        //calculate the offset
                        let months = self.monthDiff(item.start, minDate);
						scheduleDiv.style.left = days * 2 + (months + 1) * 60 + 'px';

						for (let step of item.steps) {
							let stepDiv = document.createElement('div');
							stepDiv.className = 'schedule-step';
							stepDiv.style.width = step * 2 + 'px';
                            stepDiv.innerHTML = step ;
                            let i = document.createElement('i');
                            stepDiv.appendChild(i);
							scheduleDiv.appendChild(stepDiv);
						}
                    }
                   
					el.style.width = monthRange * 60 + 'px';
					return el;
                },
                onRenderComplete:(instance)=> {
                    //calculate today position
                    let today = new Date();
                    let days = today.getDate();
                    let monthFromStart = this.monthDiff(today, minDate);
                    let offsetLeft = days * 2 + (monthFromStart + 1) * 60;
                    
                    
                    let scroller = instance.scroller;
                    scroller.style.backgroundColor = 'red';
                    scroller.style.zIndex = 9;
                    scroller.style.opacity = 1;
                    scroller.style.left = offsetLeft + 'px';

                    if(!scroller.firstChild) {
                        let div = document.createElement('div');
                        div.innerHTML = 'Today';
                        div.style.position = 'absolute';
                        div.style.border = '1px solid red';
                        scroller.appendChild(div);
                    }else {
                        scroller.firstChild.style.top = instance.container.scrollTop + 'px';
                    }

                    


                },
                onScroll:(e, instance)=>{
                    let scrollTop = e.target.scrollTop;
                    let scroller = instance.scroller;
                    scroller.firstChild.style.top = instance.container.scrollTop + 'px';
                }
            });
        }

        buildSidebar(dataFlat){
            return this.VirtualList.build({
                id:'sidebar-item-container',
                h:500,
				itemHeight: 40,
				totalRows: dataFlat.length,
				renderRow: function (row) {
                    let div = document.createElement('div');
                    let item = dataFlat[row];

                    if (item.start) {
                        div.classList.add('schedule-sidebar__sub-item');
                    } else {
                        div.classList.add('schedule-sidebar__item')
                        let i= document.createElement('i');
                        i.className = 'material-icons';
                        i.innerHTML = '&#xe2c8;';
                        div.appendChild(i);
                    }
                    let span = document.createElement('span');
                    span.innerHTML = item.name;
                    div.appendChild(span);
                    div.style.height = this.itemHeight + 'px';

					return div;
				}
            });
        }

        monthDiff(d1, d2){
            let startDate, endDate;

            if(d1.getTime() > d2.getTime()) {
                startDate = d2;
                endDate = d1;
            }else {
                startDate = d1;
                endDate = d2;
            }

            let months;
            months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
            months -= startDate.getMonth() + 1;
            months += endDate.getMonth();
            return months;
        }



		buildChart() {

            let minDate = new Date();;
            let maxDate = new Date();
            let dateRange = { minDate, maxDate }
            
			let dataFlat = this.flatData(this.data, dateRange);
            minDate = dateRange.minDate;
            //get first day of the minDate'month
            minDate = new Date(minDate.getFullYear(), minDate.getMonth(), 1);

            maxDate = dateRange.maxDate;
            let monthRange = this.monthDiff(minDate, maxDate) + 6;

            let list = this.buildListSchedule(dataFlat, minDate, monthRange);
            
            if(this.isIE()){
                list.container.style["-ms-overflow-style" ] = 'scrollbar';
            } else {
                list.container.style.overflow = 'hidden';
                new perfectScrollbar(list.container, { minScrollbarLength: 40 });
            }

            this.buildScale(minDate, monthRange);

            let sidebarItems =  this.buildSidebar(dataFlat);
            sidebarItems.container.style.overflow = 'hidden';
            document.querySelector('.scheduler-sidebar').appendChild(sidebarItems.container);
            //sync scroll between scheduler list and sidebar
            this.syncScroll(sidebarItems);
        }
        
        syncScroll(sidebarItems){
            document.getElementById('scheduler-list-container').addEventListener('scroll',function(e){
                let scrollTop = e.target.scrollTop;
                let scrollLeft = e.target.scrollLeft;
                document.getElementById('scheduler-scales').scrollLeft = scrollLeft ;
                sidebarItems.container.scrollTop = scrollTop;
            })
        }
        
        isIE(){
            let ua = window.navigator.userAgent;
            let msie = ua.indexOf("MSIE ");

            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
            {
                return true;
            }
            return false;
        }


	},
	restrict: 'E'
};
