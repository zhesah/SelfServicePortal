/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Button','sap/ui/core/Control','sap/ui/core/IconPool'],function(q,B,C,I){"use strict";var P=C.extend("sap.m.PagingButton",{metadata:{library:"sap.m",properties:{count:{type:"int",group:"Data",defaultValue:1},position:{type:"int",group:"Data",defaultValue:1},nextButtonTooltip:{type:"string",group:"Appearance",defaultValue:""},previousButtonTooltip:{type:"string",group:"Appearance",defaultValue:""}},aggregations:{previousButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},nextButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},events:{positionChange:{parameters:{newPosition:{type:"int"},oldPosition:{type:"int"}}}}}});var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");P.prototype.init=function(){this._attachPressEvents();};P.prototype.onBeforeRendering=function(){this._enforceValidPosition(this.getPosition());this._updateButtonState();};P.prototype._getNextButton=function(){if(!this.getAggregation("nextButton")){this.setAggregation("nextButton",new sap.m.Button({tooltip:this.getNextButtonTooltip()||r.getText("PAGINGBUTTON_NEXT"),icon:I.getIconURI("slim-arrow-down"),enabled:false,id:this.getId()+"-nextButton"}));}return this.getAggregation("nextButton");};P.prototype._getPreviousButton=function(){if(!this.getAggregation("previousButton")){this.setAggregation("previousButton",new sap.m.Button({tooltip:this.getPreviousButtonTooltip()||r.getText("PAGINGBUTTON_PREVIOUS"),icon:I.getIconURI("slim-arrow-up"),enabled:false,id:this.getId()+"-previousButton"}));}return this.getAggregation("previousButton");};P.prototype._attachPressEvents=function(){this._getPreviousButton().attachPress(this._handlePositionChange.bind(this,false));this._getNextButton().attachPress(this._handlePositionChange.bind(this,true));};P.prototype._handlePositionChange=function(i){var o=this.getPosition(),n=i?o+1:o-1;this.setPosition(n);this.firePositionChange({newPosition:n,oldPosition:o});this._updateButtonState();return this;};P.prototype._updateButtonState=function(){var t=this.getCount(),c=this.getPosition();this._getPreviousButton().setEnabled(c>1);this._getNextButton().setEnabled(c<t);return this;};P.prototype.setPosition=function(p){return this._validateProperty("position",p);};P.prototype.setCount=function(c){return this._validateProperty("count",c);};P.prototype.setPreviousButtonTooltip=function(t){this._getPreviousButton().setTooltip(t);return this.setProperty("previousButtonTooltip",t,true);};P.prototype.setNextButtonTooltip=function(t){this._getNextButton().setTooltip(t);return this.setProperty("nextButtonTooltip",t,true);};P.prototype._validateProperty=function(p,v){if(v<1){q.sap.log.warning("Property '"+p+"' must be greater or equal to 1",this);return this;}return this.setProperty(p,v);};P.prototype._enforceValidPosition=function(p){var c=this.getCount();if(p>c){q.sap.log.warning("Property position must be less or equal to the total count");this.setPosition(c);}return this;};return P;},true);
