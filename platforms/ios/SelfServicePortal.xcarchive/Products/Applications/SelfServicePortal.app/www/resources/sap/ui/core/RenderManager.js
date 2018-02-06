/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','../base/Interface','../base/Object','./LabelEnablement','jquery.sap.act','jquery.sap.encoder','jquery.sap.dom','jquery.sap.trace'],function(q,I,B,L){"use strict";var c=["renderControl","write","writeEscaped","translate","writeAcceleratorKey","writeControlData","writeInvisiblePlaceholderData","writeElementData","writeAttribute","writeAttributeEscaped","addClass","writeClasses","addStyle","writeStyles","writeAccessibilityState","writeIcon","getConfiguration","getHTML","cleanupControlWithoutRendering"];var N=["render","flush","destroy"];function R(){var t=this,F,l,o,S,p,u;this._setFocusHandler=function(n){F=n;};function v(){l=t.aBuffer=[];o=t.aRenderedControls=[];S=t.aStyleStack=[{}];}this.write=function(T){l.push.apply(l,arguments);return this;};this.writeEscaped=function(T,e){if(T!=null){T=q.sap.encodeHTML(String(T));if(e){T=T.replace(/&#xa;/g,"<br>");}l.push(T);}return this;};this.writeAttribute=function(n,V){l.push(" ",n,"=\"",V,"\"");return this;};this.writeAttributeEscaped=function(n,V){l.push(" ",n,"=\"",q.sap.encodeHTML(String(V)),"\"");return this;};this.addStyle=function(n,e){if(e!=null){var i=S[S.length-1];if(!i.aStyle){i.aStyle=[];}i.aStyle.push(n+":"+e);}return this;};this.writeStyles=function(){var e=S[S.length-1];if(e.aStyle){this.write(" style=\""+e.aStyle.join(";")+"\" ");}e.aStyle=null;return this;};this.addClass=function(n){if(n){var e=S[S.length-1];if(!e.aClasses){e.aClasses=[];}e.aClasses.push(n);}return this;};this.writeClasses=function(e){var j=S[S.length-1];var E;if(e){E=e.aCustomStyleClasses;}else if(e===false){E=[];}else{E=j.aCustomStyleClasses;}if(j.aClasses||E){var G=[].concat(j.aClasses||[],E||[]);G.sort();G=G.filter(function(n,i){return i==0||n!==G[i-1];});this.write(" class=\"",G.join(" "),"\" ");}if(!e){j.aCustomStyleClasses=null;}j.aClasses=null;return this;};function w(e){u=true;try{var E=q.Event("BeforeRendering");E.srcControl=e;e._handleEvent(E);}finally{u=false;}}this.cleanupControlWithoutRendering=function(e){if(!e||!e.getDomRef()){return;}w(e);e.bOutput=false;};this.renderControl=function(e){if(!e){return this;}if(!p){p=[];}if(p&&p.length>0){q.sap.measure.pause(p[0]+"---renderControl");}else if(e.getParent()&&e.getParent().getMetadata().getName()=="sap.ui.core.UIArea"){q.sap.measure.pause(e.getParent().getId()+"---rerender");}p.unshift(e.getId());q.sap.measure.start(e.getId()+"---renderControl","Rendering of "+e.getMetadata().getName(),["rendering","control"]);var j=l.length;var n={};if(e.aCustomStyleClasses&&e.aCustomStyleClasses.length>0){n.aCustomStyleClasses=e.aCustomStyleClasses;}S.push(n);q.sap.measure.pause(e.getId()+"---renderControl");var E;var M=e.getMetadata();var V=e.getVisible();if(V){E=M.getRenderer();}else{var G=M.getProperty("visible");var U=G&&G._oParent&&G._oParent.getName()=="sap.ui.core.Control";E=U?s:M.getRenderer();}q.sap.measure.resume(e.getId()+"---renderControl");w(e);var H=e.aBindParameters;if(H&&H.length>0){var J=q(e.getDomRef());if(J&&J[0]){for(var i=0;i<H.length;i++){var P=H[i];J.unbind(P.sEventType,P.fnProxy);}}}if(E&&typeof E.render==="function"){E.render(z,e);}else{q.sap.log.error("The renderer for class "+M.getName()+" is not defined or does not define a render function! Rendering of "+e.getId()+" will be skipped!");}S.pop();o.push(e);if(e.getUIArea&&e.getUIArea()){e.getUIArea()._onControlRendered(e);}e.bOutput=l.length!=j;if(E===s){e.bOutput="invisible";}q.sap.measure.end(e.getId()+"---renderControl");p.shift();if(p&&p.length>0){q.sap.measure.resume(p[0]+"---renderControl");}else if(e.getParent()&&e.getParent().getMetadata().getName()=="sap.ui.core.UIArea"){q.sap.measure.resume(e.getParent().getId()+"---rerender");}return this;};this.getHTML=function(e){var i=l;var j=l=this.aBuffer=[];this.renderControl(e);l=this.aBuffer=i;return j.join("");};function x(n){var i,E=o.length;for(i=0;i<E;i++){o[i]._sapui_bInAfterRenderingPhase=true;}u=true;try{for(i=0;i<E;i++){var G=o[i];if(G.bOutput&&G.bOutput!=="invisible"){var H=q.Event("AfterRendering");H.srcControl=G;q.sap.measure.start(G.getId()+"---AfterRendering","AfterRendering of "+G.getMetadata().getName(),["rendering","after"]);G._handleEvent(H);q.sap.measure.end(G.getId()+"---AfterRendering");}}}finally{for(i=0;i<E;i++){delete o[i]._sapui_bInAfterRenderingPhase;}u=false;}try{F.restoreFocus(n);}catch(e){q.sap.log.warning("Problems while restoring the focus after rendering: "+e,null);}for(i=0;i<E;i++){var G=o[i],J=G.aBindParameters;if(J&&J.length>0){var K=q(G.getDomRef());if(K&&K[0]){for(var j=0;j<J.length;j++){var P=J[j];K.bind(P.sEventType,P.fnProxy);}}}}}function y(P){var e=F?F.getControlFocusInfo():null;var H=l.join("");P(H);x(e);v();q.sap.act.refresh();q.sap.interaction.notifyStepEnd();}this.flush=function(T,e,j){if(!e&&(typeof j!=="number")&&!j){R.preserveContent(T);}y(function(H){for(var i=0;i<o.length;i++){var n=o[i].getDomRef();if(n&&!R.isPreservedContent(n)){if(R.isInlineTemplate(n)){q(n).empty();}else{q(n).remove();}}}if(typeof j==="number"){if(j<=0){q(T).prepend(H);}else{var $=q(T).children().eq(j-1);if($.length===1){$.after(H);}else{q(T).append(H);}}}else if(!j){q(T).html(H);}else{q(T).append(H);}});};this.render=function(e,T){if(u){q.sap.log.error("Render must not be called within Before or After Rendering Phase. Call ignored.",null,this);return;}v();this.renderControl(e);y(function(H){if(e&&T){var i=e.getDomRef();if(!i||R.isPreservedContent(i)){i=q.sap.domById(a.Invisible+e.getId())||q.sap.domById(a.Dummy+e.getId());}var n=i&&i.parentNode!=T;var j=function(){var E=q(T);if(T.innerHTML==""){E.html(H);}else{E.append(H);}};if(n){if(!R.isPreservedContent(i)){if(R.isInlineTemplate(i)){q(i).empty();}else{q(i).remove();}}if(H){j();}}else{if(H){if(i){if(R.isInlineTemplate(i)){q(i).html(H);}else if(r()){q.sap.replaceDOM(i,H,true);}else{q(i).replaceWith(H);}}else{j();}}else{if(R.isInlineTemplate(i)){q(i).empty();}else{if(!e.getParent()||!e.getParent()._onChildRerenderedEmpty||!e.getParent()._onChildRerenderedEmpty(e,i)){q(i).remove();}}}}}});};this.destroy=function(){v();};var z={};var C={};c.forEach(function(M){z[M]=C[M]=t[M];});N.forEach(function(M){C[M]=t[M];});this.getRendererInterface=function(){return z;};this.getInterface=function(){return C;};v();}R.prototype.getConfiguration=function(){return sap.ui.getCore().getConfiguration();};R.prototype.translate=function(K){};R.prototype.writeAcceleratorKey=function(){return this;};R.prototype.writeControlData=function(C){this.writeElementData(C);return this;};R.prototype.writeInvisiblePlaceholderData=function(e){var p=R.createInvisiblePlaceholderId(e),P=' '+'id="'+p+'" '+'class="sapUiHiddenPlaceholder" '+'data-sap-ui="'+p+'" '+'style="display: none;"'+'aria-hidden="true" ';this.write(P);return this;};R.prototype.writeElementData=function(e){var j=e.getId();if(j){this.writeAttribute("id",j).writeAttribute("data-sap-ui",j);}var n=e.getCustomData();var l=n.length;for(var i=0;i<l;i++){var C=n[i]._checkWriteToDom(e);if(C){this.writeAttributeEscaped(C.key,C.value);}}return this;};R.prototype.writeAccessibilityState=function(e,P){if(!sap.ui.getCore().getConfiguration().getAccessibility()){return this;}if(arguments.length==1&&!(k(e,'sap/ui/core/Element'))){P=e;e=null;}var j={};if(e!=null){var M=e.getMetadata();var l=function(E,i,v){var y=M.getProperty(E);if(y&&e[y._sGetter]()===v){j[i]="true";}};var n=function(E,v){var y=M.getAssociation(E);if(y&&y.multiple){var z=e[y._sGetter]();if(E=="ariaLabelledBy"){var C=L.getReferencingLabels(e);var F=C.length;if(F){var G=[];for(var i=0;i<F;i++){if(z.indexOf(C[i])<0){G.push(C[i]);}}z=G.concat(z);}}if(z.length>0){j[v]=z.join(" ");}}};l("editable","readonly",false);l("enabled","disabled",false);l("visible","hidden",false);if(L.isRequired(e)){j["required"]="true";}l("selected","selected",true);l("checked","checked",true);n("ariaDescribedBy","describedby");n("ariaLabelledBy","labelledby");}if(P){var o=function(v){var i=typeof(v);return v===null||v===""||i==="number"||i==="string"||i==="boolean";};var t={};var x,u,w;for(x in P){u=P[x];if(o(u)){t[x]=u;}else if(typeof(u)==="object"&&o(u.value)){w="";if(u.append&&(x==="describedby"||x==="labelledby")){w=j[x]?j[x]+" ":"";}t[x]=w+u.value;}}q.extend(j,t);}if(k(e,'sap/ui/core/Element')&&e.getParent()&&e.getParent().enhanceAccessibilityState){e.getParent().enhanceAccessibilityState(e,j);}for(var p in j){if(j[p]!=null&&j[p]!==""){this.writeAttributeEscaped(p==="role"?p:"aria-"+p,j[p]);}}return this;};R.prototype.writeIcon=function(u,C,e){var i=sap.ui.requireSync("sap/ui/core/IconPool"),j=i.isIconURI(u),S=j?"<span ":"<img ",l=false,n,p,o,t,v,w;if(typeof C==="string"){C=[C];}if(j){o=i.getIconInfo(u);if(!o){q.sap.log.error("An unregistered icon: "+u+" is used in sap.ui.core.RenderManager's writeIcon method.");return this;}if(!C){C=[];}C.push("sapUiIcon");if(!o.suppressMirroring){C.push("sapUiIconMirrorInRTL");}}this.write(S);if(Array.isArray(C)&&C.length){n=C.join(" ");this.write("class=\""+n+"\" ");}if(j){t={"data-sap-ui-icon-content":o.content,"role":"presentation","title":o.text||null};this.write("style=\"font-family: "+o.fontFamily+";\" ");}else{t={role:"presentation",alt:"",src:u};}e=q.extend(t,e);if(!e.id){e.id=q.sap.uid();}if(j){v=e.alt||e.title||o.text||o.name;w=e.id+"-label";if(e["aria-labelledby"]){l=true;e["aria-labelledby"]+=(" "+w);}else if(!e.hasOwnProperty("aria-label")){e["aria-label"]=v;}}if(typeof e==="object"){for(p in e){if(e.hasOwnProperty(p)&&e[p]!==null){this.writeAttributeEscaped(p,e[p]);}}}if(j){this.write(">");if(l){this.write("<span style=\"display:none;\" id=\""+w+"\">"+v+"</span>");}this.write("</span>");}else{this.write("/>");}return this;};R.prototype.getRenderer=function(C){return R.getRenderer(C);};var a=R.RenderPrefixes={Invisible:"sap-ui-invisible-",Dummy:"sap-ui-dummy-"};R.getRenderer=function(C){return C.getMetadata().getRenderer();};R.forceRepaint=function(v){var o=typeof v=="string"?q.sap.domById(v):v;if(o){q.sap.log.debug("forcing a repaint for "+(o.id||String(o)));var O=o.style.display;var e=document.activeElement;o.style.display="none";o.offsetHeight;o.style.display=O;if(document.activeElement!==e){q.sap.focus(e);}}};R.createInvisiblePlaceholderId=function(e){return a.Invisible+e.getId();};var b="sap-ui-preserve",d="sap-ui-static",A="data-sap-ui-preserve",f="data-sap-ui-area";function g(){var $=q.sap.byId(b);if($.length===0){$=q("<DIV/>",{"aria-hidden":"true",id:b}).addClass("sapUiHidden").addClass("sapUiForcedHidden").css("width","0").css("height","0").css("overflow","hidden").appendTo(document.body);}return $;}function m(n){q("<DIV/>",{id:a.Dummy+n.id}).addClass("sapUiHidden").insertBefore(n);}R.preserveContent=function(o,p,P){sap.ui.getCore().getEventBus().publish("sap.ui","__preserveContent",{domNode:o});var $=g();function e(i){if(i.id===b||i.id===d){return;}if(i.hasAttribute(A)){if(i===o){m(i);}$.append(i);}else if(P&&i.id){R.markPreservableContent(q(i),i.id);$.append(i);return;}if(!i.hasAttribute(f)){var n=i.firstChild;while(n){i=n;n=n.nextSibling;if(i.nodeType===1){e(i);}}}}q.sap.measure.start(o.id+"---preserveContent","preserveContent for "+o.id,["rendering","preserve"]);if(p){e(o);}else{q(o).children().each(function(i,n){e(n);});}q.sap.measure.end(o.id+"---preserveContent");};R.findPreservedContent=function(i){var $=g(),e=$.children("["+A+"='"+i.replace(/(:|\.)/g,'\\$1')+"']");return e;};R.markPreservableContent=function($,i){$.attr(A,i);};R.isPreservedContent=function(o){return(o&&o.getAttribute(A)&&o.parentNode&&o.parentNode.id==b);};R.getPreserveAreaRef=function(){return g()[0];};var h="data-sap-ui-template";R.markInlineTemplate=function($){$.attr(h,"");};R.isInlineTemplate=function(o){return(o&&o.hasAttribute(h));};function k(o,M){var F=sap.ui.require(M);return typeof F==='function'&&(o instanceof F);}var D;function r(){if(D===undefined){D=sap.ui.getCore().getConfiguration().getDomPatching();if(D){q.sap.log.warning("DOM Patching is enabled: This feature should be used only for testing purposes!");}}return D;}var s={render:function(o,C){o.write("<span");o.writeInvisiblePlaceholderData(C);o.write("></span>");}};return R;},true);
