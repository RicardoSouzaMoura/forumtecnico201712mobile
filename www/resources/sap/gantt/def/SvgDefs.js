/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/base/ManagedObject"],function(M){"use strict";var S=M.extend("sap.gantt.def.SvgDefs",{metadata:{aggregations:{defs:{type:"sap.gantt.def.DefBase",multiple:true,visibility:"public",singularName:"def",bindable:"bindable"}}}});S.prototype.getDefString=function(){var r="<defs id='"+this.getId()+"'>",d=this.getDefs();if(d&&d.length>0){d.forEach(function(D,i){r+=D.getDefString();});}return r+"</defs>";};S.prototype.getDefNode=function(){var r={"id":this.getId(),"defNodes":[]};var d=this.getDefs();for(var i=0;i<d.length;i++){r.defNodes.push(d[i].getDefNode());}return r;};return S;},true);
