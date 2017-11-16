jQuery.sap.declare("sap.rules.ui.parser.resources.vocabulary.lib.vocaObjects");jQuery.sap.require("sap.rules.ui.parser.resources.vocabulary.lib.runtimeServicesUtils");sap.rules.ui.parser.resources.vocabulary.lib.vocaObjects=sap.rules.ui.parser.resources.vocabulary.lib.vocaObjects||{};sap.rules.ui.parser.resources.vocabulary.lib.vocaObjects.lib=(function(){var u=sap.rules.ui.parser.resources.vocabulary.lib.runtimeServicesUtils.lib;u=new u.runtimeServicesUtilsLib();function V(m,n,s,o,p,q,r,v,t,w){this.id=m;this.name=n;this.suffix=s;this.isWritable=u.getIsWritable(p);this.objects=null;this.actions=null;this.outputs=null;this.aliases=null;this.valueLists=null;this.terms=null;this.advancedFunctions=null;this.scope=u.getScope(o,q,n);this.isPrivate=u.getIsPrivate(o,q);this.isValueListConverted=u.getIsValueListConverted(r);this.vocaPackage=v;this.vocaShortName=t;this.versionId=w;}function O(v,m,s,n,o,r,p,q,t,w,x){this.vocaId=v;this.vocaName=m;this.source=s;this.id=n;this.name=o;this.runtimeName=r;this.schema=p;this.associations=null;this.attributes=null;this.origSource=r;this.description=w;this.runtimeType=x;this.scope=u.getScope(q,t,m);this.isPrivate=u.getIsPrivate(q,t);}function A(v,m,n,o,p,q,s,r,t,w){this.vocaId=v;this.vocaName=m;this.id=n;this.name=o;this.libPath=p;this.libName=q;this.staticParams=null;this.requiredParams=null;this.description=w;this.scope=u.getScope(s,r,m);this.isPrivate=u.getIsPrivate(s,r);this.isValueListConverted=u.getIsValueListConverted(t);}function a(v,m,n,o,s,p,q,r){this.vocaId=v;this.vocaName=m;this.id=n;this.name=o;this.staticParams=null;this.requiredParams=null;this.description=r;this.scope=u.getScope(s,p,m);this.isPrivate=u.getIsPrivate(s,p);this.isValueListConverted=u.getIsValueListConverted(q);}function b(v,m,n,o,p,q,r,s,t,w,x,y,z,B){this.vocaId=v;this.vocaName=m;this.id=n;this.name=o;this.businessDT=q;this.isCollection=u.getFromDigitToBoolean(r);this.content=u.getContent(p,w);this.scope=u.getScope(s,t,m);this.isPrivate=u.getIsPrivate(s,t);this.type=u.getAliasType(w);this.description=x;this.externalMetadata=JSON.parse(y);this.renderingData=JSON.parse(z);this.isValueListConverted=u.getIsValueListConverted(B);}function c(v,m,n,o,s,r,p,q,t,w,x,y,z,B){this.vocaId=v;this.vocaName=m;this.id=n;this.name=o;this.schema=s;this.runtimeName=r;this.dataType=p;this.businessDataType=q;this.size=t;this.valueColumn=w;this.descriptionColumn=x;this.runtimeType=B;this.scope=u.getScope(y,z,m);this.isPrivate=u.getIsPrivate(y,z);}function T(v,m,t,n,o,p,q,r,s,w,x,y){this.vocaName=m;this.vocaId=v;this.termId=t;this.description=n;this.expression=o;this.businessDataType=p;this.context=s;this.scope=u.getScope(w,x,m);this.isCollection=u.getFromDigitToBoolean(q);this.isConditionalContext=u.getFromDigitToBoolean(r);this.isPrivate=u.getIsPrivate(w,x);this.isDeprecated=u.getIsDeprecatedFromDigit(y);}function d(t,m,n){this.termId=t;this.modifier=m;this.id=n;}function e(o,n,m,r,p,q,s,t,v,w,x,y,z,B,C){this.objId=o;this.name=n;this.objectName=m;this.runtimeName=r;this.description=p;this.dataType=q;this.businessDataType=s;this.size=t;this.sourceType=v;this.objectRuntimeName=w;this.origSource=r;this.vocaName=x;this.scope=u.getScope(y,z,n);this.isPrivate=u.getIsPrivate(y,z);this.valueListName=B;this.id=C;}function f(o,m,n,t,p,v){this.objId=o;this.id=m;this.name=n;this.target=t;this.cardinality=p;this.vocaName=v;this.attrs=null;}function g(m,s,t,o,n){this.assocId=m;this.source=s;this.target=t;this.objId=o;this.id=n;}function h(m,n,v,o,s,p){this.id=m;this.name=n;this.vocaId=v;this.vocaName=o;this.scope=u.getScope(s,p,o);this.isPrivate=u.getIsPrivate(s,p);}function i(m,n,o,p){this.id=p;this.actionId=m;this.name=n;this.mapping=o;}function j(m,n,o,s,p,q){this.id=q;this.actionId=m;this.name=n;this.dataType=o;this.size=s;this.businessDataType=p;}function k(o,n,m,p){this.id=p;this.outputId=o;this.name=n;this.mapping=m;}function l(o,n,m,s,p,q,r){this.id=r;this.outputId=o;this.name=n;this.dataType=m;this.size=s;this.businessDataType=p;this.isCollection=u.getFromNullOrDigitToBoolean(q);}return{VocaInfo:V,ObjectInfo:O,ActionInfo:A,OutputInfo:a,AliasInfo:b,ValueListInfo:c,TermInfo:T,TermModifierInfo:d,AttrInfo:e,AssocInfo:f,AssocAttrInfo:g,AdvancedFunctionInfo:h,ActionStaticParams:i,ActionRequiredParams:j,OutputStaticParams:k,OutputRequiredParams:l};}());