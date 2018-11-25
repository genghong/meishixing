$(function(){
    $(".type-box>.box-bott").hide();
    $(".type-box>.box-top").on("click","button",function(){
        var $but=$(this);
        $but.parent().next().slideToggle();     
    })
    if(location.search.indexOf("lid=")!=-1){
        var uid=location.search.split("=")[1];
        $.ajax({
            url:"http://localhost:3000/detail/details",
            type:"get",
            data:"uid="+uid,
            dataType:"json",
            success:function(res){
               for(var item of res.product){
                   var {pic,title,text}=item;
                   var html1=`<div class="ban-pic"><img src="${pic}" alt=""></div>
                   <div class="ban-txt">
                       <span class="ban-title">${title}</span>
                       <p>${text}</p>
                   </div>`;
                  var html2=`<span>${title}的做法</span>
                  <span>${title}的营养功效</span>`;
               }
               $(".ban").html(html1);
               $(".foot-title").html(html2);
               if(res.type.length>0){
                    var html="";
                    for(var item of res.type){
                        var {pic,name,collect}=item;
                        html+=`<li >
                        <div class="list-pic"><img src="${pic}" alt=""></div>
                        <div class="list-dis">
                            <div class="star">
                                <img src="img/icon/star-on.png" alt="">
                            <img src="img/icon/star-on.png" alt="">
                            <img src="img/icon/star-on.png" alt="">
                            <img src="img/icon/star-on.png" alt="">
                            <img src="img/icon/star-on.png" alt="">
                            </div>
                            <div class="coll"><span>${collect}</span>个收藏</div>
                        </div>
                        <div class="pic-bottom">${name}</div>
                    </li>`;
                    }
                    $(".foot-list>ul").html(html);
               }else{
                  var data= $(".data-nul").css("display","block");
                $(".foot-list>ul").html(data);  
               }
               
            }
        })
    }
    $(".foot-title").on("click","span",function(){
      var $span=$(this);
      $span.css({
          "border-bottom":"1px solid #f6a200",
          "color":"#f6a200"
      }).siblings().css({
        "border-bottom":"none",
        "color":"#000"
      })
      var i=$span.index();
      if(i==0){
          $(".foot-list").css("display","block");
          $(".foot_data").css("display","none");
      }else{
        $(".foot-list").css("display","none");
        $(".foot_data").css("display","block"); 
      }
    })
})