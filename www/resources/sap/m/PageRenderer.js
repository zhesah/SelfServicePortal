/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/m/PageAccessibleLandmarkInfo','sap/ui/Device'],function(P,D){"use strict";var a={};a.render=function(r,p){var h=null,f=null,s=null,L=this._isLightHeader(p);if(p.getShowHeader()){h=p._getAnyHeader();}if(p.getShowSubHeader()){s=p.getSubHeader();}if(p.getShowFooter()){f=p.getFooter();}r.write("<div");r.writeControlData(p);r.addClass("sapMPage");r.addClass("sapMPageBg"+p.getBackgroundDesign());if(h){r.addClass("sapMPageWithHeader");}if(s){r.addClass("sapMPageWithSubHeader");}if(f){r.addClass("sapMPageWithFooter");}if(!p.getContentOnlyBusy()){r.addClass("sapMPageBusyCoversAll");}if(p.getFloatingFooter()&&p.getShowFooter()){r.addClass("sapMPageFloatingFooter");}r.writeClasses();var t=p.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t);}P._writeLandmarkInfo(r,p,"root");r.write(">");this.renderBarControl(r,p,h,{context:"header",styleClass:"sapMPageHeader"+(L?"":" sapContrastPlus")});this.renderBarControl(r,p,s,{context:"subHeader",styleClass:"sapMPageSubHeader"+(L?"":" sapContrastPlus")});r.write('<section id="'+p.getId()+'-cont"');P._writeLandmarkInfo(r,p,"content");if(p.getEnableScrolling()){r.addStyle("overflow-y",D.os.ios||D.os.blackberry?"scroll":"auto");r.writeStyles();}r.write('>');var c=p.getContent();var l=c.length;for(var i=0;i<l;i++){r.renderControl(c[i]);}r.write("</section>");this.renderBarControl(r,p,f,{context:"footer",styleClass:"sapMPageFooter"});r.write("</div>");};a.renderBarControl=function(r,p,b,o){if(!b){return;}b.applyTagAndContextClassFor(o.context.toLowerCase());b._setLandmarkInfo(p.getLandmarkInfo(),o.context);b.addStyleClass(o.styleClass);r.renderControl(b);};a._isLightHeader=function(p){var c=p,o=p.getParent(),s,C;while(o){s=(o&&o.getMetadata().getName())||"";C=c.getMetadata().getName();if((s==="sap.m.Popover"||s==="sap.m.Dialog")&&C==="sap.m.NavContainer"){return true;}if(o&&["sap.m.SplitApp","sap.m.SplitContainer"].indexOf(s)>-1&&C==="sap.m.NavContainer"&&/\-Master$/.test(c.getId())){return true;}c=o;o=c.getParent();}return false;};return a;},true);
