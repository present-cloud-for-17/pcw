(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dashboard"],{"454f":function(t,e,i){i("46a7");var s=i("584a").Object;t.exports=function(t,e,i){return s.defineProperty(t,e,i)}},"46a7":function(t,e,i){var s=i("63b6");s(s.S+s.F*!i("8e60"),"Object",{defineProperty:i("d9f6").f})},"498b":function(t,e,i){"use strict";var s=i("ce8f"),a=i.n(s);a.a},"60f2":function(t,e,i){t.exports=i.p+"static/img/img.62b23c9b.jpg"},"7a58":function(t,e,i){"use strict";var s=i("2b0e"),a=new s["default"];e["a"]=a},"85f2":function(t,e,i){t.exports=i("454f")},b367:function(t,e,i){!function(e,i){t.exports=i()}(0,(function(){"use strict";function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function e(t){return function(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var i=window.devicePixelRatio||1,s=10*i,a=s/2;return function(){function n(t,e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.canvas=function(t){var e=document.getElementById(t),s=e.parentNode.clientWidth,a=e.parentNode.clientHeight;return e.style.width=s+"px",e.style.height=a+"px",e.width=s*i,e.height=a*i,e}(t),this.ctx=this.canvas.getContext("2d"),this.type="bar",this.showValue=!0,this.showGrid=!0,this.topPadding=60*i,this.leftPadding=50*i,this.rightPadding=10*i,this.bottomPadding=50*i,this.yEqual=5,this.yLength=0,this.xLength=0,this.ySpace=0,this.xRorate=0,this.yRorate=0,this.bgColor="#fff",this.axisColor="#666",this.gridColor="#eee",this.title={text:"",color:"#666",position:"top",font:"bold "+18*i+"px Arial",top:s,bottom:a},this.legend={display:!0,position:"top",color:"#666",font:14*i+"px Arial",top:45*i,bottom:15*i,textWidth:0},this.radius=100*i,this.innerRadius=60*i,this.colorList=["#4A90E2","#F5A623","#ff5858","#5e64ff","#2AC766","#743ee2","#b554ff","#199475"],this.init(e)}return function(e,i,s){i&&t(e.prototype,i),s&&t(e,s)}(n,[{key:"init",value:function(t){if(t.title=Object.assign({},this.title,t.title),t.legend=Object.assign({},this.legend,t.legend),Object.assign(this,t),!t.labels||!t.labels.length)throw new Error("缺少主要参数labels");if(!t.datasets||!t.datasets.length)throw new Error("缺少主要参数datasets");this.drawBackground(),"bar"===this.type||"line"===this.type?this.renderBarChart():this.renderPieChart(),this.drawLegend()}},{key:"renderBarChart",value:function(){this.yLength=Math.floor((this.canvas.height-this.topPadding-this.bottomPadding-s)/this.yEqual),this.xLength=Math.floor((this.canvas.width-this.leftPadding-this.rightPadding-s)/this.labels.length),this.ySpace=function(t,i){var s=t.map((function(t){return t.data.reduce((function(t,e){return e<t?t:e}))})),a=Math.ceil(Math.max.apply(Math,e(s))/i),n=a.toString().length-1;return n=2<n?2:n,Math.ceil(a/Math.pow(10,n))*Math.pow(10,n)}(this.datasets,this.yEqual),this.drawXAxis(),this.drawYAxis(),this.drawBarContent()}},{key:"drawBarContent",value:function(){var t=this.ctx,e=this.datasets.length;t.beginPath();for(var n=0;n<e;n++){t.font=this.legend.font,this.legend.textWidth+=Math.ceil(t.measureText(this.datasets[n].label).width),t.fillStyle=t.strokeStyle=this.datasets[n].fillColor||this.colorList[n];for(var o=this.datasets[n].data,l=0;l<o.length;l++)if(!(l>this.labels.length-1)){var r=this.xLength/(e+1),h=this.yLength/this.ySpace,c=this.leftPadding+this.xLength*l+r*(n+.5),d=c+r,f=this.canvas.height-this.bottomPadding,u=f-o[l]*h;if("bar"===this.type)t.fillRect(c,u,d-c,f-u),this.drawValue(o[l],c+r/2,u-a);else if("line"===this.type){var g=this.leftPadding+this.xLength*(l+.5);t.beginPath(),t.arc(g,u,3*i,0,2*Math.PI,!0),t.fill(),0!==l&&(t.beginPath(),t.strokeStyle=this.datasets[n].fillColor||this.colorList[n],t.lineWidth=2*i,t.moveTo(g-this.xLength,f-o[l-1]*h),t.lineTo(g,u),t.stroke(),t.lineWidth=1*i),this.drawValue(o[l],g,u-s)}}}t.stroke()}},{key:"renderPieChart",value:function(){for(var t=this.ctx,e=this.labels.length,i=this.datasets[0],s=i.data,a=s.reduce((function(t,e){return t+e})),n=-Math.PI/2,o=this.canvas.width/2,l=this.canvas.height/2,r=0;r<e;r++){t.font=this.legend.font,this.legend.textWidth+=Math.ceil(t.measureText(this.labels[r]).width),t.beginPath(),t.strokeStyle=t.fillStyle=i.colorList&&i.colorList[r]||this.colorList[r],t.moveTo(o,l);var h=n,c=n+=s[r]/a*2*Math.PI;t.arc(o,l,this.radius,h,c),t.closePath(),t.fill();var d=(h+c)/2;this.drawPieValue(s[r],d)}"ring"===this.type&&(t.beginPath(),t.fillStyle=this.bgColor,t.arc(o,l,this.innerRadius,0,2*Math.PI),t.closePath(),t.fill())}},{key:"drawValue",value:function(t,e,s){var a=this.ctx;this.showValue&&(a.textBaseline="middle",a.font=12*i+"px Arial",a.textAlign="center",a.fillText(t,e,s))}},{key:"drawPieValue",value:function(t,e){var i=this.ctx;if(this.showValue){var a=this.canvas.width/2,n=this.canvas.height/2,o=Math.ceil(Math.abs(this.radius*Math.cos(e))),l=Math.floor(Math.abs(this.radius*Math.sin(e)));i.textBaseline="middle",this.showValue&&(e<=0?(i.textAlign="left",i.moveTo(a+o,n-l),i.lineTo(a+o+s,n-l-s),i.moveTo(a+o+s,n-l-s),i.lineTo(a+o+3*s,n-l-s),i.stroke(),i.fillText(t,a+o+3.5*s,n-l-s)):0<e&&e<=Math.PI/2?(i.textAlign="left",i.moveTo(a+o,n+l),i.lineTo(a+o+s,n+l+s),i.moveTo(a+o+s,n+l+s),i.lineTo(a+o+3*s,n+l+s),i.stroke(),i.fillText(t,a+o+3.5*s,n+l+s)):e>Math.PI/2&&e<Math.PI?(i.textAlign="right",i.moveTo(a-o,n+l),i.lineTo(a-o-s,n+l+s),i.moveTo(a-o-s,n+l+s),i.lineTo(a-o-3*s,n+l+s),i.stroke(),i.fillText(t,a-o-3.5*s,n+l+s)):(i.textAlign="right",i.moveTo(a-o,n-l),i.lineTo(a-o-s,n-l-s),i.moveTo(a-o-s,n-l-s),i.lineTo(a-o-3*s,n-l-s),i.stroke(),i.fillText(t,a-o-3.5*s,n-l-s)))}}},{key:"drawBackground",value:function(){this.ctx.fillStyle=this.bgColor,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.drawTitle()}},{key:"drawTitle",value:function(){var t=this.title;if(t.text){var e=this.ctx;e.beginPath(),e.font=t.font,e.textAlign="center",e.fillStyle=t.color,"top"===t.position?(e.textBaseline="top",e.fillText(t.text,this.canvas.width/2,t.top)):(e.textBaseline="bottom",e.fillText(t.text,this.canvas.width/2,this.canvas.height-t.bottom))}}},{key:"drawXAxis",value:function(){var t=this.ctx,e=this.canvas.height-this.bottomPadding+.5;t.beginPath(),t.strokeStyle=this.axisColor,t.moveTo(this.leftPadding,e),t.lineTo(this.canvas.width-this.rightPadding,e),t.stroke(),this.drawXPoint()}},{key:"drawXPoint",value:function(){var t=this.ctx;t.beginPath(),t.font=12*i+"px Microsoft YaHei",t.textAlign=this.xRorate?"right":"center",t.textBaseline="top",t.fillStyle=this.axisColor;for(var e=0;e<this.labels.length;e++){var n=this.labels[e],o=this.leftPadding+this.xLength*(e+1)+.5,l=this.canvas.height-this.bottomPadding;this.showGrid?(t.strokeStyle=this.gridColor,t.moveTo(o,l),t.lineTo(o,this.topPadding+s)):(t.moveTo(o,l),t.lineTo(o,l-a)),t.stroke(),t.save(),t.translate(o-this.xLength/2,l+a),t.rotate(-this.xRorate*Math.PI/180),t.fillText(n,0,0),t.restore()}}},{key:"drawYAxis",value:function(){var t=this.ctx;t.beginPath(),t.strokeStyle=this.axisColor,t.moveTo(this.leftPadding-.5,this.canvas.height-this.bottomPadding+.5),t.lineTo(this.leftPadding-.5,this.topPadding+.5),t.stroke(),this.drawYPoint()}},{key:"drawYPoint",value:function(){var t=this.ctx;t.font=12*i+"px Microsoft YaHei",t.textAlign="right",t.textBaseline="middle",t.beginPath();for(var e=0;e<this.yEqual;e++){var n=this.leftPadding,o=this.canvas.height-this.bottomPadding-this.yLength*(e+1)+.5;this.showGrid?(t.strokeStyle=this.gridColor,t.moveTo(n,o),t.lineTo(this.canvas.width-this.rightPadding-s,o)):(t.strokeStyle=this.axisColor,t.moveTo(n-a,o),t.lineTo(n,o)),t.stroke(),t.save(),t.fillStyle=this.axisColor,t.translate(n-s,o),t.rotate(-this.yRorate*Math.PI/180),t.fillText(this.ySpace*(e+1),0,0),t.restore()}}},{key:"drawLegend",value:function(){var t=this.legend;if(t.display){var e=this.ctx,i="pie"===this.type||"ring"===this.type;e.beginPath(),e.font=t.font,e.textAlign="left",e.textBaseline="middle";for(var n=i?this.labels.length:this.datasets.length,o=(this.canvas.width-(this.legend.textWidth+(5*n-2)*s))/2,l=0,r=0;r<n;r++){var h=i?this.datasets[0]:this.datasets[r],c=(i?this.labels[r]:h.label)||"";e.fillStyle=h.colorList&&h.colorList[r]||h.fillColor||this.colorList[r],"top"===t.position?(this.drawLegendIcon(o+5*s*r+l,t.top-a,2*s,s),e.fillStyle=t.color,e.fillText(c,o+(5*r+3)*s+l,t.top)):"bottom"===t.position?(this.drawLegendIcon(o+5*s*r+l,this.canvas.height-t.bottom-a,2*s,s),e.fillStyle=t.color,e.fillText(c,o+(5*r+3)*s+l,this.canvas.height-t.bottom)):(e.fillRect(s,t.top+2*s*r,2*s,s),e.fillStyle=t.color,e.fillText(c,4*s,t.top+2*s*r+.5*s)),l+=Math.ceil(e.measureText(c).width)}}}},{key:"drawLegendIcon",value:function(t,e,n,o){var l=this.ctx;"line"===this.type?(l.beginPath(),l.strokeStyle=l.fillStyle,l.lineWidth=2*i,l.moveTo(t,e+a),l.lineTo(t+2*s,e+a),l.stroke(),l.lineWidth=1*i,l.arc(t+s,e+a,3*i,0,2*Math.PI,!0),l.fill()):l.fillRect(t,e,n,o)}}]),n}()}))},ce8f:function(t,e,i){},da58:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"limit"}},[s("el-row",{attrs:{gutter:20}},[s("el-col",{attrs:{span:16}},[s("el-row",{staticClass:"mgb20",attrs:{gutter:20}},[s("el-col",{attrs:{span:8}},[s("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[s("div",{staticClass:"grid-content grid-con-1"},[s("i",{staticClass:"el-icon-lx-people grid-con-icon"}),s("div",{staticClass:"grid-cont-right"},[s("div",{staticClass:"grid-num"},[t._v(t._s(t.level))]),s("div",[t._v("用户等级")])])])])],1),s("el-col",{attrs:{span:8}},[s("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[s("div",{staticClass:"grid-content grid-con-2"},[s("i",{staticClass:"el-icon-lx-notice grid-con-icon"}),s("div",{staticClass:"grid-cont-right"},[s("div",{staticClass:"grid-num"},[t._v("3")]),s("div",[t._v("系统消息")])])])])],1),s("el-col",{attrs:{span:8}},[s("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[s("div",{staticClass:"grid-content grid-con-3"},[s("i",{staticClass:"el-icon-lx-goods grid-con-icon"}),s("div",{staticClass:"grid-cont-right"},[s("div",{staticClass:"grid-num"},[t._v("6")]),s("div",[t._v("待办事项")])])])])],1)],1),s("el-card",{staticStyle:{height:"403px"},attrs:{shadow:"hover"}},[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("span",[t._v("待办事项")]),s("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"}},[t._v("添加")])],1),s("el-table",{staticStyle:{width:"100%"},attrs:{"show-header":!1,data:t.todoList}},[s("el-table-column",{attrs:{width:"40"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-checkbox",{model:{value:e.row.status,callback:function(i){t.$set(e.row,"status",i)},expression:"scope.row.status"}})]}}])}),s("el-table-column",{scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",{staticClass:"todo-item",class:{"todo-item-del":e.row.status}},[t._v(t._s(e.row.title))])]}}])}),s("el-table-column",{attrs:{width:"60"}},[[s("i",{staticClass:"el-icon-edit"}),s("i",{staticClass:"el-icon-delete"})]],2)],1)],1)],1),s("el-col",{attrs:{span:8}},[s("el-card",{staticClass:"mgb20",staticStyle:{height:"260px"},attrs:{shadow:"hover"}},[s("div",{staticClass:"user-info"},[s("img",{staticClass:"user-avator",attrs:{src:i("60f2"),alt:""}}),s("div",{staticClass:"user-info-cont"},[s("div",{staticClass:"user-info-name"},[t._v(t._s(t.name))]),s("div",{staticClass:"user-info-list-l"},[t._v(t._s(t.role))])])]),s("div",{staticClass:"user-info-list-l"},[t._v("\n                    本次登录时间：\n                    "),s("span",[t._v("2020-03-21")])]),s("div",{staticClass:"user-info-list-l"},[t._v("\n                    本次登录地点：\n                    "),s("span",[t._v("福建福州")])])]),s("el-card",{staticStyle:{height:"240px"},attrs:{shadow:"hover"}},[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("span",[t._v("详细信息")])]),s("div",{staticClass:"user-info-list-l"},[t._v("\n                    上次登录时间：\n                    "),s("span",[t._v("2020-03-15")])]),s("div",{staticClass:"user-info-list-l"},[t._v("\n                    上次登录地点：\n                    "),s("span",[t._v("福建三明")])]),s("div",{staticClass:"user-info-list-l"},[t._v("\n                    用户当前状态：\n                    "),s("span",[t._v("正常")])]),s("div",{staticClass:"user-info-list-l"},[t._v("\n                    当前经验值：\n                    "),s("span",[t._v("unknown")])])])],1)],1)],1)},a=[],n=(i("ac6a"),i("7f7f"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("canvas",{attrs:{id:t.canvasId}})])}),o=[],l=(i("8e6e"),i("456d"),i("85f2")),r=i.n(l);function h(t,e,i){return e in t?r()(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var c=i("b367"),d=i.n(c);function f(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,s)}return i}function u(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?f(Object(i),!0).forEach((function(e){h(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):f(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var g={props:{canvasId:{type:String,default:"",required:!0},options:{type:Object,required:!0}},mounted:function(){this.renderChart()},methods:{renderChart:function(){if(this.checkOptions()){var t=u({},this.options);new d.a(this.canvasId,t)}},checkOptions:function(){var t=this.options;return!(!t.datasets||!t.datasets.length)&&!(!t.labels||!t.labels.length)}},watch:{options:{handler:function(t,e){this.renderChart()},deep:!0}}},v=g,p=i("2877"),b=Object(p["a"])(v,n,o,!1,null,null,null),x=b.exports,y=(i("7a58"),{name:"dashboard",data:function(){return{name:localStorage.getItem("ms_username"),todoList:[{title:"今天要做完登录页",status:!0},{title:"今天要做完编辑页",status:!1},{title:"今天要做完权限页",status:!1}]}},components:{Schart:x},computed:{role:function(){return"admin"===this.name?"管理员":"teacher"===this.name?"教师":"学生"},level:function(){return"admin"===this.name?"MAX":"1"}},methods:{changeDate:function(){var t=(new Date).getTime();this.data.forEach((function(e,i){var s=new Date(t-864e5*(6-i));e.name="".concat(s.getFullYear(),"/").concat(s.getMonth()+1,"/").concat(s.getDate())}))}}}),w=y,m=(i("498b"),Object(p["a"])(w,s,a,!1,null,"dcdb3d06",null));e["default"]=m.exports}}]);