/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/base/ManagedObject','sap/ui/dt/ElementUtil','sap/ui/dt/OverlayUtil','sap/ui/dt/OverlayRegistry'],function(M,E,O,a){"use strict";var b=M.extend("sap.ui.dt.plugin.ElementMover",{metadata:{library:"sap.ui.dt",properties:{movableTypes:{type:"string[]",defaultValue:["sap.ui.core.Element"]}},associations:{}}});b.prototype._getMovableTypes=function(){return this.getProperty("movableTypes")||[];};b.prototype.isMovableType=function(e){var m=this._getMovableTypes();return m.some(function(t){return E.isInstanceOf(e,t);});};b.prototype.checkMovable=function(o){return true;};b.prototype.getMovedOverlay=function(){return this._oMovedOverlay;};b.prototype.setMovedOverlay=function(m){if(m){this._source=O.getParentInformation(m);}else{delete this._source;}this._oMovedOverlay=m;};b.prototype._getSource=function(){return this._source;};b.prototype.activateAllValidTargetZones=function(d,A){this._iterateAllAggregations(d,this._activateValidTargetZone.bind(this),A);};b.prototype._activateValidTargetZone=function(A,s){if(this.checkTargetZone(A)){A.setTargetZone(true);if(s){A.addStyleClass(s);}}};b.prototype.checkTargetZone=function(A){if(!A.$().is(":visible")){return false;}var p=A.getElementInstance();var m=this.getMovedOverlay().getElementInstance();var s=A.getAggregationName();if(E.isValidForAggregation(p,s,m)){return true;}};b.prototype._deactivateTargetZone=function(A,s){A.setTargetZone(false);if(s){A.removeStyleClass(s);}};b.prototype.activateTargetZonesFor=function(o,A){this._iterateOverlayAggregations(o,this._activateValidTargetZone.bind(this),A);};b.prototype.deactivateTargetZonesFor=function(o,A){this._iterateOverlayAggregations(o,this._deactivateTargetZone.bind(this),A);};b.prototype.deactivateAllTargetZones=function(d,A){this._iterateAllAggregations(d,this._deactivateTargetZone.bind(this),A);};b.prototype._iterateAllAggregations=function(d,s,A){var o=d.getElementOverlays();o.forEach(function(c){this._iterateOverlayAggregations(c,s,A);},this);};b.prototype._iterateOverlayAggregations=function(o,s,A){var c=o.getAggregationOverlays();c.forEach(function(d){s(d,A);});};b.prototype.repositionOn=function(m,t){var o=m.getElementInstance();var T=O.getParentInformation(t);var A;var f=m.getFirstHiddenAggregationOverlay();var F=f.getElementInstance();var p=m.getPublicParentElementOverlay();if(f&&p){var s=f.getAggregationName();A=p.getDesignTimeMetadata().getAggregation(s);}if(T.index!==-1){if(A&&A.beforeMove){A.beforeMove(F,o);}E.insertAggregation(T.parent,T.aggregation,o,T.index);if(A&&A.afterMove){A.afterMove(F,o);}}};b.prototype.insertInto=function(m,t){var o=m.getElementInstance();var T=t.getElementInstance();var A;var f=m.getFirstHiddenAggregationOverlay();var F=f.getElementInstance();var p=m.getPublicParentElementOverlay();if(f&&p){var s=f.getAggregationName();A=p.getDesignTimeMetadata().getAggregation(s);}var S=m.getParent();if(t!==S){if(A&&A.beforeMove){A.beforeMove(F,o);}var c=t.getAggregationName();E.addAggregation(T,c,o);if(A&&A.afterMove){A.afterMove(F,o);}}};b.prototype._compareSourceAndTarget=function(s,t){var p;for(p in s){switch(typeof(s[p])){case'object':if(s[p].getId()!==t[p].getId()){return false;}break;default:if(s[p]!==t[p]){return false;}}}return true;};return b;},true);
