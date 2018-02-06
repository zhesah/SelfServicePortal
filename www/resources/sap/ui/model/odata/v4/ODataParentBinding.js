/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/ChangeReason","./ODataBinding","./lib/_Helper","./lib/_SyncPromise"],function(C,a,_,b){"use strict";function O(){}a(O.prototype);var r=/\([^/]*|\/\d+|^\d+\//g;O.prototype.changeParameters=function(p){var B=jQuery.extend(true,{},this.mParameters),c=false,k;if(!p){throw new Error("Missing map of binding parameters");}for(k in p){if(k.indexOf("$$")===0){throw new Error("Unsupported parameter: "+k);}if(p[k]===undefined&&B[k]!==undefined){delete B[k];c=true;}else if(B[k]!==p[k]){if(typeof p[k]==="object"){B[k]=jQuery.extend(true,{},p[k]);}else{B[k]=p[k];}c=true;}}if(c){this.applyParameters(B,C.Change);}};O.prototype.createCache=function(c,v,f){var o,p,t=this;if(this.oCachePromise&&this.oCachePromise.isFulfilled()){o=this.oCachePromise.getResult();if(o){o.setActive(false);}}p=b.all([v,f]).then(function(R){var s=R[0],d,e;if(!p||t.oCachePromise===p){if(s){t.mCacheByContext=t.mCacheByContext||{};d=t.mCacheByContext[s];if(d){d.setActive(true);}else{d=t.mCacheByContext[s]=c(s,R[1]);d.$canonicalPath=s;}}else{d=c(s,R[1]);}return d;}else{e=new Error("Cache discarded as a new cache has been created");e.canceled=true;throw e;}});p["catch"](function(e){t.oModel.reportError("Failed to create cache for binding "+t,"sap.ui.model.odata.v4.ODataParentBinding",e);});return p;};O.prototype.getQueryOptions=function(c){var o=this.mQueryOptions;if(!Object.keys(o).length){o=this.inheritQueryOptions(c);}return jQuery.extend({},this.oModel.mUriParameters,o);};O.prototype.inheritQueryOptions=function(c){var R;if(!this.isRelative()||!c||!c.getQueryOptions){return undefined;}R=c.getQueryOptions();if(!R){return undefined;}this.sPath.replace(r,"").split("/").some(function(s){R=R.$expand&&R.$expand[s];if(!R||R===true){R=undefined;return true;}});return R;};O.prototype.initialize=function(){if(!this.bRelative||this.oContext){this._fireChange({reason:C.Change});}};O.prototype.updateValue=function(g,p,v,e,P){var c;if(!this.oCachePromise.isFulfilled()){throw new Error("PATCH request not allowed");}c=this.oCachePromise.getResult();if(c){g=g||this.getUpdateGroupId();return c.update(g,p,v,e,P);}return this.oContext.updateValue(g,p,v,e,_.buildPath(this.sPath,P));};return function(p){jQuery.extend(p,O.prototype);};},false);
