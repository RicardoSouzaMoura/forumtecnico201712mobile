(function () {
	"use strict";
	/*global sap, jQuery */

	sap.ui.controller("sap.ovp.cards.charts.line.LineChart", {
		onInit: function () {
			sap.ovp.cards.charts.VizAnnotationManager.formatChartAxes();
//			var vizFrame = this.getView().byId("lineChartCard");
//			if (vizFrame) {
//				vizFrame.attachBrowserEvent("click", this.onHeaderClick.bind(this));
//				}
				this.bFlag = true;
				this.busyDelegate = {
						onBeforeRendering: function(){
							this.setBusy(true);
						}
					};
							
				this.freeDelegate = {
						onAfterRendering: function(){
							this.setBusy(false);
						}
					};
		},
		onBeforeRendering : function() {
			sap.ovp.cards.charts.VizAnnotationManager.validateCardConfiguration(this);
			var vizFrame = this.getView().byId("lineChartCard");
			var navigation;
			if (!vizFrame) {
				jQuery.sap.log.error(sap.ovp.cards.charts.Utils.constants.ERROR_NO_CHART +
						": (" + this.getView().getId() + ")");
			} else {
				navigation = vizFrame.getModel('ovpCardProperties').getProperty("/navigation");
				if (navigation == "chartNav") {
					vizFrame.attachBrowserEvent("click", this.onHeaderClick.bind(this));
				} else {
					sap.ovp.cards.charts.VizAnnotationManager.getSelectedDataPoint(vizFrame, this);
				}
				vizFrame.addEventDelegate(this.busyDelegate, vizFrame);
				var binding = vizFrame.getDataset().getBinding("data");
				if (binding.getPath()) {
					binding.attachDataReceived(jQuery.proxy(this.onDataReceived, this));
					binding.attachDataRequested(jQuery.proxy(this.onDataRequested, this));
				} else {
					var noDataDiv = sap.ui.xmlfragment("sap.ovp.cards.charts.generic.noData");
					var cardContainer = this.getCardContentContainer();
					cardContainer.removeAllItems();
					cardContainer.addItem(noDataDiv);
				}
				sap.ovp.cards.charts.Utils.validateMeasuresDimensions(vizFrame, "Line");
			}
		},
		onDataReceived: function(oEvent) {
			var vizFrame = this.getView().byId("lineChartCard");
			if (this.bFlag == true) {
				vizFrame.addEventDelegate(this.freeDelegate, vizFrame);
				this.bFlag = false;
				} else {
					setTimeout(function(){
						vizFrame.setBusy(false);
						},0);
				}
			sap.ovp.cards.charts.VizAnnotationManager.hideDateTimeAxis(vizFrame, "categoryAxis");
			sap.ovp.cards.charts.VizAnnotationManager.checkNoData(oEvent, this.getCardContentContainer(), vizFrame);
		},
		onDataRequested : function() {
			var vizFrame = this.getView().byId("lineChartCard");
			vizFrame.removeEventDelegate(this.freeDelegate, vizFrame);
			vizFrame.setBusy(true);
		}
	});
})();
