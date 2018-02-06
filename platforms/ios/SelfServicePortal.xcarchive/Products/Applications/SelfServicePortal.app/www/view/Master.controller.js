jQuery.sap.require("SelfServicePortal.util.Formatter");
jQuery.sap.require("SelfServicePortal.util.Grouper");

sap.ui.controller("SelfServicePortal.view.Master", {

	handleIDSubmit: function(evt) {
		var selNum = evt.getParameter("value");
		var oModel = this.getView().getModel();
		var sServiceUrl = "http://fiodnap1dv1.ca.goldcorp.net:8000/sap/opu/odata/sap/ZSRV_SSOW_SRV";
		var EmpModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true, "JHO", "jeremy98");
		var tempContext = this;
		if (selNum > 99999999) {
			sap.m.MessageToast.show("Invalid Employee ID", {
				my: "center top",
				at: "center top",
				of: window,
				offset: "0 200"
			});
			return;
		}
		EmpModel.read("/EmployeeSet('" + selNum + "')", null, null, true, function(oData, oResponse) {
			if (oData.EPerno === '00000000') {
				sap.m.MessageToast.show("Invalid Employee ID", {
					my: "center top",
					at: "center top",
					of: window,
					offset: "0 200"
				});
				return;
			} else {
				var EmpObj = new sap.ui.model.json.JSONModel(oData);
				oModel.setProperty("/ViewModel/SelectedEmployee", EmpObj);
				var selMode = tempContext.getView().byId("ModeSelect").getSelectedButton().toString();
				if (selMode === "Master--GIButton-button") {
					oModel.setProperty("/ViewModel/SelectedMode", "Goods Issue");
				} else {
					oModel.setProperty("/ViewModel/SelectedMode", "Return");
				}
				tempContext.getView().byId("EmployeeIDInput").setValue(null);
				tempContext.getView().byId("ModeSelect").setSelectedButton();
				tempContext.nav.to("Detail");
			}
		}, function(err) {
			sap.m.MessageToast.show("Could not reach company servers", {
				my: "center top",
				at: "center top",
				of: window,
				offset: "0 200"
			});
		});
	},

	handleScan: function(evt) {
		var tempContext = this;
		cordova.plugins.barcodeScanner.scan(
			function(result) {
				var selNum = result.text;
				var oModel = tempContext.getView().getModel();
				var sServiceUrl = "http://fiodnap1dv1.ca.goldcorp.net:8000/sap/opu/odata/sap/ZSRV_SSOW_SRV";
				var EmpModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true, "JHO", "jeremy98");
				if (selNum > 99999999) {
					sap.m.MessageToast.show("Invalid Employee ID", {
						my: "center top",
						at: "center top",
						of: window,
						offset: "0 200"
					});
					return;
				}
				EmpModel.read("/EmployeeSet('" + selNum + "')", null, null, true, function(oData, oResponse) {
					if (oData.EPerno === '00000000') {
						sap.m.MessageToast.show("Invalid Employee ID", {
							my: "center top",
							at: "center top",
							of: window,
							offset: "0 200"
						});
						return;
					} else {
						var EmpObj = new sap.ui.model.json.JSONModel(oData);
						oModel.setProperty("/ViewModel/SelectedEmployee", EmpObj);
						var selMode = tempContext.getView().byId("ModeSelect").getSelectedButton().toString();
						if (selMode === "Master--GIButton-button") {
							oModel.setProperty("/ViewModel/SelectedMode", "Goods Issue");
						} else {
							oModel.setProperty("/ViewModel/SelectedMode", "Return");
						}
						tempContext.getView().byId("EmployeeIDInput").setValue(null);
						tempContext.getView().byId("ModeSelect").setSelectedButton();
						tempContext.nav.to("Detail");
					}
				}, function(err) {
					sap.m.MessageToast.show("Could not reach company servers", {
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