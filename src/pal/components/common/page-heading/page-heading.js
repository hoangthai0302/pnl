import style from './style.scss'
/* @ngInject */
export default {
    template: `
            <div class='page-heading'>{{$ctrl.text}}</div>    
        `,
    bindings:{
        text:'@'
    }
};
