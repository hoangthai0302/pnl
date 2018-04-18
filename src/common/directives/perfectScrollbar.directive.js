
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css'
window.PerfectScrollbar = PerfectScrollbar;

//use from : https://github.com/utatti/perfect-scrollbar , https://www.npmjs.com/package/perfect-scrollbar

export default () => {
    return {
    
        link: function (scope, element, attrs) {
            let wrapper = element[0];
            let pos = wrapper.style.position;
            if(!pos){
                wrapper.style.position = 'relative';
            }
            new PerfectScrollbar(wrapper);

        }
    }
}