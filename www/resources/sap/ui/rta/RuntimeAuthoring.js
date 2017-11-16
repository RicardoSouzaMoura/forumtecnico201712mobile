/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/base/ManagedObject','sap/ui/rta/ui/ToolsMenu','sap/ui/dt/ElementUtil','sap/ui/dt/DesignTime','sap/ui/dt/OverlayRegistry','sap/ui/rta/command/Stack','sap/ui/rta/command/CommandFactory','sap/ui/rta/command/CompositeCommand','sap/ui/rta/plugin/Rename','sap/ui/rta/plugin/DragDrop','sap/ui/rta/plugin/RTAElementMover','sap/ui/dt/plugin/CutPaste','sap/ui/rta/plugin/Hide','sap/ui/rta/plugin/Selection','sap/ui/rta/plugin/MultiSelection','sap/ui/dt/plugin/ContextMenu','sap/ui/dt/plugin/TabHandling','sap/ui/fl/FlexControllerFactory','sap/ui/rta/ui/SettingsDialog','sap/ui/rta/ui/AddElementsDialog','./Utils','./ModelConverter','sap/ui/fl/transport/Transports','sap/ui/fl/transport/TransportSelection','sap/ui/fl/Utils','sap/ui/fl/registry/Settings','sap/m/MessageBox','sap/m/MessageToast','sap/ui/comp/smartform/GroupElement','sap/ui/comp/smartform/Group','sap/ui/comp/smartform/SmartForm','sap/ui/comp/smarttable/SmartTable','sap/ui/rta/controlAnalyzer/ControlAnalyzerFactory','sap/uxap/ObjectPageLayout','sap/uxap/ObjectPageSection'],function(M,T,E,D,O,C,a,b,R,c,d,e,H,S,f,g,h,F,j,A,U,k,l,m,n,o,p,q,G,r,s,t,u,v,w){"use strict";var x=M.extend("sap.ui.rta.RuntimeAuthoring",{metadata:{library:"sap.ui.rta",associations:{"rootControl":{type:"sap.ui.core.Control"}},properties:{"customFieldUrl":"string","showCreateCustomField":"boolean","showToolbars":{type:"boolean",defaultValue:true},"showSettingsDialog":{type:"boolean",defaultValue:true},"showWindowUnloadDialog":{type:"boolean",defaultValue:true},"commandStack":{type:"sap.ui.rta.command.Stack"}},events:{"start":{},"stop":{},"failed":{},selectionChange:{parameters:{selection:{type:"sap.ui.dt.Overlay[]"}}},"undoRedoStackModified":{}}},_sAppTitle:null});x.prototype.init=function(){this._onCommandStackModified=this._adaptUndoRedoButtons.bind(this);};x.prototype.start=function(){var i=["sap.ui.comp.smartform.Group","sap.ui.comp.smartform.GroupElement","sap.ui.table.Column","sap.uxap.ObjectPageSection","sap.ui.layout.form.FormElement","sap.ui.layout.form.FormContainer"];var Q=this;this._aPopups=[];this._oTextResources=sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");this._aSupportedControls=["sap.ui.comp.smartform.Group","sap.uxap.ObjectPageSection","sap.uxap.ObjectPageLayout"];if(!this._oDesignTime){this._oRootControl=sap.ui.getCore().byId(this.getRootControl());this._oRTAElementMover=new d({movableTypes:i});this._oRTAElementMover.setCommandFactory(a);this._oRTADragDropPlugin=new c({draggableTypes:i,elementMover:this._oRTAElementMover,commandFactory:a}).attachElementModified(this._handleElementModified,this);this._oRTADragDropPlugin.attachDragStarted(this._handleStopCutPaste,this);this._oCutPastePlugin=new e({movableTypes:i,elementMover:this._oRTAElementMover}).attachElementModified(this._handleElementModified,this);this._oHidePlugin=new H();this._oHidePlugin.attachHideElement(this._handleHideElement,this);this._oRenamePlugin=new R({commandStack:this.getCommandStack()});this._oRenamePlugin.attachEditable(this._handleStopCutPaste,this);this._oSelectionPlugin=new S();this._oMultiSelectionPlugin=new f({multiSelectionTypes:["sap.ui.comp.smartform.GroupElement"]});this._oContextMenuPlugin=new g();this._oTabHandlingPlugin=new h();this._buildContextMenu();jQuery.sap.measure.start("rta.dt.startup","Measurement of RTA: DesignTime start up");this._oDesignTime=new D({rootElements:[this._oRootControl],plugins:[this._oRTADragDropPlugin,this._oCutPastePlugin,this._oHidePlugin,this._oRenamePlugin,this._oSelectionPlugin,this._oMultiSelectionPlugin,this._oContextMenuPlugin,this._oTabHandlingPlugin]});this._oDesignTime.attachSelectionChange(function(W){Q.fireSelectionChange({selection:W.getParameter("selection")});},this);this._oDesignTime.attachEventOnce("synced",function(){Q.fireStart();jQuery.sap.measure.end("rta.dt.startup","Measurement of RTA: DesignTime start up");});this._oDesignTime.attachEventOnce("syncFailed",function(){Q.fireFailed();});}if(this.getShowToolbars()){this._createToolsMenu();var V={"onAfterRendering":function(){this._oToolsMenuTop._oToolBarTop.focus();this._oToolsMenuTop._oToolBarTop.removeEventDelegate(V,this);}};this._oToolsMenuTop._oToolBarTop.addEventDelegate(V,this);this._oToolsMenuTop.show();this._oToolsMenuBottom.show();}this._oldUnloadHandler=window.onbeforeunload;window.onbeforeunload=this._onUnload.bind(this);};x.prototype.setCommandStack=function(i){var Q=this.getProperty("commandStack");if(Q){Q.detachModified(this._onCommandStackModified);}if(this._oInternalCommandStack){this._oInternalCommandStack.destroy();delete this._oInternalCommandStack;}var V=this.setProperty("commandStack",i);if(i){i.attachModified(this._onCommandStackModified);}if(this._oRenamePlugin){this._oRenamePlugin.setCommandStack(i);}return V;};x.prototype.getCommandStack=function(){var i=this.getProperty("commandStack");if(!i){i=new C();this._oInternalCommandStack=i;}this.setCommandStack(i);return i;};x.prototype._adaptUndoRedoButtons=function(){var i=this.getCommandStack();this._oToolsMenuBottom.adaptUndoRedoEnablement(i.canUndo(),i.canRedo());this.fireUndoRedoStackModified();};x.prototype.closeToolBars=function(){this._oToolsMenuTop.hide();this._oToolsMenuBottom.hide();};x.prototype.getSelection=function(){if(this._oDesignTime){return this._oDesignTime.getSelection();}else{return[];}};x.prototype.stop=function(){var i=this;return this._serializeToLrep().then(function(){i.exit();i.fireStop();});};x.prototype.restore=function(){this._onRestore();};x.prototype.transport=function(){this._onTransport();};x.prototype.undo=function(){this._onUndo();};x.prototype.redo=function(){this._onRedo();};x.prototype.canUndo=function(){return this.getCommandStack().canUndo();};x.prototype.canRedo=function(){return this.getCommandStack().canRedo();};x.prototype._onUnload=function(){var i=this.getCommandStack();var Q=i.canUndo()||i.canRedo();if(Q&&this.getShowWindowUnloadDialog()){var V=this._oTextResources.getText("MSG_UNSAVED_CHANGES");return V;}else{window.onbeforeunload=this._oldUnloadHandler;}};x.prototype._serializeToLrep=function(){var Q=this.getCommandStack();var V=F.createForControl(this._oRootControl);var W=Q.getSerializableCommands();W.forEach(function(Y,i){var Z=Y.getElement();var $=Y.getPreparedChange();if($){V.addPreparedChange($.change,Z);}else{V.addChange(Y.serialize(),Z);}});var X=this;return V.saveAll().then(function(){jQuery.sap.log.info("Runtime adaptation successfully transfered changes to layered repository");X.getCommandStack().removeAllCommands();},function(i){var Y=i.message||i.status||i;jQuery.sap.log.error("Failed to transfer runtime adaptation changes to layered repository",Y);jQuery.sap.require("sap.m.MessageBox");var Z=X._oTextResources.getText("MSG_LREP_TRANSFER_ERROR")+"\n"+X._oTextResources.getText("MSG_ERROR_REASON",Y);sap.m.MessageBox.error(Z);});};x.prototype._onUndo=function(){this._handleStopCutPaste();this.getCommandStack().undo();};x.prototype._onRedo=function(){this._handleStopCutPaste();this.getCommandStack().redo();};x.prototype._createToolsMenu=function(){if(!this._oToolsMenuTop){this._sAppTitle=this._getApplicationTitle();this._oToolsMenuTop=new T({toolbarType:"top"});this._oToolsMenuTop.createToolbar();this._oToolsMenuTop.setTitle(this._sAppTitle);this._oToolsMenuTop.setRootControl(this._oRootControl);this._oToolsMenuTop.adaptButtonsVisibility();this._oToolsMenuTop.attachToolbarClose(this.closeToolBars,this);this._oToolsMenuTop.attachClose(this.stop,this);this._oToolsMenuTop.attachTransport(this._onTransport,this);this._oToolsMenuTop.attachRestore(this._onRestore,this);}if(!this._oToolsMenuBottom){this._oToolsMenuBottom=new T({toolbarType:"bottom"});this._oToolsMenuBottom.createToolbar();this._oToolsMenuBottom.setRootControl(this._oRootControl);this._oToolsMenuBottom.attachUndo(this._onUndo,this);this._oToolsMenuBottom.attachRedo(this._onRedo,this);}};x.prototype.exit=function(){if(this._oDesignTime){this._oDesignTime.destroy();this._oDesignTime=null;}if(this._oToolsMenuTop){this._oToolsMenuTop.destroy();this._oToolsMenuTop=null;}if(this._oToolsMenuBottom){this._oToolsMenuBottom.destroy();this._oToolsMenuBottom=null;}this.setCommandStack(null);window.onbeforeunload=this._oldUnloadHandler;};x.prototype._onTransport=function(){var i=this;var Q=F.createForControl(this._oRootControl);function V(Y){n.log.error("Changes could not be applied or saved: "+Y);return i._showMessage(p.Icon.ERROR,"HEADER_TRANSPORT_APPLYSAVE_ERROR","MSG_TRANSPORT_APPLYSAVE_ERROR",Y).then(function(){throw new Error('createAndApply failed');});}function W(Y){if(Y.message==='createAndApply failed'){return;}n.log.error("transport error"+Y);return i._showMessage(p.Icon.ERROR,"HEADER_TRANSPORT_ERROR","MSG_TRANSPORT_ERROR",Y);}this._handleStopCutPaste();var X=new m();return this._serializeToLrep().then(function(){return Q.getComponentChanges().then(function(Y){if(Y.length>0){return i._createAndApplyChanges(Y,Q);}})['catch'](V).then(function(){return Q.getComponentChanges();}).then(function(Y){return!!Y.length;}).then(function(Y){if(Y){return X.openTransportSelection(null,i._oRootControl);}else{i._showMessageToast("MSG_TRANSPORT_SUCCESS");}}).then(function(Y){if(Y&&Y.transport&&Y.packageName!=="$TMP"){return i._transportAllLocalChanges(Y,Q);}})['catch'](W);});};x.prototype._createAndApplyChanges=function(i,Q){var V=this;return Promise.resolve().then(function(){function W(X){return X&&X.selector&&X.selector.id;}i.filter(W).forEach(function(X){var Y=sap.ui.getCore().byId(X.selector.id);Q.createAndApplyChange(X,Y);});})['catch'](function(W){n.log.error("Create and apply error: "+W);return W;}).then(function(W){return Q.saveAll().then(function(){if(W){throw W;}});})['catch'](function(W){n.log.error("Create and apply and/or save error: "+W);return V._showMessage(p.Icon.ERROR,"HEADER_TRANSPORT_APPLYSAVE_ERROR","MSG_TRANSPORT_APPLYSAVE_ERROR",W);});};x.prototype._deleteChanges=function(){var i=this;var Q=new m();var V=F.createForControl(this._oRootControl);V.getComponentChanges().then(function(W){return o.getInstance(n.getComponentClassName(i._oRootControl)).then(function(X){if(!X.isProductiveSystem()&&!X.hasMergeErrorOccured()){return Q.setTransports(W,i._oRootControl);}}).then(function(){return V.discardChanges(W);}).then(function(){return window.location.reload();});})["catch"](function(W){return i._showMessage(p.Icon.ERROR,"HEADER_RESTORE_FAILED","MSG_RESTORE_FAILED",W);});};x.prototype._showMessage=function(i,Q,V,W){if(W){var X=this._oTextResources.getText(V,[W.message||W]);}else{var X=this._oTextResources.getText(V);}var Y=this._oTextResources.getText(Q);return new Promise(function(Z){p.show(X,{icon:i,title:Y,onClose:Z});});};x.prototype._showMessageToast=function(i){var Q=this._oTextResources.getText(i);q.show(Q);};x.needsRestart=function(){var i=!!window.localStorage.getItem("sap.ui.rta.restart");return i;};x.enableRestart=function(){window.localStorage.setItem("sap.ui.rta.restart",true);};x.disableRestart=function(){window.localStorage.removeItem("sap.ui.rta.restart");};x.prototype._onRestore=function(){var i=this;var Q=this._oTextResources.getText("FORM_PERS_RESET_MESSAGE");var V=this._oTextResources.getText("FORM_PERS_RESET_TITLE");this._handleStopCutPaste();function W(X){i._serializeToLrep().then(function(){if(X==="OK"){x.enableRestart();i._deleteChanges();}});}p.confirm(Q,{icon:p.Icon.WARNING,title:V,onClose:W});};x.prototype._transportAllLocalChanges=function(i,Q){var V=this;return Q.getComponentChanges().then(function(W){var X=new l();var Y=X._convertToChangeTransportData(W);var Z={};Z.transportId=i.transport;Z.changeIds=Y;return X.makeChangesTransportable(Z).then(function(){W.forEach(function($){if($.getPackage()==='$TMP'){var _=$.getDefinition();_.packageName='';$.setResponse(_);}});}).then(function(){V._showMessageToast("MSG_TRANSPORT_SUCCESS");});});};x.prototype._isEqualParentInfo=function(i,Q){var V=!!i&&!!Q;if(V&&(i.parent&&Q.parent)){V=i.parent.getId()===Q.parent.getId();}if(V&&(i.index||Q.index)){V=i.index===Q.index;}if(V&&(i.aggregation||Q.aggregation)){V=i.aggregation===Q.aggregation;}return V;};x.prototype._handleElementModified=function(i){var Q=i.getParameter("command");if(Q instanceof sap.ui.rta.command.BaseCommand){this.getCommandStack().pushAndExecute(Q);}};x.prototype._handleHideElement=function(Q){var V=this;var W=(Q.mParameters)?Q.getParameter("selectedOverlays"):Q;var X=new b();var Y=[];var Z=false;this._handleStopCutPaste();for(var i=0;i<W.length;i++){var $=W[i].getElementInstance();var _=u.getControlAnalyzerFor($);if(B($)&&U.hasGroupElementUnBoundFields($)){return;}else if(J($)&&U.hasGroupUnBoundFields($)){return;}else if(J($)){Y=Y.concat(U.getGroupMandatoryElements($));}else if(!_.isHideable($)){Y.push($);}if(N($)&&$.getStashed){var a1=a.getCommandFor($,"Stash");X.addCommand(a1);}else{var b1=a.getCommandFor($,"Hide");X.addCommand(b1);}if(K($)){var Z=_.hasToolbarContent($);}}if(Z){U.openRemoveToolbarConfirmationDialog().then(function(c1){if(c1){V.getCommandStack().pushAndExecute(X);}});}else if(Y.length>0){U.openHideElementConfirmationDialog($,Y).then(function(c1){if(c1){V.getCommandStack().pushAndExecute(X);}});}else{this.getCommandStack().pushAndExecute(X);}};x.prototype._openSettingsDialog=function(i){var Q=(i.mParameters)?i.getParameter("selectedOverlays"):i;var V=Q[0].getElementInstance();this._handleStopCutPaste();if(!this._oSettingsDialog){this._oSettingsDialog=new j();}this._oSettingsDialog.setCommandStack(this.getCommandStack());this._oSettingsDialog.open(V);};var y=function(i){return this._oDesignTime.getSelection().length<2;};var z=function(i){var Q=O.getOverlay(i);return u.getControlAnalyzerFor(i).hasParentStableId(Q);};var I=function(i){var Q=O.getOverlay(i);return Q.getMovable();};var B=function(i){return i instanceof G;};var J=function(i){return i instanceof r;};var K=function(i){var Q=u.getControlAnalyzerFor(i);if(Q._getSimpleFormContainer){return!!Q._getSimpleFormContainer(i);}else{return false;}};var L=function(i){return i instanceof s;};var N=function(i){return i instanceof w;};var P=function(i){return i instanceof v;};x.prototype._buildContextMenu=function(){var i=this;this._oContextMenuPlugin.addMenuItem({id:"CTX_RENAME_LABEL",text:i._oTextResources.getText("CTX_RENAME"),handler:this._handleRename.bind(this),available:function(Q){return u.getControlAnalyzerFor(Q).isRenamable(Q);},enabled:y.bind(this)});this._oContextMenuPlugin.addMenuItem({id:"CTX_ADD_FORM_FIELD",text:i._oTextResources.getText("CTX_ADD_FIELD"),handler:this._handleAddElement.bind(this),available:function(Q){return K(Q)&&((E.isInstanceOf(Q,"sap.ui.layout.form.FormElement"))||(E.isInstanceOf(Q,"sap.ui.layout.form.FormContainer")&&Q.getTitle()!==null));},enabled:function(Q){return z(Q);}});this._oContextMenuPlugin.addMenuItem({id:"CTX_ADD_FIELD",text:i._oTextResources.getText("CTX_ADD_FIELD"),handler:this._handleAddElement.bind(this),available:function(Q){return J(Q)||B(Q);},enabled:function(Q){return y.call(i,Q)&&(J(Q)||z(Q));}});this._oContextMenuPlugin.addMenuItem({id:"CTX_ADD_FORM_GROUP",text:i._oTextResources.getText("CTX_ADD_GROUP"),handler:this._handleAddGroup.bind(this),available:function(Q){return K(Q)&&!E.isInstanceOf(Q,"sap.ui.layout.form.FormElement");},enabled:function(Q){return z(Q);}});this._oContextMenuPlugin.addMenuItem({id:"CTX_ADD_GROUP",text:i._oTextResources.getText("CTX_ADD_GROUP"),handler:this._handleAddGroup.bind(this),available:function(Q){return J(Q)||L(Q);},enabled:function(Q){return L(Q)||(J(Q)&&z(Q));}});this._oContextMenuPlugin.addMenuItem({id:"CTX_ADD_SECTION",text:i._oTextResources.getText("CTX_ADD_SECTION"),handler:this._handleAddElement.bind(this),available:function(Q){return N(Q)||P(Q);},enabled:function(Q){return U.hasObjectPageLayoutInvisibleSections.bind(U)&&(P(Q)||z(Q));}});this._oContextMenuPlugin.addMenuItem({id:"CTX_HIDE_FORM",text:i._oTextResources.getText("CTX_HIDE"),handler:this._handleHideElement.bind(this),available:function(Q){return K(Q)&&((E.isInstanceOf(Q,"sap.ui.layout.form.FormElement"))||(E.isInstanceOf(Q,"sap.ui.layout.form.FormContainer")));},enabled:function(Q){return z(Q);}});this._oContextMenuPlugin.addMenuItem({id:"CTX_HIDE_FIELD",text:i._oTextResources.getText("CTX_HIDE"),handler:this._handleHideElement.bind(this),available:B,enabled:function(Q){return z(Q)&&!U.hasGroupElementUnBoundFields(Q);}});this._oContextMenuPlugin.addMenuItem({id:"CTX_HIDE_GROUP",text:i._oTextResources.getText("CTX_HIDE"),handler:this._handleHideElement.bind(this),available:J,enabled:function(Q){return!U.hasGroupUnBoundFields(Q);}});this._oContextMenuPlugin.addMenuItem({id:"CTX_HIDE_SECTION",text:i._oTextResources.getText("CTX_HIDE"),handler:this._handleHideElement.bind(this),available:N,enabled:z});this._oContextMenuPlugin.addMenuItem({id:"CTX_CUT",text:i._oTextResources.getText("CTX_CUT"),handler:this._handleCutElement.bind(this),available:I});this._oContextMenuPlugin.addMenuItem({id:"CTX_PASTE",text:i._oTextResources.getText("CTX_PASTE"),handler:this._handlePasteElement.bind(this),available:I,enabled:function(Q){var V=O.getOverlay(Q.getId());return i._oCutPastePlugin.isElementPasteable(V);}});this._oContextMenuPlugin.addMenuItem({id:"CTX_GROUP_FIELDS",text:i._oTextResources.getText("CTX_GROUP_FIELDS"),handler:this._handleGroupElements.bind(this),available:function(Q){var V=i._oDesignTime.getSelection();return(V.length>1);},enabled:function(Q){var V=true;var W=[];var X=i._oDesignTime.getSelection();X.forEach(function(Y){var Q=Y.getElementInstance();W=W.concat(Q.getFields());});if(X.length>3||W.length>3){return false;}X.some(function(Y){var Q=Y.getElementInstance();if(U.hasGroupElementUnBoundFields(Q)){V=false;return true;}});return V;}});this._oContextMenuPlugin.addMenuItem({id:"CTX_UNGROUP_FIELDS",text:i._oTextResources.getText("CTX_UNGROUP_FIELDS"),handler:this._handleUngroupElements.bind(this),available:function(Q){var V=i._oDesignTime.getSelection();return B(Q)&&Q.getFields().length>1&&V.length<2;},enabled:function(Q){return!U.hasGroupElementUnBoundFields(Q);}});this._oContextMenuPlugin.addMenuItem({id:"CTX_SETTINGS",text:"Settings",handler:this._openSettingsDialog.bind(this),available:function(Q){if(n.isVendorLayer()&&i.getShowSettingsDialog()){var V=["sap.ui.comp.smartfilterbar.SmartFilterBar","sap.ui.comp.smarttable.SmartTable","sap.ui.comp.smartform.SmartForm","sap.uxap.ObjectPageLayout","sap.uxap.ObjectPageSection","sap.uxap.ObjectPageHeaderActionButton","sap.uxap.ObjectPageHeader","sap.ui.table.Column"];return V.some(function(W){return E.isInstanceOf(Q,W);});}}});};x.prototype._handleRename=function(i){var Q=i[0];this._oRenamePlugin.startEdit(Q);};x.prototype._handleAddElement=function(i){this._handleStopCutPaste();var Q=i[0].getElementInstance();if(!this._oAddElementsDialog){this._oAddElementsDialog=new A({rootControl:this._oRootControl});}this._oAddElementsDialog.setCommandStack(this.getCommandStack());this._oAddElementsDialog.open(Q);};x.prototype._handleCutElement=function(i){var Q=i[0];this._oCutPastePlugin.cut(Q);};x.prototype._handlePasteElement=function(i){var Q=i[0];this._oCutPastePlugin.paste(Q);};x.prototype._handleStopCutPaste=function(){this._oCutPastePlugin.stopCutAndPaste();};x.prototype._handleGroupElements=function(){this._handleStopCutPaste();var Q=this._oDesignTime.getSelection();var V=this._oContextMenuPlugin._oElement;var W=U.getClosestTypeForControl(V,"sap.ui.comp.smartform.Group");var X=W.getGroupElements().indexOf(V);var Y=U.findSupportedBlock(V,this._aSupportedControls);var Z=U.getClosestTypeForControl(V,"sap.ui.comp.smartform.SmartForm");var $=[];for(var i=0;i<Q.length;i++){var _=Q[i].getElementInstance();$.push(_);}var a1=a.getCommandFor(Y,"Group");a1.setSource(V);a1.setIndex(X);a1.setGroupFields($);a1.setSmartForm(Z);this.getCommandStack().pushAndExecute(a1);};x.prototype._handleUngroupElements=function(){this._handleStopCutPaste();var i=this._oDesignTime.getSelection();var Q=i[0].getElementInstance();var V=U.getClosestTypeForControl(Q,"sap.ui.comp.smartform.SmartForm");var W=a.getCommandFor(Q,"Ungroup");W.setSmartForm(V);this.getCommandStack().pushAndExecute(W);};x.prototype._handleAddGroup=function(i){this._handleStopCutPaste();var Q=this;var V=i[0].getElementInstance();var W=U.getClosestViewFor(V);var X=u.getControlAnalyzerFor(V);var Y=X.getClosestType(V);var Z=a.getCommandFor(Y,"Add");Z.setNewControlId(W.createId(jQuery.sap.uid()));Z.setLabels(["New Group"]);var $=0;$=X._determineGroupIndex(V);Z.setIndex($);this.getCommandStack().pushAndExecute(Z);var _;if(Z._getParentElementId){_=O.getOverlay(Z._getParentElementId());}else{_=O.getOverlay(Z.getNewControlId());}_.setSelected(true);var a1={"onAfterRendering":function(){setTimeout(function(){Q._oRenamePlugin.startEdit(_);},0);_.removeEventDelegate(a1);}};_.addEventDelegate(a1);};x.prototype._getSmartFormForElement=function(i){while(i&&!E.isInstanceOf(i,"sap.ui.comp.smartform.SmartForm")){i=i.getParent();}return i;};x.prototype._getApplicationTitle=function(){var i="";var Q=sap.ui.core.Component.getOwnerComponentFor(this._oRootControl);if(Q){i=Q.getMetadata().getManifestEntry("sap.app").title;}return i;};return x;},true);
