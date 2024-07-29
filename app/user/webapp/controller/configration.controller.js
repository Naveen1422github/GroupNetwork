sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/odata/v2/ODataModel"
    
], function (Controller, JSONModel, MessageToast, ODataModel) {
    "use strict";
    var selectedKey;

    return Controller.extend("app.user.controller.configartion", {
        onInit: function () {

            var oData = {
                SelectedStatus: "CustomGreen", // Default selected key
                StatusCollection: [
                    {
                        Key: "CustomGreen",
                        Title: "Green"
                    },
                    {
                        Key: "CustomBlue",
                        Title: "Blue"
                    },
                    {
                        Key: "CustomPink",
                        Title: "Pink"
                    },
                    {
                        Key: "CustomRed",
                        Title: "Red"
                    },
                    {
                        Key: "CustomGrey",
                        Title: "Grey"
                    },
                    {
                        Key: "CustomLightGrey",
                        Title: "Light Grey"
                    },
                    {
                        Key: "CustomYellow",
                        Title: "Yellow"
                    },
                    {
                        Key: "CustomLightGreen",
                        Title: "Light Green"
                    },
                    {
                        Key: "CustomLightBlue",
                        Title: "Light Blue"
                    },
                    {
                        Key: "CustomWhite",
                        Title: "White"
                    }
                ]
            };
            
            this.selectedKey = "CustomGreen"
            var oStatusModel = new JSONModel(oData);
            this.getView().setModel(oStatusModel, "oData");

            // modela
            var oModel = new JSONModel({
                groupNameVisible: false,
                Groups: []

            });
            this.getView().setModel(oModel, "myModel");


            // Initialize OData model
            var oDataModel = new JSONModel()
            this.getView().setModel(oDataModel, "mainService");
        },

        createUniqueId: function() {
            var timestamp = new Date().getTime();
            var randomNum = Math.floor((Math.random() * 10000) + 1); // Random number between 1 and 10000
            return "ID_" + timestamp + "_" + randomNum;
        },


        onGroups: function () {
            var oView = this.getView();
            var oGroupsVBox = oView.byId("groupsVBox");
            var oGroupsVBox1 = oView.byId("grouppannel");
            oGroupsVBox.setVisible(!oGroupsVBox.getVisible());  // Toggle visibility
            oGroupsVBox1.setVisible(!oGroupsVBox1.getVisible());
            // Hide other VBoxes if necessary
            oView.byId("nodesVBox").setVisible(false);
            oView.byId("connectionsVBox").setVisible(false);
            oView.byId("nodesPanel").setVisible(false);
            oView.byId("connectionsPanel").setVisible(false);

        },
        onNodes: function () {
            var oView = this.getView();
            var oNodesVBox = oView.byId("nodesVBox");
            var oNodesVBox1 = oView.byId("nodesPanel");
            oNodesVBox.setVisible(!oNodesVBox.getVisible());  // Toggle visibility
            oNodesVBox1.setVisible(!oNodesVBox1.getVisible());
            // Hide other VBoxes if necessary
            oView.byId("groupsVBox").setVisible(false);
            oView.byId("connectionsVBox").setVisible(false);
            oView.byId("grouppannel").setVisible(false);
            oView.byId("connectionsPanel").setVisible(false);
        },

        onConnections: function () {
            var oView = this.getView();
            var oConnectionsVBox = oView.byId("connectionsVBox");
            var oConnectionsVBox1 = oView.byId("connectionsPanel");
            oConnectionsVBox.setVisible(!oConnectionsVBox.getVisible());  // Toggle visibility
            oConnectionsVBox1.setVisible(!oConnectionsVBox1.getVisible());

            // Hide other VBoxes if necessary
            oView.byId("groupsVBox").setVisible(false);
            oView.byId("nodesVBox").setVisible(false);
            oView.byId("grouppannel").setVisible(false);
            oView.byId("nodesPanel").setVisible(false);
        },

        onStatusChange: function (oEvent) {
            this.selectedKey = oEvent.getSource().getSelectedKey();
            var oModel = this.getView().getModel("oData");
            console.log("oMOdel",oModel)
            oModel.setProperty("/SelectedStatus", this.selectedKey);

            // Optionally, show a message toast to confirm the selection
            MessageToast.show("Selected status: " + this.selectedKey);
        },

        onDialogSave: function () {
                var oModel = this.getOwnerComponent().getModel();

                if (!oModel) {
                    console.error("OData Model is undefined or null.");
                    return;
                }

                var groupTitle = this.byId("groupNameInput").getValue();
                    groupTitle = groupTitle.toUpperCase();
                var groupKey = this.createUniqueId();
                var groupIcon = this.byId("groupIconInput").getValue();
                var groupStatus =  this.selectedKey 

                console.log("selectedkey", this.selectedKey)
            
                if (groupTitle === '') {
                    MessageToast.show('Fields cannot be blank', {
                        duration: 3000,
                        width: "15em",
                        my: "center top",
                        at: "center bottom",
                        of: window,
                        offset: "30 30"
                    });
                    return;
                }
           
                // Retrieve existing group titles

            var oListBinding = oModel.bindList("/Groups");
            var aGroups = [];
        

        
            oListBinding.requestContexts().then(function (aContexts) {
                aGroups = aContexts.map(function (oContext) {
                    return oContext.getObject();
                });
    
                var bDuplicate = aGroups.some(function (group) {
                    console.log("group.grp", group.groupTitle, " group", groupTitle);
                    return group.groupTitle === groupTitle;
                });
    
                if (bDuplicate) {
                    MessageToast.show('Group title already exists.', {
                        duration: 3000,
                        width: "15em",
                        my: "center top",
                        at: "center bottom",
                        of: window,
                        offset: "30 30"
                    });
                    return;
                }
    
                // Create new group entry
                var oBindList = oModel.bindList("/Groups");
    
                console.log("grpstatus", groupStatus);
                oBindList.create({
                    groupTitle: groupTitle,
                    groupKey: groupKey,
                    groupIcon: groupIcon,
                    groupStatus: groupStatus
                });
    
                oModel.refresh();
                console.log("Saved group");
                MessageToast.show("Connections saved.");
    
                var oDialog = this.byId("groupsDialog");
                if (oDialog) {
                    oDialog.close();
                }
            }).catch(function (error) {
                console.error("Error retrieving group data:", error);
            });
        },

        onDialogOk: function () {
            
            var oModel = this.getOwnerComponent().getModel();
        
            if (!oModel) {
                console.error("OData Model is undefined or null.");
                return;
            }
        
            var from = this.byId("_IDGenComboBox1").getValue();
            var to = this.byId("_IDGenComboBox2").getValue();

            if (!from || !to) {
                MessageToast.show("Please select both 'From' and 'To' values.");
                return;
            }
        
             let oBindList = oModel.bindList("/Lines");
             oBindList.create({
                lineFrom: from,
                lineTo :to
             })
             oModel.refresh();
             
                console.log("Saved");
        
            MessageToast.show("Connections saved.");
            var oDialog = this.byId("connectionsDialog");
            if (oDialog) {
                oDialog.close();
            }
        },
            

        onDialogCancelGroups: function () {
            var oView = this.getView();
            var oDialog = oView.byId("groupsDialog");
            if (oDialog) {
                oDialog.close();
            }
        },

        onDialogCancelConnections: function () {
            var oView = this.getView();
            var oDialog = oView.byId("connectionsDialog");

            if (oDialog) {
                oDialog.close();
            }
        },

        onDialogCancelNodes: function () {
            var oDialog = this.byId("nodesDialog");
            if (oDialog) {
                oDialog.close();
            }
        },

        onRadioSelect: function (oEvent) {
            var sSelectedIndex = oEvent.getParameter("selectedIndex");
            var oModel = this.getView().getModel("myModel");

            let myData = [];
            if (sSelectedIndex === 0) {
                // If "Yes" is selected, fetch the groups data and set it to the model
                let oDataModel = this.getView().getModel();
                console.log(oDataModel)
                oModel.setProperty("/groupNameVisible", true);
                let oBindList = oDataModel.bindList("/Groups");
                oBindList.requestContexts(0, Infinity).then(aContexts => {
                    aContexts.forEach(x => {
                        myData.push(x.getObject());
                    })
                })
                console.log("myData :", myData);
            } else {
                // If "No" is selected, hide the group selection
                oModel.setProperty("/groupNameVisible", false);
            }
        },


        onGroupSelect: function (oEvent) {
            var oSelectedItem = oEvent.getSource();
            var sGroupName = oSelectedItem.getTitle();
            this.byId("groupnameInput1").setValue(sGroupName);
        },



        onNodeDialogSave: function () {
            var oModel = this.getOwnerComponent().getModel();
            if (!oModel) {
                console.error("OData Model 'mainService' is undefined or null.");
                return;
            }
            var groupname = this.byId("groupComboBox").getSelectedKey();
            var nodename = this.byId("nodeNameInput").getValue();
            var shape = this.byId("shapeSelect").getSelectedKey();
            var icon = this.byId("iconInput").getValue();
            var status = this.byId("statusInput").getValue();
        
            console.log("groupname:", groupname);
            console.log("nodename:", nodename);
            console.log("shape:", shape);
            console.log("icon:", icon);
            console.log("status:", status);
        
            if (!nodename) {
                MessageToast.show('Node name cannot be blank', {
                    duration: 3000,
                    width: "15em",
                    my: "center top",
                    at: "center top",
                    of: window,
                    offset: "30 30"
                });
                return;
            }
        
            var oBindList = oModel.bindList("/Nodes");
            oBindList.create({
                nodeGroup: groupname,
                nodeTitle: nodename,
                nodeShape: shape,
                nodeIcon: icon,
                nodeStatus: status
            });
        
            oModel.refresh();
            MessageToast.show("Connections saved.");
            console.log("Attempt to save node");
        
            var oDialog = this.byId("nodesDialog");
            if (oDialog) {
                oDialog.close();
            }
        },
        
      


    });
});
