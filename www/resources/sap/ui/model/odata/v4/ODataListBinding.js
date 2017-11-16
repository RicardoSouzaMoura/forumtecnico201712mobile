/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/model/Binding","sap/ui/model/ChangeReason","sap/ui/model/FilterType","sap/ui/model/ListBinding","sap/ui/model/odata/OperationMode","./_ODataHelper","./Context","./lib/_Cache","./lib/_Helper","./lib/_SyncPromise"],function(q,B,C,F,L,O,_,a,b,c,d){"use strict";var s="sap.ui.model.odata.v4.ODataListBinding",S={change:true,dataReceived:true,dataRequested:true,refresh:true};var e=L.extend("sap.ui.model.odata.v4.ODataListBinding",{constructor:function(m,p,o,v,f,P){var g,h;L.call(this,m,p);if(!p||p.slice(-1)==="/"){throw new Error("Invalid path: "+p);}g=_.buildBindingParameters(P,["$$groupId","$$operationMode","$$updateGroupId"]);this.sGroupId=g.$$groupId;this.sOperationMode=g.$$operationMode||m.sOperationMode;this.sUpdateGroupId=g.$$updateGroupId;if(!this.sOperationMode&&(v||f)){throw new Error("Unsupported operation mode: "+this.sOperationMode);}this.aApplicationFilters=_.toArray(f);this.oCache=undefined;this.sChangeReason=undefined;this.aDependentBindings=undefined;this.aFilters=[];this.mQueryOptions=undefined;this.sRefreshGroupId=undefined;this.aSorters=_.toArray(v);if(!this.bRelative||P){this.mQueryOptions=_.buildQueryOptions(m.mUriParameters,P,_.aAllowedSystemQueryOptions);}if(!this.bRelative){if(this.aApplicationFilters.length>0){this.oCache=_.createListCacheProxy(this);}else{h=_.buildOrderbyOption(this.aSorters,this.mQueryOptions&&this.mQueryOptions.$orderby);this.oCache=b.create(m.oRequestor,p.slice(1),_.mergeQueryOptions(this.mQueryOptions,h));}}this.reset();this.setContext(o);}});e.prototype.attachEvent=function(E){if(!(E in S)){throw new Error("Unsupported event '"+E+"': v4.ODataListBinding#attachEvent");}return L.prototype.attachEvent.apply(this,arguments);};e.prototype.deregisterChange=function(p,l,i){if(this.oCache){this.oCache.deregisterChange(i,p,l);}else if(this.oContext){this.oContext.deregisterChange(c.buildPath(this.sPath,i,p),l);}};e.prototype.destroy=function(){if(this.bRelative&&this.oContext){this.oContext.deregisterBinding(this);}L.prototype.destroy.apply(this);};e.prototype.filter=function(f,g){if(this.sOperationMode!==O.Server){throw new Error("Operation mode has to be sap.ui.model.odata.OperationMode.Server");}if(this.hasPendingChanges()){throw new Error("Cannot filter due to pending changes");}if(g===F.Control){this.aFilters=_.toArray(f);}else{this.aApplicationFilters=_.toArray(f);}this.mCacheByContext=undefined;this.oCache=_.createListCacheProxy(this,this.oContext);this.sChangeReason=C.Filter;this.reset();this._fireRefresh({reason:C.Filter});return this;};e.prototype.getContexts=function(f,l,m){var g,o=this.oContext,D=false,G,M=this.oModel,p,r,R=M.resolve(this.sPath,o),t=this;function h(v){var j=false,i,N,k=Array.isArray(v)?v.length:v.value.length,n=r.start+k;for(i=r.start;i<n;i+=1){if(t.aContexts[i]===undefined){j=true;t.aContexts[i]=a.create(M,t,R+"/"+i,i);}}if(t.aContexts.length>t.iMaxLength){t.iMaxLength=Infinity;}if(k<r.length){t.iMaxLength=Math.min(r.start+k,t.iMaxLength);if(t.aContexts.length>t.iMaxLength){t.aContexts.splice(t.iMaxLength,t.aContexts.length-t.iMaxLength);}}N=t.aContexts.length===t.iMaxLength;if(t.bLengthFinal!==N){t.bLengthFinal=N;j=true;}if(j){t._fireChange({reason:g});}}g=this.sChangeReason||C.Change;this.sChangeReason=undefined;f=f||0;l=l||M.iSizeLimit;if(!m||m<0){m=0;}if(!R){return[];}r=_.getReadRange(this.aContexts,f,l,m,this.iMaxLength);if(r){if(this.oCache){G=this.sRefreshGroupId||this.getGroupId();this.sRefreshGroupId=undefined;p=this.oCache.read(r.start,r.length,G,undefined,function(){D=true;t.oModel.addedRequestToGroup(G,t.fireDataRequested.bind(t));});}else{p=o.fetchValue(this.sPath);}p.then(function(v){h(v||[]);if(D){t.fireDataReceived();}},function(E){if(D){if(E.canceled){t.fireDataReceived();}else{M.reportError("Failed to get contexts for "+M.sServiceUrl+R.slice(1)+" with start index "+f+" and length "+l,s,E);t.fireDataReceived({error:E});}}})["catch"](function(E){q.sap.log.error(E.message,E.stack,s);});}this.iCurrentBegin=f;this.iCurrentEnd=f+l;return this.aContexts.slice(f,f+l);};e.prototype.getCurrentContexts=function(){var f=this.aContexts.slice(this.iCurrentBegin,this.iCurrentEnd),l=Math.min(this.iCurrentEnd,this.iMaxLength)-this.iCurrentBegin;while(f.length<l){f.push(undefined);}return f;};e.prototype.getDistinctValues=function(){throw new Error("Unsupported operation: v4.ODataListBinding#getDistinctValues");};e.prototype.getGroupId=function(){return this.sGroupId||this.oModel.getGroupId();};e.prototype.getLength=function(){return this.bLengthFinal?this.aContexts.length:this.aContexts.length+10;};e.prototype.getUpdateGroupId=function(){return this.sUpdateGroupId||this.oModel.getUpdateGroupId();};e.prototype.hasPendingChanges=function(){return _.hasPendingChanges(this,true);};e.prototype.initialize=function(){if(!this.bRelative||this.oContext){this._fireChange({reason:C.Change});}};e.prototype.isInitial=function(){throw new Error("Unsupported operation: v4.ODataListBinding#isInitial");};e.prototype.isLengthFinal=function(){return this.bLengthFinal;};e.prototype.refresh=function(g){if(this.bRelative){throw new Error("Refresh on this binding is not supported");}if(this.hasPendingChanges()){throw new Error("Cannot refresh due to pending changes");}_.checkGroupId(g);this.refreshInternal(g);};e.prototype.refreshInternal=function(g){this.sRefreshGroupId=g;if(this.oCache){if(this.bRelative){this.oCache.deregisterChange();this.oCache=_.createListCacheProxy(this,this.oContext);this.mCacheByContext=undefined;}else{this.oCache.refresh();}}this.reset();this._fireRefresh({reason:C.Refresh});if(this.aDependentBindings){this.aDependentBindings.forEach(function(D){D.refreshInternal(g);});}};e.prototype.fetchAbsoluteValue=function(p){var i,P,r;if(this.oCache){r=this.oModel.resolve(this.sPath,this.oContext)+"/";if(p.lastIndexOf(r)===0){p=p.slice(r.length);i=parseInt(p,10);P=p.indexOf("/");p=P>0?p.slice(P+1):"";return this.fetchValue(p,undefined,i);}}if(this.oContext){return this.oContext.fetchAbsoluteValue(p);}return d.resolve();};e.prototype.fetchValue=function(p,l,i){if(this.oCache){return this.oCache.read(i,1,undefined,p,undefined,l);}if(this.oContext){return this.oContext.fetchValue(c.buildPath(this.sPath,i,p),l);}return d.resolve();};e.prototype.reset=function(){this.aContexts=[];this.iCurrentBegin=this.iCurrentEnd=0;this.iMaxLength=Infinity;this.bLengthFinal=false;};e.prototype.resetChanges=function(){_.resetChanges(this,true);};e.prototype.resume=function(){throw new Error("Unsupported operation: v4.ODataListBinding#resume");};e.prototype.setContext=function(o){if(this.oContext!==o){if(this.bRelative){this.reset();if(this.oContext){this.oContext.deregisterBinding(this);}if(this.oCache){this.oCache.deregisterChange();this.oCache=undefined;}if(o){this.oCache=_.createListCacheProxy(this,o);o.registerBinding(this);}B.prototype.setContext.call(this,o);}else{this.oContext=o;}}};e.prototype.sort=function(v){var o;if(this.sOperationMode!==O.Server){throw new Error("Operation mode has to be sap.ui.model.odata.OperationMode.Server");}if(this.hasPendingChanges()){throw new Error("Cannot sort due to pending changes");}this.aSorters=_.toArray(v);if(this.bRelative){this.mCacheByContext=undefined;this.oCache=_.createListCacheProxy(this,this.oContext);}else{o=_.buildOrderbyOption(this.aSorters,this.mQueryOptions&&this.mQueryOptions.$orderby);this.oCache=b.create(this.oModel.oRequestor,this.sPath.slice(1),_.mergeQueryOptions(this.mQueryOptions,o));}this.reset();this.sChangeReason=C.Sort;this._fireRefresh({reason:C.Sort});return this;};e.prototype.suspend=function(){throw new Error("Unsupported operation: v4.ODataListBinding#suspend");};e.prototype.toString=function(){return s+": "+(this.bRelative?this.oContext+"|":"")+this.sPath;};e.prototype.updateValue=function(g,p,v,E,P){var o;if(this.oCache){g=g||this.getUpdateGroupId();o=this.oCache.update(g,p,v,E,P);this.oModel.addedRequestToGroup(g);return o;}return this.oContext.updateValue(g,p,v,E,c.buildPath(this.sPath,P));};return e;},true);
