jQuery.sap.declare("SelfServicePortal.Component");

sap.ui.core.UIComponent.extend("SelfServicePortal.Component", {

	createContent: function() {

		// create root view
		var oView = sap.ui.view({
			id: "app",
			viewName: "SelfServicePortal.view.App",
			type: "JS",
			viewData: {
				component: this
			}
		});

		// set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl: "i18n/messageBundle.properties"
		});
		oView.setModel(i18nModel, "i18n");

		// Using a local model for offline development
		var oModel = new sap.ui.model.json.JSONModel("model/ViewModel.json");
		oView.setModel(oModel);

		// Using OData model to connect against a real service
		//var url = "/proxy/http/<server>:<port>/sap/opu/odata/sap/ZGWSAMPLE_SRV/";
		//var oModel = new sap.ui.model.odata.ODataModel(url, true, "<user>", "<password>");
		//oView.setModel(oModel);

		// var sServiceUrl = "/sap/opu/odata/SAP/ZMM_EMP_REMOTE_SRV";
		// var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
		// var oJsonModel = new sap.ui.model.json.JSONModel();
		// oModel.read("/ViewModel", null, null, true, function(oData, oResponse) {
		// 	oJsonModel.setData(oData);
		// });
		// // Using a local model for offline development
		// console.log(oJsonModel);
		// oView.setModel(oJsonModel);

		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isPhone: jQuery.device.is.phone,
			listMode: (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
			listItemType: (jQuery.device.is.phone) ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(deviceModel, "device");

		// done
		return oView;
	}
});