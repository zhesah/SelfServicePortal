/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./TileRenderer','sap/ui/core/ValueStateSupport'],function(q,T,V){"use strict";var S=sap.ui.core.Renderer.extend(T);S._renderContent=function(r,t){var i=t.getInfoState();r.write("<div");r.addClass("sapMStdTileTopRow");r.writeClasses();r.write(">");if(t.getIcon()){r.write("<div");r.addClass("sapMStdTileIconDiv");switch(t.getType()){case sap.m.StandardTileType.Monitor:r.addClass("sapMStdIconMonitor");break;case sap.m.StandardTileType.Create:r.addClass("sapMStdIconCreate");break;}r.writeClasses();r.write(">");r.renderControl(t._getImage());r.write("</div>");}if(t.getNumber()){r.write("<div");r.addClass("sapMStdTileNumDiv");r.writeClasses();r.write(">");r.write("<div");r.writeAttribute("id",t.getId()+"-number");var n=t.getNumber().length;if(n<5){r.addClass("sapMStdTileNum");}else if(n<8){r.addClass("sapMStdTileNumM");}else{r.addClass("sapMStdTileNumS");}r.writeClasses();r.write(">");r.writeEscaped(t.getNumber());r.write("</div>");if(t.getNumberUnit()){r.write("<div");r.writeAttribute("id",t.getId()+"-numberUnit");r.addClass("sapMStdTileNumUnit");r.writeClasses();r.write(">");r.writeEscaped(t.getNumberUnit());r.write("</div>");}r.write("</div>");}r.write("</div>");r.write("<div");r.addClass("sapMStdTileBottomRow");if(t.getType()===sap.m.StandardTileType.Monitor){r.addClass("sapMStdTileMonitorType");}r.writeClasses();r.write(">");r.write("<div");r.writeAttribute("id",t.getId()+"-title");r.addClass("sapMStdTileTitle");r.writeClasses();r.write(">");if(t.getTitle()){r.writeEscaped(t.getTitle());}r.write("</div>");if(t.getInfo()){r.write("<div");r.writeAttribute("id",t.getId()+"-info");r.addClass("sapMStdTileInfo");r.addClass("sapMStdTileInfo"+i);r.writeClasses();if(i!=sap.ui.core.ValueState.None){r.writeAccessibilityState(t,{ariaDescribedBy:{value:t.getId()+"-sapSRH",append:true}});}r.write(">");if(t.getInfo()){r.writeEscaped(t.getInfo());}r.write("</div>");}if(i!=sap.ui.core.ValueState.None){r.write("<span");r.writeAttributeEscaped("id",t.getId()+"-sapSRH");r.addClass("sapUiInvisibleText");r.writeClasses();r.writeAccessibilityState({hidden:false});r.write(">");r.writeEscaped(V.getAdditionalText(i));r.write("</span>");}r.write("</div>");};return S;},true);
