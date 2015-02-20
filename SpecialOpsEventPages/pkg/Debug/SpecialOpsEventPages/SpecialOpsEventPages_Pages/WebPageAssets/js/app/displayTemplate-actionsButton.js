(function () {

    var fieldJsLinkOverride = {};
    fieldJsLinkOverride.Templates = {};

    fieldJsLinkOverride.Templates.Fields =
    {
        'ActionsHtml': { 'View': renderAsHTML }
    };

    // Register the rendering template
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(fieldJsLinkOverride);


    function renderAsHTML(ctx) {
        try{
            var parts = ctx.CurrentItem.ActionsHtml.toString().split('-');

            var className = parts[0];
            var btnText = parts[1];

            var btnHtml = "<a class='custombtn " + className + "' data-id='" + ctx.CurrentItem.ID + "'>" + btnText + "</a>";

            return STSHtmlDecode(btnHtml);
        }
        catch(err){
            return 'Error parsing calculated column "ActionsHtml"';
        }
    }

})();