(function(a,c,b,g){var f="rcuFileSize",d="rcuDropZone",e="rcuDropZoneText";
if(!c.RadCloudUpload.Views){c.RadCloudUpload.Views={};
}c.RadCloudUpload.Views.Classic=function(h){this._owner=h;
};
c.RadCloudUpload.Views.Classic.prototype={initialize:function(){var h=this._owner;
h._cssClasses={_rcuIcon:"rcuIcon"};
},dispose:function(){},_initializeInfoPanel:function(j){var m=this._owner;
if(m._panelMaxHeight||m._panelHeight){var i=j.find(".rcuFileList");
j.css("position","absolute").css("left","-10000px").css("visibility","hidden").css("display","block");
i.css("display","block");
var o=j.outerHeight(true),n=j.find(".rcuHeader").outerHeight(true),k=j.find(".rcuBody").outerHeight(true),h=j.find(".rcuBodyScroll"),l=h.outerHeight(true),p="";
if(m._panelMaxHeight){p=m._panelMaxHeight-n-(k-l)-(o-n-k);
h.css("max-height",p+"px");
}if(m._panelHeight){p=m._panelHeight-n-(k-l)-(o-n-k);
h.outerHeight(p);
}j.css("position","").css("left","auto").css("visibility","visible").css("display","none");
i.css("display","none");
}if(m._showEmptyFileListPanel){j.css("display","block");
}},_showElement:function(h,i){if(h.style.display=="none"){h.style.display=i?"inline-block":"block";
}},_hideElement:function(h){h.style.display="none";
},_renderFileSize:function(h){var k=this._owner._renderingManager;
var i=k._fileInfo.size,j=k._getFileSizeInKB(i);
if(i){h.appendChild(k._renderSpan(f," ("+j+" KB)"));
}},appendDefaultDropZone:function(j){var k=this._owner;
var h=a(j),l="<span class='"+e+"'>"+k.get_localization().DropZone+"</span>",i=a("<div>"+l+"</div>");
i.addClass(d).appendTo(h);
}};
})($telerik.$,Telerik.Web.UI,Telerik.Web.StringBuilder);
