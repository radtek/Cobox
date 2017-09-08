Type.registerNamespace("Telerik.Web.UI");
(function(a,b){a.PivotGridDragDrop=function(){a.PivotGridDragDrop.initializeBase(this);
this._owner=null;
this.DownOrderIndicator=null;
this.UpOrderIndicator=null;
this._fieldReference=null;
this._dragElement=null;
this._indicatorPair=null;
this._fieldsWrapper=null;
this._onMouseDownDelegate=null;
this._onFieldsWindowMouseDownDelegate=null;
this._onMouseUpDelegate=null;
this._onMouseMoveDelegate=null;
this._onFieldsPopupMouseEnterDelegate=null;
};
a.PivotGridDragDrop.prototype={initialize:function(){a.PivotGridDragDrop.callBaseMethod(this,"initialize");
var g=this._owner;
var h=g.get_element();
this._onMouseDownDelegate=$telerik.addMobileHandler(this,h,"mousedown",this._onMouseDownHandler);
var d=g.get_fields();
var c=null;
var f=null;
if(typeof g._clientSettings._clientMessages._dragToReorder=="undefined"){f="Drag to reorder";
}else{f=g._clientSettings._clientMessages._dragToReorder;
}for(var e=0;
e<d.length;
e++){c=d[e].get_element();
c.title=f;
c.style.cursor="move";
}this.id=0;
if(($telerik.isChrome)&&$telerik.getElementByClassName(h,"rpgFieldsPopup","span")){this._onFieldsPopupMouseEnterDelegate=$telerik.addMobileHandler(this,h,"mouseover",this._onFieldsPopupMouseEnter);
}},_onFieldsPopupMouseEnter:function(d){var g=this,c=a.PivotGrid.GetTouchCurrentElement(d);
while(c){if(c.className&&c.className.indexOf("rpgFieldsPopup")!==-1){if(g._fieldsWrapper){g._fieldsWrapper.style.display="none";
}var f=$telerik.getElementByClassName(c,"rpgFieldsPopupWrapper","span")||c;
setTimeout(function(){f.style.display="inline";
g._fieldsWrapper=f;
});
return;
}c=c.parentNode;
}if(g._fieldsWrapper){g._fieldsWrapper.style.display="none";
g._fieldsWrapper=null;
}},dispose:function(){var c=this;
if(c._onMouseDownDelegate){$telerik.removeMobileHandler(document,"mousedown",c._onMouseDownDelegate,null,true);
}if(c._onMouseUpDelegate){$telerik.removeMobileHandler(document,"mouseup",c._onMouseUpDelegate,null,true);
}if(c._onMouseMoveDelegate){$telerik.removeMobileHandler(document,"mousemove",c._onMouseMoveDelegate,null,true);
}if(c._onFieldsWindowMouseDownDelegate){$telerik.removeMobileHandler(document,"mousemove",c._onFieldsWindowMouseDownDelegate,null,true);
}if(c._onFieldsPopupMouseEnterDelegate){$telerik.removeMobileHandler(document,"mouseout",c._onFieldsPopupMouseEnterDelegate,null,true);
}a.PivotGridDragDrop.callBaseMethod(c,"dispose");
},get_owner:function(){return this._owner;
},set__owner:function(c){this._owner=c;
},_attachFieldsWindowEvent:function(){if(this._onFieldsWindowMouseDownDelegate==null){this._onFieldsWindowMouseDownDelegate=$telerik.addMobileHandler(this,this._owner.get_fieldsWindow().get_contentElement(),"mousedown",this._onMouseDownHandler);
}},_onMouseDownHandler:function(d){if(d.button!=Sys.UI.MouseButton.leftButton&&!$telerik.isTouchDevice){return false;
}var c=a.PivotGrid.GetTouchCurrentElement(d);
if(!a.PivotGrid.IsDomElement(c)){return false;
}this._fieldReference=this._owner._searchForFieldFromElement(c);
if(this._fieldReference==null){return;
}if(a.PivotGrid.GetZoneType(this._getMouseOverZone(d))==-1&&this._fieldReference.get_element().parentNode.className.indexOf("rpgFieldsWindow")==-1){return;
}this._onMouseUpDelegate=$telerik.addMobileHandler(this,document,"mouseup",this._onMouseUpHandler,null,true);
this._onMouseMoveDelegate=$telerik.addMobileHandler(this,document,"mousemove",this._onMouseMoveHandler,null,true);
a.PivotGrid.ClearDocumentEvents();
},_onMouseUpHandler:function(d){$telerik.removeMobileHandler(document,"mouseup",this._onMouseUpDelegate,null,true);
$telerik.removeMobileHandler(document,"mousemove",this._onMouseMoveDelegate,null,true);
var c=this._dragElement;
if(c!=null){a.PivotGridDragDropBase.DestroyOrderIndicatorPair(this._orderIndicatorPair);
c.parentNode.removeChild(c);
this._fireDropAction(d);
this._dragElement=null;
}a.PivotGrid.RestoreDocumentEvents();
},_onMouseMoveHandler:function(g){if($telerik.isTouchDevice){g.preventDefault();
}var j=this._owner;
var l=this._fieldReference;
if(this._dragElement==null){var k=j.Skin;
this._dragElement=a.PivotGridDragDropBase.CreateDragElement(l.get_element(),k,j.get_enableAriaSupport());
this._orderIndicatorPair=a.PivotGridDragDropBase.CreateOrderIndicatorPair(["&darr;","&uarr;"],["PivotGridReorderTop","PivotGridReorderBottom"],k,2000);
}var f=this._dragElement;
var i=this._orderIndicatorPair;
a.PivotGridDragDropBase.PositionDragElement(f,g);
var p=-1;
var h=this._getMouseOverZone(g);
if(h!=null){p=a.PivotGrid.GetZoneType(h);
}if(p!=-1&&(Telerik.Web.UI.PivotGridFieldZoneType.Filter!=l.get_zoneType()||Telerik.Web.UI.PivotGridFieldZoneType.Filter!=p)){var n=a.PivotGridDragDropBase.GetFieldPlacementData(j,h,g,false);
var m=$find(n.element.id);
var o=a.PivotGridDragDropBase.GetZoneIndex(p,l,m,n.isFirstElement);
if(l._canReorder(p,o,n.isFirstElement)){var d=a.PivotGrid.GetTouchCurrentElement(g);
var c=n.element.parentNode.className;
if(d===h&&c&&c.indexOf("rpgFieldsPopupWrapper")!==-1){a.PivotGridDragDropBase.MoveOrderIndicatorPair(h,i,false,true);
}else{a.PivotGridDragDropBase.MoveOrderIndicatorPair(n.element,i,false,n.isFirstElement);
}return;
}}a.PivotGridDragDropBase.HideOrderIndicatorPair(i);
},_getFirstParentByTagName:function(c,d){while(c&&c.parentNode){if(c.tagName.toLowerCase()==d.toLowerCase()){return c;
}c=c.parentNode;
}return null;
},_getMouseOverZone:function(d){var j=["rpgFilterZone","rpgDataZone","rpgColumnsZone","rpgRowsZone"];
var h=this._owner;
var c=a.PivotGrid.GetTouchCurrentElement(d);
if(!a.PivotGrid.IsDomElement(c)){return null;
}c=this._getFirstParentByTagName(c,"td");
if(!a.PivotGrid.IsDomElement(c)||!c||!c.className){return null;
}var f=h._getField(c);
if(f!=null&&!f.get_isHidden()){return this._getFirstParentByTagName(f.get_element(),"td");
}f=h._getField(c.parentNode);
if(f!=null&&!f.get_isHidden()){return this._getFirstParentByTagName(f.get_element(),"td");
}for(var g=0;
g<j.length;
g++){if(!h._hiddenZones[j[g]]&&c.className.indexOf(j[g])!=-1){return c;
}}if(c.id.endsWith("_DropFieldHereCell")){return c;
}return null;
},_fireDropAction:function(d){var g=this._getMouseOverZone(d);
var h=this.get_owner();
var c=this._dragElement;
var i=h._getField(c.getElementsByTagName("*")[0]);
if(i==null){return;
}var f=i.get_uniqueName();
if(g==null&&!i.get_isHidden()){var k=h.get_fieldsWindow();
if(k){var l=k.get_contentElement();
if($telerik.isMouseOverElementEx(l,d)){h.hideField(f);
}}}else{var o=a.PivotGrid.GetZoneType(g);
if(o==-1||(Telerik.Web.UI.PivotGridFieldZoneType.Filter==i.get_zoneType()&&Telerik.Web.UI.PivotGridFieldZoneType.Filter==o)){return;
}var m=a.PivotGridDragDropBase.GetFieldPlacementData(h,g,d,false);
var j=$find(m.element.id);
var n=a.PivotGridDragDropBase.GetZoneIndex(o,i,j,m.isFirstElement);
if(i._canReorder(o,n,m.isFirstElement)){h.tryReorderField(f,o,n);
}}}};
a.PivotGridDragDrop.registerClass("Telerik.Web.UI.PivotGridDragDrop",Sys.Component);
})(Telerik.Web.UI,undefined);
