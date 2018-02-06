/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(function(){"use strict";var O={};O.render=function(r,c){if(!c.getVisible()||!c._getInternalVisible()){return;}var t=c._getInternalTitle()?c._getInternalTitle():c.getTitle();r.write("<section ");r.addClass("sapUxAPObjectPageSection");r.writeClasses();r.writeAttribute("role","region");r.writeAttributeEscaped("aria-labelledby",c.getAggregation("ariaLabelledBy").getId());r.writeControlData(c);r.write(">");if(c.getShowTitle()&&c._getInternalTitleVisible()){r.write("<div");r.writeAttribute("role","heading");r.writeAttribute("aria-level",c._getARIALevel());r.writeAttributeEscaped("id",c.getId()+"-header");r.addClass("sapUxAPObjectPageSectionHeader");r.writeClasses();r.write(">");r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-title");r.addClass("sapUxAPObjectPageSectionTitle");if(c.getTitleUppercase()){r.addClass("sapUxAPObjectPageSectionTitleUppercase");}r.writeClasses();r.write(">");r.writeEscaped(t);r.write("</div>");r.renderControl(c._getShowHideAllButton());r.renderControl(c._getShowHideButton());r.write("</div>");}r.write("<div");r.addClass("sapUxAPObjectPageSectionContainer");r.writeClasses();if(c._isHidden){r.addStyle("display","none");}r.writeStyles();r.write(">");c.getSubSections().forEach(r.renderControl);r.write("</div>");r.write("</section>");};return O;},true);
