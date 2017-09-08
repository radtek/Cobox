Type.registerNamespace("Telerik.Web.UI.Scheduler");
(function(a,b){b.Scheduler.ResizeHelper=function(c){this._scheduler=c;
};
b.Scheduler.ResizeHelper.prototype={initialize:function(){},dispose:function(){},_updateResizingAppointmentElements:function(f,e,g){this._isHorizontal=(this._scheduler.get_selectedView()==b.SchedulerViewType.MonthView);
var d=f.resizeFromStart,c=(d==e<0);
if(c){this._addResizingElementPart(g,f);
d=!d;
}else{this._removeResizingElementPart(f);
}this._updateResizingAppointmentPartIndicators(f.resizingElement,d,c);
},_addResizingElementPart:function(r,m){var l=m.resizeFromStart,e=m.resizingElement,o=this._scheduler,d=o._activeModel,q=o._getParentTable(r),f=a(e).clone()[0],c,j,i;
this._updateResizingAppointmentPartIndicators(e,l,true);
if(this._isHorizontal){var g=0;
if(l){g=r.parentNode.cells.length-1;
}j=q.rows[r.parentNode.rowIndex].cells[g];
}else{var p=d.get_slotsPerDay(),k=a(e).parents("td").get(0),h=d._getFirstModelRowIndex(k),n=h*p;
i=r.offsetHeight-4;
if(d._isVertical&&o.get_showAllDayRow()){n+=h+1;
}if(l){n+=p-1;
}j=q.rows[n].cells[r.cellIndex];
}c=o._getCellWrap(j,e);
c.append(f);
if(this._isHorizontal){f.style.left="";
f.style.width=j.offsetWidth+"px";
}else{o._setAppointmentElementPosition(f,i,0);
}this._updateElementParts(m,f);
},_updateElementParts:function(j,d){var e=j.resizingAppointment._domElements,i=j.resizeFromStart,c=this._getAppointmentAllDayElement(e),h=0,g,f;
if(i){if(!this._isHorizontal&&c){h=1;
}Array.insert(e,h,d);
j.resizingAppointment._domElement=d;
}else{Array.add(e,d);
}if(this._isHorizontal){g=i?1:e.length-2,f=e[g];
this._expandElementHorizontally(f,i);
}else{if(c){this._expandAllDayElement(c,j);
}else{if(this._scheduler.get_showAllDayRow()&&e.length==3){this._createAllDayElement(c,j);
}else{g=i?1:e.length-2,f=e[g];
this._expandElementVertically(f,i);
}}}j.resizingElement=d;
},_expandAllDayElement:function(c,f){var d=c.parents("td").first(),e,g;
g=d.width()+c.width()+1;
if(f.resizeFromStart){e=this._scheduler._getCellWrap(d.prev().get(0),c.get(0));
e.append(c.get(0));
}a(f.resizingElement).remove();
Array.remove(f.resizingAppointment._domElements,f.resizingElement);
c.width(g);
},_createAllDayElement:function(c,m){var g=m.resizingAppointment._domElements;
c=a(g[1]);
var p=this._scheduler,e=p._activeModel,f=c.get(0),l=c.parents("td").get(0),i=e._getFirstModelRowIndex(l),j=p.get_renderMode()===b.RenderMode.Lite,k=p.get_renderMode()===b.RenderMode.Mobile,o,n,h,d,q;
if(e._isVertical){o=i*e.get_slotsPerDay();
if(p.get_showAllDayRow()){o+=i;
}n=a(l).parents("table").get(0).rows[o];
}else{n=a(p.get_element()).find(".rsTopWrap .rsAllDayTable").get(0).rows[0];
}h=n.cells[l.cellIndex];
q=a(h).width();
d=p._getCellWrap(h,f);
d.append(f);
p._setAppointmentElementPosition(f,d[0].offsetHeight-4,0);
c.find(".rsArrowTop").removeClass("rsArrowTop").addClass("rsArrowLeft");
c.find(".rsArrowBottom").removeClass("rsArrowBottom").addClass("rsArrowRight");
if(j||k){c.find(".t-i-arrow-up").removeClass("t-i-arrow-up").addClass("t-i-arrow-left");
c.find(".t-i-arrow-down").removeClass("t-i-arrow-down").addClass("t-i-arrow-right");
}Array.remove(g,f);
Array.insert(g,0,f);
c.width(q);
},_getAppointmentAllDayElement:function(d){if(this._scheduler.get_showAllDayRow()){for(var e=0,f=d.length;
e<f;
e++){var c=a(d[e]);
if(c.parents("table.rsAllDayTable, .rsAllDayRow").filter(":first").length>0){return c;
}}}return null;
},_expandElementVertically:function(d,i){var g=d.parentNode.parentNode,h=g.parentNode.rowIndex,c=this._scheduler._activeModel,l=c.get_slotsPerDay(),f=d.parentNode.parentNode.offsetHeight,e=c._getFirstModelRowIndex(g),k=e*l,j,m,n;
if(c._isVertical&&this._scheduler.get_showAllDayRow()){k+=e+1;
}j=i?h-k:l-(h-k);
m=f*(j);
if(i){n=m*-1;
m+=parseFloat(d.style.top,10);
m+=a(d).height();
if(m<0){return;
}}else{m-=4;
}this._scheduler._setAppointmentElementPosition(d,m,n);
},_expandElementHorizontally:function(c,g){var f=c.parentNode.parentNode,d=f.parentNode.cells.length,e,h;
if(g){h=c.offsetWidth;
h+=parseFloat(c.style.left);
h+=f.cellIndex*f.offsetWidth;
c.style.left=(-1*f.cellIndex*f.offsetWidth)+"px";
}else{e=d-f.cellIndex;
h=f.offsetWidth*e;
}c.style.width=h+"px";
},_removeResizingElementPart:function(m){var l=m.resizingElement,k=m.resizeFromStart,g=a(l.parentNode),e=g.parents("td").first(),j=m.resizingAppointment._domElements,d=this._getAppointmentAllDayElement(j),i;
if(j.length<=1){return;
}if(!this._isHorizontal&&d){var c=d.parents("td").first(),f=k?e.next():e.prev(),h=this._scheduler._getCellWrap(f.get(0),l);
h.append(l);
if(k){c=c.next();
h=this._scheduler._getCellWrap(c.get(0),d.get(0));
h.append(d.get(0));
}var n=d.width()-c.width()-1;
if(n<5){d.remove();
Array.remove(j,d.get(0));
}else{d.width(n);
}}else{a(l).remove();
Array.remove(j,l);
i=k?0:j.length-1;
m.resizingElement=j[i];
}if(!this._isHorizontal&&g.children(".rsApt").length==0){g.remove();
}},_updateResizingAppointmentPartIndicators:function(e,h,d){var i=this._scheduler.get_renderMode()===b.RenderMode.Lite;
var c=a(e);
var f=h?(this._isHorizontal?"Left":"Top"):(this._isHorizontal?"Right":"Bottom");
var j=h?"Start":"End";
if(d){var g;
c.find(".rsAptResize"+j+", .rsArrow"+f).remove();
if(i){g='<a style="z-index: 80;" href="#" class="rsArrow'+f+'" title="'+f.toLocaleLowerCase()+'"><span class="rsIcon rsIconArrow'+f+'"></span></a>';
c.append(g);
}else{g='<a style="z-index: 80;" href="#" class="rsArrow'+f+'">'+f.toLocaleLowerCase()+"</a>";
c.find("div.rsAptIn").append(g);
}}else{var k;
if(i){k="<span class='rsAptResize rsAptResize"+j+"'></span>";
}else{k="<div class='rsAptResize rsAptResize"+j+"'></div>";
}c.find(".rsArrow"+f).remove();
c.append(k);
}},_getAppointmentOriginalElements:function(k){var e=[],c=k.get_elements();
for(var f=0,g=c.length;
f<g;
f++){var d=c[f],j=d.parentNode.cloneNode(false),h=d.cloneNode(true);
j.appendChild(h);
e[e.length]={appointmentElement:h,parentCell:a(d).parents("td").get(0)};
}return e;
},_restoreAppointmentOriginalElements:function(k){var j=k.resizingAppointment,h=k.originalSize.elements,f,g;
for(f=0,g=j._domElements.length;
f<g;
f++){a(j._domElements[f]).remove();
}j._domElements=[];
j._domElement=null;
for(f=0,g=h.length;
f<g;
f++){var e=h[f],d=e.appointmentElement,c=this._scheduler._getCellWrap(e.parentCell,d);
c.append(d);
j._domElements[f]=d;
}}};
})($telerik.$,Telerik.Web.UI);
