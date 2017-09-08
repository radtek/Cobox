(function(b,a,e){var d=window.jQuery,c=window.$;
window.$=window.jQuery=a;
(function(g,f,j){var i=window.jQuery,h=window.$;
window.$=window.jQuery=f;
(function(l,k){k("kendo.mobile.scroller",["kendo.fx","kendo.draganddrop"],l);
}(function(){var k={id:"mobile.scroller",name:"Scroller",category:"mobile",description:"The Kendo Mobile Scroller widget enables touch friendly kinetic scrolling for the contents of a given DOM element.",depends:["fx","draganddrop"]};
(function(l,Q){var w=window.kendo,y=w.mobile,v=w.effects,P=y.ui,E=l.proxy,t=l.extend,S=P.Widget,r=w.Class,A=w.ui.Movable,C=w.ui.Pane,D=w.ui.PaneDimensions,O=v.Transition,p=v.Animation,m=Math.abs,N=500,L=0.7,u=0.96,R=10,x=55,B=0.5,n=5,H="km-scroller-release",G="km-scroller-refresh",F="pull",q="change",I="resize",J="scroll",z=2;
var T=p.extend({init:function(U){var V=this;
p.fn.init.call(V);
t(V,U);
V.userEvents.bind("gestureend",E(V.start,V));
V.tapCapture.bind("press",E(V.cancel,V));
},enabled:function(){return this.movable.scale<this.dimensions.minScale;
},done:function(){return this.dimensions.minScale-this.movable.scale<0.01;
},tick:function(){var U=this.movable;
U.scaleWith(1.1);
this.dimensions.rescale(U.scale);
},onEnd:function(){var U=this.movable;
U.scaleTo(this.dimensions.minScale);
this.dimensions.rescale(U.scale);
}});
var s=p.extend({init:function(U){var V=this;
p.fn.init.call(V);
t(V,U,{transition:new O({axis:U.axis,movable:U.movable,onEnd:function(){V._end();
}})});
V.tapCapture.bind("press",function(){V.cancel();
});
V.userEvents.bind("end",E(V.start,V));
V.userEvents.bind("gestureend",E(V.start,V));
V.userEvents.bind("tap",E(V.onEnd,V));
},onCancel:function(){this.transition.cancel();
},freeze:function(U){var V=this;
V.cancel();
V._moveTo(U);
},onEnd:function(){var U=this;
if(U.paneAxis.outOfBounds()){U._snapBack();
}else{U._end();
}},done:function(){return m(this.velocity)<1;
},start:function(U){var V=this,W;
if(!V.dimension.enabled){return;
}if(V.paneAxis.outOfBounds()){V._snapBack();
}else{W=U.touch.id===z?0:U.touch[V.axis].velocity;
V.velocity=Math.max(Math.min(W*V.velocityMultiplier,x),-x);
V.tapCapture.captureNext();
p.fn.start.call(V);
}},tick:function(){var Y=this,V=Y.dimension,W=Y.paneAxis.outOfBounds()?B:Y.friction,U=Y.velocity*=W,X=Y.movable[Y.axis]+U;
if(!Y.elastic&&V.outOfBounds(X)){X=Math.max(Math.min(X,V.max),V.min);
Y.velocity=0;
}Y.movable.moveAxis(Y.axis,X);
},_end:function(){this.tapCapture.cancelCapture();
this.end();
},_snapBack:function(){var W=this,U=W.dimension,V=W.movable[W.axis]>U.max?U.max:U.min;
W._moveTo(V);
},_moveTo:function(U){this.transition.moveTo({location:U,duration:N,ease:O.easeOutExpo});
}});
var o=p.extend({init:function(U){var V=this;
w.effects.Animation.fn.init.call(this);
t(V,U,{origin:{},destination:{},offset:{}});
},tick:function(){this._updateCoordinates();
this.moveTo(this.origin);
},done:function(){return m(this.offset.y)<n&&m(this.offset.x)<n;
},onEnd:function(){this.moveTo(this.destination);
if(this.callback){this.callback.call();
}},setCoordinates:function(U,V){this.offset={};
this.origin=U;
this.destination=V;
},setCallback:function(U){if(U&&w.isFunction(U)){this.callback=U;
}else{U=Q;
}},_updateCoordinates:function(){this.offset={x:(this.destination.x-this.origin.x)/4,y:(this.destination.y-this.origin.y)/4};
this.origin={y:this.origin.y+this.offset.y,x:this.origin.x+this.offset.x};
}});
var K=r.extend({init:function(W){var X=this,V=W.axis==="x",U=l('<div class="km-touch-scrollbar km-'+(V?"horizontal":"vertical")+'-scrollbar" />');
t(X,W,{element:U,elementSize:0,movable:new A(U),scrollMovable:W.movable,alwaysVisible:W.alwaysVisible,size:V?"width":"height"});
X.scrollMovable.bind(q,E(X.refresh,X));
X.container.append(U);
if(W.alwaysVisible){X.show();
}},refresh:function(){var ab=this,U=ab.axis,V=ab.dimension,W=V.size,Y=ab.scrollMovable,aa=W/V.total,X=Math.round(-Y[U]*aa),Z=Math.round(W*aa);
if(aa>=1){this.element.css("display","none");
}else{this.element.css("display","");
}if(X+Z>W){Z=W-X;
}else{if(X<0){Z+=X;
X=0;
}}if(ab.elementSize!=Z){ab.element.css(ab.size,Z+"px");
ab.elementSize=Z;
}ab.movable.moveAxis(U,X);
},show:function(){this.element.css({opacity:L,visibility:"visible"});
},hide:function(){if(!this.alwaysVisible){this.element.css({opacity:0});
}}});
var M=S.extend({init:function(X,aa){var ad=this;
S.fn.init.call(ad,X,aa);
X=ad.element;
ad._native=ad.options.useNative&&w.support.hasNativeScrolling;
if(ad._native){X.addClass("km-native-scroller").prepend('<div class="km-scroll-header"/>');
t(ad,{scrollElement:X,fixedContainer:X.children().first()});
return;
}X.css("overflow","hidden").addClass("km-scroll-wrapper").wrapInner('<div class="km-scroll-container"/>').prepend('<div class="km-scroll-header"/>');
var Y=X.children().eq(1),ac=new w.TapCapture(X),Z=new A(Y),W=new D({element:Y,container:X,forcedEnabled:ad.options.zoom}),V=this.options.avoidScrolling,ae=new w.UserEvents(X,{fastTap:true,allowSelection:true,preventDragEvent:true,captureUpIfMoved:true,multiTouch:ad.options.zoom,start:function(ag){W.refresh();
var aj=m(ag.x.velocity),ak=m(ag.y.velocity),ah=aj*2>=ak,ai=l.contains(ad.fixedContainer[0],ag.event.target),al=ak*2>=aj;
if(!ai&&!V(ag)&&ad.enabled&&(W.x.enabled&&ah||W.y.enabled&&al)){ae.capture();
}else{ae.cancel();
}}}),ab=new C({movable:Z,dimensions:W,userEvents:ae,elastic:ad.options.elastic}),af=new T({movable:Z,dimensions:W,userEvents:ae,tapCapture:ac}),U=new o({moveTo:function(ag){ad.scrollTo(ag.x,ag.y);
}});
Z.bind(q,function(){ad.scrollTop=-Z.y;
ad.scrollLeft=-Z.x;
ad.trigger(J,{scrollTop:ad.scrollTop,scrollLeft:ad.scrollLeft});
});
if(ad.options.mousewheelScrolling){X.on("DOMMouseScroll mousewheel",E(this,"_wheelScroll"));
}t(ad,{movable:Z,dimensions:W,zoomSnapBack:af,animatedScroller:U,userEvents:ae,pane:ab,tapCapture:ac,pulled:false,enabled:true,scrollElement:Y,scrollTop:0,scrollLeft:0,fixedContainer:X.children().first()});
ad._initAxis("x");
ad._initAxis("y");
ad._wheelEnd=function(){ad._wheel=false;
ad.userEvents.end(0,ad._wheelY);
};
W.refresh();
if(ad.options.pullToRefresh){ad._initPullToRefresh();
}},_wheelScroll:function(V){if(!this._wheel){this._wheel=true;
this._wheelY=0;
this.userEvents.press(0,this._wheelY);
}clearTimeout(this._wheelTimeout);
this._wheelTimeout=setTimeout(this._wheelEnd,50);
var U=w.wheelDeltaY(V);
if(U){this._wheelY+=U;
this.userEvents.move(0,this._wheelY);
}V.preventDefault();
},makeVirtual:function(){this.dimensions.y.makeVirtual();
},virtualSize:function(V,U){this.dimensions.y.virtualSize(V,U);
},height:function(){return this.dimensions.y.size;
},scrollHeight:function(){return this.scrollElement[0].scrollHeight;
},scrollWidth:function(){return this.scrollElement[0].scrollWidth;
},options:{name:"Scroller",zoom:false,pullOffset:140,visibleScrollHints:false,elastic:true,useNative:false,mousewheelScrolling:true,avoidScrolling:function(){return false;
},pullToRefresh:false,messages:{pullTemplate:"Pull to refresh",releaseTemplate:"Release to refresh",refreshTemplate:"Refreshing"}},events:[F,J,I],_resize:function(){if(!this._native){this.contentResized();
}},setOptions:function(U){var V=this;
S.fn.setOptions.call(V,U);
if(U.pullToRefresh){V._initPullToRefresh();
}},reset:function(){if(this._native){this.scrollElement.scrollTop(0);
}else{this.movable.moveTo({x:0,y:0});
this._scale(1);
}},contentResized:function(){this.dimensions.refresh();
if(this.pane.x.outOfBounds()){this.movable.moveAxis("x",this.dimensions.x.min);
}if(this.pane.y.outOfBounds()){this.movable.moveAxis("y",this.dimensions.y.min);
}},zoomOut:function(){var U=this.dimensions;
U.refresh();
this._scale(U.fitScale);
this.movable.moveTo(U.centerCoordinates());
},enable:function(){this.enabled=true;
},disable:function(){this.enabled=false;
},scrollTo:function(U,V){if(this._native){this.scrollElement.scrollLeft(m(U));
this.scrollElement.scrollTop(m(V));
}else{this.dimensions.refresh();
this.movable.moveTo({x:U,y:V});
}},animatedScrollTo:function(X,Y,U){var V,W;
if(this._native){this.scrollTo(X,Y);
}else{V={x:this.movable.x,y:this.movable.y};
W={x:X,y:Y};
this.animatedScroller.setCoordinates(V,W);
this.animatedScroller.setCallback(U);
this.animatedScroller.start();
}},pullHandled:function(){var U=this;
U.refreshHint.removeClass(G);
U.hintContainer.html(U.pullTemplate({}));
U.yinertia.onEnd();
U.xinertia.onEnd();
U.userEvents.cancel();
},destroy:function(){S.fn.destroy.call(this);
if(this.userEvents){this.userEvents.destroy();
}},_scale:function(U){this.dimensions.rescale(U);
this.movable.scaleTo(U);
},_initPullToRefresh:function(){var U=this;
U.dimensions.y.forceEnabled();
U.pullTemplate=w.template(U.options.messages.pullTemplate);
U.releaseTemplate=w.template(U.options.messages.releaseTemplate);
U.refreshTemplate=w.template(U.options.messages.refreshTemplate);
U.scrollElement.prepend('<span class="km-scroller-pull"><span class="km-icon"></span><span class="km-loading-left"></span><span class="km-loading-right"></span><span class="km-template">'+U.pullTemplate({})+"</span></span>");
U.refreshHint=U.scrollElement.children().first();
U.hintContainer=U.refreshHint.children(".km-template");
U.pane.y.bind("change",E(U._paneChange,U));
U.userEvents.bind("end",E(U._dragEnd,U));
},_dragEnd:function(){var U=this;
if(!U.pulled){return;
}U.pulled=false;
U.refreshHint.removeClass(H).addClass(G);
U.hintContainer.html(U.refreshTemplate({}));
U.yinertia.freeze(U.options.pullOffset/2);
U.trigger("pull");
},_paneChange:function(){var U=this;
if(U.movable.y/B>U.options.pullOffset){if(!U.pulled){U.pulled=true;
U.refreshHint.removeClass(G).addClass(H);
U.hintContainer.html(U.releaseTemplate({}));
}}else{if(U.pulled){U.pulled=false;
U.refreshHint.removeClass(H);
U.hintContainer.html(U.pullTemplate({}));
}}},_initAxis:function(U){var aa=this,W=aa.movable,V=aa.dimensions[U],Z=aa.tapCapture,X=aa.pane[U],Y=new K({axis:U,movable:W,dimension:V,container:aa.element,alwaysVisible:aa.options.visibleScrollHints});
V.bind(q,function(){Y.refresh();
});
X.bind(q,function(){Y.show();
});
aa[U+"inertia"]=new s({axis:U,paneAxis:X,movable:W,tapCapture:Z,userEvents:aa.userEvents,dimension:V,elastic:aa.options.elastic,friction:aa.options.friction||u,velocityMultiplier:aa.options.velocityMultiplier||R,end:function(){Y.hide();
aa.trigger("scrollEnd",{axis:U,scrollTop:aa.scrollTop,scrollLeft:aa.scrollLeft});
}});
}});
P.plugin(M);
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