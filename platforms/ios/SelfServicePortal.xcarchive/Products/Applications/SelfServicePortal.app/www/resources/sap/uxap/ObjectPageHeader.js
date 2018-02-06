/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/core/CustomData","sap/ui/core/Icon","sap/ui/Device","sap/m/Breadcrumbs","./ObjectPageHeaderActionButton","sap/ui/core/ResizeHandler","sap/m/Text","sap/m/Button","sap/m/ActionSheet","sap/m/Image","./ObjectImageHelper","./library"],function(C,I,a,b,D,B,O,R,T,c,A,d,e,l){"use strict";var f=C.extend("sap.uxap.ObjectPageHeader",{metadata:{library:"sap.uxap",properties:{objectImageURI:{type:"string",defaultValue:null},objectImageAlt:{type:"string",defaultValue:''},objectImageDensityAware:{type:"boolean",defaultValue:false},objectTitle:{type:"string",defaultValue:null},objectSubtitle:{type:"string",defaultValue:null},objectImageShape:{type:"sap.uxap.ObjectPageHeaderPictureShape",defaultValue:sap.uxap.ObjectPageHeaderPictureShape.Square},isObjectIconAlwaysVisible:{type:"boolean",defaultValue:false},isObjectTitleAlwaysVisible:{type:"boolean",defaultValue:true},isObjectSubtitleAlwaysVisible:{type:"boolean",defaultValue:true},isActionAreaAlwaysVisible:{type:"boolean",defaultValue:true},headerDesign:{type:"sap.uxap.ObjectPageHeaderDesign",defaultValue:sap.uxap.ObjectPageHeaderDesign.Light},showTitleSelector:{type:"boolean",group:"Misc",defaultValue:false},markFavorite:{type:"boolean",group:"Misc",defaultValue:false},markFlagged:{type:"boolean",group:"Misc",defaultValue:false},showMarkers:{type:"boolean",group:"Misc",defaultValue:false},markLocked:{type:"boolean",group:"Misc",defaultValue:false},showPlaceholder:{type:"boolean",group:"Misc",defaultValue:false},markChanges:{type:"boolean",group:"Misc",defaultValue:false}},defaultAggregation:"actions",aggregations:{_breadCrumbs:{type:"sap.m.Breadcrumbs",multiple:false,visibility:"hidden"},breadCrumbsLinks:{type:"sap.m.Link",multiple:true,singularName:"breadCrumbLink"},_overflowButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_expandButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_objectImage:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_placeholder:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_lockIconCont:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_lockIcon:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_titleArrowIconCont:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_titleArrowIcon:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_favIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_flagIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_overflowActionSheet:{type:"sap.m.ActionSheet",multiple:false,visibility:"hidden"},_changesIconCont:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_changesIcon:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_sideContentBtn:{type:"sap.m.Button",multiple:false,visibility:"hidden"},navigationBar:{type:"sap.m.Bar",multiple:false},actions:{type:"sap.ui.core.Control",multiple:true,singularName:"action"},sideContentButton:{type:"sap.m.Button",multiple:false}},events:{titleSelectorPress:{parameters:{domRef:{type:"string"}}},markLockedPress:{parameters:{domRef:{type:"string"}}},markChangesPress:{parameters:{domRef:{type:"string"}}}}}});f.prototype._iAvailablePercentageForActions=0.3;f.prototype.init=function(){this._bFirstRendering=true;if(!this.oLibraryResourceBundle){this.oLibraryResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");}if(!this.oLibraryResourceBundleOP){this.oLibraryResourceBundleOP=l.i18nModel.getResourceBundle();}this._oOverflowActionSheet=this._lazyLoadInternalAggregation("_overflowActionSheet",true);this._oOverflowButton=this._lazyLoadInternalAggregation("_overflowButton",true).attachPress(this._handleOverflowButtonPress,this);this._oExpandButton=this._lazyLoadInternalAggregation("_expandButton",true);this._oActionSheetButtonMap={};this._oFlagIcon=this._lazyLoadInternalAggregation("_flagIcon",true);this._oFavIcon=this._lazyLoadInternalAggregation("_favIcon",true);this._oTitleArrowIcon=this._lazyLoadInternalAggregation("_titleArrowIcon",true).attachPress(this._handleArrowPress,this);this._oTitleArrowIconCont=this._lazyLoadInternalAggregation("_titleArrowIconCont",true).attachPress(this._handleArrowPress,this);this._oLockIcon=this._lazyLoadInternalAggregation("_lockIcon",true).attachPress(this._handleLockPress,this);this._oLockIconCont=this._lazyLoadInternalAggregation("_lockIconCont",true).attachPress(this._handleLockPress,this);this._oChangesIcon=this._lazyLoadInternalAggregation("_changesIcon",true).attachPress(this._handleChangesPress,this);this._oChangesIconCont=this._lazyLoadInternalAggregation("_changesIconCont",true).attachPress(this._handleChangesPress,this);};f.prototype._handleOverflowButtonPress=function(E){this._oOverflowActionSheet.openBy(this._oOverflowButton);};f.prototype._handleArrowPress=function(E){this.fireTitleSelectorPress({domRef:E.getSource().getDomRef()});};f.prototype._handleLockPress=function(E){this.fireMarkLockedPress({domRef:E.getSource().getDomRef()});};f.prototype._handleChangesPress=function(E){this.fireMarkChangesPress({domRef:E.getSource().getDomRef()});};f._internalAggregationFactory={"_objectImage":e.createObjectImage,"_placeholder":e.createPlaceholder,"_overflowActionSheet":function(){return new A({placement:sap.m.PlacementType.Bottom});},"_lockIconCont":function(P){return this._getButton(P,"sap-icon://private","lock-cont");},"_breadCrumbs":function(P){return new B({links:P.getAggregation("breadCrumbLinks")});},"_lockIcon":function(P){return this._getButton(P,"sap-icon://private","lock",P.oLibraryResourceBundleOP.getText("TOOLTIP_OP_LOCK_MARK_VALUE"));},"_titleArrowIconCont":function(P){return this._getButton(P,"sap-icon://arrow-down","titleArrow-cont",P.oLibraryResourceBundleOP.getText("OP_SELECT_ARROW_TOOLTIP"));},"_titleArrowIcon":function(P){return this._getButton(P,"sap-icon://arrow-down","titleArrow",P.oLibraryResourceBundleOP.getText("OP_SELECT_ARROW_TOOLTIP"));},"_favIcon":function(P){return this._getIcon(P,"favorite",P.oLibraryResourceBundleOP.getText("TOOLTIP_OP_FAVORITE_MARK_VALUE"));},"_flagIcon":function(P){return this._getIcon(P,"flag",P.oLibraryResourceBundleOP.getText("TOOLTIP_OP_FLAG_MARK_VALUE"));},"_overflowButton":function(P){return this._getButton(P,"sap-icon://overflow","overflow");},"_expandButton":function(P){return this._getButton(P,"sap-icon://slim-arrow-down","expand",P.oLibraryResourceBundleOP.getText("TOOLTIP_OP_EXPAND_HEADER_BTN"));},"_changesIconCont":function(P){return this._getButton(P,"sap-icon://user-edit","changes-cont",P.oLibraryResourceBundleOP.getText("TOOLTIP_OP_CHANGES_MARK_VALUE"));},"_changesIcon":function(P){return this._getButton(P,"sap-icon://user-edit","changes",P.oLibraryResourceBundleOP.getText("TOOLTIP_OP_CHANGES_MARK_VALUE"));},_getIcon:function(P,i,t){return I.createControlByURI({id:this._getParentAugmentedId(P,i),tooltip:t,src:I.getIconURI(i),visible:false});},_getButton:function(P,i,s,t){return new c({id:this._getParentAugmentedId(P,s),tooltip:t,icon:i,type:sap.m.ButtonType.Transparent});},_getParentAugmentedId:function(P,s){return P.getId()+"-"+s;}};f.prototype._lazyLoadInternalAggregation=function(s,S){if(!this.getAggregation(s)){this.setAggregation(s,f._internalAggregationFactory[s](this),S);}return this.getAggregation(s);};f.prototype._applyActionProperty=function(P,i){var n=i[0];if(this.getProperty(P)!==n){i.unshift(P);this.setProperty.apply(this,i);if(!this._bFirstRendering){this._notifyParentOfChanges();}}return this;};f.prototype._applyObjectImageProperty=function(P,i){var n=i[0];if(this.getProperty(P)!==n){i.unshift(P);this.setProperty.apply(this,i);this._destroyObjectImage();if(!this._bFirstRendering){this._notifyParentOfChanges(true);}}return this;};f.prototype._proxyMethodToBreadCrumbControl=function(F,i){var j=this._lazyLoadInternalAggregation("_breadCrumbs"),r=j[F].apply(j,i);this.invalidate();return r;};f.prototype.setHeaderDesign=function(H){this.setProperty("headerDesign",H);if(this.getParent()){this.getParent().invalidate();}return this;};f.prototype._shiftHeaderTitle=function(){var P=this.getParent(),s;if(!P||(typeof P._calculateShiftOffset!=="function")){return;}s=P._calculateShiftOffset();if(typeof P._shiftHeader==="function"){P._shiftHeader(s.sStyleAttribute,s.iMarginalsOffset+"px");}};f.prototype.setObjectTitle=function(n){var s=this.getProperty("objectTitle"),i=s!==n;this._applyActionProperty("objectTitle",Array.prototype.slice.call(arguments));if(i&&this.mEventRegistry["_titleChange"]){this.fireEvent("_titleChange",{"id":this.getId(),"name":"objectTitle","oldValue":s,"newValue":n});}return this;};var p=["objectSubtitle","showTitleSelector","markLocked","markFavorite","markFlagged","showMarkers","showPlaceholder","markChanges"],o=["objectImageURI","objectImageAlt","objectImageDensityAware","objectImageShape"];var g=function(P){var s="set"+P.charAt(0).toUpperCase()+P.slice(1);f.prototype[s]=function(){var i=Array.prototype.slice.call(arguments);this._applyActionProperty.call(this,P,i);};};var G=function(P){var s="set"+P.charAt(0).toUpperCase()+P.slice(1);f.prototype[s]=function(){var i=Array.prototype.slice.call(arguments);this._applyObjectImageProperty.call(this,P,i);};};var h=function(P,s,t){var i="set"+P.charAt(0).toUpperCase()+P.slice(1);s[i]=function(){var j=Array.prototype.slice.call(arguments);j.unshift(P);t.setProperty.apply(t,j);return this.setProperty.apply(this,j);};};p.forEach(g);o.forEach(G);f.prototype.getBreadCrumbsLinks=function(){return this._lazyLoadInternalAggregation("_breadCrumbs").getLinks();};f.prototype.addBreadCrumbLink=function(){return this._proxyMethodToBreadCrumbControl("addLink",arguments);};f.prototype.indexOfBreadCrumbLink=function(){return this._proxyMethodToBreadCrumbControl("indexOfLink",arguments);};f.prototype.insertBreadCrumbLink=function(){return this._proxyMethodToBreadCrumbControl("insertLink",arguments);};f.prototype.removeBreadCrumbLink=function(){return this._proxyMethodToBreadCrumbControl("removeLink",arguments);};f.prototype.removeAllBreadCrumbsLinks=function(){return this._proxyMethodToBreadCrumbControl("removeAllLinks",arguments);};f.prototype.destroyBreadCrumbsLinks=function(){return this._proxyMethodToBreadCrumbControl("destroyLinks",arguments);};f.prototype._destroyObjectImage=function(){var s="_objectImage",i=this.getAggregation(s);if(i){i.destroy();this.setAggregation(s,null);}};f.prototype.onBeforeRendering=function(){var s=this.getSideContentButton();if(s&&!s.getTooltip()){s.setTooltip(this.oLibraryResourceBundleOP.getText("TOOLTIP_OP_SHOW_SIDE_CONTENT"));}var i=this.getActions()||[];this._oOverflowActionSheet.removeAllButtons();this._oActionSheetButtonMap={};if(i.length>1||this._hasOneButtonShowText(i)){i.forEach(function(j){if(j instanceof c&&!(j instanceof O)){j._bInternalVisible=j.getVisible();j._getInternalVisible=function(){return this._bInternalVisible;};j._setInternalVisible=function(v,m){this.$().toggle(v);if(v!=this._bInternalVisible){this._bInternalVisible=v;if(m){this.invalidate();}}};j.onAfterRendering=function(){if(!this._getInternalVisible()){this.$().hide();}};}if(j instanceof c&&(j.getType()==="Default"||j.getType()==="Unstyled")){j.setProperty("type",sap.m.ButtonType.Transparent,false);}if(j instanceof c&&j.getVisible()){var k=this._createActionSheetButton(j);this._oActionSheetButtonMap[j.getId()]=k;this._oOverflowActionSheet.addButton(k);h("text",j,k);h("icon",j,k);h("enabled",j,k);}},this);}this._oTitleArrowIcon.setVisible(this.getShowTitleSelector());this._oFavIcon.setVisible(this.getMarkFavorite());this._oFlagIcon.setVisible(this.getMarkFlagged());this._attachDetachActionButtonsHandler(false);this._bFirstRendering=false;};f.prototype._createActionSheetButton=function(i){return new c({press:jQuery.proxy(this._onSeeMoreContentSelect,this),enabled:i.getEnabled(),text:i.getText(),icon:i.getIcon(),tooltip:i.getTooltip(),customData:new a({key:"originalId",value:i.getId()})});};f.prototype._handleImageNotFoundError=function(){var i=this._lazyLoadInternalAggregation("_objectImage"),P=this.getParent(),$=P?P.$():this.$();if(this.getShowPlaceholder()){$.find(".sapMImg.sapUxAPObjectPageHeaderObjectImage").hide();$.find(".sapUxAPObjectPageHeaderPlaceholder").removeClass("sapUxAPHidePlaceholder");}else{i.addStyleClass("sapMNoImg");}};f.prototype._clearImageNotFoundHandler=function(){this._lazyLoadInternalAggregation("_objectImage").$().off("error");};f.prototype.onAfterRendering=function(){var $=this._lazyLoadInternalAggregation("_objectImage").$();this._adaptLayout();this._clearImageNotFoundHandler();$.error(this._handleImageNotFoundError.bind(this));if(!this.getObjectImageURI()){this._handleImageNotFoundError();}if(!this._iResizeId){this._iResizeId=R.register(this,this._onHeaderResize.bind(this));}this._shiftHeaderTitle();this._attachDetachActionButtonsHandler(true);};f.prototype._onHeaderResize=function(){this._adaptLayout();if(this.getParent()&&typeof this.getParent()._adjustHeaderHeights==="function"){this.getParent()._adjustHeaderHeights();}};f.prototype._attachDetachActionButtonsHandler=function(i){var j=this.getActions()||[];if(j.length<1){return;}j.forEach(function(k){if(k instanceof c){var m=this._oActionSheetButtonMap[k.getId()];if(i){k.attachEvent("_change",this._adaptLayout,this);if(m){m.attachEvent("_change",this._adaptOverflow,this);}}else{k.detachEvent("_change",this._adaptLayout,this);if(m){m.detachEvent("_change",this._adaptOverflow,this);}}}},this);};f.prototype._onSeeMoreContentSelect=function(E){var P=E.getSource(),i=sap.ui.getCore().byId(P.data("originalId"));if(i.firePress){i.firePress({overflowButtonId:this._oOverflowButton.getId()});}this._oOverflowActionSheet.close();};f._actionImportanceMap={"Low":3,"Medium":2,"High":1};f._sortActionsByImportance=function(i,j){var s=(i instanceof O)?i.getImportance():sap.uxap.Importance.High,k=(j instanceof O)?j.getImportance():sap.uxap.Importance.High,m=f._actionImportanceMap[s]-f._actionImportanceMap[k];if(m===0){return i.position-j.position;}return m;};f.prototype._hasOneButtonShowText=function(i){var j=false;if(i.length!==1){return j;}if(i[0]instanceof O){j=(!i[0].getHideText()&&i[0].getText()!="");}else if(i[0]instanceof c){j=(i[0].getText()!="");}return j;};f.prototype._adaptLayout=function(E){var i=this.$("identifierLine").width(),j=this._getActionsWidth(),k=j/i,m=this._iAvailablePercentageForActions*i,$=this._oOverflowButton.$(),n=this.$("actions").find(".sapMBtn").not(".sapUxAPObjectPageHeaderExpandButton");if(k>this._iAvailablePercentageForActions){this._adaptActions(m);}else if(E&&E.getSource()instanceof O){E.getSource()._setInternalVisible(true);}if(sap.ui.Device.system.phone){n.css("visibility","visible");}if(n.filter(":visible").length===n.length){$.hide();}this._adaptObjectPageHeaderIndentifierLine();};f.prototype._adaptObjectPageHeaderIndentifierLine=function(){var i=this.$("identifierLine").width(),$=this.$("subtitle"),j=this.$("identifierLineContainer"),s,t,k=this.$("actions").width()+this.$().find(".sapUxAPObjectPageHeaderObjectImageContainer").width(),P=this.$().parents().hasClass('sapUiSizeCompact')?7:3;if($.length){if($.hasClass("sapOPHSubtitleBlock")){$.removeClass("sapOPHSubtitleBlock");}s=$.outerHeight()+$.position().top;t=this.$("innerTitle").outerHeight()+this.$("innerTitle").position().top;if(Math.abs(s-t)>P){$.addClass("sapOPHSubtitleBlock");}}j.width((0.95-(k/i))*100+"%");};f.prototype._adaptActions=function(j){var m=l.Utilities.isPhoneScenario(this._getCurrentMediaContainerRange())||D.system.phone,v=this._oOverflowButton.$().show().width(),k=this.getActions(),n=k.length,q;for(var i=0;i<n;i++){k[i].position=i;}k.sort(f._sortActionsByImportance);k.forEach(function(r){q=this._oActionSheetButtonMap[r.getId()];if(q){v+=r.$().width();if(j>v&&!m){this._setActionButtonVisibility(r,true);}else{this._setActionButtonVisibility(r,false);}}},this);};f.prototype._adaptOverflow=function(){var i=this._oOverflowActionSheet.getButtons();var H=i.some(function(j){return j.getVisible();});this._oOverflowButton.$().toggle(H);};f.prototype._setActionButtonVisibility=function(i,v){var j=this._oActionSheetButtonMap[i.getId()];if(j){if(i.getVisible()){i._setInternalVisible(v);j.setVisible(!v);}else{j.setVisible(false);}}};f.prototype._getActionsWidth=function(){var w=0;this.getActions().forEach(function(i){if(i instanceof c){i.$().show();if(sap.ui.Device.system.phone){i.$().css("visibility","hidden");}w+=i.$().outerWidth(true);}});return w;};f.prototype._notifyParentOfChanges=function(i){var P=this.getParent();if(P&&typeof P._headerTitleChangeHandler==="function"){P._headerTitleChangeHandler(i);}};f.prototype.exit=function(){this._clearImageNotFoundHandler();if(this._iResizeId){R.deregister(this._iResizeId);}};f.prototype.setNavigationBar=function(i){this.setAggregation("navigationBar",i);if(i&&this.mEventRegistry["_adaptableContentChange"]){this.fireEvent("_adaptableContentChange",{"parent":this,"adaptableContent":i});}return this;};f.prototype._getAdaptableContent=function(){return this.getNavigationBar();};return f;});
