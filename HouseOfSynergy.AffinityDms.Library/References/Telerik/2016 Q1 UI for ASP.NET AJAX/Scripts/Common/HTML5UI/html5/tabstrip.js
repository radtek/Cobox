(function(b,a,e){var d=window.jQuery,c=window.$;
window.$=window.jQuery=a;
(function(g,f,j){var i=window.jQuery,h=window.$;
window.$=window.jQuery=f;
(function(l,k){k("kendo.tabstrip",["kendo.data"],l);
}(function(){var k={id:"tabstrip",name:"TabStrip",category:"web",description:"The TabStrip widget displays a collection of tabs with associated tab content.",depends:["data"]};
(function(l,aa){var G=window.kendo,Z=G.ui,H=G.keys,K=l.map,u=l.each,Y=l.trim,y=l.extend,W=G.template,ad=Z.Widget,x=/^(a|div)$/i,O=".kendoTabStrip",F="img",D="href",P="prev",T="show",J="k-link",I="k-last",o="click",w="error",v=":empty",E="k-image",z="k-first",S="select",m="activate",p="k-content",r="contentUrl",L="mouseenter",M="mouseleave",q="contentLoad",t="k-state-disabled",s="k-state-default",n="k-state-active",A="k-state-focused",C="k-state-hover",U="k-tab-on-top",N=".k-item:not(."+t+")",B=".k-tabstrip-items > "+N+":not(."+n+")",X={content:W("<div class='k-content'#= contentAttributes(data) # role='tabpanel'>#= content(item) #</div>"),itemWrapper:W("<#= tag(item) # class='k-link'#= contentUrl(item) ##= textAttributes(item) #>#= image(item) ##= sprite(item) ##= text(item) #</#= tag(item) #>"),item:W("<li class='#= wrapperCssClass(group, item) #' role='tab' #=item.active ? \"aria-selected='true'\" : ''#>#= itemWrapper(data) #</li>"),image:W("<img class='k-image' alt='' src='#= imageUrl #' />"),sprite:W("<span class='k-sprite #= spriteCssClass #'></span>"),empty:W("")},Q={wrapperCssClass:function(ae,ag){var ah="k-item",af=ag.index;
if(ag.enabled===false){ah+=" k-state-disabled";
}else{ah+=" k-state-default";
}if(af===0){ah+=" k-first";
}if(af==ae.length-1){ah+=" k-last";
}return ah;
},textAttributes:function(ae){return ae.url?" href='"+ae.url+"'":"";
},text:function(ae){return ae.encoded===false?ae.text:G.htmlEncode(ae.text);
},tag:function(ae){return ae.url?"a":"span";
},contentAttributes:function(ae){return ae.active!==true?" style='display:none' aria-hidden='true' aria-expanded='false'":"";
},content:function(ae){return ae.content?ae.content:ae.contentUrl?"":"&nbsp;";
},contentUrl:function(ae){return ae.contentUrl?G.attr("content-url")+'="'+ae.contentUrl+'"':"";
}};
function ac(ae){ae.children(F).addClass(E);
ae.children("a").addClass(J).children(F).addClass(E);
ae.filter(":not([disabled]):not([class*=k-state-disabled])").addClass(s);
ae.filter("li[disabled]").addClass(t).removeAttr("disabled");
ae.filter(":not([class*=k-state])").children("a").filter(":focus").parent().addClass(n+" "+U);
ae.attr("role","tab");
ae.filter("."+n).attr("aria-selected",true);
ae.each(function(){var af=l(this);
if(!af.children("."+J).length){af.contents().filter(function(){return !this.nodeName.match(x)&&!(this.nodeType==3&&!Y(this.nodeValue));
}).wrapAll("<span class='"+J+"'/>");
}});
}function ab(ae){var af=ae.children(".k-item");
af.filter(".k-first:not(:first-child)").removeClass(z);
af.filter(".k-last:not(:last-child)").removeClass(I);
af.filter(":first-child").addClass(z);
af.filter(":last-child").addClass(I);
}function R(ae,af){return"<span class='k-button k-button-icon k-button-bare k-tabstrip-"+ae+"' unselectable='on'><span class='k-icon "+af+"'></span></span>";
}var V=ad.extend({init:function(af,ag){var ai=this,aj;
ad.fn.init.call(ai,af,ag);
ai._animations(ai.options);
ag=ai.options;
ai._wrapper();
ai._isRtl=G.support.isRtl(ai.wrapper);
ai._tabindex();
ai._updateClasses();
ai._dataSource();
if(ag.dataSource){ai.dataSource.fetch();
}ai._tabPosition();
ai._scrollable();
if(ai.options.contentUrls){ai.wrapper.find(".k-tabstrip-items > .k-item").each(function(ak,al){l(al).find(">."+J).data(r,ai.options.contentUrls[ak]);
});
}ai.wrapper.on(L+O+" "+M+O,B,ai._toggleHover).on("focus"+O,l.proxy(ai._active,ai)).on("blur"+O,function(){ai._current(null);
});
ai._keyDownProxy=l.proxy(ai._keydown,ai);
if(ag.navigatable){ai.wrapper.on("keydown"+O,ai._keyDownProxy);
}if(ai.options.value){aj=ai.options.value;
}ai.wrapper.children(".k-tabstrip-items").on(o+O,".k-state-disabled .k-link",false).on(o+O," > "+N,function(ak){var an=ai.wrapper[0];
if(an!==document.activeElement){var am=G.support.browser.msie;
if(am){try{an.setActive();
}catch(al){an.focus();
}}else{an.focus();
}}if(ai._click(l(ak.currentTarget))){ak.preventDefault();
}});
var ah=ai.tabGroup.children("li."+n),ae=ai.contentHolder(ah.index());
if(ah[0]&&ae.length>0&&ae[0].childNodes.length===0){ai.activateTab(ah.eq(0));
}ai.element.attr("role","tablist");
if(ai.element[0].id){ai._ariaId=ai.element[0].id+"_ts_active";
}ai.value(aj);
G.notify(ai);
},_active:function(){var ae=this.tabGroup.children().filter("."+n);
ae=ae[0]?ae:this._endItem("first");
if(ae[0]){this._current(ae);
}},_endItem:function(ae){return this.tabGroup.children(N)[ae]();
},_item:function(ag,ae){var af;
if(ae===P){af="last";
}else{af="first";
}if(!ag){return this._endItem(af);
}ag=ag[ae]();
if(!ag[0]){ag=this._endItem(af);
}if(ag.hasClass(t)){ag=this._item(ag,ae);
}return ag;
},_current:function(ae){var ah=this,af=ah._focused,ag=ah._ariaId;
if(ae===aa){return af;
}if(af){if(af[0].id===ag){af.removeAttr("id");
}af.removeClass(A);
}if(ae){if(!ae.hasClass(n)){ae.addClass(A);
}ah.element.removeAttr("aria-activedescendant");
ag=ae[0].id||ag;
if(ag){ae.attr("id",ag);
ah.element.attr("aria-activedescendant",ag);
}}ah._focused=ae;
},_keydown:function(ag){var aj=this,ah=ag.keyCode,af=aj._current(),ai=aj._isRtl,ae;
if(ag.target!=ag.currentTarget){return;
}if(ah==H.DOWN||ah==H.RIGHT){ae=ai?P:"next";
}else{if(ah==H.UP||ah==H.LEFT){ae=ai?"next":P;
}else{if(ah==H.ENTER||ah==H.SPACEBAR){aj._click(af);
ag.preventDefault();
}else{if(ah==H.HOME){aj._click(aj._endItem("first"));
ag.preventDefault();
return;
}else{if(ah==H.END){aj._click(aj._endItem("last"));
ag.preventDefault();
return;
}}}}}if(ae){aj._click(aj._item(af,ae));
ag.preventDefault();
}},_dataSource:function(){var ae=this;
if(ae.dataSource&&ae._refreshHandler){ae.dataSource.unbind("change",ae._refreshHandler);
}else{ae._refreshHandler=l.proxy(ae.refresh,ae);
}ae.dataSource=G.data.DataSource.create(ae.options.dataSource).bind("change",ae._refreshHandler);
},setDataSource:function(ae){var af=this;
af.options.dataSource=ae;
af._dataSource();
af.dataSource.fetch();
},_animations:function(ae){if(ae&&"animation" in ae&&!ae.animation){ae.animation={open:{effects:{}},close:{effects:{}}};
}},refresh:function(ah){var aq=this,al=aq.options,ap=G.getter(al.dataTextField),af=G.getter(al.dataContentField),ag=G.getter(al.dataContentUrlField),aj=G.getter(al.dataImageUrlField),ar=G.getter(al.dataUrlField),am=G.getter(al.dataSpriteCssClass),ai,ao=[],an,ae,at=aq.dataSource.view(),ak;
ah=ah||{};
ae=ah.action;
if(ae){at=ah.items;
}for(ai=0,ak=at.length;
ai<ak;
ai++){an={text:ap(at[ai])};
if(al.dataContentField){an.content=af(at[ai]);
}if(al.dataContentUrlField){an.contentUrl=ag(at[ai]);
}if(al.dataUrlField){an.url=ar(at[ai]);
}if(al.dataImageUrlField){an.imageUrl=aj(at[ai]);
}if(al.dataSpriteCssClass){an.spriteCssClass=am(at[ai]);
}ao[ai]=an;
}if(ah.action=="add"){if(ah.index<aq.tabGroup.children().length){aq.insertBefore(ao,aq.tabGroup.children().eq(ah.index));
}else{aq.append(ao);
}}else{if(ah.action=="remove"){for(ai=0;
ai<at.length;
ai++){aq.remove(ah.index);
}}else{if(ah.action=="itemchange"){ai=aq.dataSource.view().indexOf(at[0]);
if(ah.field===al.dataTextField){aq.tabGroup.children().eq(ai).find(".k-link").text(at[0].get(ah.field));
}}else{aq.trigger("dataBinding");
aq.remove("li");
aq.append(ao);
aq.trigger("dataBound");
}}}},value:function(af){var ae=this;
if(af!==aa){if(af!=ae.value()){ae.tabGroup.children().each(function(){if(l.trim(l(this).text())==af){ae.select(this);
}});
}}else{return ae.select().text();
}},items:function(){return this.tabGroup[0].children;
},setOptions:function(af){var ag=this,ae=ag.options.animation;
ag._animations(af);
af.animation=y(true,ae,af.animation);
if(af.navigatable){ag.wrapper.on("keydown"+O,ag._keyDownProxy);
}else{ag.wrapper.off("keydown"+O,ag._keyDownProxy);
}ad.fn.setOptions.call(ag,af);
},events:[S,m,T,w,q,"change","dataBinding","dataBound"],options:{name:"TabStrip",dataTextField:"",dataContentField:"",dataImageUrlField:"",dataUrlField:"",dataSpriteCssClass:"",dataContentUrlField:"",tabPosition:"top",animation:{open:{effects:"expand:vertical fadeIn",duration:200},close:{duration:200}},collapsible:false,navigatable:true,contentUrls:false,scrollable:{distance:200}},destroy:function(){var af=this,ae=af.scrollWrap;
ad.fn.destroy.call(af);
if(af._refreshHandler){af.dataSource.unbind("change",af._refreshHandler);
}af.wrapper.off(O);
af.wrapper.children(".k-tabstrip-items").off(O);
if(af._scrollableModeActive){af._scrollPrevButton.off().remove();
af._scrollNextButton.off().remove();
}G.destroy(af.wrapper);
ae.children(".k-tabstrip").unwrap();
},select:function(ae){var af=this;
if(arguments.length===0){return af.tabGroup.children("li."+n);
}if(!isNaN(ae)){ae=af.tabGroup.children().get(ae);
}ae=af.tabGroup.find(ae);
l(ae).each(function(ag,ah){ah=l(ah);
if(!ah.hasClass(n)&&!af.trigger(S,{item:ah[0],contentElement:af.contentHolder(ah.index())[0]})){af.activateTab(ah);
}});
return af;
},enable:function(ae,af){this._toggleDisabled(ae,af!==false);
return this;
},disable:function(ae){this._toggleDisabled(ae,false);
return this;
},reload:function(ae){ae=this.tabGroup.find(ae);
var af=this;
ae.each(function(){var ai=l(this),ah=ai.find("."+J).data(r),ag=af.contentHolder(ai.index());
if(ah){af.ajaxRequest(ai,ag,null,ah);
}});
return af;
},append:function(af){var ag=this,ae=ag._create(af);
u(ae.tabs,function(ai){var ah=ae.contents[ai];
ag.tabGroup.append(this);
if(ag.options.tabPosition=="bottom"){ag.tabGroup.before(ah);
}else{if(ag._scrollableModeActive){ag._scrollPrevButton.before(ah);
}else{ag.wrapper.append(ah);
}}ag.angular("compile",function(){return{elements:[ah]};
});
});
ab(ag.tabGroup);
ag._updateContentElements();
ag.resize(true);
return ag;
},insertBefore:function(ah,ag){ag=this.tabGroup.find(ag);
var ai=this,ae=ai._create(ah),af=l(ai.contentElement(ag.index()));
u(ae.tabs,function(ak){var aj=ae.contents[ak];
ag.before(this);
af.before(aj);
ai.angular("compile",function(){return{elements:[aj]};
});
});
ab(ai.tabGroup);
ai._updateContentElements();
ai.resize(true);
return ai;
},insertAfter:function(ah,ag){ag=this.tabGroup.find(ag);
var ai=this,ae=ai._create(ah),af=l(ai.contentElement(ag.index()));
u(ae.tabs,function(ak){var aj=ae.contents[ak];
ag.after(this);
af.after(aj);
ai.angular("compile",function(){return{elements:[aj]};
});
});
ab(ai.tabGroup);
ai._updateContentElements();
ai.resize(true);
return ai;
},remove:function(af){var ag=this;
var ah=typeof af;
var ae;
if(ah==="string"){af=ag.tabGroup.find(af);
}else{if(ah==="number"){af=ag.tabGroup.children().eq(af);
}}ae=af.map(function(){var ai=ag.contentElement(l(this).index());
G.destroy(ai);
return ai;
});
af.remove();
ae.remove();
ag._updateContentElements();
ag.resize(true);
return ag;
},_create:function(ah){var ag=l.isPlainObject(ah),aj=this,ai,af,ae;
if(ag||l.isArray(ah)){ah=l.isArray(ah)?ah:[ah];
ai=K(ah,function(al,ak){return l(V.renderItem({group:aj.tabGroup,item:y(al,{index:ak})}));
});
af=K(ah,function(al,ak){if(typeof al.content=="string"||al.contentUrl){return l(V.renderContent({item:y(al,{index:ak})}));
}});
}else{if(typeof ah=="string"&&ah[0]!="<"){ai=aj.element.find(ah);
}else{ai=l(ah);
}af=l();
ai.each(function(){ae=l("<div class='"+p+"'/>");
if(/k-tabstrip-items/.test(this.parentNode.className)){var ak=parseInt(this.getAttribute("aria-controls").replace(/^.*-/,""),10)-1;
ae=l(aj.contentElement(ak));
}af=af.add(ae);
});
ac(ai);
}return{tabs:ai,contents:af};
},_toggleDisabled:function(ae,af){ae=this.tabGroup.find(ae);
ae.each(function(){l(this).toggleClass(s,af).toggleClass(t,!af);
});
},_updateClasses:function(){var ah=this,ag,ae,af;
ah.wrapper.addClass("k-widget k-header k-tabstrip");
ah.tabGroup=ah.wrapper.children("ul").addClass("k-tabstrip-items k-reset");
if(!ah.tabGroup[0]){ah.tabGroup=l("<ul class='k-tabstrip-items k-reset'/>").appendTo(ah.wrapper);
}ag=ah.tabGroup.find("li").addClass("k-item");
if(ag.length){ae=ag.filter("."+n).index();
af=ae>=0?ae:aa;
ah.tabGroup.contents().filter(function(){return this.nodeType==3&&!Y(this.nodeValue);
}).remove();
}if(ae>=0){ag.eq(ae).addClass(U);
}ah.contentElements=ah.wrapper.children("div");
ah.contentElements.addClass(p).eq(af).addClass(n).css({display:"block"});
if(ag.length){ac(ag);
ab(ah.tabGroup);
ah._updateContentElements();
}},_updateContentElements:function(){var ai=this,af=ai.options.contentUrls||[],ag=ai.tabGroup.find(".k-item"),ah=(ai.element.attr("id")||G.guid())+"-",ae=ai.wrapper.children("div");
if(ae.length&&ag.length>ae.length){ae.each(function(al){var aj=parseInt(this.id.replace(ah,""),10),am=ag.filter("[aria-controls="+ah+aj+"]"),ak=ah+(al+1);
am.data("aria",ak);
this.setAttribute("id",ak);
});
ag.each(function(){var aj=l(this);
this.setAttribute("aria-controls",aj.data("aria"));
aj.removeData("aria");
});
}else{ag.each(function(al){var aj=ae.eq(al),ak=ah+(al+1);
this.setAttribute("aria-controls",ak);
if(!aj.length&&af[al]){l("<div class='"+p+"'/>").appendTo(ai.wrapper).attr("id",ak);
}else{aj.attr("id",ak);
if(!l(this).children(".k-loading")[0]&&!af[al]){l("<span class='k-loading k-complete'/>").prependTo(this);
}}aj.attr("role","tabpanel");
aj.filter(":not(."+n+")").attr("aria-hidden",true).attr("aria-expanded",false);
aj.filter("."+n).attr("aria-expanded",true);
});
}ai.contentElements=ai.contentAnimators=ai.wrapper.children("div");
ai.tabsHeight=ai.tabGroup.outerHeight()+parseInt(ai.wrapper.css("border-top-width"),10)+parseInt(ai.wrapper.css("border-bottom-width"),10);
if(G.kineticScrollNeeded&&G.mobile.ui.Scroller){G.touchScroller(ai.contentElements);
ai.contentElements=ai.contentElements.children(".km-scroll-container");
}},_wrapper:function(){var ae=this;
if(ae.element.is("ul")){ae.wrapper=ae.element.wrapAll("<div />").parent();
}else{ae.wrapper=ae.element;
}ae.scrollWrap=ae.wrapper.parent(".k-tabstrip-wrapper");
if(!ae.scrollWrap[0]){ae.scrollWrap=ae.wrapper.wrapAll("<div class='k-tabstrip-wrapper' />").parent();
}},_tabPosition:function(){var af=this,ae=af.options.tabPosition;
af.wrapper.addClass("k-floatwrap k-tabstrip-"+ae);
if(ae=="bottom"){af.tabGroup.appendTo(af.wrapper);
}af.resize(true);
},_setContentElementsDimensions:function(){var al=this,ak=al.options.tabPosition;
if(ak=="left"||ak=="right"){var af=al.wrapper.children(".k-content"),ae=af.filter(":visible"),ah="margin-"+ak,aj=al.tabGroup,ag=aj.outerWidth();
var ai=Math.ceil(aj.height())-parseInt(ae.css("padding-top"),10)-parseInt(ae.css("padding-bottom"),10)-parseInt(ae.css("border-top-width"),10)-parseInt(ae.css("border-bottom-width"),10);
setTimeout(function(){af.css(ah,ag).css("min-height",ai);
});
}},_resize:function(){this._setContentElementsDimensions();
this._scrollable();
},_sizeScrollWrap:function(ae){if(ae.is(":visible")){var ag=this.options.tabPosition;
var af=Math.floor(ae.outerHeight(true))+(ag==="left"||ag==="right"?2:this.tabsHeight);
this.scrollWrap.css("height",af).css("height");
}},_toggleHover:function(ae){l(ae.currentTarget).toggleClass(C,ae.type==L);
},_click:function(ai){var al=this,aj=ai.find("."+J),ag=aj.attr(D),ae=al.options.collapsible,af=al.contentHolder(ai.index()),ak,ah;
if(ai.closest(".k-widget")[0]!=al.wrapper[0]){return;
}if(ai.is("."+t+(!ae?",."+n:""))){return true;
}ah=aj.data(r)||ag&&(ag.charAt(ag.length-1)=="#"||ag.indexOf("#"+al.element[0].id+"-")!=-1);
ak=!ag||ah;
if(al.tabGroup.children("[data-animating]").length){return ak;
}if(al.trigger(S,{item:ai[0],contentElement:af[0]})){return true;
}if(ak===false){return;
}if(ae&&ai.is("."+n)){al.deactivateTab(ai);
return true;
}if(al.activateTab(ai)){ak=true;
}return ak;
},_scrollable:function(){var ai=this,ae=ai.options,aj,ah,ag,af;
if(ai._scrollableAllowed()){ai.wrapper.addClass("k-tabstrip-scrollable");
aj=ai.wrapper[0].offsetWidth;
ah=ai.tabGroup[0].scrollWidth;
if(ah>aj&&!ai._scrollableModeActive){ai._nowScrollingTabs=false;
ai._isRtl=G.support.isRtl(ai.element);
ai.wrapper.append(R("prev","k-i-arrow-w")+R("next","k-i-arrow-e"));
ag=ai._scrollPrevButton=ai.wrapper.children(".k-tabstrip-prev");
af=ai._scrollNextButton=ai.wrapper.children(".k-tabstrip-next");
ai.tabGroup.css({marginLeft:ag.outerWidth()+9,marginRight:af.outerWidth()+12});
ag.on("mousedown"+O,function(){ai._nowScrollingTabs=true;
ai._scrollTabsByDelta(ae.scrollable.distance*(ai._isRtl?1:-1));
});
af.on("mousedown"+O,function(){ai._nowScrollingTabs=true;
ai._scrollTabsByDelta(ae.scrollable.distance*(ai._isRtl?-1:1));
});
ag.add(af).on("mouseup"+O,function(){ai._nowScrollingTabs=false;
});
ai._scrollableModeActive=true;
ai._toggleScrollButtons();
}else{if(ai._scrollableModeActive&&ah<=aj){ai._scrollableModeActive=false;
ai.wrapper.removeClass("k-tabstrip-scrollable");
ai._scrollPrevButton.off().remove();
ai._scrollNextButton.off().remove();
ai.tabGroup.css({marginLeft:"",marginRight:""});
}else{if(!ai._scrollableModeActive){ai.wrapper.removeClass("k-tabstrip-scrollable");
}else{ai._toggleScrollButtons();
}}}}},_scrollableAllowed:function(){var ae=this.options;
return ae.scrollable&&!isNaN(ae.scrollable.distance)&&(ae.tabPosition=="top"||ae.tabPosition=="bottom");
},_scrollTabsToItem:function(af){var am=this,aj=am.tabGroup,ae=aj.scrollLeft(),ai=af.outerWidth(),ag=am._isRtl?af.position().left:af.position().left-aj.children().first().position().left,al=aj[0].offsetWidth,ak=Math.ceil(parseFloat(aj.css("padding-left"))),ah;
if(am._isRtl){if(ag<0){ah=ae+ag-(al-ae)-ak;
}else{if(ag+ai>al){ah=ae+ag-ai+ak*2;
}}}else{if(ae+al<ag+ai){ah=ag+ai-al+ak*2;
}else{if(ae>ag){ah=ag-ak;
}}}aj.finish().animate({scrollLeft:ah},"fast","linear",function(){am._toggleScrollButtons();
});
},_scrollTabsByDelta:function(ae){var ah=this;
var ag=ah.tabGroup;
var af=ag.scrollLeft();
ag.finish().animate({scrollLeft:af+ae},"fast","linear",function(){if(ah._nowScrollingTabs){ah._scrollTabsByDelta(ae);
}else{ah._toggleScrollButtons();
}});
},_toggleScrollButtons:function(){var af=this,ag=af.tabGroup,ae=ag.scrollLeft();
af._scrollPrevButton.toggle(af._isRtl?ae<ag[0].scrollWidth-ag[0].offsetWidth-1:ae!==0);
af._scrollNextButton.toggle(af._isRtl?ae!==0:ae<ag[0].scrollWidth-ag[0].offsetWidth-1);
},deactivateTab:function(ai){var aj=this,af=aj.options.animation,ae=af.open,ag=y({},af.close),ah=ag&&"effects" in ag;
ai=aj.tabGroup.find(ai);
ag=y(ah?ag:y({reverse:true},ae),{hide:true});
if(G.size(ae.effects)){ai.kendoAddClass(s,{duration:ae.duration});
ai.kendoRemoveClass(n,{duration:ae.duration});
}else{ai.addClass(s);
ai.removeClass(n);
}ai.removeAttr("aria-selected");
aj.contentAnimators.filter("."+n).kendoStop(true,true).kendoAnimate(ag).removeClass(n).attr("aria-hidden",true);
},activateTab:function(am){if(this.tabGroup.children("[data-animating]").length){return;
}am=this.tabGroup.find(am);
var at=this,af=at.options.animation,ae=af.open,ag=y({},af.close),ak=ag&&"effects" in ag,ao=am.parent().children(),ap=ao.filter("."+n),an=ao.index(am);
ag=y(ak?ag:y({reverse:true},ae),{hide:true});
if(G.size(ae.effects)){ap.kendoRemoveClass(n,{duration:ag.duration});
am.kendoRemoveClass(C,{duration:ag.duration});
}else{ap.removeClass(n);
am.removeClass(C);
}var ah=at.contentAnimators;
if(at.inRequest){at.xhr.abort();
at.inRequest=false;
}if(ah.length===0){at.tabGroup.find("."+U).removeClass(U);
am.addClass(U).css("z-index");
am.addClass(n);
at._current(am);
at.trigger("change");
if(at._scrollableModeActive){at._scrollTabsToItem(am);
}return false;
}var au=ah.filter("."+n),aj=at.contentHolder(an),ai=aj.closest(".k-content");
at.tabsHeight=at.tabGroup.outerHeight()+parseInt(at.wrapper.css("border-top-width"),10)+parseInt(at.wrapper.css("border-bottom-width"),10);
at._sizeScrollWrap(au);
if(aj.length===0){au.removeClass(n).attr("aria-hidden",true).kendoStop(true,true).kendoAnimate(ag);
return false;
}am.attr("data-animating",true);
var al=(am.children("."+J).data(r)||false)&&aj.is(v),ar=function(){at.tabGroup.find("."+U).removeClass(U);
am.addClass(U).css("z-index");
if(G.size(ae.effects)){ap.kendoAddClass(s,{duration:ae.duration});
am.kendoAddClass(n,{duration:ae.duration});
}else{ap.addClass(s);
am.addClass(n);
}ap.removeAttr("aria-selected");
am.attr("aria-selected",true);
at._current(am);
at._sizeScrollWrap(ai);
ai.addClass(n).removeAttr("aria-hidden").kendoStop(true,true).attr("aria-expanded",true).kendoAnimate(y({init:function(){at.trigger(T,{item:am[0],contentElement:aj[0]});
G.resize(aj);
}},ae,{complete:function(){am.removeAttr("data-animating");
at.trigger(m,{item:am[0],contentElement:aj[0]});
G.resize(aj);
at.scrollWrap.css("height","").css("height");
}}));
},aq=function(){if(!al){ar();
at.trigger("change");
}else{am.removeAttr("data-animating");
at.ajaxRequest(am,aj,function(){am.attr("data-animating",true);
ar();
at.trigger("change");
});
}if(at._scrollableModeActive){at._scrollTabsToItem(am);
}};
au.removeClass(n);
au.attr("aria-hidden",true);
au.attr("aria-expanded",false);
if(au.length){au.kendoStop(true,true).kendoAnimate(y({complete:aq},ag));
}else{aq();
}return true;
},contentElement:function(ah){if(isNaN(ah-0)){return aa;
}var ae=this.contentElements&&this.contentElements[0]&&!G.kineticScrollNeeded?this.contentElements:this.contentAnimators;
ah=ae&&ah<0?ae.length+ah:ah;
var ag=new RegExp("-"+(ah+1)+"$");
if(ae){for(var af=0,ai=ae.length;
af<ai;
af++){if(ag.test(ae.eq(af).closest(".k-content")[0].id)){return ae[af];
}}}return aa;
},contentHolder:function(af){var ae=l(this.contentElement(af)),ag=ae.children(".km-scroll-container");
return G.support.touch&&ag[0]?ag:ae;
},ajaxRequest:function(ah,af,ae,ap){ah=this.tabGroup.find(ah);
var ao=this,aq=l.ajaxSettings.xhr,al=ah.find("."+J),ag={},ak=ah.width()/2,aj=false,an=ah.find(".k-loading").removeClass("k-complete");
if(!an[0]){an=l("<span class='k-loading'/>").prependTo(ah);
}var ai=ak*2-an.width();
var am=function(){an.animate({marginLeft:(parseInt(an.css("marginLeft"),10)||0)<ak?ai:0},500,am);
};
if(G.support.browser.msie&&G.support.browser.version<10){setTimeout(am,40);
}ap=ap||al.data(r)||al.attr(D);
ao.inRequest=true;
ao.xhr=l.ajax({type:"GET",cache:false,url:ap,dataType:"html",data:ag,xhr:function(){var ar=this,au=aq(),at=ar.progressUpload?"progressUpload":ar.progress?"progress":false;
if(au){l.each([au,au.upload],function(){if(this.addEventListener){this.addEventListener("progress",function(av){if(at){ar[at](av);
}},false);
}});
}ar.noProgress=!(window.XMLHttpRequest&&"upload" in new XMLHttpRequest());
return au;
},progress:function(ar){if(ar.lengthComputable){var at=parseInt(ar.loaded/ar.total*100,10)+"%";
an.stop(true).addClass("k-progress").css({width:at,marginLeft:0});
}},error:function(at,ar){if(ao.trigger("error",{xhr:at,status:ar})){this.complete();
}},stopProgress:function(){clearInterval(aj);
an.stop(true).addClass("k-progress")[0].style.cssText="";
},complete:function(ar){ao.inRequest=false;
if(this.noProgress){setTimeout(this.stopProgress,500);
}else{this.stopProgress();
}if(ar.statusText=="abort"){an.remove();
}},success:function(au){an.addClass("k-complete");
try{var at=this,aw=10;
if(at.noProgress){an.width(aw+"%");
aj=setInterval(function(){at.progress({lengthComputable:true,loaded:Math.min(aw,100),total:100});
aw+=10;
},40);
}ao.angular("cleanup",function(){return{elements:af.get()};
});
G.destroy(af);
af.html(au);
}catch(av){var ar=window.console;
if(ar&&ar.error){ar.error(av.name+": "+av.message+" in "+ap);
}this.error(this.xhr,"error");
}if(ae){ae.call(ao,af);
}ao.angular("compile",function(){return{elements:af.get()};
});
ao.trigger(q,{item:ah[0],contentElement:af[0]});
}});
}});
y(V,{renderItem:function(ag){ag=y({tabStrip:{},group:{}},ag);
var ae=X.empty,af=ag.item;
return X.item(y(ag,{image:af.imageUrl?X.image:ae,sprite:af.spriteCssClass?X.sprite:ae,itemWrapper:X.itemWrapper},Q));
},renderContent:function(ae){return X.content(y(ae,Q));
}});
G.ui.plugin(V);
}(window.kendo.jQuery));
return window.kendo;
},typeof define=="function"&&define.amd?define:function(k,l,m){(m||l)();
}));
window.$=h;
window.jQuery=i;
})($telerik.$,$telerik.$);
window.$=c;
window.jQuery=d;
})($telerik.$,$telerik.$);