define(function (require) {

    //dependencies
    var $ = require('jquery'),
        handlebars = require('handlebars');

    var exposedAPI = {
        addModalBehavior: addModalBehavior,
        changeUrlHashWhenJqueryTabSelected: changeUrlHashWhenJqueryTabSelected,
        getActiveJqueryTabFromUrlHash: getActiveJqueryTabFromUrlHash,
        isSP2010: isSP2010,
        isSP2013: isSP2013,
        renderWebPartCallToActionButtion: renderWebPartCallToActionButtion,
        renderWebPartHeaderTag: renderWebPartHeaderTag,
        showSuccessNotification: showSuccessNotification,
        showErrorNotification: showErrorNotification
    }

    function addModalBehavior(domContainer, selector) {
        $(selector, domContainer).click(function (evt) {
            evt.preventDefault();
            var link = $(this);

            //MODAL DIALOG API PRESENT IN SP2010 & SP2013
            SP.UI.ModalDialog.showModalDialog({
                url: link.attr("href"),
                title: link.attr("title")
            });
        });
    }

    function changeUrlHashWhenJqueryTabSelected(evt, ui) {
        var selectedTab = $(this).tabs('option', 'active');
        location.hash = selectedTab;
    }

    function getActiveJqueryTabFromUrlHash() {
        return (location.hash != "") ? location.hash.replace("#", "") : 0;
    }

    function isSP2010() {
        return _spPageContextInfo.webUIVersion === 4;
    }

    function isSP2013() {
        return _spPageContextInfo.webUIVersion === 15;
    }

    //SP2010 corev4.css: ms-standardheader ms-WPTitle
    //SP2013 corev15.css: ms-webpart-titleText
    var sp2010WebPartHeaderTag =
        "<h3 style='text-align:justify;' class='ms-standardheader ms-WPTitle'>\
            <a href='{{url}}'>\
                <nobr><span>{{urlText}}</span><span></span></nobr>\
            </a>\
        </h3>";

    var sp2010WebPartHeaderTable =
        '<table width="100%" cellpadding="0" cellspacing="0" border="0">\
            <tbody>\
                <tr>\
                    <td valign="top" class="s4-wpcell">\
                        <table class="s4-wpTopTable" border="0" cellpadding="0" cellspacing="0" width="100%">\
                            <tbody>\
                                <tr>\
                                    <td>\
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">\
                                            <tbody>\
                                                <tr class="ms-WPHeader">\
                                                    <td align="left" class="ms-wpTdSpace">&nbsp;</td>\
                                                    <td class="ms-WPHeaderTd">'
                                                        + sp2010WebPartHeaderTag +
                                                    '</td>\
                                                </tr>\
                                            </tbody>\
                                        </table>\
                                    </td>\
                                </tr>\
                            </tbody>\
                        </table>\
                    </td>\
                </tr>\
            </tbody>\
        </table>';

    var sp2013WebPartHeaderTag =
        '<h2 style="text-align:justify;" class="ms-webpart-titleText">\
            <a href="{{url}}">\
                <nobr><span>{{urlText}}</span></nobr>\
            </a>\
        </h2>';

    var sp2013WebPartHeaderTable =
        '<div class="s4-wpcell ms-webpartzone-cell ms-webpart-cell-vertical ms-fullWidth">\
            <div class="ms-webpart-chrome ms-webpart-chrome-vertical ms-webpart-chrome-fullWidth">\
	            <div class="ms-webpart-chrome-title">\
		            <span class="js-webpart-titleCell">'
                         + sp2013WebPartHeaderTag +
		            '</span>\
                </div>\
            </div>\
        </div>';

    var sp2013Button =
        '<table dir="none" cellpadding="0" cellspacing="0" border="0">\
            <tbody>\
                <tr>\
                    <td class="ms-list-addnew ms-textLarge ms-soften">\
                        <a class="ms-heroCommandLink" href="{{url}}" target="_self">\
                            <span class="ms-list-addnew-imgSpan16"><img src="/_layouts/15/images/spcommon.png?rev=23" class="ms-list-addnew-img16"></span>\
                            <span>{{urlText}}</span>\
                        </a> {{urlMutedText}}\
                    </td>\
                </tr>\
            </tbody>\
        </table>';

    function renderWebPartCallToActionButtion(container, webRelativeUrl, urlText, urlMutedText) {
        var hbTemplate = handlebars.compile(sp2013Button),
			btn = hbTemplate({
			    url: requirejs.spWebURL + webRelativeUrl,
			    urlText: urlText,
			    urlMutedText: urlMutedText
			});

        container.append($(btn));
    }

    function renderWebPartHeaderTag(container, webRelativeUrl, urlText) {

        var self = this,
            webPartHeaderTagHtml = self.isSP2010() ? sp2010WebPartHeaderTag : sp2013WebPartHeaderTag;

        var hbTemplate = handlebars.compile(webPartHeaderTagHtml),
			webPartHeaderTag = hbTemplate({
			    url: requirejs.spWebURL + webRelativeUrl,
			    urlText: urlText
			});

        container.append($(webPartHeaderTag));
    }

    function renderWebPartHeaderTable(container, webRelativeUrl, urlText) {
        var self = this,
            webPartHeaderTableHtml = self.isSP2010() ? sp2010WebPartHeaderTable : sp2013WebPartHeaderTable;

        var hbTemplate = handlebars.compile(webPartHeaderTableHtml),
			webPartHeaderTable = hbTemplate({
			    url: requirejs.spWebURL + webRelativeUrl,
			    urlText: urlText
			});

        container.append($(webPartHeaderTable));
    }

    function showErrorNotification(title, msg) {
        //var statusId = SP.UI.Status.addStatus(msg);    
        //SP.UI.Status.setStatusPriColor(statusId, 'red');

        // create sharepoint notification 
        var notificationData = new SPStatusNotificationData("", STSHtmlEncode(msg), '_layouts/15/images/gbmrk.gif', null);
        var notification = new SPNotification(SPNotifications.ContainerID.Status, STSHtmlEncode(title), false, null, null, notificationData);

        // show sharepoint notification tile 
        notification.Show(false);

    }

    function showSuccessNotification(title, msg) {
        //var statusId = SP.UI.Status.addStatus(msg);    
        //SP.UI.Status.setStatusPriColor(statusId, 'green');

        // create sharepoint notification 
        var notificationData = new SPStatusNotificationData("", STSHtmlEncode(msg), '_layouts/15/images/check2.gif', null);
        var notification = new SPNotification(SPNotifications.ContainerID.Status, STSHtmlEncode(title), false, null, null, notificationData);

        // show sharepoint notification tile 
        notification.Show(false);
    }

    return exposedAPI;
});