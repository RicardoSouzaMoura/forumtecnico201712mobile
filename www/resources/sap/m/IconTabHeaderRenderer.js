/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/IconPool'],function(q,I){"use strict";var a={};a._aAllIconColors=['sapMITBFilterCritical','sapMITBFilterPositive','sapMITBFilterNegative','sapMITBFilterDefault','sapMITBFilterNeutral'];a.render=function(r,c){if(!c.getVisible()){return;}var i=c.getItems(),t=c._checkTextOnly(i),n=c._checkNoText(i),b=c._checkInLine(i)||c.isInlineMode(),R=sap.ui.getCore().getLibraryResourceBundle('sap.m');var o=c.getParent();var u=o&&o instanceof sap.m.IconTabBar&&o.getUpperCase();r.write("<div role='tablist' ");r.addClass("sapMITH");r.addClass("sapContrastPlus");if(c._scrollable){r.addClass("sapMITBScrollable");if(c._bPreviousScrollForward){r.addClass("sapMITBScrollForward");}else{r.addClass("sapMITBNoScrollForward");}if(c._bPreviousScrollBack){r.addClass("sapMITBScrollBack");}else{r.addClass("sapMITBNoScrollBack");}}else{r.addClass("sapMITBNotScrollable");}if(u){r.addClass("sapMITBTextUpperCase");}r.writeControlData(c);r.writeClasses();r.write(">");r.renderControl(c._getScrollingArrow("left"));r.write("<div id='"+c.getId()+"-scrollContainer' class='sapMITBScrollContainer'>");r.write("<div id='"+c.getId()+"-head'");r.addClass("sapMITBHead");if(t){r.addClass("sapMITBTextOnly");}if(n){r.addClass("sapMITBNoText");}if(b){r.addClass("sapMITBInLine");}r.writeClasses();r.write(">");q.each(i,function(d,e){if(!(e instanceof sap.m.IconTabSeparator)&&!e.getVisible()){return;}var T='';if(e instanceof sap.m.IconTabSeparator){if(e.getIcon()){T+='role="img" aria-label="'+R.getText("ICONTABBAR_NEXTSTEP")+'"';}else{T+='role="separator"';}}else{T+='role="tab"';if(o instanceof sap.m.IconTabBar){T+=' aria-controls="'+o.sId+'-content" ';}if(e){var s=e.getIconColor();var f=s==='Positive'||s==='Critical'||s==='Negative';if(e.getText().length||e.getCount()!==""||e.getIcon()){T+='aria-labelledby="';var g=[];if(e.getText().length){g.push(e.getId()+'-text');}if(e.getCount()!==""){g.push(e.getId()+'-count');}if(e.getIcon()){g.push(e.getId()+'-icon');}if(f){g.push(e.getId()+'-iconColor');}T+=g.join(' ');T+='"';}}}r.write('<div '+T+' ');r.writeElementData(e);r.addClass("sapMITBItem");if(!(e instanceof sap.m.IconTabSeparator)&&!this.getCount()){r.addClass("sapMITBItemNoCount");}if(e instanceof sap.m.IconTabFilter){if(e.getDesign()===sap.m.IconTabFilterDesign.Vertical){r.addClass("sapMITBVertical");}else if(e.getDesign()===sap.m.IconTabFilterDesign.Horizontal){r.addClass("sapMITBHorizontal");}if(e.getShowAll()){r.addClass("sapMITBAll");}else{r.addClass("sapMITBFilter");r.addClass("sapMITBFilter"+e.getIconColor());}if(!e.getEnabled()){r.addClass("sapMITBDisabled");r.writeAttribute("aria-disabled",true);}var h=e.getTooltip_AsString();if(h){r.writeAttributeEscaped("title",h);}r.writeClasses();r.write(">");if(!b){r.write("<div id='"+e.getId()+"-tab' class='sapMITBTab'>");if(!e.getShowAll()||!e.getIcon()){if(f){r.write('<div id="'+e.getId()+'-iconColor" style="display: none;">'+R.getText('ICONTABBAR_ICONCOLOR_'+s.toUpperCase())+'</div>');}r.renderControl(e._getImageControl(['sapMITBFilterIcon','sapMITBFilter'+e.getIconColor()],c,a._aAllIconColors));}if(!e.getShowAll()&&!e.getIcon()&&!t){r.write("<span class='sapMITBFilterNoIcon'> </span>");}if(e.getDesign()===sap.m.IconTabFilterDesign.Horizontal&&!e.getShowAll()){r.write("</div>");r.write("<div class='sapMITBHorizontalWrapper'>");}r.write("<span id='"+e.getId()+"-count' ");r.addClass("sapMITBCount");r.writeClasses();r.write(">");if((e.getCount()==="")&&(e.getDesign()===sap.m.IconTabFilterDesign.Horizontal)){r.write("&nbsp;");}else{r.writeEscaped(e.getCount());}r.write("</span>");if(e.getDesign()===sap.m.IconTabFilterDesign.Vertical){r.write("</div>");}}if(e.getText().length){r.write("<div id='"+e.getId()+"-text' ");r.addClass("sapMITBText");if(u){r.addClass("sapMITBTextUpperCase");}if(b){r.writeAttribute("dir","ltr");}r.writeClasses();r.write(">");r.writeEscaped(c._getDisplayText(e));r.write("</div>");}if(!b){if(e.getDesign()===sap.m.IconTabFilterDesign.Horizontal){r.write("</div>");}}r.write("<div class='sapMITBContentArrow'></div>");}else{r.addClass("sapMITBSep");if(!e.getIcon()){r.addClass("sapMITBSepLine");}r.writeClasses();r.write(">");if(e.getIcon()){r.renderControl(e._getImageControl(['sapMITBSepIcon'],c));}}r.write("</div>");});r.write("</div>");r.write("</div>");r.renderControl(c._getScrollingArrow("right"));r.write("</div>");};return a;},true);
