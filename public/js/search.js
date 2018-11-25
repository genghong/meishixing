$(function(){
    if(location.search.indexOf("lid")!=-1){
         var data=location.search.split("&");
         var uid=data[0].split("=")[1];
         var name=data[1].split("=")[1];  
         $(".left_menu_head>span").html(decodeURI(name));
        var pno=0;
        function loadData(no){
           pno=no;
           $.ajax({
            url:"http://localhost:3000/search/list",
            type:"get",
            data:{uid,pno},
            dataType:"json",
            success:function(output){
              var html=``;
              for(var item of output.product){
                  var {name,pic,txt}=item;
                  html+=`<li>
                  <img src="${pic}" alt="">
                  <span>${name}</span>
                  <p>${txt}</p>
                  <div class="icon">
                      <i class="iconfont icon-star"><span>5</span></i>
                      <i class="iconfont icon-xiaoxi1"><span>8</span></i>
                  </div>
              </li>`;
              }   
              $(".left_menu_body>ul").html(html);
                  ++output.pno;
              $(".page").children().first().html(output.pno+"/"+output.pageCount);
               if(output.pno==1){
                $(".btn").children().first().attr("disabled","disabled");
                $(".btn").children().first().css("background","#ccc");
              }else{
                $(".btn").children().first().removeAttr("disabled");
                $(".btn").children().first().css("background","#f9a200");
              }
               if(output.pno==output.pageCount){
                $(".btn").children().last().attr("disabled","disabled");
                $(".btn").children().last().css("background","#ccc");
              }else{
                $(".btn").children().last().removeAttr("disabled");
                $(".btn").children().last().css("background","#f9a200");  
              }
            }
        })
        }
    loadData(0); 
   $(".btn").on("click","button",function(){
    $(this).css({
        "background":"#f9a200",
        "color":"#fff"});
        if($(this).is(":first-child")){
            var no=pno-1; 
        }else{
            var no=pno+1
        }
        loadData(no);   
 }) 
    }
    if(location.search.indexOf("kword")!=-1){
        var kword=location.search.split("=")[1];
        kword= decodeURI(kword);
        $(".left_menu_head>span").html(kword+"类");
        var pno=0;
        function searchData(no){
            pno=no;
            $.ajax({
                url:"http://localhost:3000/search/data",
                data:{kword,pno},
                type:"get",
                dataType:"json",
                success:function(output){
                        var html=``;
                        for(var item of output.product){
                            var {name,pic,txt}=item;
                            html+=`<li>
                            <img src="${pic}" alt="">
                            <span>${name}</span>
                            <p>${txt}</p>
                            <div class="icon">
                                <i class="iconfont icon-star"><span>5</span></i>
                                <i class="iconfont icon-xiaoxi1"><span>8</span></i>
                            </div>
                        </li>`;
                        }   
                        $(".left_menu_body>ul").html(html);
                       ++output.pno;
                   $(".page").children().first().html(output.pno+"/"+output.pageCount);
                    if(output.pno==1){
                     $(".btn").children().first().attr("disabled","disabled");
                     $(".btn").children().first().css("background","#ccc");
                   }else{
                     $(".btn").children().first().removeAttr("disabled");
                     $(".btn").children().first().css("background","#f9a200");
                   }
                    if(output.pno==output.pageCount){
                     $(".btn").children().last().attr("disabled","disabled");
                     $(".btn").children().last().css("background","#ccc");
                   }else{
                     $(".btn").children().last().removeAttr("disabled");
                     $(".btn").children().last().css("background","#f9a200");  
                   }
                }
            })
        }
        searchData(0); 
        $(".btn").on("click","button",function(){
         $(this).css({
             "background":"#f9a200",
             "color":"#fff"});
             if($(this).is(":first-child")){
                 var no=pno-1; 
             }else{
                 var no=pno+1
             }
             searchData(no);   
      }) 
    }
})