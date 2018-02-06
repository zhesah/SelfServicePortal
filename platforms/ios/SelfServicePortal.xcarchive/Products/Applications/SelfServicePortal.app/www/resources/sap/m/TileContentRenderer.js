/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Renderer'],function(q,R){"use strict";var T={};T.render=function(r,c){var t=c.getTooltip_AsString();var C=c._getContentType();if(C){C=q.sap.encodeCSS(C);}var f=q.sap.encodeCSS("sapMFrameType"+c.getFrameType());r.write("<div");r.writeControlData(c);r.addClass("sapMTileCnt");r.addClass(C);r.addClass(f);if(t.trim()){r.writeAttributeEscaped("title",t);}r.writeClasses();r.write(">");this._renderContent(r,c);this._renderFooter(r,c);r.write("</div>");};T._renderContent=function(r,c){if(!c._bRenderContent){return;}var C=c.getContent();if(C){r.write("<div");r.addClass("sapMTileCntContent");r.writeClasses();r.writeAttribute("id",c.getId()+"-content");r.write(">");if(!C.hasStyleClass("sapMTcInnerMarker")){C.addStyleClass("sapMTcInnerMarker");}r.renderControl(C);r.write("</div>");}};T._renderFooter=function(r,c){if(!c._bRenderFooter){return;}var t=c.getTooltip_AsString();var f=c._getFooterText(r,c);r.write("<div");r.addClass("sapMTileCntFtrTxt");r.writeClasses();r.writeAttribute("id",c.getId()+"-footer-text");if(t.trim()){r.writeAttributeEscaped("title",t);}r.write(">");r.writeEscaped(f);r.write("</div>");};return T;},true);
