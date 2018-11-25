$(function(){
    if(location.search.indexOf("lid=")!=-1){
        var uid=location.search.split("=")[1];
        $.ajax({
            url:"http://localhost:3000/detail/detail",
            type:"get",
            data:"uid="+uid,
            dataType:"json",
            success:function(res){
                for(var p of res.product){
                var {pic,title,time,tex}=p;
                    var html=`<div class="show-pic">
                    <img src="${pic}" alt="">
                </div>
                <div class="show-text">
                    <div class="show-name">
                        <span>${title}</span>
                        <div class="collect">+收藏</div>
                    </div>
                    <div class="show-deg">
                        <div class="star">
                          难度 <img src="img/icon/star-on.png" alt="">
                               <img src="img/icon/star-on.png" alt="">
                               <img src="img/icon/star-on.png" alt="">
                               <img src="img/icon/star-on.png" alt="">
                               <img src="img/icon/star-on.png" alt="">
                        </div>
                        <div class="show-col"><img src="" alt="">0收藏</div>
                        <div class="time">烹饪时间<span> < ${time}分钟</span></div>
                    </div>
                    <div class="show-detail">
                        <p>${tex}</p>
                    </div>
                </div>`
                }
                $(".show").html(html);
                
                var html1="";
                var j=0;
              for(var itm of res.step){
                   j++;
                  var {pic,step}=itm;
                  html1+=`<li>
                  <div class="step-img"><img src="${pic}" alt=""></div>
                  <div class="step-txt">
                      <span>${j}</span>
                      <p>${step}</p>
                  </div>
              </li>`;  
              }
              $(".step>ul").html(html1);
              var html2="";
              for(var item of res.flavour){
                 var {flavour,num}=item;
                 html2+=`<li>
                 <p>${flavour}</p>
                 <span>${num}</span>
              </li>`;
              }
            $(".material").last().children().html(html2);  
            var html3="";
            for(var item of res.fot){
                var {foot,num}=item;
                html3+=`<li>
                <p>${foot}</p>
                <span>${num}</span>
                </li>`;
            }
            $(".material").first().children().html(html3);
            for(var item of res.product){
                var {know}=item;
                var html=`<p>${know}</p>`;
            }
            $(".sub-know").html(html);
            }
        })
    }
    var h=document.body.clientHeight;
   window.onscroll=function(){
       var a=document.documentElement.scrollTop;
       if(a>h*0.9){
         $(".message2").css("display","none");
       }else{
        $(".message2").css("display","block"); 
       }
   }
})