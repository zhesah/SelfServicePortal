/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/dt/Plugin','sap/ui/dt/ContextMenuControl'],function(q,P,C){"use strict";var a=P.extend("sap.ui.dt.plugin.ContextMenu",{metadata:{library:"sap.ui.dt",properties:{contextElement:{type:"object"}},associations:{},events:{openedContextMenu:{},closedContextMenu:{}}}});a.prototype.registerElementOverlay=function(o){o.attachBrowserEvent("contextmenu",this._onContextMenu,this);o.attachBrowserEvent("keydown",this._onKeyDown,this);};a.prototype.deregisterElementOverlay=function(o){o.detachBrowserEvent("contextmenu",this._onContextMenu,this);o.detachBrowserEvent("keydown",this._onKeyDown,this);};a.prototype.init=function(){this._aMenuItems=[];};a.prototype.exit=function(){delete this._aMenuItems;if(this._oContextMenuControl){this._oContextMenuControl.destroy();delete this._oContextMenuControl;}};a.prototype.addMenuItem=function(m){this._aMenuItems.push(m);};a.prototype.open=function(o,t){this.setContextElement(t.getElementInstance());this._oContextMenuControl=new C();this._oContextMenuControl.setMenuItems(this._aMenuItems,t);this._oContextMenuControl.setOverlayDomRef(t);this._oContextMenuControl.attachItemSelect(this._onItemSelected,this);this._oContextMenuControl.openMenu({pageX:o.pageX,pageY:o.pageY});this.fireOpenedContextMenu();};a.prototype._onItemSelected=function(e){var s=[];var i=e.getParameter("item").data("id");this._aMenuItems.some(function(I){if(i===I.id){var d=this.getDesignTime();s=d.getSelection();I.handler(s);return true;}},this);};a.prototype._onContextMenu=function(e){e.preventDefault();document.activeElement.blur();var o=sap.ui.getCore().byId(e.currentTarget.id);if(o&&o.isSelectable()){if(!o.isSelected()){o.setSelected(true);}this.open(e,o);e.stopPropagation();}};a.prototype._onKeyDown=function(e){var o=sap.ui.getCore().byId(e.currentTarget.id);if((e.keyCode===q.sap.KeyCodes.F10)&&(e.shiftKey===true)&&(e.altKey===false)&&(e.ctrlKey===false)){e.preventDefault();e.stopPropagation();if(o&&o.isSelectable()){if(!o.isSelected()){o.setSelected(true);}var w=o.$().width()/2;var h=o.$().height()/2;var t=o.$().offset().top;var l=o.$().offset().left;this.open({pageX:l+w,pageY:t+h},o);}}};return a;},true);
