//拖拽,不拖出对象的父级dragDiv
           var oDragDiv=document.getElementById('dragDiv');
           var oDrag=document.getElementById('drag');
           oDrag.onmousedown=function(ev){
               var oEvent=ev||event;
               var pos=getMousePosition(oEvent);
               var disX=pos.x-oDrag.offsetLeft;
               var disY=pos.y-oDrag.offsetTop;
               if(oDrag.setCapture){
                   //兼容IE7-11
                  oDrag.onmousemove=Mousemove;
                   oDrag.onmouseup=mouseUp;
                  oDrag.setCapture();
               }else{
                   //兼容FF,Chrome
                   document.onmousemove=Mousemove;
                   document.onmouseup=mouseUp;
               }
 
               function getMousePosition(ev){
                var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
                  var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
                  return {x:ev.clientX+scrollLeft,y:ev.clientY+scrollTop};
               };
              //合并代码
           function Mousemove(ev){
                 var oEvent=ev||event
                  var pis=getMousePosition(oEvent);
                 var l=pis.x-disX;
                  var t=pis.y-disY;

                  //限制范围,磁性吸附,快接近父级时,自动吸附上去
                  if (l<30) {
                       l=0;
                  }else if(l>oDragDiv.offsetWidth-oDrag.offsetWidth){
                      l=oDragDiv.offsetWidth-oDrag.offsetWidth;
                  }
                   if (t<30) {
                       t=0;
                  }else if(t>oDragDiv.offsetHeight-oDrag.offsetHeight){
                       t=oDragDiv.offsetHeight-oDrag.offsetHeight;
                  }
                  oDrag.style.left=l+'px';
                  oDrag.style.top=t+'px';
              };
              function mouseUp(){
                   //当鼠标抬起时,mousemove/up清空
                   this.onmousemove=null;
                   this.onmouseup=null;
                   if (oDrag.releaseCapture) {
                      oDrag.releaseCapture();
                  }
              };
              return false;    //FF等高版本浏览器中阻止默认行为
          };
