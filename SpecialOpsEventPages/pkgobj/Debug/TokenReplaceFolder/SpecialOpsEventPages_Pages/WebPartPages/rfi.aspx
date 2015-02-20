<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=15.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
<SharePoint:ListItemProperty ID="ListItemProperty1" Property="PageTitle" maxlength="40" runat="server"/>Request for Information
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderPageTitleInTitleArea" runat="server">Request for Information
	
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    <style type="text/css">
        #s4-leftpanel, .ms-core-sideNavBox-removeLeftMargin {
            display: none;
        }

        .s4-ca{
            margin-left: 0px;
        }

        #contentBox-WhenNoLeftMenu {
            margin-left: 40px;
        }
    </style>
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="padding:5px 10px 10px 10px;">
        <tr>
            <td valign="top">
                


                <div id="tabs" style="display:none;">
                    <ul>
                        <li><a href="#tabs-1">Open</a></li>
                        <li><a href="#tabs-2">Closed</a></li>
                        <li><a href="#tabs-3">My RFIs</a></li>
                        <li><a href="#tabs-4">Manage RFIs</a></li>
                    </ul>
                    <div id="tabs-1">
                        <WebPartPages:WebPartZone runat="server" FrameType="None" ID="openRFI" Title="loc:openRFI">
                        </WebPartPages:WebPartZone>
                    </div>
                    <div id="tabs-2">
                        <WebPartPages:WebPartZone runat="server" FrameType="None" ID="closeRFI" Title="loc:closeRFI">
                        </WebPartPages:WebPartZone>
                    </div>
                    <div id="tabs-3">
                        <WebPartPages:WebPartZone runat="server" FrameType="None" ID="myRFI" Title="loc:myRFI">
                        </WebPartPages:WebPartZone>
                    </div>
                    <div id="tabs-4">
                        <WebPartPages:WebPartZone runat="server" FrameType="None" ID="manageRFI" Title="loc:manageRFI">
                        </WebPartPages:WebPartZone>
                    </div>
                </div>




            </td>
        </tr>
    </table>
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="PlaceHolderUtilityContent" runat="server">
	<SharePoint:ScriptLink ID="ScriptLink1" language="javascript"
    name="~site/app/js/lib/require.js"
    runat="server"/>
    <script type="text/javascript">

        ExecuteOrDelayUntilScriptLoaded(function () {
            require(['js/common'], function (common) { 
                require(['app/rfi'], function (UI) {
                    UI.render();
                });
            });

        }, "sp.js");

    </script>
</asp:Content>

