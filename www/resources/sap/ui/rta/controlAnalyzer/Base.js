/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/base/ManagedObject','sap/ui/dt/ElementUtil','sap/ui/fl/Utils'],function(M,E,F){"use strict";var e=["sap.ui.comp.smartform.SmartForm","sap.ui.comp.smartform.Group","sap.ui.comp.smartform.GroupElement","sap.uxap.ObjectPageSection","sap.uxap.ObjectPageLayout"];if(F.isVendorLayer()){e=e.concat(["sap.ui.comp.smartfilterbar.SmartFilterBar","sap.ui.comp.smarttable.SmartTable","sap.uxap.ObjectPageHeader","sap.uxap.ObjectPageHeaderActionButton","sap.ui.table.Column"]);}var B=M.extend("sap.ui.rta.controlAnalyzer.Base",{constructor:function(){sap.ui.base.ManagedObject.prototype.constructor.apply(this,arguments);this._mAvailableElements={};this._mHiddenElements={};},metadata:{library:"sap.ui.rta",properties:{control:"sap.ui.core.Control",selectedControl:"sap.ui.core.Control",prepared:{type:"boolean",defaultValue:false}}}});B.prototype._raiseIllegalState=function(){jQuery.sap.log.error("Illegal state, analyzer is not prepared");};B.prototype.prepare=function(){this.setPrepared(true);};B.prototype.getAvailableElements=function(){if(!this.getPrepared()){this._raiseIllegalState();}return this._mAvailableElements;};B.prototype.getHiddenElements=function(){if(!this.getPrepared()){this._raiseIllegalState();}return this._mHiddenElements;};B.prototype.mapSpecificChangeData=function(t,s){return s;};B.prototype.getControlsFieldCollection=function(c){};B.prototype.createChangeData=function(c,C,h){return null;};B.prototype.findVisibleAndBoundFieldsAndLabelNames=function(c){};B.prototype.isCustomFieldAvailable=function(c){return Promise.resolve().then(function(){return false;});};B.prototype.checkTargetZone=function(p,a,m){return true;};B.prototype.getFlexChangeType=function(t,o,s){return null;};B.prototype.getCommandClass=function(c){var C;switch(c){case"Rename":C='sap.ui.rta.command.Rename';break;case"Hide":C='sap.ui.rta.command.Hide';break;case"Unhide":C='sap.ui.rta.command.Unhide';break;case"Add":C='sap.ui.rta.command.AddSmart';break;case"Move":C='sap.ui.rta.command.Move';break;default:break;}return C;};B.prototype.getConfiguredElement=function(m,c){var C=m.context?m.context:m;return C;};B.prototype.isEditable=function(o){var i;i=e.some(function(t){return E.isInstanceOf(o,t);});if(i){i=o.getVisible?o.getVisible():true;if(i){i=F.checkControlId(o);}}return i;};B.prototype.isMandatory=function(o){return false;};B.prototype.isHideable=function(o){return false;};B.prototype.hasParentStableId=function(o){var b=o.getParentElementOverlay();var a=b?b.getElementInstance():null;return a&&F.checkControlId(a);};B.prototype.isRenamable=function(o){return this.isEditable(o)&&this.getRenamableControl(o);};B.prototype.getRenamableControl=function(o){return null;};return B;},true);
