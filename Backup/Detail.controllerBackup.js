jQuery.sap.require("SelfServicePortal.util.Formatter");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("SelfServicePortal.view.Detail", {

	handleNavButtonPress: function(evt) {
		var oModel = this.getView().getModel();
		var tempContext = this;
		var tempData = oModel.getData().ViewModel;
		tempData.SelectedEmployee = {};
		tempData.TransactionType = null;
		delete tempData.SelectedWorkOrder;
		delete tempData.SelectedCostCenter;
		tempData.SelectedMaterials = [];
		tempContext.getView().byId("WOInput").setValue("");
		tempContext.getView().byId("CCInput").setValue("");
		tempContext.getView().byId("CCInfo").setText();
		tempContext.getView().byId("WOInfo").setText();
		tempContext.getView().byId("selDialog").setMultiSelect(false);
		tempContext.getView().byId("selDialog").setRememberSelections(false);
		tempContext.nav.to("Master");
		this.nav.back("Master");
	},

	onBeforeRendering: function() {
		var oModel = this.getView().getModel();
		oModel.setProperty("/ViewModel/SelectedMaterials", []);
	},

	handleApprove: function(evt) {

		// show confirmation dialog
		var bundle = this.getView().getModel("i18n").getResourceBundle();
		var oModel = this.getView().getModel();
		var toReturn = {};
		var tempContext = this;
		var tempData = oModel.getData().ViewModel;
		toReturn.Employee = tempData.SelectedEmployee;
		toReturn.Type = tempData.TransactionType;
		if (toReturn.Type === "WO") {
			toReturn.WONumber = tempData.SelectedWorkOrder;
			toReturn.Materials = tempData.SelectedMaterials;
		} else if (toReturn.Type === "CC") {
			toReturn.CCNumber = tempData.SelectedCostCenter;
			toReturn.Materials = tempData.SelectedMaterials;
		} else {
			sap.m.MessageToast.show("Please choose a transaction type");
			return;
		}
		//Send toReturn back to SAP Gateway
		console.log(toReturn);
		sap.m.MessageBox.confirm(
			bundle.getText("ApproveDialogMsg"),
			function(oAction) {
				if (sap.m.MessageBox.Action.OK === oAction) {
					// notify user
					var successMsg = bundle.getText("ApproveDialogSuccessMsg");
					sap.m.MessageToast.show(successMsg);
					// TODO call proper service method and update model (not part of this session)
					
					//Reset input for next session
					tempData.SelectedEmployee = {};
					tempData.TransactionType = null;
					delete tempData.SelectedWorkOrder;
					delete tempData.SelectedCostCenter;
					tempData.SelectedMaterials = [];
					tempContext.getView().byId("WOInput").setValue("");
					tempContext.getView().byId("CCInput").setValue("");
					tempContext.getView().byId("CCInfo").setText();
					tempContext.getView().byId("WOInfo").setText();
					tempContext.getView().byId("selDialog").setMultiSelect(false);
					tempContext.getView().byId("selDialog").setRememberSelections(false);
					tempContext.nav.to("Master");
				}
			},
			bundle.getText("ApproveDialogTitle")
		);
	},

	handleLineItemPress: function(evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("LineItem", context);
	},

	handleCCSubmit: function(evt) {
		var selNum = this.getView().byId("CCInput").getValue();
		var sServiceUrl = "/sap/opu/odata/sap/ZSRV_SSOW_SRV";
		var CCModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
		var tempContext = this;
		CCModel.read("/CostCenterSet('" + selNum + "')", null, null, true, function(oData, oResponse) {
			if (!oData.ECostCenter) {
				sap.m.MessageToast.show("Invalid Cost Center Number", {
					my: "center top",
					at: "center top",
					of: window,
					offset: "0 200"
				});
			} else {
				tempContext.getView().byId("CCInfo").setText(oData.ECoArea + " " + oData.EDescCoce);
				var oModel = tempContext.getView().getModel();
				oModel.setProperty("/ViewModel/SelectedCostCenter", selNum);
				oModel.setProperty("/ViewModel/TransactionType", "CC");
				delete oModel.getData().ViewModel.SelectedWorkOrder;
				tempContext.getView().byId("WOInput").setValue("");
				tempContext.getView().byId("WOInfo").setText();
				return;
			}
		}, function(err) {
			sap.m.MessageToast.show("Invalid Cost Center Number:" + selNum, {
				my: "center top",
				at: "center top",
				of: window,
				offset: "0 200"
			});
		});
		// var CCArray = this.getView().getModel().getData().ViewModel.CostCenterSet;
		// for (var i = 0; i < CCArray.length; i++) {
		// 	if (CCArray[i].CCNum === selNum) {
		// 		this.getView().byId("CCInfo").setText(CCArray[i].CCDescription);
		// 		var oModel = this.getView().getModel();
		// 		oModel.setProperty("/ViewModel/SelectedCostCenter", selNum);
		// 		oModel.setProperty("/ViewModel/TransactionType", "CC");
		// 		delete oModel.getData().ViewModel.SelectedWorkOrder;
		// 		this.getView().byId("WOInput").setValue("");
		// 		this.getView().byId("WOInfo").setText();
		// 		return;
		// 	}
		// }
		// sap.m.MessageToast.show("Invalid Cost Center Number", {
		// 	my: "center top",
		// 	at: "center top",
		// 	of: window,
		// 	offset: "0 130"
		// });
	},

	handleWOSubmit: function(evt) {
		//Remember to change this when switching to oData consumption
		var selNum = this.getView().byId("WOInput").getValue();
		var WOArray = this.getView().getModel().getData().ViewModel.WorkOrderSet;
		for (var i = 0; i < WOArray.length; i++) {
			if (WOArray[i].WONum === selNum) {
				this.getView().byId("WOInfo").setText(WOArray[i].WODescription);
				var oModel = this.getView().getModel();
				oModel.setProperty("/ViewModel/SelectedWorkOrder", selNum);
				oModel.setProperty("/ViewModel/TransactionType", "WO");
				delete oModel.getData().ViewModel.SelectedCostCenter;
				this.getView().byId("CCInput").setValue("");
				this.getView().byId("CCInfo").setText();
				return;
			}
		}
		sap.m.MessageToast.show("Invalid Work Order Number", {
			my: "center top",
			at: "center top",
			of: window,
			offset: "0 130"
		});
	},

	handleCCChange: function(evt) {
		//Remember to change this when switching to oData consumption
		var selNum = this.getView().byId("CCInput").getValue();
		var CCArray = this.getView().getModel().getData().ViewModel.CostCenterSet;
		for (var i = 0; i < CCArray.length; i++) {
			if (CCArray[i].CCNum === selNum) {
				this.getView().byId("CCInfo").setText(CCArray[i].CCDescription);
				var oModel = this.getView().getModel();
				oModel.setProperty("/ViewModel/SelectedCostCenter", selNum);
				oModel.setProperty("/ViewModel/TransactionType", "CC");
				delete oModel.getData().ViewModel.SelectedWorkOrder;
				return;
			}
		}
	},

	handleWOChange: function(evt) {
		//Remember to change this when switching to oData consumption
		var selNum = this.getView().byId("WOInput").getValue();
		var WOArray = this.getView().getModel().getData().ViewModel.WorkOrderSet;
		for (var i = 0; i < WOArray.length; i++) {
			if (WOArray[i].WONum === selNum) {
				this.getView().byId("WOInfo").setText(WOArray[i].WODescription);
				var oModel = this.getView().getModel();
				oModel.setProperty("/ViewModel/SelectedWorkOrder", selNum);
				oModel.setProperty("/ViewModel/TransactionType", "WO");
				delete oModel.getData().ViewModel.SelectedCostCenter;
				return;
			}
		}
	},

	handleCCSelect: function(evt) {
		//Remember to change this when switching to oData consumption
		var selNum = evt.getParameters("selectedItem").selectedItem.getText();
		var CCArray = this.getView().getModel().getData().ViewModel.CostCenterSet;
		for (var i = 0; i < CCArray.length; i++) {
			if (CCArray[i].CCNum === selNum) {
				this.getView().byId("CCInfo").setText(CCArray[i].CCDescription);
				var oModel = this.getView().getModel();
				oModel.setProperty("/ViewModel/SelectedCostCenter", selNum);
				oModel.setProperty("/ViewModel/TransactionType", "CC");
				delete oModel.getData().ViewModel.SelectedWorkOrder;
				this.getView().byId("WOInput").setValue("");
				this.getView().byId("WOInfo").setText();
				return;
			}
		}
	},

	handleWOSelect: function(evt) {
		//Remember to change this when switching to oData consumption
		var selNum = evt.getParameters("selectedItem").selectedItem.getText();
		var WOArray = this.getView().getModel().getData().ViewModel.WorkOrderSet;
		for (var i = 0; i < WOArray.length; i++) {
			if (WOArray[i].WONum === selNum) {
				this.getView().byId("WOInfo").setText(WOArray[i].WODescription);
				var oModel = this.getView().getModel();
				oModel.setProperty("/ViewModel/SelectedWorkOrder", selNum);
				oModel.setProperty("/ViewModel/TransactionType", "WO");
				delete oModel.getData().ViewModel.SelectedCostCenter;
				this.getView().byId("CCInput").setValue("");
				this.getView().byId("CCInfo").setText();
				return;
			}
		}
	},

	handleMaterialAdd: function(evt) {
		if (!this._oDialog) {
			this._oDialog = this.getView().byId("selDialog");
			this._oDialog.setModel(this.getView().getModel());
		}

		// Multi-select if required
		var bMultiSelect = !!evt.getSource().data("multi");
		this._oDialog.setMultiSelect(bMultiSelect);

		// Remember selections if required
		var bRemember = !!evt.getSource().data("remember");
		this._oDialog.setRememberSelections(bRemember);

		// clear the old search filter
		this._oDialog.getBinding("items").filter([]);

		// toggle compact style
		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
		this._oDialog.open();
	},

	onExit: function() {
		if (this._oDialog) {
			this._oDialog.destroy();
		}
	},

	handleSearch: function(evt) {
		var sValue = evt.getParameter("value");
		var oFilter = new sap.ui.model.Filter("MaterialNum", sap.ui.model.FilterOperator.Contains, sValue);
		var oBinding = evt.getSource().getBinding("items");
		oBinding.filter([oFilter]);
	},

	handleClose: function(evt) {
		var aContexts = evt.getParameter("selectedContexts");
		var oModel = this.getView().getModel();
		var mData = [];
		if (aContexts.length) {
			aContexts.map(function(oContext) {
				mData.push(oContext.getObject());
				oModel.setProperty("/ViewModel/SelectedMaterials", mData);
			});
		} else {
			oModel.setProperty("/ViewModel/SelectedMaterials", mData);
		}
	},

	handleMaterialScan: function(evt) {
		var tempContext = this;
		cordova.plugins.barcodeScanner.scan(
			function(result) {
				var matNum = result.text;
				sap.m.MessageToast.show(matNum);
				var MatArray = tempContext.getView().getModel().getData().ViewModel.MaterialSet;
				for (var i = 0; i < MatArray.length; i++) {
					if (MatArray[i].MaterialNum === matNum) {
						var oModel = tempContext.getView().getModel();
						var toAdd = oModel.getData().ViewModel.MaterialSet[i];
						var mData = oModel.getData().ViewModel.SelectedMaterials;
						mData.push(toAdd);
						oModel.setProperty("/ViewModel/SelectedMaterials", mData);
						return;
					}
				}
				sap.m.MessageToast.show("No material number with that barcode");
			},
			function(error) {
				sap.m.MessageToast.show("Error with device camera");
			}
		);
	}
});