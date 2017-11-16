(function(){"use strict";jQuery.sap.declare("sap.ovp.cards.charts.VizAnnotationManager");sap.ovp.cards.charts.VizAnnotationManager=sap.ovp.cards.charts.VizAnnotationManager||{};sap.ovp.cards.charts.VizAnnotationManager.constants={LABEL_KEY:"sap:label",TEXT_KEY:"sap:text",TYPE_KEY:"type",DISPLAY_FORMAT_KEY:"sap:display-format",SEMANTICS_KEY:"sap:semantics"};sap.ovp.cards.charts.VizAnnotationManager.errorMessages={CARD_WARNING:"OVP-AC: Analytic card: Warning: ",CARD_ERROR:"OVP-AC: Analytic card Error: ",CARD_ANNO_ERROR:"OVP-AC: Analytic card: Error ",CHART_ANNO_ERROR:"OVP-AC: Analytic card: Error ",INVALID_CHART_ANNO:"OVP-AC: Analytic Cards: Invalid Chart Annotation.",ANALYTICAL_CONFIG_ERROR:"Analytic card configuration error",CACHING_ERROR:"no model defined while caching OdataMetaData",INVALID_MAXITEMS:"maxItems is Invalid. ",NO_DATASET:"OVP-AC: Analytic Cards: Could not obtain dataset.",SORTORDER_WARNING:"SortOrder is present in PresentationVariant, but it is empty or not well formed.",BOOLEAN_ERROR:"Boolean value is not present in PresentationVariant.",IS_MANDATORY:"is mandatory.",IS_MISSING:"is missing.",NOT_WELL_FORMED:"is not found or not well formed)",MISSING_CHARTTYPE:"Missing ChartType in ",CHART_ANNO:"Chart Annotation.",CARD_ANNO:"card annotation.",CARD_CONFIG:"card configuration.",CARD_CONFIG_ERROR:"Could not obtain configuration for ",CARD_CONTAINER_ERROR:"Could not obtain card container. ",DATA_UNAVAIALABLE:"No data available.",CONFIG_LOAD_ERROR:"Failed to load config.json. Reason: ",INVALID_CHARTTYPE:"Invalid ChartType given for ",INVALID_CONFIG:"No valid configuration given for ",CONFIG_JSON:"in config.json",ENTER_INTEGER:"Please enter an Integer.",NO_CARD_MODEL:"Could not obtain Cards model.",ANNO_REF:"com.sap.vocabularies.UI.v1 annotation.",INVALID_REDUNDANT:"Invalid/redundant role configured for ",CHART_IS:"chart is/are ",CARD_CONFIG_JSON:"card from config.json",ALLOWED_ROLES:"Allowed role(s) for ",DIMENSIONS_MANDATORY:"DimensionAttributes are mandatory.",MEASURES_MANDATORY:"MeasureAttributes are mandatory.",CARD_LEAST:"card: Enter at least ",CARD_MOST:"card: Enter at most ",FEEDS:"feed(s).",MIN_FEEDS:"Minimum number of feeds required for ",FEEDS_OBTAINED:"card is not configured. Obtained ",FEEDS_REQUIRED:"feed(s), Required: ",INVALID_SEMANTIC_MEASURES:"More than one measure is being semantically coloured",INVALID_IMPROVEMENT_DIR:"No Improvement Direction Found",INVALID_CRITICALITY:"Invalid criticality values"};sap.ovp.cards.charts.VizAnnotationManager.formatItems=function(c,e,s,p,D,M){var a=c.getSetting("dataModel");var r="{";var b=[];var f=[];var g=[];var F=s&&s.SelectOptions;var P=s&&s.Parameters;var S=p&&p.SortOrder;var h=p&&p.MaxItems,j=null;var C;var t;var k=null;var l=sap.ovp.cards.charts.VizAnnotationManager;var n=l.constants.TEXT_KEY;if(h){j=h.Int32?h.Int32:h.Int;}if(j){if(j=="0"){jQuery.sap.log.error("OVP-AC: Analytic card Error: maxItems is configured as "+j);r+="}";return r;}if(!/^\d+$/.test(j)){jQuery.sap.log.error("OVP-AC: Analytic card Error: maxItems is Invalid. "+"Please enter an Integer.");r+="}";return r;}}if(P){var o=sap.ovp.cards.AnnotationHelper.resolveParameterizedEntitySet(a,e,s);r+="path: '"+o+"'";}else{r+="path: '/"+e.name+"'";}var q=[];if(!c||!c.getSetting('ovpCardProperties')){jQuery.sap.log.error(l.errorMessages.ANALYTICAL_CONFIG_ERROR);r+="}";return r;}k=c.getSetting('ovpCardProperties').getProperty("/entitySet");if(!a||!k){return r;}var u=l.getMetadata(a,k);C=c.getSetting('ovpCardProperties').getProperty("/filters");if(F){jQuery.each(s.SelectOptions,function(){var d=this.PropertyName.PropertyPath;jQuery.each(this.Ranges,function(){if(this.Sign.EnumMember==="com.sap.vocabularies.UI.v1.SelectionRangeSignType/I"){var m=this.Low.String;var B=this.High&&this.High.String;var E=l.formatByType;m=E(u,d,m);var G={path:d,operator:this.Option.EnumMember.split("/")[1],value1:m};if(B){G.value2=E(u,d,B);}q.push(G);}});});}if(C&&C.length>0){q=q.concat(C);}if(q.length>0){r+=", filters: "+JSON.stringify(q);}if(S){var v=p.SortOrder;if(v.length<1){jQuery.sap.log.warning(l.errorMessages.CARD_WARNING+l.errorMessages.SORTORDER_WARNING);}else{var w="";var x;var y;var z;for(var i=0;i<v.length;i++){x=v[i];z=x.Property.PropertyPath;g.push(z);if(typeof x.Descending=="undefined"){y='true';}else{var A=x.Descending.Bool||x.Descending.Boolean;if(!A){jQuery.sap.log.warning(l.errorMessages.CARD_WARNING+l.errorMessages.BOOLEAN_ERROR);y='true';}else{y=A.toLowerCase()=='true'?'true':'false';}}w=w+"{path: '"+z+"',descending: "+y+"},";}r+=", sorter: ["+w.substring(0,w.length-1)+"]";}}jQuery.each(M,function(i,m){t=m.Measure.PropertyPath;f.push(t);if(u&&u[t]&&u[t][n]&&t!=u[t][n]){f.push(u[t][n]?u[t][n]:t);}});jQuery.each(D,function(i,d){t=d.Dimension.PropertyPath;b.push(t);if(u&&u[t]&&u[t][n]&&t!=u[t][n]){b.push(u[t][n]?u[t][n]:t);}});r+=", parameters: {select:'"+[].concat(b,f).join(",");if(g.length>0){r+=","+g.join(",");}r+="'}";if(j){r+=", length: "+j;}r+="}";return r;};sap.ovp.cards.charts.VizAnnotationManager.formatItems.requiresIContext=true;sap.ovp.cards.charts.VizAnnotationManager.formatByType=function(m,p,v){var s=sap.ovp.cards.charts.VizAnnotationManager;var t=s.constants.TYPE_KEY;if(!m||!m[p]||!m[p][t]){return v;}var n=["Edm.Int","Edmt.Int16","Edm.Int32","Edm.Int64","Edm.Decimal"];var c=m[p][t];if(jQuery.inArray(c,n)!==-1){return Number(v);}return v;};sap.ovp.cards.charts.VizAnnotationManager.returnDateFormat=function(d){if(d){jQuery.sap.require("sap.ui.core.format.DateFormat");var D=sap.ui.core.format.DateFormat.getDateTimeInstance({pattern:"dd-MMM"});return D.format(new Date(d));}return"";};sap.ovp.cards.charts.VizAnnotationManager.formatChartAxes=function(){jQuery.sap.require("sap.ui.core.format.NumberFormat");var c={locale:function(){},format:function(v,p){if(p=="axisFormatter"){var n=sap.ui.core.format.NumberFormat.getFloatInstance({style:'short',minFractionDigits:2,maxFractionDigits:2});return n.format(Number(v));}if(v.constructor==Date){jQuery.sap.require("sap.ui.core.format.DateFormat");var d=sap.ui.core.format.DateFormat.getDateTimeInstance({pattern:"dd-MMM"});v=d.format(new Date(v));}return v;}};jQuery.sap.require("sap.viz.ui5.api.env.Format");sap.viz.ui5.api.env.Format.numericFormatter(c);};sap.ovp.cards.charts.VizAnnotationManager.hideDateTimeAxis=function(v,f){var d=v.getModel();var t=v.getVizType();if(t!="line"&&t!="bubble"){return;}if(!f){f=t=="line"?"categoryAxis":"valueAxis";}var e=v.getModel('ovpCardProperties').getProperty("/entitySet");if(!d||!e){return;}var m=this.getMetadata(d,e);var a=v.getFeeds();for(var i=0;i<a.length;i++){if(a[i].getUid()==f){var b=a[i].getValues();if(!b){return;}for(var j=0;j<b.length;j++){if(m[b[j][this.constants.TYPE_KEY]]!="Edm.DateTime"){return;}}v.setVizProperties({categoryAxis:{title:{visible:false}}});return;}}};sap.ovp.cards.charts.VizAnnotationManager.checkExists=function(t,a,b,m,l,c){var s=sap.ovp.cards.charts.VizAnnotationManager;m=typeof m==="undefined"?false:m;var r=false;var d;if(!t&&m){jQuery.sap.log.error(l+s.errorMessages.CARD_ERROR+b+s.errorMessages.IS_MANDATORY);return r;}if(!t){jQuery.sap.log.warning(l+s.errorMessagesCARD_WARNING+b+s.errorMessages.IS_MISSING);r=true;return r;}d=a[t];if(!d||typeof d!=="object"){var e=m?jQuery.sap.log.error:jQuery.sap.log.warning;e(l+s.errorMessages.CARD_ERROR+"in "+b+". ("+t+" "+s.errorMessages.NOT_WELL_FORMED);return r;}if(c&&c=="sap.ovp.cards.charts.analytical.analyticalChart"&&b=="Chart Annotation"&&(!d.ChartType||!d.ChartType.EnumMember)){jQuery.sap.log.error(l+s.errorMessages.CARD_ERROR+s.errorMessages.MISSING_CHARTTYPE+s.errorMessages.CHART_ANNO);return r;}r=true;return r;};sap.ovp.cards.charts.VizAnnotationManager.validateCardConfiguration=function(c){var s=sap.ovp.cards.charts.VizAnnotationManager;var r=false;if(!c){return r;}var a;var b;var d;var p;var i;var P;var e;var l="";var C;var v=c.getView();if(v){l="["+v.getId()+"] ";}if(!(C=c.getCardPropertiesModel())){jQuery.sap.log.error(l+s.errorMessages.CARD_ERROR+"in "+s.errorMessages.CARD_CONFIG+s.errorMessages.NO_CARD_MODEL);return r;}e=C.getProperty("/entityType");if(!e||jQuery.isEmptyObject(e)){jQuery.sap.log.error(l+s.errorMessages.CARD_ERROR+"in "+s.errorMessages.CARD_ANNO);return r;}a=C.getProperty("/selectionAnnotationPath");b=C.getProperty("/chartAnnotationPath");p=C.getProperty("/presentationAnnotationPath");i=C.getProperty("/identificationAnnotationPath");P=C.getProperty("/dataPointAnnotationPath");d=C.getProperty("/contentFragment");r=this.checkExists(a,e,"Selection Variant",false,l);r=this.checkExists(b,e,"Chart Annotation",true,l,d)&&r;r=this.checkExists(p,e,"Presentation Variant",false,l)&&r;r=this.checkExists(i,e,"Identification Annotation",true,l)&&r;r=this.checkExists(P,e,"Data Point",false,l)&&r;return r;};sap.ovp.cards.charts.VizAnnotationManager.checkNoData=function(e,c,v){};sap.ovp.cards.charts.VizAnnotationManager.getConfig=function(c){var s=sap.ovp.cards.charts.VizAnnotationManager;var r={};var a,b,d,f,g=null;var C=!!c;if(!jQuery.sap.getObject("sap.ovp.cards.charts.config")){d=jQuery.sap.getModulePath("sap.ovp.cards.charts");sap.ovp.cards=sap.ovp.cards||{};sap.ovp.cards.charts=sap.ovp.cards.charts||{};try{sap.ovp.cards.charts.config=jQuery.sap.loadResource({url:d+"/config.json",dataType:"json",async:false});}catch(e){jQuery.sap.log.error(s.errorMessages.CONFIG_LOAD_ERROR+e);}sap.ovp.cards.charts.config=sap.ovp.cards.charts.config||{};}g=sap.ovp.cards.charts.config;if(!C){return g;}if(!c.EnumMember||!(a=c.EnumMember.split("/"))||a.length<2){jQuery.sap.log.error(s.errorMessages.CARD_ERROR+s.errorMessages.INVALID_CHARTTYPE+s.errorMessages.ANNO_REF);return r;}b=a[1];if(!g[b]){jQuery.sap.log.error(s.errorMessages.INVALID_CONFIG+b+" "+s.errorMessages.CONFIG_JSON);return r;}if((f=g[b].reference)&&g[f]){var v=jQuery.extend(true,{},g[f]);g[b]=v;}r=g[b];return r;};sap.ovp.cards.charts.VizAnnotationManager.hasTimeSemantics=function(d,c,a,e){var r=false;var m;var b;var f;var g;var s;if(!c.time||jQuery.isEmptyObject(c.time)){return r;}if(!d){return r;}if(d.length!=1){return r;}if(!d[0].Dimension||!(b=d[0].Dimension.PropertyPath)){return r;}m=this.getMetadata(a,e);if(m&&m[b]){f=m[b][this.constants.TYPE_KEY];g=m[b][this.constants.DISPLAY_FORMAT_KEY];s=m[b][this.constants.SEMANTICS_KEY];}if(f&&g&&f.lastIndexOf("Edm.Date",0)===0&&g.toLowerCase()=="date"){r=true;}if(f=="Edm.String"&&s&&s.lastIndexOf("year",0)===0){r=true;}return r;};sap.ovp.cards.charts.VizAnnotationManager.getChartType=function(c,C,d){var r="";var s=sap.ovp.cards.charts.VizAnnotationManager;var a=s.getConfig(C);var b,e;if(!a){return r;}r=a.default.type;b=c.getSetting("dataModel");e=c.getSetting('ovpCardProperties').getProperty("/entitySet");if(s.hasTimeSemantics(d,a,b,e)){r=a.time.type;}return r;};sap.ovp.cards.charts.VizAnnotationManager.getChartType.requiresIContext=true;sap.ovp.cards.charts.VizAnnotationManager.checkRolesForProperty=function(q,c,t){var s=sap.ovp.cards.charts.VizAnnotationManager;if(!q.length){return;}var a=t=="dimension"?"Dimension":"Measure";var b=[];jQuery.each(q,function(i,v){if(!v||!v[a]||!v[a].PropertyPath){jQuery.sap.log.error(s.errorMessages.INVALID_CHART_ANNO);return false;}b.push(v[a].PropertyPath);});var d=jQuery.map(c.feeds,function(f){if(f.type==t){if(f.role){return f.role.split("|");}return[];}});d=jQuery.grep(d,function(r,i){return jQuery.inArray(r,d)==i;}).join(", ");jQuery.sap.log.error(s.errorMessages.CARD_ERROR+s.errorMessages.INVALID_REDUNDANT+t+"(s) "+b.join(", ")+". "+s.errorMessages.ALLOWED_ROLES+c.type+s.errorMessages.CHART_IS+d);};sap.ovp.cards.charts.VizAnnotationManager.formThePathForCriticalityStateCalculation=function(c,d){function g(V,D){if(V&&V.Boolean){if(V.Boolean.toLowerCase()==="true"){return true;}else if(V.Boolean.toLowerCase()==="false"){return false;}}return D;}function a(V){var v;if(V){if(V.String){v=Number(V.String);}else if(V.Int){v=Number(V.Int);}else if(V.Decimal){v=Number(V.Decimal);}else if(V.Double){v=Number(V.Double);}else if(V.Single){v=Number(V.Single);}}return v;}function b(V){var v;if(V){if(V.String){v=V.String;}else if(V.Boolean){v=g(V);}else{v=a(V);}}return v;}function e(I){if(I){if(I.Path){return"{path:'"+I.Path+"'}";}else{return b(I);}}else{return"";}}var v=c[c.measureNames];var i=d.CriticalityCalculation.ImprovementDirection.EnumMember;var f=e(d.CriticalityCalculation.DeviationRangeLowValue);var h=e(d.CriticalityCalculation.DeviationRangeHighValue);var t=e(d.CriticalityCalculation.ToleranceRangeLowValue);var j=e(d.CriticalityCalculation.ToleranceRangeHighValue);return sap.ovp.cards.AnnotationHelper._calculateCriticalityState(v,i,f,h,t,j,sap.ovp.cards.AnnotationHelper.criticalityConstants.StateValues);};sap.ovp.cards.charts.VizAnnotationManager.mapMeasures=function(c,m,M){var a,d;jQuery.each(m,function(i,v){if(v["sap:label"]==c.measureNames){a=v.name;return false;}});jQuery.each(M,function(i,v){if(v.Measure.PropertyPath==a){if(!v.DataPoint||!v.DataPoint.AnnotationPath){return false;}d=v.DataPoint.AnnotationPath;return false;}});return d;};sap.ovp.cards.charts.VizAnnotationManager.checkFlag=function(m,e){function a(S,c){return S&&S.indexOf(c,S.length-c.length)!==-1;}var b=false;var s=sap.ovp.cards.charts.VizAnnotationManager;jQuery.each(m,function(i,v){if(v.DataPoint&&v.DataPoint.AnnotationPath){var d=e[v.DataPoint.AnnotationPath.substring(1)];if(d&&d.CriticalityCalculation&&d.CriticalityCalculation.ImprovementDirection&&d.CriticalityCalculation.ImprovementDirection.EnumMember){var I=d.CriticalityCalculation.ImprovementDirection.EnumMember;var c=d.CriticalityCalculation.DeviationRangeLowValue&&d.CriticalityCalculation.DeviationRangeLowValue.String||"";var f=d.CriticalityCalculation.DeviationRangeHighValue&&d.CriticalityCalculation.DeviationRangeHighValue.String||"";var t=d.CriticalityCalculation.ToleranceRangeLowValue&&d.CriticalityCalculation.ToleranceRangeLowValue.String||"";var g=d.CriticalityCalculation.ToleranceRangeHighValue&&d.CriticalityCalculation.ToleranceRangeHighValue.String||"";if(a(I,"Minimize")||a(I,"Minimizing")){if(g&&f){b=true;return false;}else{jQuery.sap.log.warning(s.errorMessages.CARD_WARNING+s.errorMessages.INVALID_CRITICALITY);}}else if(a(I,"Maximize")||a(I,"Maximizing")){if(t&&c){b=true;return false;}else{jQuery.sap.log.warning(s.errorMessages.CARD_WARNING+s.errorMessages.INVALID_CRITICALITY);}}else if(a(I,"Target")){if(t&&c&&g&&f){b=true;return false;}else{jQuery.sap.log.warning(s.errorMessages.CARD_WARNING+s.errorMessages.INVALID_CRITICALITY);}}}else{jQuery.sap.log.warning(s.errorMessages.CARD_WARNING+s.errorMessages.INVALID_IMPROVEMENT_DIR);}}});if(b==true&&m.length>1){jQuery.sap.log.warning(s.errorMessages.CARD_WARNING+s.errorMessages.INVALID_SEMANTIC_MEASURES);}return b;};sap.ovp.cards.charts.VizAnnotationManager.buildSemanticLegends=function(m,e,M){function a(s,S){return s&&s.indexOf(S,s.length-S.length)!==-1;}var r=[null,null];var b=m.Measure.PropertyPath;if(M[b]){b=M[b][this.constants.LABEL_KEY]||b;}var d=m.DataPoint.AnnotationPath;var D=e[d.substring(1)];if(!D.CriticalityCalculation||!D.CriticalityCalculation.ImprovementDirection||!D.CriticalityCalculation.ImprovementDirection.EnumMember){return r;}var i=D.CriticalityCalculation.ImprovementDirection.EnumMember;var c=D.CriticalityCalculation.DeviationRangeLowValue&&D.CriticalityCalculation.DeviationRangeLowValue.String||"";var f=D.CriticalityCalculation.DeviationRangeHighValue&&D.CriticalityCalculation.DeviationRangeHighValue.String||"";var t=D.CriticalityCalculation.ToleranceRangeLowValue&&D.CriticalityCalculation.ToleranceRangeLowValue.String||"";var g=D.CriticalityCalculation.ToleranceRangeHighValue&&D.CriticalityCalculation.ToleranceRangeHighValue.String||"";jQuery.sap.require("sap.ui.core.format.NumberFormat");var n=sap.ui.core.format.NumberFormat.getFloatInstance({style:'short',minFractionDigits:2,maxFractionDigits:2});if(c){c=n.format(Number(c));}if(f){f=n.format(Number(f));}if(t){t=n.format(Number(t));}if(g){g=n.format(Number(g));}if(a(i,"Minimize")||a(i,"Minimizing")){if(g&&f){r[0]=b+" <= "+g;r[1]=b+" > "+f;}}else if(a(i,"Maximize")||a(i,"Maximizing")){if(t&&c){r[0]=b+" >= "+t;r[1]=b+" < "+c;}}else if(a(i,"Target")){if(t&&c&&g&&f){r[0]=t+" <= "+b+" <= "+g;r[1]=b+" < "+c+" "+sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("OR")+" "+b+" > "+f;}}return r;};sap.ovp.cards.charts.VizAnnotationManager.buildVizAttributes=function(v){var c,e,a,b;var d,f,g,D,m;var V;var q,Q,h;var p,l=[],M=[];var s;var r;var n=sap.ovp.cards.charts.VizAnnotationManager;d=v.getVizType();f=this.getConfig();for(var o in f){if((r=f[o].reference)&&f[r]){var t=jQuery.extend(true,{},f[r]);f[o]=t;}if(f[o].default.type==d||(f[o].time&&f[o].time.type==d)){g=f[o];break;}}if(!g){jQuery.sap.log.error(n.errorMessages.CARD_ERROR+"in "+n.errorMessages.CARD_CONFIG+n.errorMessages.CARD_CONFIG_ERROR+d+" "+n.errorMessages.CARD_CONFIG_JSON);return;}if(!(c=v.getModel('ovpCardProperties'))){jQuery.sap.log.error(n.errorMessages.CARD_ERROR+"in "+n.errorMessages.CARD_CONFIG+n.errorMessages.NO_CARD_MODEL);return;}var u=v.getModel();var w=c.getProperty("/entitySet");if(!u||!w){return;}e=c.getProperty("/entityType");if(!e){jQuery.sap.log.error(n.errorMessages.CARD_ANNO_ERROR+"in "+n.errorMessages.CARD_ANNO);return;}var x=n.getMetadata(u,w);a=c.getProperty("/chartAnnotationPath");if(!a||!(b=e[a])){jQuery.sap.log.error(n.errorMessages.CARD_ANNO_ERROR+"in "+n.errorMessages.CARD_ANNO);return;}if(!(D=b.DimensionAttributes)||!D.length){jQuery.sap.log.error(n.errorMessages.CHART_ANNO_ERROR+"in "+n.errorMessages.CHART_ANNO+" "+n.errorMessages.DIMENSIONS_MANDATORY);return;}if(!(m=b.MeasureAttributes)||!m.length){jQuery.sap.log.error(n.errorMessages.CHART_ANNO_ERROR+"in "+n.errorMessages.CHART_ANNO+" "+n.errorMessages.MEASURES_MANDATORY);return;}s=n.hasTimeSemantics(D,g,u,w);if(s){g=g.time;}else{g=g.default;}var E=false;[g.dimensions,g.measures].forEach(function(j,i){var P=i?m:D;var k=i?"measure(s)":"dimension(s)";if(j.min&&P.length<j.min){jQuery.sap.log.error(n.errorMessages.CARD_ERROR+"in "+d+" "+n.errorMessages.CARD_LEAST+j.min+" "+k);E=true;}if(j.max&&P.length>j.max){jQuery.sap.log.error(n.errorMessages.CARD_ERROR+"in "+d+n.errorMessages.CARD_MOST+j.max+" "+k);E=true;}});if(E){return;}var H=true;if(g.properties&&g.properties.hasOwnProperty("hideLabel")&&!g.properties["hideLabel"]){H=false;}var y=true;var N=c.getProperty("/navigation");if(N=="chartNav"){y=false;}v.removeAllAggregation();V={legend:{isScrollable:false},title:{visible:false},interaction:{noninteractiveMode:y?false:true,selectability:{legendSelection:false,axisLabelSelection:false,mode:'EXCLUSIVE',plotLassoSelection:false,plotStdSelection:true},zoom:{enablement:'disabled'}},plotArea:{window:{start:'firstDataPoint',end:'lastDataPoint'}},general:{groupData:false}};if(g.properties&&g.properties.semanticColor==true&&sap.ovp.cards.charts.VizAnnotationManager.checkFlag(m,e)){var z=sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("GOOD");var A=sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("BAD");var B=sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("OTHERS");if(m.length==1){var C=n.buildSemanticLegends(m[0],e,x);var z=C[0]||z,A=C[1]||A,B=sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("OTHERS");}V.plotArea={dataPointStyle:{rules:[{callback:function(i){var j=sap.ovp.cards.charts.VizAnnotationManager.mapMeasures(i,x,m);if(!j){return false;}var k=e[j.substring(1)];var S=sap.ovp.cards.charts.VizAnnotationManager.formThePathForCriticalityStateCalculation(i,k);if(S==sap.ovp.cards.AnnotationHelper.criticalityConstants.StateValues.Positive){return true;}},properties:{color:"sapUiChartPaletteSemanticGoodLight1"},"displayName":z},{callback:function(i){var j=sap.ovp.cards.charts.VizAnnotationManager.mapMeasures(i,x,m);if(!j){return false;}var k=e[j.substring(1)];var S=sap.ovp.cards.charts.VizAnnotationManager.formThePathForCriticalityStateCalculation(i,k);if(S==sap.ovp.cards.AnnotationHelper.criticalityConstants.StateValues.Negative){return true;}},properties:{color:"sapUiChartPaletteSemanticBadLight1"},"displayName":A},{callback:function(i){var j=sap.ovp.cards.charts.VizAnnotationManager.mapMeasures(i,x,m);if(!j){return false;}var k=e[j.substring(1)];var S=sap.ovp.cards.charts.VizAnnotationManager.formThePathForCriticalityStateCalculation(i,k);if(S==sap.ovp.cards.AnnotationHelper.criticalityConstants.StateValues.Critical){return true;}},properties:{color:"sapUiChartPaletteSemanticNeutralLight1"},"displayName":B}]}};}Q=D.slice();h=m.slice();jQuery.each(g.feeds,function(i,F){var G=F.uid;var I=[];if(F.type){var P,J,K;if(F.type==="dimension"){P=D.length;J="Dimension";K="dimensions";q=Q;p=l;}else{P=m.length;J="Measure";K="measures";q=h;p=M;}var L=0,O=P;if(F.min){L=L>F.min?L:F.min;}if(F.max){O=O<F.max?O:F.max;}if(!F.role){var R=q.length;for(var j=0;j<R&&I.length<O;++j){var S=q[j];q.splice(j,1);--R;--j;I.push(S);}}else{var T=F.role.split("|");jQuery.each(T,function(j,k1){if(I.length==O){return false;}var R=q.length;for(var k=0;k<R&&I.length<O;++k){var S=q[k];if(S&&S.Role&&S.Role.EnumMember&&S.Role.EnumMember.split("/")&&S.Role.EnumMember.split("/")[1]){var l1=S.Role.EnumMember.split("/")[1];if(l1==k1){q.splice(k,1);--R;--k;I.push(S);}}else if(jQuery.inArray(S,p)==-1){p.push(S);}}});if(I.length<O){jQuery.each(p,function(k,S){var k1;var l1;if((k1=g[K].defaultRole)&&(jQuery.inArray(k1,T)!==-1)&&(l1=jQuery.inArray(S,q))!==-1){q.splice(l1,1);I.push(S);if(I.length==O){return false;}}});}if(I.length<L){jQuery.sap.log.error(n.errorMessages.CARD_ERROR+n.errorMessages.MIN_FEEDS+d+" "+n.errorMessages.FEEDS_OBTAINED+I.length+" "+n.errorMessages.FEEDS_REQUIRED+L+" "+n.errorMessages.FEEDS);return false;}}if(I.length){var U=[];var W;if(!(W=v.getDataset())){jQuery.sap.log.error(n.errorMessages.NO_DATASET);return false;}jQuery.each(I,function(i,S){if(!S||!S[J]||!S[J].PropertyPath){jQuery.sap.log.error(n.errorMessages.INVALID_CHART_ANNO);return false;}var k=S[J].PropertyPath;var k1=k;var l1=k;var m1=null;if(x&&x[k]){k1=x[k][n.constants.LABEL_KEY]||k;l1=x[k][n.constants.TEXT_KEY]||k;m1=x[k][n.constants.TYPE_KEY]||null;}var n1;if(m1=="Edm.DateTime"&&l1==k){n1="{path:'"+k+"', formatter: 'sap.ovp.cards.charts.VizAnnotationManager.returnDateFormat'}";}else{n1="{"+l1+"}";}U.push(k1);if(J=="Dimension"){var o1=new sap.viz.ui5.data.DimensionDefinition({name:k1,value:"{"+k+"}",displayValue:n1});if(s){o1.setDataType("date");}W.addDimension(o1);}else{W.addMeasure(new sap.viz.ui5.data.MeasureDefinition({name:k1,value:"{"+k+"}"}));}});v.addFeed(new sap.viz.ui5.controls.common.feeds.FeedItem({'uid':G,'type':J,'values':U}));V[G]={title:{visible:H?false:true,text:U.join(", ")},label:{formatString:'axisFormatter'}};if(g.hasOwnProperty("vizProperties")){var X=0;var Y=g.vizProperties.length;var Z;var $;for(;X<Y;X++){if(g.vizProperties[X].hasOwnProperty("value")){$=g.vizProperties[X].value;}if(g.vizProperties[X].hasOwnProperty("path")){Z=(g.vizProperties[X].path).split(".");var _=Z.length;var a1;var b1;for(var c1=0,b1=Z[0],a1=V;c1<_;++c1){if(c1==_-1){a1[b1]=$;break;}a1[b1]=a1[b1]||{};a1=a1[b1];b1=Z[c1+1];}}}}if(F.hasOwnProperty("vizProperties")){var i=0;var d1=F.vizProperties.length;var e1;var f1;var g1;for(;i<d1;i++){if(F.vizProperties[i].hasOwnProperty("method")){f1=F.vizProperties[i].method;switch(f1){case'count':e1=U.length;if(F.vizProperties[i].hasOwnProperty("min")&&e1<=F.vizProperties[i].min){e1=F.vizProperties[i].min;}else if(F.vizProperties[i].hasOwnProperty("max")&&e1>=F.vizProperties[i].max){e1=F.vizProperties[i].max;}break;}}else if(F.vizProperties[i].hasOwnProperty("value")){e1=F.vizProperties[i].value;}if(F.vizProperties[i].hasOwnProperty("path")){g1=(F.vizProperties[i].path).split(".");var h1=g1.length;var i1;var j1;for(var j=0,j1=g1[0],i1=V;j<h1;++j){if(j==h1-1){i1[j1]=e1;break;}i1[j1]=i1[j1]||{};i1=i1[j1];j1=g1[j+1];}}}}}}});this.checkRolesForProperty(Q,g,"dimension");this.checkRolesForProperty(h,g,"measure");v.setVizProperties(V);};sap.ovp.cards.charts.VizAnnotationManager.getMetadata=function(m,e){var a=this.cacheODataMetadata(m);if(!a){return undefined;}return a[e];};sap.ovp.cards.charts.VizAnnotationManager.cacheODataMetadata=function(m){var s=sap.ovp.cards.charts.VizAnnotationManager;if(m){if(!jQuery.sap.getObject("sap.ovp.cards.charts.cachedMetaModel")){sap.ovp.cards.charts.cachedMetaModel={};}var a=sap.ovp.cards.charts.cachedMetaModel[m.getId()];if(!a){var b=m.getMetaModel();a={};var c=b.getODataEntityContainer();jQuery.each(c.entitySet,function(d,e){var f=b.getODataEntityType(e.entityType);var g={};jQuery.each(f.property,function(p,h){g[h.name]=h;});a[e.name]=g;});sap.ovp.cards.charts.cachedMetaModel[m.getId()]=a;}return a;}else{jQuery.sap.log.error(s.errorMessages.CARD_ERROR+s.errorMessages.CACHING_ERROR);}};sap.ovp.cards.charts.VizAnnotationManager.getSelectedDataPoint=function(v,c){v.attachSelectData(function(e){var s=sap.ovp.cards.charts.VizAnnotationManager;var C=v.getModel('ovpCardProperties');var d=v.getModel();var a=C.getProperty("/entitySet");var m=s.getMetadata(d,a);var b=[],f=[];var g={};var h=v.getDataset().getDimensions();var l;for(var i=0;i<h.length;i++){b.push(h[i].getName());}var n=jQuery.map(v.getDataset().getBinding("data").getCurrentContexts(),function(x){return x.getObject();});if(e.getParameter("data")&&e.getParameter("data")[0]&&e.getParameter("data")[0].data){l=e.getParameter("data")[0].data._context_row_number;f=Object.keys(e.getParameter("data")[0].data);for(var j=0;j<b.length;j++){for(var k=0;k<f.length;k++){if(b[j]==f[k]){for(var o in m){if(m.hasOwnProperty(o)&&m[o][s.constants.LABEL_KEY]==f[k]){g[o]=n[l][o];}}}}}var p={getObject:function(){return g;}};c.doNavigation(p);}});};sap.ovp.cards.charts.VizAnnotationManager.checkBubbleChart=function(c){if(c.EnumMember.endsWith("Bubble")){return true;}else{return false;}};sap.ovp.cards.charts.VizAnnotationManager.dimensionAttrCheck=function(d){var r=false;var s=sap.ovp.cards.charts.VizAnnotationManager;if(!d||d.constructor!=Array||d.length<1||d[0].constructor!=Object||!d[0].Dimension||!d[0].Dimension.PropertyPath){jQuery.sap.log.error(s.errorMessages.CHART_ANNO_ERROR+"in "+s.errorMessages.CHART_ANNO+" "+s.errorMessages.DIMENSIONS_MANDATORY);return r;}r=true;return r;};sap.ovp.cards.charts.VizAnnotationManager.measureAttrCheck=function(m){var r=false;var s=sap.ovp.cards.charts.VizAnnotationManager;if(!m||m.constructor!=Array||m.length<1||m[0].constructor!=Object||!m[0].Measure||!m[0].Measure.PropertyPath){jQuery.sap.log.error(s.errorMessages.CHART_ANNO_ERROR+"in "+s.errorMessages.CHART_ANNO+" "+s.errorMessages.MEASURES_MANDATORY);return r;}r=true;return r;};}());