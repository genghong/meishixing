$(function(){
    var pno=0;
    function loadPage(){
        $.ajax({
        url:"http://localhost:3000/index/menu",
        type:"get",
        dataType:"json",
        data:{pno},
        success: function(output) {  
            var {menus}=output;
             var html=``;
             for(var p of menus){
                 var {uid,pic,title,collect,step,time,mode}=p;
                  html+=`<li> 
                  <a href="menuDetail.html?lid=${p.uid}">
                   <div class="txt-top">
                   <img src="${p.pic}"> 
                   </div>
                 <div class="txt-bottom">
                 <span>${p.title}</span>
                 <div class="txt-comment">
                     <div class="txt-star">
                         <img src="img/icon/star-on.png" alt="">
                        <img src="img/icon/star-on.png" alt="">
                         <img src="img/icon/star-on.png" alt="">
                         <img src="img/icon/star-on.png" alt="">
                        <img src="img/icon/star-on.png" alt="">
                     </div>
                     <div class="txt-collect"><span>${p.collect}</span>人收藏</div>
                 </div>       
             </div>
             <div class="txt-hid">
               <div class="txt-hidT">
                 <i class="iconfont icon-chushimao"></i>
                 <span>${p.step}步/大概${p.time}分钟</span>
               </div>
               <div class="txt-hidT">
                 <i class="iconfont icon-jinlingyingcaiwangtubiao08"></i>
                 <span>${p.mode}</span>
              </div>
            </div>
         </a>
       </li>`
     }
     $(".menu-txt").html(html);  
     } 
    }) 
 } 
    loadPage();
    $(".menu>.menu-title>.menu-title-right>ul").on("click","a",function(e){ 
        e.preventDefault();  
        var $a=$(this); 
        $a.parent().addClass("active")
        .siblings().removeClass("active");
         pno=$a.parent().index(); 
        loadPage();
})
    var pno1=0;
    function loadPage1(){
        $.ajax({
            url:"http://localhost:3000/index/veg",
            type:"get",
            data:{pno1},
            dataType:"json",
            success:function(output){
            var {vegs}=output;
            var html=``;
            for(var p of vegs){
                var {uid,pic,title,text}=p;
                html+=` <li>
                <a href="vegDetail.html?lid=${p.uid}">
                    <div class="veg_img">
                        <img src="${p.pic}" alt="">
                    </div>
                    <h3>${p.title}</h3>
                    <p>${p.text}</p>
                </a>
            </li>`
            }
            $(".vegetable-txt").html(html);
            }  
        }) 
    }
    loadPage1();
    $(".vegetable>.menu-title>.menu-title-right>ul").on("click","a",function(e){
       e.preventDefault();
       var $a=$(this);
       $a.parent().addClass("active");
       pno1++;
       if(pno1>1) pno1=0;
       loadPage1();
    })


    var b=$(".health-cont").find(".health-txt>ul>li");
     console.log(b[0]);
   $(".health-txt>ul>li").on("mouseenter",function(){
    var a=$(this).index();
})
})