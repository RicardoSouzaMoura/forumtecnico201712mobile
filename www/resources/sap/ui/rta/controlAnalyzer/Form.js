/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/rta/controlAnalyzer/Base','sap/ui/rta/Utils','sap/ui/dt/ElementUtil','sap/ui/fl/Utils'],function(B,U,E,F){"use strict";var a=B.extend("sap.ui.rta.controlAnalyzer.Form",{metadata:{library:"sap.ui.rta",properties:{}}});a.prototype.init=function(){};a.prototype.getFlexChangeType=function(t,e,s){var f;switch(t){case"Rename":if(E.isInstanceOf(e,"sap.ui.layout.form.FormContainer")){f="renameTitle";}else if(E.isInstanceOf(e,"sap.ui.layout.form.FormElement")){f="renameLabel";}break;case"Move":if(this.getConfiguredElement(e)instanceof sap.ui.layout.form.SimpleForm){var m=(s.movedElements&&s.movedElements.length>0)?s.movedElements[0]:undefined;m=m?m.element:undefined;jQuery.sap.require("sap.ui.layout.changeHandler.MoveSimpleForm");if(E.isInstanceOf(m,"sap.ui.layout.form.FormContainer")){f=sap.ui.layout.changeHandler.MoveSimpleForm.CHANGE_TYPE_MOVE_GROUP;}else if(E.isInstanceOf(m,"sap.ui.layout.form.FormElement")){f=sap.ui.layout.changeHandler.MoveSimpleForm.CHANGE_TYPE_MOVE_FIELD;}}break;case"Hide":if(E.isInstanceOf(e,"sap.ui.layout.form.FormContainer")){f="removeSimpleFormGroup";}else if(E.isInstanceOf(e,"sap.ui.layout.form.FormElement")){f="hideSimpleFormField";}break;case"Unhide":if(E.isInstanceOf(e,"sap.ui.layout.form.FormElement")){f="unhideSimpleFormField";}break;case"Add":if(E.isInstanceOf(e,"sap.ui.layout.form.SimpleForm")){f="addSimpleFormGroup";}break;default:break;}return f;};a.prototype.mapSettings=function(t,e,s){var r=jQuery.extend({},s);var m=function(c){var p=c.getMetadata().getName();if(p==="sap.ui.core.Title"||p==="sap.m.Label"){return c.getParent();}else{return c;}};switch(t){case"Move":if(this.getConfiguredElement(e)instanceof sap.ui.layout.form.SimpleForm){var M=r.movedElements[0];M=M?M.element:undefined;M=m(M);r.movedElements[0].element=M;r.source.parent=m(s.source.parent);r.target.parent=m(s.target.parent);}break;default:break;}return r;};a.prototype.hasParentStableId=function(o){var b=this._getSimpleFormContainer(o.getElementInstance());return b&&F.checkControlId(b);};a.prototype.getCommandClass=function(c){var C;switch(c){case"Rename":C='sap.ui.rta.command.RenameForm';break;case"Hide":C='sap.ui.rta.command.HideForm';break;case"Unhide":C='sap.ui.rta.command.UnhideForm';break;case"Add":C='sap.ui.rta.command.AddSimple';break;case"Move":C='sap.ui.rta.command.SimpleFormMove';break;default:break;}return C;};a.prototype.getConfiguredElement=function(e){return this._getSimpleFormContainer(e);};a.prototype.isEditable=function(e){var s=this._getSimpleFormContainer(e);if(s){return this._hasStableIds(s);}};a.prototype.getRenamableControl=function(e){if(E.isInstanceOf(e,"sap.ui.layout.form.FormElement")){return e.getLabel();}else if(E.isInstanceOf(e,"sap.ui.layout.form.FormContainer")){return e.getTitle();}};a.prototype.getLabel=function(e){return this.getRenamableControl(e).getText();};a.prototype.getLabelBinding=function(e){return e.getBindingInfo("text");};a.prototype.resumeLabelBinding=function(e){var b=e.getBinding("text");if(b){b.resume();}};a.prototype.createChangeData=function(c,C,h,s){var m={};var b=c.getBindingContext().getObject();var d=b.controlId?b.controlId:b.fieldLabel;var o=sap.ui.getCore().byId(d);var e=!!o;var f=function(){if(e){if(b.visibilityType==="hide"){m={controlId:d,changeType:h?"hideControl":"unhideControl",controlType:"SimpleForm"};}}return m;};return new Promise(function(r,g){r(f());});};a.prototype.getSelectedBlock=function(c){return U.findSupportedBlock(c,["sap.ui.layout.form.SimpleForm"]);};a.prototype.getClosestType=function(c){return U.getClosestTypeForControl(c,"sap.ui.layout.form.SimpleForm");};a.prototype.prepare=function(){var e=this._getSimpleFormElements(this.getControl());if(!this.getPrepared()){for(var i=0;i<e.length;i++){var t=e[i].getText?e[i].getText():e[i].getId();var v=e[i].getVisible?e[i].getVisible():e[i].getParent().getVisible();if(v===false){this._mAvailableElements[e[i].getId()]={fieldLabel:t,quickInfo:t,entityType:"",controlId:e[i].getId(),visibilityType:"hide"};}else{this._mHiddenElements[e[i].getId()]={fieldLabel:t,quickInfo:t,entityType:"",controlId:e[i].getId(),visibilityType:"hide"};}}sap.ui.rta.controlAnalyzer.Base.prototype.prepare.apply(this);}return Promise.resolve();};a.prototype._getSimpleFormElements=function(e){var b=[];var s=this._getSimpleFormContainer(e);var c=s.getContent();c.forEach(function(f){if(f instanceof sap.m.Label){b.push(f);}});return b;};a.prototype._getSimpleFormContainer=function(e){if(E.isInstanceOf(e,"sap.ui.layout.form.SimpleForm")){return e;}else if(E.isInstanceOf(e,"sap.ui.layout.form.Form")||E.isInstanceOf(e,"sap.ui.layout.form.FormContainer")||E.isInstanceOf(e,"sap.ui.layout.form.FormElement")){return this._getSimpleFormContainer(e.getParent());}};a.prototype._hasStableIds=function(e){if(E.isInstanceOf(e,"sap.ui.layout.form.SimpleForm")&&F.checkControlId(e)){var h=e.getContent().some(function(c){var H=!F.checkControlId(c);return H;});return!h;}};a.prototype._determineGroupIndex=function(e){var i=0;if(e.getMetadata().getName()==="sap.ui.layout.form.FormContainer"){var c=this._getSimpleFormContainer(e).getContent();var s=-1;var t=e.getTitle()||e.getToolbar();if(t!==null){c.some(function(f,b){if(f===t){s=b;}if(s>=0&&b>s){if(f instanceof sap.ui.core.Title||f.getMetadata().isInstanceOf("sap.ui.core.Toolbar")){i=b;return true;}}});i=(!i)?c.length:i;}}return i;};a.prototype._determineIndexOfFormElement=function(f,o){var c=f.getParent().getAggregation("formElements");var i;c.some(function(C,b){if(C===f){i=b;return true;}});i=(o)?i+1:i;return i;};a.prototype._determineIndexOfFormContainer=function(f){var c=f.getParent().getAggregation("formContainers");var i;c.some(function(C,b){if(C===f){i=b;return true;}});return i;};a.prototype._getStableElementForCommand=function(e){var s;if(e.getMetadata().getName()==="sap.ui.layout.form.FormContainer"){s=e.getTitle()||e.getToolbar();}else if(e.getMetadata().getName()==="sap.ui.layout.form.FormElement"){s=e.getLabel();}return s;};a.prototype.mapSpecificChangeData=function(t,s){var r;switch(t){case"Add":r=this._mapAddSpecificChangeData(t,s);break;case"Move":var m=s.movedElements[0].id;var M=sap.ui.getCore().byId(m);var S=this._getSimpleFormContainer(M);s['semanticContainer']=S?S.getId():undefined;r=s;break;default:r=this.prototype.mapSpecificChangeData(t,s);break;}return r;};a.prototype._mapAddSpecificChangeData=function(t,s){if(s.changeType==="addSimpleFormGroup"){s.groupLabel=s.labels[0];delete s.labels;}return s;};a.prototype.hasToolbarContent=function(e){if(E.isInstanceOf(e,"sap.ui.layout.form.FormContainer")&&e.getToolbar&&e.getToolbar()){var t=e.getToolbar().getContent();var c;if(t.length>1){c=true;}else if((t.length===1)&&(!t[0].getMetadata().isInstanceOf("sap.ui.core.Label")&&!t[0]instanceof sap.ui.core.Title&&!t[0]instanceof sap.m.Title)){c=true;}else{c=false;}return c;}else{return false;}};a.prototype.isHideable=function(e){var i=(E.isInstanceOf(e,"sap.ui.layout.form.FormElement")||E.isInstanceOf(e,"sap.ui.layout.form.FormContainer"));return(i&&!this.isMandatory(e));};a.prototype.checkTargetZone=function(p,A,m){var s=E.getClosestElementOfType(m,"sap.ui.layout.form.SimpleForm");var t=E.getClosestElementOfType(p,"sap.ui.layout.form.SimpleForm");if(s===t){return true;}};return a;},true);