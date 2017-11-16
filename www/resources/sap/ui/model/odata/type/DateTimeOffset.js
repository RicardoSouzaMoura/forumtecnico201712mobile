/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/format/DateFormat","sap/ui/model/FormatException","sap/ui/model/odata/type/DateTimeBase"],function(q,D,F,a){"use strict";var b=a.extend("sap.ui.model.odata.type.DateTimeOffset",{constructor:function(f,c){var v;a.call(this,f,{nullable:c?c.nullable:undefined,precision:c?c.precision:undefined});this.rDateTimeOffset=undefined;this.bV4=false;if(c){v=c.V4;if(v===true){this.bV4=true;}else if(v!==undefined&&v!==false){q.sap.log.warning("Illegal V4: "+v,null,this.getName());}}}}),m;function g(){if(!m){m=D.getDateInstance({pattern:"yyyy-MM-dd'T'HH:mm:ssX",strictParsing:true});}return m;}b.prototype.formatValue=function(v,t){var d;if(t==="string"&&typeof v==="string"){d=g().parse(v);if(!d){throw new F("Illegal "+this.getName()+" value: "+v);}v=d;}return a.prototype.formatValue.call(this,v,t);};b.prototype.getName=function(){return"sap.ui.model.odata.type.DateTimeOffset";};b.prototype.parseValue=function(v,s){var r=a.prototype.parseValue.call(this,v,s);return this.bV4&&r!==null?g().format(r):r;};b.prototype.setV4=function(){this.bV4=true;return this;};b.prototype.validateValue=function(v){var p;if(this.bV4){if(typeof v==="string"){if(!this.rDateTimeOffset){p=this.oConstraints&&this.oConstraints.precision;this.rDateTimeOffset=new RegExp("^"+"\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])"+"T"+"(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d"+(p?"(\\.\\d{1,"+p+"})?":"")+")?"+"(?:Z|[-+](?:0\\d|1[0-3]):[0-5]\\d|[-+]14:00)$","i");}if(this.rDateTimeOffset.test(v)){return;}}else if(v){v=v.toString();}}a.prototype.validateValue.call(this,v);};return b;});
