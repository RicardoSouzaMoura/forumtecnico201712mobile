jQuery.sap.declare("sap.rules.ui.parser.ruleBody.lib.ruleBodyValidator");jQuery.sap.require("sap.rules.ui.parser.ruleBody.lib.ruleBody");jQuery.sap.require("sap.rules.ui.parser.ruleBody.lib.constants");jQuery.sap.require("sap.rules.ui.parser.businessLanguage.lib.constants");jQuery.sap.require("sap.rules.ui.parser.resources.dependencies.lib.objects");jQuery.sap.require("sap.rules.ui.parser.ruleBody.lib.dependenciesHandler");jQuery.sap.require("sap.rules.ui.parser.resources.vocabulary.lib.constants");jQuery.sap.require("sap.rules.ui.parser.infrastructure.messageHandling.lib.responseCollector");jQuery.sap.require("sap.rules.ui.parser.infrastructure.util.utilsBase");jQuery.sap.require("sap.rules.ui.parser.infrastructure.util.constants");sap.rules.ui.parser.ruleBody.lib.ruleBodyValidator=sap.rules.ui.parser.ruleBody.lib.ruleBodyValidator||{};sap.rules.ui.parser.ruleBody.lib.ruleBodyValidator.lib=(function(){var r=sap.rules.ui.parser.ruleBody.lib.ruleBody.lib;var a=sap.rules.ui.parser.ruleBody.lib.constants.lib;var R=sap.rules.ui.parser.businessLanguage.lib.constants.lib;var d=sap.rules.ui.parser.resources.dependencies.lib.objects.lib;var b=sap.rules.ui.parser.ruleBody.lib.dependenciesHandler;var v=sap.rules.ui.parser.resources.vocabulary.lib.constants.lib;var c=sap.rules.ui.parser.infrastructure.messageHandling.lib.responseCollector.lib.ResponseCollector;var u=sap.rules.ui.parser.infrastructure.util.utilsBase.lib;var e=new u.utilsBaseLib();var f=sap.rules.ui.parser.infrastructure.util.constants.lib;function g(){jQuery.sap.log.debug("CTOR - Rule Validator");r.RuleBody.call(this);this.initValidation();this.invalidRuleBody=null;this.mode=a.RULE_MODE_VALIDATION;this.aliasOutputBusinessDataType=null;this.rootObjectContext={};this.rootObjectContext.name=null;this.rootObjectContext.keysMap={};this.haveSameRootObject=true;}g.prototype=Object.create(r.RuleBody.prototype);g.prototype.constructor=g;g.prototype.initValidation=function initValidation(){this.invalidHeaders=[];this.headersOfInvalidCells={};this.actionMap={};this.status=a.RULE_SUCCESS;this.ruleBody={};this.ruleBody.type="";this.ruleBody.content={};this.flags={};this.flags[a.outputFlagsEnum.dependenciesOutput]=false;this.flags[a.outputFlagsEnum.validationOutput]=true;this.flags[a.outputFlagsEnum.unknownTokensOutput]=false;this.flags[a.outputFlagsEnum.isAlias]=false;this.depHandler=null;this.unknownTokens={};this.rowOutputParamsCnt=0;this.conditionColumnsCnt=0;this.currentParserResult=null;};g.prototype.isParserReturnedErrorMessage=function isParserReturnedErrorMessage(){if(this.currentParserResult.hasOwnProperty('status')&&this.currentParserResult.status===a.RULE_ERROR){return true;}return false;};g.prototype.updateValidateResult=function updateValidateResult(o){if(this.currentParserResult.hasOwnProperty('status')&&this.currentParserResult.status===a.RULE_ERROR){o.errorDetails=this.currentParserResult.errorDetails;o.status=this.currentParserResult.status;o.cursorPosition=this.currentParserResult.cursorPosition;return o;}return null;};g.prototype.handleMessages=function handleMessages(p,h,i,j,k){if(p!==null&&p!==undefined){var l=k||{'cursorPosition':p.cursorPosition};c.getInstance().addMessage(p.errorID,undefined,h,l,p.errorDetails);}else{if(k){h=null;}c.getInstance().addMessage(i,j,h,k);}};g.prototype.handleMessages4OdataFormatOutput=function handleMessages4OdataFormatOutput(p,t,h,i,j,k,l){var m=null;if(p){if(this.flags[a.ODATA_FORMAT_PAYLOAD]){m={};m.type=t;m.ruleId=this.flags[a.ODATA_FORMAT_PAYLOAD][a.RULE_ID];m.colId=h;m.cursorPosition=p.cursorPosition;if(i){m.rowId=i;}this.handleMessages(p,l,p.errorID,null,m);}}else{if(this.flags[a.ODATA_FORMAT_PAYLOAD]){m={};m.type=t;m.ruleId=this.flags[a.ODATA_FORMAT_PAYLOAD][a.RULE_ID];if(h){m.colId=h;}if(i){m.rowId=i;}}this.handleMessages(null,l,j,k,m);}};g.prototype.updateRootObjectContextFromParser=function updateRootObjectContextFromParser(){var h,j,k=null;var i,p=[];if(this.currentParserResult.hasOwnProperty(R.propertiesEnum.rootObjectContext)&&this.currentParserResult.status===R.statusEnum.SUCCESS&&this.haveSameRootObject){h=this.currentParserResult[R.propertiesEnum.rootObjectContext];if(this.rootObjectContext.name&&h.name&&this.rootObjectContext.name!==h.name){this.haveSameRootObject=false;this.status=a.RULE_ERROR;p=[this.rootObjectContext.name];j="rule_body_validator_expressions_need_to_have_same_root_object";k=c.getInstance().getMessage(j,p);this.handleMessages4OdataFormatOutput(null,a.additionalInfoTypeEnum.ruleResult,null,null,j,p,null);}else{if(h.associations){for(i=0;i<h.associations.length;i++){this.rootObjectContext.keysMap[h.associations[i]]=true;}}if(!this.rootObjectContext.name&&h.name){this.rootObjectContext.name=h.name;}}}return k;};g.prototype.updateDependnciesFromParser=function updateDependnciesFromParser(){if(this.currentParserResult.hasOwnProperty(a.outputFlagsEnum.dependenciesOutput)&&this.status===a.RULE_SUCCESS){this.depHandler.addDependencies(this.currentParserResult[a.outputFlagsEnum.dependenciesOutput]);}};g.prototype.updateUnknownTokensFromParser=function updateUnknownTokensFromParser(){var k="";if(this.currentParserResult.hasOwnProperty('unknownTokens')){for(k in this.currentParserResult.unknownTokens){if(this.currentParserResult.unknownTokens.hasOwnProperty(k)){if(this.unknownTokens.hasOwnProperty(k)===false){this.unknownTokens[k]=1;}else{this.unknownTokens[k]++;}}}}};g.prototype.valiadteCollectionInfoOnOutputParameter=function valiadteCollectionInfoOnOutputParameter(p,h,i){var j=[];var k=null;var l=null;if(p!==null){if(!this.outputInfo&&this.flags[a.outputFlagsEnum.isAlias]){if(this.isOutputParameterCollection(p)){this.status=a.RULE_ERROR;j=[h];l="rule_body_validator_alias_output_parameter_cannot_be_collection";k=c.getInstance().getMessage(l,j);this.handleMessages(null,i,l,j);}}}return k;};g.prototype.handleTextCondition=function handleTextCondition(h,i,p){jQuery.sap.log.debug("Validate Condition");this.currentParserResult=this.getParserAST(h,R.VALIDATE_MODE,null,R.TYPE_BOOLEAN,this.flags);if(this.isParserReturnedErrorMessage()){this.status=a.RULE_ERROR;this.handleMessages(this.currentParserResult,p);if(this.flags[a.outputFlagsEnum.unknownTokensOutput]){this.updateUnknownTokensFromParser();}}if(this.flags[a.outputFlagsEnum.dependenciesOutput]){this.updateDependnciesFromParser();}};g.prototype.initTextOutputsResult=function initTextOutputsResult(){this.ruleBody.content.outputs=[];};g.prototype.getOutputParamBusinessDataType=function getOutputParamBusinessDataType(p,s){var h=null;if(this.outputInfo===null){if(s!==null){h=s;}else{if(this.flags[a.outputFlagsEnum.isAlias]&&this.aliasOutputBusinessDataType!==null){h=this.aliasOutputBusinessDataType;}else{h=R.TYPE_ALL;}}}else{var i;var j=this.outputInfo.requiredParams;for(i=0;i<j.length;i++){if(p===j[i].name){h=j[i].businessDataType;break;}}}return h;};g.prototype.getOutputParamFromOutputRTInfo=function getOutputParamFromOutputRTInfo(p){var i;var h;if(this.outputInfo!==null){h=this.outputInfo.requiredParams;for(i=0;i<h.length;i++){if(p===h[i].name){return h[i];}}}return null;};g.prototype.updateParserIsCollectionFlag=function updateParserIsCollectionFlag(p){var h=this.flags;var o=this.getOutputParamFromOutputRTInfo(p);if(o!==null&&o.hasOwnProperty(v.PROPERTY_NAME_IS_COLLECTION)&&o[v.PROPERTY_NAME_IS_COLLECTION]===true){h=JSON.parse(JSON.stringify(this.flags));h[a.outputPropertiesEnum.isCollection]=true;}return h;};g.prototype.isValidOutputName=function isValidOutputName(p){if(this.outputInfo===null){return true;}var i;var h=this.outputInfo.requiredParams;for(i=0;i<h.length;i++){if(p===h[i].name){return true;}}return false;};g.prototype.isOutputParameterCollection=function isOutputParameterCollection(p){if(p.hasOwnProperty(R.propertiesEnum.isCollection)&&p[R.propertiesEnum.isCollection]===true){return true;}return false;};g.prototype.handleTextOutputParameter=function handleTextOutputParameter(h,i,p){var j;var k;var l;var m;this.rowOutputParamsCnt++;j=this.isValidOutputName(h.name);if(j===false){this.status=a.RULE_ERROR;l=e.buildJsonPath(p,a.RULE_OUTPUT_PARAM_NAME);k=[h.name,this.outputInfo.name];this.handleMessages(null,l,"rule_body_validator_parameter_not_exists_in_output",k);return;}var s=null;if(h.hasOwnProperty(a.RULE_PARAM_BUSINESS_DATA_TYPE)){s=h[a.RULE_PARAM_BUSINESS_DATA_TYPE];}var n=this.getOutputParamBusinessDataType(h.name,s);if(n!==null){m=this.updateParserIsCollectionFlag(h.name);this.currentParserResult=this.getParserAST(h.content,R.VALIDATE_MODE,null,n,m);if(this.isParserReturnedErrorMessage()){this.status=a.RULE_ERROR;l=e.buildJsonPath(p,a.RULE_CONTENT);this.handleMessages(this.currentParserResult,l);if(this.flags[a.outputFlagsEnum.unknownTokensOutput]){this.updateUnknownTokensFromParser();}}else{l=e.buildJsonPath(p,a.RULE_CONTENT);this.valiadteCollectionInfoOnOutputParameter(this.currentParserResult,h.name,l);}if(this.flags[a.outputFlagsEnum.dependenciesOutput]){this.updateDependnciesFromParser();}}};g.prototype.initTextParametersResult=function initTextParametersResult(){this.ruleBody.content.parameters=[];};g.prototype.initTextActionsResult=function initTextActionsResult(){this.ruleBody.content.actions=[];};g.prototype.handleTextActionParameter=function handleTextActionParameter(h,j,k,p){var i;var l;var m;this.handleActionParameterForText(h.actionReference,h.name,k,p);var n=this.getActionParamBusinessDataArray({"colID":k});for(i=0;i<n.length;i++){l=n[i];this.currentParserResult=this.getParserAST(h.content,R.VALIDATE_MODE,null,l,this.flags);if(this.isParserReturnedErrorMessage()){this.status=a.RULE_ERROR;m=e.buildJsonPath(p,a.RULE_CONTENT);this.handleMessages(this.currentParserResult,m);if(this.flags[a.outputFlagsEnum.unknownTokensOutput]){this.updateUnknownTokensFromParser();}}if(this.flags[a.outputFlagsEnum.dependenciesOutput]){this.updateDependnciesFromParser();}}};g.prototype.isActionExists=function isActionExists(h){var i=null;if(this.actionsMap.hasOwnProperty(h)===false){i=this.vocabularyDataProvider.getAction(this.vocabulary,h,null);if(i===null){return false;}this.actionsMap[h]={"paramMap":{}};}return true;};g.prototype.handleTextAction=function handleTextAction(h,i,p){var j={};var k=h.name;var l=this.isActionExists(k);if(l===false){var m=e.buildJsonPath(p,a.RULE_ACTION_NAME);var n=[k];this.handleMessages(null,m,"rule_body_validator_action_not_exists",n);this.status=a.RULE_ERROR;}if(this.flags[a.outputFlagsEnum.dependenciesOutput]&&this.status===a.RULE_SUCCESS){if(h.hasOwnProperty(a.RULE_ACTION_NAME)){var o=this.vocabularyDataProvider.getAction(this.vocabulary,k,null);var q=null;if(o!==null){q=o.vocaName;}var s=v.PROPERTY_NAME_ACTIONS.concat("."+k);j[s]=new d.VocaAction(k,q);this.depHandler.addDependencies(j);}}};g.prototype.setActionInfoInActionMap=function setActionInfoInActionMap(h){var i=null;if(this.actionsMap.hasOwnProperty(h)===false){i=this.vocabularyDataProvider.getAction(this.vocabulary,h,null);if(i===null){return false;}this.actionsMap[h]={"paramMap":{},"vocabulary":i.vocaName};var p;var j;var k;for(p=0;p<i.requiredParams.length;p++){j=i.requiredParams[p].name;k=i.requiredParams[p].businessDataType;this.actionsMap[h].paramMap[j]={"bdType":k,"isExists":false,"colID":null};}}return true;};g.prototype.isParameterExistsInActionMap=function isParameterExistsInActionMap(p,h,i){if(this.actionsMap.hasOwnProperty(h)===false){return false;}var j=this.actionsMap[h];if(j.paramMap.hasOwnProperty(p)===false){return false;}j.paramMap[p].isExists=true;j.paramMap[p].colID=i;return true;};g.prototype.handleActionParameterForText=function handleActionParameterForText(h,p,i,j){var k;var l;var m;var n;var o;for(k=0;k<h.length;k++){l=h[k];m=this.setActionInfoInActionMap(l);if(m===false){o=e.buildJsonPath(j,a.RULE_ACTION_REFERENCE);n=[l];this.handleMessages(null,o,"rule_body_validator_action_ref_not_exists",n);this.status=a.RULE_ERROR;}else if(this.isParameterExistsInActionMap(p,l,i)===false){o=e.buildJsonPath(j,a.RULE_ACTION_PARAM_NAME);n=[p,l];this.handleMessages(null,o,"rule_body_validator_param_name_not_exists",n);this.status=a.RULE_ERROR;}}};g.prototype.handleActionParameterForDecisionTable=function handleActionParameteForDecisionTable(h,p,i){var j;var k;var l;var m;var n;var o;for(j=0;j<h.length;j++){k=h[j];l=this.setActionInfoInActionMap(k);if(l===false){n=[k];m=c.getInstance().getMessage("rule_body_validator_action_ref_not_exists",n);this.handleMessages(null,undefined,"rule_body_validator_action_ref_not_exists",n);o={};o.colID=i;o.status=a.RULE_ERROR;o.errorDetails=m;this.status=a.RULE_ERROR;if(this.flags[a.outputFlagsEnum.validationOutput]){this.ruleBody.content.headers.push(o);}this.invalidHeaders[i]=true;}else if(this.isParameterExistsInActionMap(p,k,i)===false){n=[p,k];m=c.getInstance().getMessage("rule_body_validator_param_name_not_exists",n);this.handleMessages(null,undefined,"rule_body_validator_param_name_not_exists",n);o={};o.colID=i;o.status=a.RULE_ERROR;o.errorDetails=m;this.status=a.RULE_ERROR;if(this.flags[a.outputFlagsEnum.validationOutput]){this.ruleBody.content.headers.push(o);}this.invalidHeaders[i]=true;}}};g.prototype.handleOutputParameterHeader=function handleOutputParameterHeader(p,h,i){var j=this.isValidOutputName(p);var k="";var l;this.rowOutputParamsCnt++;if(j===false||(this.flags[a.outputFlagsEnum.isAlias]&&this.rowOutputParamsCnt>1)){if(j===false){l=[p,this.outputInfo.name];k="rule_body_validator_parameter_not_exists_in_output";}else if(this.flags[a.outputFlagsEnum.isAlias]&&this.rowOutputParamsCnt>1){k="rule_body_validator_one_alias_output_param_allowed";}var m=c.getInstance().getMessage(k,l);this.handleMessages4OdataFormatOutput(null,a.additionalInfoTypeEnum.column,i,null,k,l,null);var n={};n.colID=i;n.name=p;n.type=h;n.status=a.RULE_ERROR;n.errorDetails=m;this.status=a.RULE_ERROR;if(this.flags[a.outputFlagsEnum.validationOutput]){this.ruleBody.content.headers.push(n);}this.invalidHeaders[i]=true;}};g.prototype.updateHeaderValidationResult=function updateHeaderValidationResult(h){var i={};i.expression=h.expression;i.colID=h.colID;i.type=h.type;i=this.updateValidateResult(i);return i;};g.prototype.handleConditionHeader=function handleConditionHeader(h){var i={};var p=[];var j;var k;this.conditionColumnsCnt++;if(this.ruleType===a.RULE_SET&&this.conditionColumnsCnt>1){j="rule_body_validator_one_condition_column_allowed";k=c.getInstance().getMessage(j,p);this.handleMessages(null,undefined,j,p);this.status=a.RULE_ERROR;if(this.flags[a.outputFlagsEnum.validationOutput]){i.expression=h.expression;i.colID=h.colID;i.type=h.type;i.status=a.RULE_ERROR;i.errorDetails=k;this.ruleBody.content.headers.push(i);}this.invalidHeaders[h.colID]=true;}else{this.currentParserResult=this.getParserAST(h.expression,R.VALIDATE_MODE,null,R.TYPE_SINGLE_EXPRESSION,this.flags);if(h.expression!==null&&h.expression!==undefined&&h.expression!==""){i=this.updateHeaderValidationResult(h);if(i!==null){this.handleMessages4OdataFormatOutput(this.currentParserResult,a.additionalInfoTypeEnum.column,h.colID,null,null,null,null);this.status=a.RULE_ERROR;if(!this.ruleBody.content.hasOwnProperty("headers")){this.ruleBody.content.headers=[];}if(this.flags[a.outputFlagsEnum.validationOutput]){this.ruleBody.content.headers.push(i);}this.invalidHeaders[h.colID]=true;if(this.flags[a.outputFlagsEnum.unknownTokensOutput]){this.updateUnknownTokensFromParser();}}if(this.flags[a.outputFlagsEnum.dependenciesOutput]){this.updateDependnciesFromParser();}if(this.flags[a.outputFlagsEnum.rootObjectContextOutput]){this.updateRootObjectContextFromParser();}}}};g.prototype.validateHeader=function validateHeader(h){jQuery.sap.log.debug("validate header");if(h.hasOwnProperty(a.RULE_CELL_TYPE)){this.invalidHeaders[h.colID]=false;if(h.type===a.CONDITION&&h.hasOwnProperty(a.RULE_DT_EXPRESSION)){this.handleConditionHeader(h);}else if(h.type===a.PARAM){this.handleActionParameterForDecisionTable(h.actionReference,h.name,h.colID);}else if(h.type===a.OUTPUT_PARAM){this.handleOutputParameterHeader(h.name,h.type,h.colID);}}};g.prototype.initRow=function initRow(h){var i={};i.rowID=h;i.row=[];return i;};g.prototype.handleHeaders=function handleHeaders(h){var i=this;this.conditionColumnsCnt=0;this.traverseDecisionTableHeaders(h,function(k){i.validateHeader(k);});var j=this.buildHeadersMap(h);return j;};g.prototype.handleDecisionTableCondition=function handleDecisionTableCondition(h,i,j,k){var l=k;var m=null;if(h!==null&&h.hasOwnProperty(a.RULE_DT_EXPRESSION)&&i.row[j].hasOwnProperty(a.RULE_CONTENT)){if(this.flags[a.outputFlagsEnum.unknownTokensOutput]||this.invalidHeaders[h.colID]!==true){m=this.concatToDecisionTableCondition(h.expression,i.row[j].content);this.currentParserResult=this.getParserAST(m,R.VALIDATE_MODE,null,R.TYPE_BOOLEAN_ENHANCED,this.flags);var n={};n.expression=m;n.colID=i.row[j].colID;n.content=i.row[j].content;n=this.updateValidateResult(n);if(n!==null){this.status=a.RULE_ERROR;this.handleMessages4OdataFormatOutput(this.currentParserResult,a.additionalInfoTypeEnum.cell,h.colID,i.rowID,null,null,null);if(this.flags[a.outputFlagsEnum.validationOutput]){if(l===null){l=this.initRow(i.rowID);}l.row.push(n);}if(this.flags[a.outputFlagsEnum.unknownTokensOutput]){this.updateUnknownTokensFromParser();if(this.invalidHeaders[h.colID]!==true){this.headersOfInvalidCells[h.colID]=h;}}}if(this.flags[a.outputFlagsEnum.dependenciesOutput]){this.updateDependnciesFromParser();}if(this.flags[a.outputFlagsEnum.rootObjectContextOutput]){this.updateRootObjectContextFromParser();}}}return l;};g.prototype.getActionParamBusinessDataArray=function getActionParamBusinessDataArray(p){var h=null;var i=null;var j=null;var k=null;var l=[];for(k in this.actionsMap){if(this.actionsMap.hasOwnProperty(k)){h=this.actionsMap[k];for(j in h.paramMap){if(h.paramMap.hasOwnProperty(j)){i=h.paramMap[j];if(i.colID!==null&&i.colID===p.colID){l.push(i.bdType);}}}}}return l;};g.prototype.handleDecisionTableActionParameter=function handleDecisionTableActionParameter(h,i,j,k){var l;var m=this.getActionParamBusinessDataArray({"colID":i.row[j].colID});l=this.validateParameter(h,i,j,k,m,this.flags);if(l.hasOwnProperty(a.ROW_RESULT)){return l[a.ROW_RESULT];}};g.prototype.handleDecisionTableOutputParameter=function handleDecisionTableOutputParameter(h,i,j,k){var p=h.name;var s=null;var l=k;var m={};var n;var o;var q;if(i.row[j].hasOwnProperty(a.RULE_PARAM_BUSINESS_DATA_TYPE)){s=i.row[j][a.RULE_PARAM_BUSINESS_DATA_TYPE];}else if(h.hasOwnProperty(a.RULE_PARAM_BUSINESS_DATA_TYPE)){s=h[a.RULE_PARAM_BUSINESS_DATA_TYPE];}o=this.getOutputParamBusinessDataType(p,s);if(o===null){m={};m.colID=h.colID;this.status=a.RULE_ERROR;if(this.flags[a.outputFlagsEnum.validationOutput]){if(k===null){k=this.initRow(i.rowID);}k.row.push(m);}}n=this.updateParserIsCollectionFlag(h.name);l=this.validateParameter(h,i,j,k,[o],n);if(l.hasOwnProperty(a.ROW_RESULT)){k=l[a.ROW_RESULT];}if(l.hasOwnProperty(a.PARSER_RESULT)&&this.isParserReturnedErrorMessage(l[a.PARSER_RESULT])===false){var t=l[a.PARSER_RESULT];q=this.valiadteCollectionInfoOnOutputParameter(t,p,undefined);if(q!==null&&this.flags[a.outputFlagsEnum.validationOutput]){m={};m.colID=h.colID;m.status=a.RULE_ERROR;m.errorDetails=q;m.expression=i.row[j].content;m.content=i.row[j].content;this.status=a.RULE_ERROR;if(k===null){k=this.initRow(i.rowID);}k.row.push(m);}}return k;};g.prototype.handleDecisionTableAction=function handleDecisionTableAction(h,i,j,k){var l={};var m=i.row[j].content;if(m===undefined||m===null||m===""){return k;}var n=this.isActionExists(m);if(n===false){var p=[m];var o=c.getInstance().getMessage("rule_body_validator_action_not_exists",p);this.handleMessages(null,undefined,"rule_body_validator_action_not_exists",p);var q={};q.colID=h.colID;q.status=a.RULE_ERROR;q.errorDetails=o;this.status=a.RULE_ERROR;if(k===null){k=this.initRow(i.rowID);}k.row.push(q);}if(this.flags[a.outputFlagsEnum.dependenciesOutput]&&this.status===a.RULE_SUCCESS){if(i.row[j].hasOwnProperty(a.RULE_CONTENT)){var s=null;if(this.actionsMap.hasOwnProperty(m)===true){s=this.actionsMap[m].vocabulary;}var t=v.PROPERTY_NAME_ACTIONS.concat("."+m);l[t]=new d.VocaAction(m,s);}this.depHandler.addDependencies(l);}return k;};g.prototype.initResult=function initResult(){this.rowOutputParamsCnt=0;if((this.ruleType===a.DECISION_TABLE||this.ruleType===a.RULE_SET)&&this.flags[a.outputFlagsEnum.validationOutput]){this.ruleBody.content.rows=[];this.ruleBody.content.headers=[];}};g.prototype.initRowResult=function initRowResult(h,i){return null;};g.prototype.addRowResult=function addRowResult(h){if(this.ruleType===a.DECISION_TABLE||this.ruleType===a.RULE_SET){if(this.flags[a.outputFlagsEnum.validationOutput]&&h!==null){this.ruleBody.content.rows.push(h);}}};g.prototype.validateParameter=function validateParameter(h,i,j,k,l,m){var n={};var p=null;var o="";var q="";n.rowResult=k;n.parserResult=null;if(i.row[j].hasOwnProperty(a.RULE_CONTENT)){var s;var t;if(l!==null&&l!==undefined){for(s=0;s<l.length;s++){this.currentParserResult=this.getParserAST(i.row[j].content,R.VALIDATE_MODE,null,l[s],m);n.parserResult=this.currentParserResult;t={};t.expression=i.row[j].content;t.colID=h.colID;t.content=i.row[j].content;t=this.updateValidateResult(t);if(this.flags[a.outputFlagsEnum.isAlias]){if((!h.hasOwnProperty(a.RULE_PARAM_BUSINESS_DATA_TYPE)||h.businessDataType===R.TYPE_ALL)&&this.currentParserResult.hasOwnProperty('actualReturnType')){if(t===null){if(this.aliasOutputBusinessDataType===null){this.aliasOutputBusinessDataType=this.currentParserResult.actualReturnType;}}else{if(this.aliasOutputBusinessDataType!==null&&this.aliasOutputBusinessDataType!==this.currentParserResult.actualReturnType){p=[h.name];o="rule_body_validator_alias_output_params_should_have_same_type";q=c.getInstance().getMessage(o,p);this.handleMessages(null,undefined,o,p);t={};t.expression=i.row[j].content;t.colID=h.colID;t.content=i.row[j].content;t.errorDetails=q;}}}else{this.aliasOutputBusinessDataType=h.businessDataType;}}else{h.businessDataType=l[s];}if(t!==null){this.status=a.RULE_ERROR;this.handleMessages4OdataFormatOutput(this.currentParserResult,a.additionalInfoTypeEnum.cell,t.colID,i.rowID,null,null,null);if(this.flags[a.outputFlagsEnum.validationOutput]){if(n.rowResult===null){n.rowResult=this.initRow(i.rowID);}n.rowResult.row.push(t);}if(this.flags[a.outputFlagsEnum.unknownTokensOutput]){this.updateUnknownTokensFromParser();if(this.invalidHeaders[h.colID]!==true){this.headersOfInvalidCells[h.colID]=h;}}}if(this.flags[a.outputFlagsEnum.dependenciesOutput]){this.updateDependnciesFromParser();}if(this.flags[a.outputFlagsEnum.rootObjectContextOutput]){this.updateRootObjectContextFromParser();}}}}return n;};g.prototype.initPathPrefix=function initPathPrefix(p){if(p!==null&&p!==undefined){if(p.hasOwnProperty(a.RULE_BODY)){this.ruleBodyPathPrefix=p[a.pathPrefixKeysEnum.ruleBody];}else{this.ruleBodyPathPrefix=f.JSON_PATH_ROOT;}if(p.hasOwnProperty(a.EXPLICIT_OUTPUT)){this.outputPathPrefix=p[a.pathPrefixKeysEnum.explicitOutput];}else{this.outputPathPrefix=f.JSON_PATH_ROOT;}}else{this.ruleBodyPathPrefix=f.JSON_PATH_ROOT;this.outputPathPrefix=f.JSON_PATH_ROOT;}};g.prototype.initFlags=function initFlags(h){if(h!==null&&h!==undefined){if(h.hasOwnProperty(a.ODATA_FORMAT_PAYLOAD)){this.flags[a.ODATA_FORMAT_PAYLOAD]=h[a.ODATA_FORMAT_PAYLOAD];}if(h.hasOwnProperty(a.outputFlagsEnum.validationOutput)){this.flags[a.outputFlagsEnum.validationOutput]=h[a.outputFlagsEnum.validationOutput];}if(h[a.outputFlagsEnum.unknownTokensOutput]){this.flags[a.outputFlagsEnum.unknownTokensOutput]=h[a.outputFlagsEnum.unknownTokensOutput];}if(h[a.outputFlagsEnum.isAlias]){this.flags[a.outputFlagsEnum.isAlias]=h[a.outputFlagsEnum.isAlias];}if(h.hasOwnProperty(a.outputFlagsEnum.dependenciesOutput)){if(h.hasOwnProperty(a.outputFlagsEnum.dependenciesOutput)){this.flags[a.outputFlagsEnum.dependenciesOutput]=h[a.outputFlagsEnum.dependenciesOutput];}if(h[a.outputFlagsEnum.dependenciesOutput]){this.depHandler=new b.DependeciesHandler();}}if(h.hasOwnProperty(a.outputFlagsEnum.rootObjectContextOutput)){if(h.hasOwnProperty(a.outputFlagsEnum.rootObjectContextOutput)){this.flags[a.outputFlagsEnum.rootObjectContextOutput]=h[a.outputFlagsEnum.rootObjectContextOutput];}}}};g.prototype.validateOutput=function validateOutput(o,h){var i,j;if(o===null){return o;}j=this.vocabularyDataProvider.getOutput(h,o,null);if(j===null){var p=[o];i="rule_body_validator_output_not_exists";this.handleMessages4OdataFormatOutput(null,a.additionalInfoTypeEnum.ruleResult,null,null,i,p,this.outputPathPrefix);this.status=a.RULE_ERROR;}return j;};g.prototype.getIsCollection=function getIsCollection(){var i=true;if(this.hasOwnProperty(a.HIT_POLICY_PROPERTY)){if(this.hitPolicy===a.FIRST_MATCH){i=false;}else if(this.hitPolicy===a.ALL_MATCH){i=true;}}return i;};g.prototype.getRootObjectContext=function getRootObjectContext(){var h={};h.keys=[];h.name=this.rootObjectContext.name;Object.keys(this.rootObjectContext.keysMap).forEach(function(k){h.keys.push(k);});return h;};g.prototype.updateInvalidRuleBodyHeaders=function updateInvalidRuleBodyHeaders(){var k=null;if(!this.invalidRuleBody.content.hasOwnProperty('headers')){this.invalidRuleBody.content.headers=[];}for(k in this.headersOfInvalidCells){if(this.headersOfInvalidCells.hasOwnProperty(k)){this.invalidRuleBody.content.headers.push(this.headersOfInvalidCells[k]);}}};g.prototype.deactivateParserMessages=function deactivateParserMessages(h){if((h.hasOwnProperty(a.RULE_BODY_TYPE)&&h[a.RULE_BODY_TYPE]===a.SINGLE_TEXT)||this.flags[a.ODATA_FORMAT_PAYLOAD]){this.flags[R.propertiesEnum.raiseError]=false;}};g.prototype.reValidateBusinessRule=function reValidateBusinessRule(h,i,j,o){var k={};this.mode=a.RULE_MODE_RE_VALIDATION;this.initValidation();this.initFlags(j);if(this.flags[a.outputFlagsEnum.unknownTokensOutput]&&this.invalidRuleBody!==null){k=this.validateBusinessRule(this.invalidRuleBody,h,i,j,o,null,null);}return k;};g.prototype.validateBusinessRule=function validateBusinessRule(h,i,j,k,o,p,t){var l={};jQuery.sap.log.debug("flags "+JSON.stringify(k));this.initPathPrefix(p);this.initFlags(k);this.aliasOutputBusinessDataType=null;this.vocabularyDataProvider=j;this.outputInfo=this.validateOutput(o,i,l);this.actionsMap={};this.deactivateParserMessages(h);this.traverse(h,i,j,t,this.ruleBodyPathPrefix);this.ruleBody.type=this.ruleType;this.ruleBody.hitPolicy=this.hitPolicy;if(this.flags[a.outputFlagsEnum.unknownTokensOutput]){l[a.outputPropertiesEnum.unknownTokens]=this.unknownTokens;this.invalidRuleBody=JSON.parse(JSON.stringify(this.ruleBody));this.updateInvalidRuleBodyHeaders();}if(this.flags[a.outputFlagsEnum.isAlias]){l.isCollection=this.getIsCollection();l.businessDataType=this.aliasOutputBusinessDataType;}if(this.flags[a.outputFlagsEnum.validationOutput]){l.status=this.status;if(this.ruleType===a.DECISION_TABLE||this.ruleType===a.RULE_SET){l.ruleBody=this.ruleBody;}l.output=this.output;}else{l.status=this.status;}if(this.flags[a.outputFlagsEnum.dependenciesOutput]&&this.status===a.RULE_SUCCESS){l.dependencies=this.depHandler.getDependencies();jQuery.sap.log.debug("getDependencies");}if(this.flags[a.outputFlagsEnum.rootObjectContextOutput]&&this.status===a.RULE_SUCCESS){l[a.outputPropertiesEnum.rootObjectContext]=this.getRootObjectContext();jQuery.sap.log.debug("getRootObjectContext");}return l;};return{RuleBodyValidator:g};}());
