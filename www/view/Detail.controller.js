jQuery.sap.require("SelfServicePortal.util.Formatter");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("SelfServicePortal.view.Detail", {

	handleNavButtonPress: function(evt) {
		var oModel = this.getView().getModel();
		var tempContext = this;
		var tempData = oModel.getData().ViewModel;
		//Reset input for next session
		tempData.SelectedEmployee = {};
		tempData.TransactionType = null;
		tempData.SelectedMode = null;
		delete tempData.SelectedWorkOrder;
		delete tempData.SelectedCostCenter;
		tempData.SelectedMaterials = [];
		tempContext.getView().byId("WOInput").setValue("");
		tempContext.getView().byId("CCInput").setValue("");
		tempContext.getView().byId("MatInput").setValue("");
		tempContext.getView().byId("CCInfo").setText();
		tempContext.getView().byId("WOInfo").setText();
		tempContext.getView().byId("CCInput").setValueState(sap.ui.core.ValueState.None);
		tempContext.getView().byId("WOInput").setValueState(sap.ui.core.ValueState.None);
		tempContext.getView().byId("MatInput").setValueState(sap.ui.core.ValueState.None);
		tempContext.nav.to("Master");
		this.nav.back("Master");
	},

	onBeforeRendering: function() {
		var oModel = this.getView().getModel();
		oModel.setProperty("/ViewModel/SelectedMaterials", []);
	},

	handleApprove: function(evt) {
		var bundle = this.getView().getModel("i18n").getResourceBundle();
		var oModel = this.getView().getModel();
		var oItemsData = {};
		var tempContext = this;
		var tempData = oModel.getData().ViewModel;
		var tempMat = {};
		var sServiceUrl = "serviceurl";
		var SubmitModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true, "user", "password");
		oItemsData.IPerno = tempData.SelectedEmployee.oData.EPerno;
		oItemsData.Document = "";
		oItemsData.EError = "";
		oItemsData.Message = "";
		oItemsData.ItemsDoc = [];
		if (tempData.TransactionType === "WO") {
			oItemsData.IWorkOrder = tempData.SelectedWorkOrder;
			for (var i = 0; i < tempData.SelectedMaterials.length; i++) {
				tempMat = {};
				tempMat.Material = tempData.SelectedMaterials[i].EMaterial;
				tempMat.EntryQnt = tempData.SelectedMaterials[i].quantity.toString();
				oItemsData.ItemsDoc.push(tempMat);
			}
		} else if (tempData.TransactionType === "CC") {
			oItemsData.ICostCenter = tempData.SelectedCostCenter;
			for (var i = 0; i < tempData.SelectedMaterials.length; i++) {
				tempMat = {};
				tempMat.Material = tempData.SelectedMaterials[i].EMaterial;
				tempMat.EntryQnt = tempData.SelectedMaterials[i].quantity.toString();
				oItemsData.ItemsDoc.push(tempMat);
			}
		} else {
			sap.m.MessageToast.show("Please choose a transaction type and enter the transaction number");
			this.getView().byId("CCInput").setValueState(sap.ui.core.ValueState.Error);
			this.getView().byId("WOInput").setValueState(sap.ui.core.ValueState.Error);
			return;
		}
		if (oItemsData.ItemsDoc.length === 0) {
			sap.m.MessageToast.show("Please add materials");
			tempContext.getView().byId("MatInput").setValueState(sap.ui.core.ValueState.Error);
			return;
		}
		oItemsData.ISelectedMode = tempData.SelectedMode;

		console.log(oItemsData);

		// show confirmation dialog
		sap.m.MessageBox.confirm(
			bundle.getText("ApproveDialogMsg"),
			function(oAction) {
				if (sap.m.MessageBox.Action.OK === oAction) {
					//Post toReturn to database
					SubmitModel.create("/HeaderDocSet", oItemsData, {
						method: "POST",
						success: function(data) {
							if (data.EError === "") {
								sap.m.MessageToast.show(data.Message);
								//Reset input for next session
								tempData.SelectedEmployee = {};
								tempData.TransactionType = null;
								tempData.SelectedMode = null;
								delete tempData.SelectedWorkOrder;
								delete tempData.SelectedCostCenter;
								tempData.SelectedMaterials = [];
								tempContext.getView().byId("WOInput").setValue("");
								tempContext.getView().byId("CCInput").setValue("");
								tempContext.getView().byId("MatInput").setValue("");
								tempContext.getView().byId("CCInfo").setText();
								tempContext.getView().byId("WOInfo").setText();
								tempContext.getView().byId("CCInput").setValueState(sap.ui.core.ValueState.None);
								tempContext.getView().byId("WOInput").setValueState(sap.ui.core.ValueState.None);
								tempContext.getView().byId("MatInput").setValueState(sap.ui.core.ValueState.None);
								tempContext.nav.to("Master");
							}
							else {
								sap.m.MessageToast.show(data.EError);
							}
						},
						error: function() {
							sap.m.MessageToast.show("Error: Could not reach database");
						}
					});
				}
			},
			bundle.getText("ApproveDialogTitle")
		);
	},

	handleCCSubmit: function(evt) {
		var selNum = this.getView().byId("CCInput").getValue();
		var sServiceUrl = "serviceurl";
		var CCModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true, "user", "password");
		var tempContext = this;
		CCModel.read("/CostCenterSet('" + selNum + "')", null, null, true, function(oData, oResponse) {
			if (!oData.ECostCenter) {
				tempContext.getView().byId("CCInput").setValueState(sap.ui.core.ValueState.Error);
				tempContext.getView().byId("CCInfo").setText("");
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
				tempContext.getView().byId("CCInput").setValueState(sap.ui.core.ValueState.Success);
				tempContext.getView().byId("WOInput").setValueState(sap.ui.core.ValueState.None);
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
	},

	handleWOSubmit: function(evt) {
		var selNum = this.getView().byId("WOInput").getValue();
		var sServiceUrl = "serviceurl";
		var WOModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true, "user", "password");
		var tempContext = this;
		WOModel.read("/WorkOrderSet('" + selNum + "')", null, null, true, function(oData, oResponse) {
			if (!oData.EWorkOrder) {
				tempContext.getView().byId("WOInput").setValueState(sap.ui.core.ValueState.Error);
				tempContext.getView().byId("WOInfo").setText("");
				sap.m.MessageToast.show("Invalid Work Order Number", {
					my: "center top",
					at: "center top",
					of: window,
					offset: "0 200"
				});
			} else {
				tempContext.getView().byId("WOInfo").setText(oData.EDescWorkorder);
				var oModel = tempContext.getView().getModel();
				oModel.setProperty("/ViewModel/SelectedWorkOrder", selNum);
				oModel.setProperty("/ViewModel/TransactionType", "WO");
				delete oModel.getData().ViewModel.SelectedCostCenter;
				tempContext.getView().byId("CCInput").setValue("");
				tempContext.getView().byId("CCInfo").setText();
				tempContext.getView().byId("WOInput").setValueState(sap.ui.core.ValueState.Success);
				tempContext.getView().byId("CCInput").setValueState(sap.ui.core.ValueState.None);
				return;
			}
		}, function(err) {
			sap.m.MessageToast.show("Invalid Work Order Number:" + selNum, {
				my: "center top",
				at: "center top",
				of: window,
				offset: "0 200"
			});
		});
	},

	handleCCChange: function(evt) {
		var selNum = this.getView().byId("CCInput").getValue();
		var sServiceUrl = "serviceurl";
		var CCModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true, "user", "password");
		var tempContext = this;
		CCModel.read("/CostCenterSet('" + selNum + "')", null, null, true, function(oData, oResponse) {
			if (oData.ECostCenter) {
				tempContext.getView().byId("CCInfo").setText(oData.ECoArea + " " + oData.EDescCoce);
				var oModel = tempContext.getView().getModel();
				oModel.setProperty("/ViewModel/SelectedCostCenter", selNum);
				oModel.setProperty("/ViewModel/TransactionType", "CC");
				delete oModel.getData().ViewModel.SelectedWorkOrder;
				tempContext.getView().byId("WOInput").setValue("");
				tempContext.getView().byId("WOInfo").setText();
				tempContext.getView().byId("CCInput").setValueState(sap.ui.core.ValueState.Success);
				tempContext.getView().byId("WOInput").setValueState(sap.ui.core.ValueState.None);
				return;
			}
			tempContext.getView().byId("CCInput").setValueState(sap.ui.core.ValueState.Error);
			tempContext.getView().byId("CCInfo").setText("");
		}, function(err) {});
	},

	handleWOChange: function(evt) {
		var selNum = this.getView().byId("WOInput").getValue();
		var sServiceUrl = "serviceurl";
		var WOModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true, "user", "password");
		var tempContext = this;
		WOModel.read("/WorkOrderSet('" + selNum + "')", null, null, true, function(oData, oResponse) {
			if (oData.EWorkOrder) {
				tempContext.getView().byId("WOInfo").setText(oData.EDescWorkorder);
				var oModel = tempContext.getView().getModel();
				oModel.setProperty("/ViewModel/SelectedWorkOrder", selNum);
				oModel.setProperty("/ViewModel/TransactionType", "WO");
				delete oModel.getData().ViewModel.SelectedCostCenter;
				tempContext.getView().byId("CCInput").setValue("");
				tempContext.getView().byId("CCInfo").setText();
				tempContext.getView().byId("WOInput").setValueState(sap.ui.core.ValueState.Success);
				tempContext.getView().byId("CCInput").setValueState(sap.ui.core.ValueState.None);
				return;
			}
			tempContext.getView().byId("WOInput").setValueState(sap.ui.core.ValueState.Error);
			tempContext.getView().byId("WOInfo").setText("");
		}, function(err) {});
	},

	handleCCScan: function(evt) {
		var tempContext = this;
		cordova.plugins.barcodeScanner.scan(
			function(result) {
				var selNum = result.text;
				sap.m.MessageToast.show(selNum);
				var oModel = tempContext.getView().getModel();
				var sServiceUrl = "serviceurl";
				var CCModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true, "user", "password");
				CCModel.read("/CostCenterSet('" + selNum + "')", null, null, true, function(oData, oResponse) {
					if (!oData.ECostCenter) {
						tempContext.getView().byId("CCInput").setValueState(sap.ui.core.ValueState.Error);
						tempContext.getView().byId("CCInfo").setText("");
						sap.m.MessageToast.show("Invalid Cost Center Number", {
							my: "center top",
							at: "center top",
							of: window,
							offset: "0 200"
						});
					} else {
						tempContext.getView().byId("CCInfo").setText(oData.ECoArea + " " + oData.EDescCoce);
						oModel.setProperty("/ViewModel/SelectedCostCenter", selNum);
						oModel.setProperty("/ViewModel/TransactionType", "CC");
						delete oModel.getData().ViewModel.SelectedWorkOrder;
						tempContext.getView().byId("CCInput").setValue(selNum);
						tempContext.getView().byId("WOInput").setValue("");
						tempContext.getView().byId("WOInfo").setText();
						tempContext.getView().byId("CCInput").setValueState(sap.ui.core.ValueState.Success);
						tempContext.getView().byId("WOInput").setValueState(sap.ui.core.ValueState.None);
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
			},
			function(error) {
				sap.m.MessageToast.show("Error with device camera");
			}
		);
	},

	handleWOScan: function(evt) {
		var tempContext = this;
		cordova.plugins.barcodeScanner.scan(
			function(result) {
				var selNum = result.text;
				sap.m.MessageToast.show(selNum);
				var oModel = tempContext.getView().getModel();
				var sServiceUrl = "serviceurl";
				var WOModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true, "user", "password");
				WOModel.read("/WorkOrderSet('" + selNum + "')", null, null, true, function(oData, oResponse) {
					if (!oData.EWorkOrder) {
						tempContext.getView().byId("WOInput").setValueState(sap.ui.core.ValueState.Error);
						tempContext.getView().byId("WOInfo").setText("");
						sap.m.MessageToast.show("Invalid Work Order Number", {
							my: "center top",
							at: "center top",
							of: window,
							offset: "0 200"
						});
					} else {
						tempContext.getView().byId("WOInfo").setText(oData.EDescWorkorder);
						oModel.setProperty("/ViewModel/SelectedWorkOrder", selNum);
						oModel.setProperty("/ViewModel/TransactionType", "WO");
						delete oModel.getData().ViewModel.SelectedCostCenter;
						tempContext.getView().byId("WOInput").setValue(selNum);
						tempContext.getView().byId("CCInput").setValue("");
						tempContext.getView().byId("CCInfo").setText();
						tempContext.getView().byId("WOInput").setValueState(sap.ui.core.ValueState.Success);
						tempContext.getView().byId("CCInput").setValueState(sap.ui.core.ValueState.None);
						return;
					}
				}, function(err) {
					sap.m.MessageToast.show("Invalid Work Order Number:" + selNum, {
						my: "center top",
						at: "center top",
						of: window,
						offset: "0 200"
					});
				});
			},
			function(error) {
				sap.m.MessageToast.show("Error with device camera");
			}
		);
	},
	
	removeCheck: function(evt) {
		var mData = this.getView().getModel().getData().ViewModel.SelectedMaterials;
		for (var ind in mData) {
			if (mData[ind].quantity === 0) {
				mData.splice(ind, 1);
			}
		}
	},

	handleMaterialAdd: function(evt) {
		var matNum = this.getView().byId("MatInput").getValue();
		var oModel = this.getView().getModel();
		var mData = oModel.getData().ViewModel.SelectedMaterials;
		var sServiceUrl = "serviceurl";
		var MatModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true, "user", "password");
		var tempContext = this;
		MatModel.read("/MaterialSet('" + matNum + "')", null, null, true, function(oData, oResponse) {
			if (!oData.EMaterial) {
				sap.m.MessageToast.show("Invalid Material Number", {
					my: "center top",
					at: "center top",
					of: window,
					offset: "0 200"
				});
			} else {
				tempContext.getView().byId("MatInput").setValueState(sap.ui.core.ValueState.None);
				for (var i = 0; i < mData.length; i++) {
					if (mData[i].EMaterial === matNum) {
						mData[i].quantity++;
						oModel.setProperty("/ViewModel/SelectedMaterials", mData);
						tempContext.getView().byId("MatInput").setValue("");
						return;
					}
				}
				oData.quantity = 1;
				mData.push(oData);
				oModel.setProperty("/ViewModel/SelectedMaterials", mData);
				tempContext.getView().byId("MatInput").setValue("");
				return;
			}
		}, function(err) {
			sap.m.MessageToast.show("Invalid Material Number:" + selNum, {
				my: "center top",
				at: "center top",
				of: window,
				offset: "0 200"
			});
		});
	},

	handleMaterialScan: function(evt) {
		var tempContext = this;
		cordova.plugins.barcodeScanner.scan(
			function(result) {
				var matNum = result.text;
				sap.m.MessageToast.show(matNum);
				var oModel = tempContext.getView().getModel();
				var mData = oModel.getData().ViewModel.SelectedMaterials;
				var sServiceUrl = "serviceurl";
				var MatModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true, "user", "password");
				MatModel.read("/MaterialSet('" + matNum + "')", null, null, true, function(oData, oResponse) {
					if (!oData.EMaterial) {
						sap.m.MessageToast.show("Invalid Material Number", {
							my: "center top",
							at: "center top",
							of: window,
							offset: "0 200"
						});
					} else {
						tempContext.getView().byId("MatInput").setValueState(sap.ui.core.ValueState.None);
						for (var i = 0; i < mData.length; i++) {
							if (mData[i].EMaterial === matNum) {
								mData[i].quantity++;
								oModel.setProperty("/ViewModel/SelectedMaterials", mData);
								tempContext.getView().byId("MatInput").setValue("");
								return;
							}
						}
						oData.quantity = 1;
						mData.push(oData);
						oModel.setProperty("/ViewModel/SelectedMaterials", mData);
						tempContext.getView().byId("MatInput").setValue("");
						return;
					}
				}, function(err) {
					sap.m.MessageToast.show("Invalid Material Number:" + matNum, {
						my: "center top",
						at: "center top",
						of: window,
						offset: "0 200"
					});
				});
			},
			function(error) {
				sap.m.MessageToast.show("Error with device camera");
			}
		);
	}
});