sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/odata/v2/ODataModel"
    
], function (Controller, JSONModel, MessageToast, ODataModel) {
    "use strict";

    return Controller.extend("app.user.controller.home", {
        onInit: function () {

        },


        onPressGraph: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Routegraph");
        },
        onPressConfigration: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Routeconfigration");
        }
    });
});