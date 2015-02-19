define(function (require) {

    //dependencies
    var $ = require('jquery'),
        jqueryui = require('jqueryui'),
        commonUI = require('app/commonUI');
    
    var exposedAPI = {
        render: render
    }

    function createCallToActionButtion() {
        var container = $("<div></div>");
        commonUI.renderWebPartCallToActionButtion(container, '/Lists/RFI/NewForm.aspx?Source=' + document.location.href, "new request for information", "");
        $("#mainContent").after(container);
    }

    function render() {
        createCallToActionButtion();
        $("#tabs")
            .tabs({
                active: commonUI.getActiveJqueryTabFromUrlHash(),
                activate: commonUI.changeUrlHashWhenJqueryTabSelected
            })
            .fadeIn();
    }



    return exposedAPI;
});
