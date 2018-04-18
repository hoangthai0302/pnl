import styles from './dialog.service.css';

class DialogService {
    /* @ngInject */ 
    constructor($mdDialog, $rootScope, $translate) {
        this.$rootScope = $rootScope;
        this.$mdDialog = $mdDialog;
    }

    showMessage(msg) {
        return this.alert({title:'Info', message: msg, ok: 'OK'})
    }

    showLoading(parent) {
        let backdrop = document.getElementById('backdrop');
        if (!backdrop) {
            backdrop = $(`
                <div id="backdrop">
                    <div class="loading-spinner">
                        <div class="bounce1"></div>
                        <div class="bounce2"></div>
                        <div class="bounce3"></div>
                    </div>
                </div>
            `)

            let position = 'fixed';
            let background = 'black';
            if(parent){
                position = 'absolute';
                background = 'gray';
            }
            $(backdrop).css({
                position,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 999999,
                background,
                opacity:.25
            })

            if(parent){
                $(parent).css({position:'relative'});
                $(parent).prepend(backdrop);
            }else{
                $('body').prepend(backdrop);
            }

        }


        $(backdrop).show();
    }

    hideLoading() {
        $('#backdrop').hide();
    }



    showComponent(componentTemplate, data, options) {
        var count = document.getElementsByTagName('md-dialog').length;

        var dialogTitle = options.title;
        var dialogKey = options.titleKey || 'COMMON.DIALOG.DIALOG_TITLE';

        var template = `
                <md-dialog layout="column" class="md-count-${count}">
                    <md-toolbar >
                        <div class="md-toolbar-tools" >
                            <h2 ng-if="dialogTitle" >{{dialogTitle}}</h2>
                            <h2 ng-if="!dialogTitle && dialogKey" >{{dialogKey | translate }}</h2>
                            <span flex></span>
                            <md-button ng-if="!hideClose" title="close" class="md-icon-button" ng-click="closeDialog()">
                                <md-icon>close</md-icon>
                            </md-button>
                        </div>
                    </md-toolbar>
                    ${componentTemplate}
                </md-dialog>
            `;

        let dialogOption = {
            template,
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            multiple: true,
            fullscreen: false // Only for -xs, -sm breakpoints.
        };

        Object.assign(dialogOption, options);

        data = data || {};

        var self = this;
        data.closeDialog = data.closeDialog || function () {
            self.$mdDialog.hide();
        }


        Object.assign(data, {
            dialogTitle,
            dialogKey
        });

        let scope = this.$rootScope.$new();
        Object.assign(scope, data);
        dialogOption.scope = scope;

        return this.$mdDialog.show(dialogOption);
    }

    alert({title, message, ok}) {
        ok = ok || 'OK';
        var alert = this.$mdDialog.confirm()
          .title(title)
          .htmlContent(message)
          .ok(ok)

        return this.$mdDialog.show(alert);  
    }

    confirm({title, message, ok, cancel}) {
        ok = ok || 'OK';
        cancel = cancel || 'Cancel'
        console.log(this.$mdDialog.confirm());
        var confirm = this.$mdDialog.confirm()
          .title(title)
          .htmlContent(message)
          .ok(ok)
          .cancel(cancel)

        return this.$mdDialog.show(confirm);  
    }

    hide() {
        return this.$mdDialog.hide.call(arguments);
    }
}

export default DialogService;