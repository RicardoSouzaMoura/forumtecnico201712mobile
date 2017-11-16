(function(){"use strict";jQuery.sap.require("sap.ovp.ui.ObjectStream");jQuery.sap.require("sap.ovp.cards.AnnotationHelper");sap.ui.controller("sap.ovp.cards.stack.Stack",{onInit:function(){var v=this._oCard=this.getView().byId("stackContent");v.addEventDelegate({onclick:this.openStack.bind(this),onkeydown:function(e){if(!e.shiftKey&&(e.keyCode==13||e.keyCode==32)){e.preventDefault();this.openStack();}}.bind(this)});},onExit:function(){if(this.oObjectStream){this.oObjectStream.destroy();}},onAfterRendering:function(){var v=this.getView();var m=v.getModel();var c=v.getModel("ovpCardProperties");var e=c.getProperty("/entitySet");var o=c.getProperty("/objectStreamCardsSettings");var M=m.getMetaModel();var E=M.getODataEntitySet(e);var a=M.getODataEntityType(E.entityType);var A=c.getProperty("/annotationPath");var b=(A)?A.split(","):[];var d,O;if(this.getOwnerComponent()&&this.getOwnerComponent().getComponentData()){d=this.getOwnerComponent().getComponentData().appComponent;O=this.getOwnerComponent().getComponentData().mainComponent;}function g(K){if(K==="ovpCardProperties"){return c;}else if(K==="dataModel"){return m;}else if(K==="_ovpCache"){return{};}}var f=[{getSetting:g,bDummyContext:true},E].concat(b);var B=sap.ovp.cards.AnnotationHelper.formatItems.apply(this,f);var h=sap.ui.base.BindingParser.complexParser(B);var s=c.getProperty("/objectStreamCardsNavigationProperty");var S=s?true:false;var i;var j=c.getProperty("/objectStreamCardsTemplate");if(S){if(j==="sap.ovp.cards.quickview"){jQuery.sap.log.error("objectStreamCardsTemplate cannot be 'sap.ovp.cards.quickview' when objectStreamCardsNavigationProperty is provided");this.setErrorState();return;}i=this._determineFilterPropertyId(m,E,a,s);o.entitySet=m.getMetaModel().getODataAssociationSetEnd(a,s).entitySet;}else{if(j!=="sap.ovp.cards.quickview"){jQuery.sap.log.error("objectStreamCardsTemplate must be 'sap.ovp.cards.quickview' when objectStreamCardsNavigationProperty is not provided");this.setErrorState();return;}if(a["com.sap.vocabularies.UI.v1.HeaderInfo"]&&a["com.sap.vocabularies.UI.v1.HeaderInfo"].TypeName&&a["com.sap.vocabularies.UI.v1.HeaderInfo"].TypeName.String){o.title=a["com.sap.vocabularies.UI.v1.HeaderInfo"].TypeName.String;}else{o.title=a.name;}o.entitySet=e;}h.factory=function(I,C){var q=o,F;if(S){F={filters:[{path:i.foreignKey,operator:"EQ",value1:C.getProperty(i.key)}]};q=jQuery.extend(F,o);}var r=sap.ui.component({name:c.getProperty("/objectStreamCardsTemplate"),componentData:{model:m,settings:q,appComponent:d,mainComponent:O}});var u=v.getModel("@i18n");if(u){r.setModel(u,"@i18n");}var w=new sap.ui.core.ComponentContainer({component:r});w.setBindingContext=function(C){r.setBindingContext(C);};return w;};this.oObjectStream=new sap.ovp.ui.ObjectStream({title:c.getObject("/category"),content:h});this.oObjectStream.setModel(m);if(!S){var n=this.getEntityNavigationEntries();if(n.length>0){var k=n[0].label;var p=this._createPlaceHolder(k);var t=this;p.addEventDelegate({onclick:function(){t.doNavigation(null);}});this.oObjectStream.setPlaceHolder(p);}}var l=this.oObjectStream.getBinding("content");l.attachDataReceived(function(){var q=this.getView().getModel("ovpCardProperties").getObject("/category");var r=l.getCurrentContexts().length;var u=l.getLength();v.byId("stackSize").setText(r);v.byId("stackTotalSize").setText(sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("Total_Size_Stack_Card",[u]));var w=this.getView().byId("stackContent").getDomRef();jQuery(w).attr("aria-label",sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("stackCardContent",[r,q]));var x=this.getView().byId("stackSize").getDomRef();jQuery(x).attr("aria-label",sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("stackCard",[r]));},this);},_determineFilterPropertyId:function(m,e,E,n){var N,a=E.namespace,r,A;for(var i=0;i<E.navigationProperty.length;i++){if(E.navigationProperty[i].name===n){N=E.navigationProperty[i];break;}}r=N.relationship;A=sap.ovp.cards.AnnotationHelper.getAssociationObject(m,r,a);var R=A.referentialConstraint,f={};if(R){f.foreignKey=R.dependent.propertyRef[0].name;f.key=R.principal.propertyRef[0].name;return f;}},_createPlaceHolder:function(a){var i=new sap.ui.core.Icon({src:"sap-icon://offsite-work",useIconTooltip:false,layoutData:new sap.m.FlexItemData({growFactor:1,alignSelf:sap.m.FlexAlignSelf.Center})});i.addStyleClass("sapOvpStackPlaceHolderIcon");var l=new sap.m.Label({text:a});var s=sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("ForMoreContentAppName",[a]);var t=new sap.m.Text({text:s});t.addCustomData(new sap.ovp.ui.CustomData({key:"role",value:"heading",writeToDom:true}));t.addCustomData(new sap.ovp.ui.CustomData({key:"aria-label",value:s,writeToDom:true}));l.addStyleClass("sapOvpStackPlaceHolderAppName");t.addStyleClass("sapOvpStackPlaceHolderTextLine");var d=new sap.m.VBox({items:[l,t]});d.addStyleClass("sapOvpStackPlaceHolderLabelsContainer");d.addCustomData(new sap.ovp.ui.CustomData({key:"tabindex",value:"0",writeToDom:true}));d.addCustomData(new sap.ovp.ui.CustomData({key:"role",value:"button",writeToDom:true}));var v=new sap.m.VBox({items:[i,d]});v.addStyleClass("sapOvpStackPlaceHolder");v.addEventDelegate({onkeydown:function(e){if(!e.shiftKey&&(e.keyCode==13||e.keyCode==32)){e.preventDefault();e.srcControl.$().click();}}});return v;},openStack:function(){if(this.oObjectStream){var l=this.oObjectStream.getBinding("content");if(l.getCurrentContexts().length>0){var c=this.getView().$().width();this.getView().addDependent(this.oObjectStream);this.oObjectStream.setModel(this.getView().getModel("@i18n"),"@i18n");this.oObjectStream.open(c,this._oCard);}}}});})();