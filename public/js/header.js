$(function(){
    $("<link rel='stylesheet' href='css/header.css'>").appendTo("head");
    $.ajax({
        url:"http://localhost:3000/header.html",
        type:"get", 
        success:function(res){
            $(".header").replaceWith(res);
             $(".nav>.nav-body>.nav-txt>li:nth-child(2)")
                  .on("mouseover",function(){
                       $(".nav_hid").addClass("hover");
                     })
                  .on("mouseout",function(){
                    $(".nav_hid").removeClass("hover");
                  }) 
            $("#login").click(function(e){
                e.preventDefault();
                location.href="login.html?back="+location.href;
            }) 
            $.ajax({
                url:"http://localhost:3000/user/islogin",
                type:"get",
                dataType:"json",
                success:function(data){
                    if(data.ok==0){
                        $(".head").show();
                        $(".headed").hide();
                    }else{
                        $(".headed").show();
                        $(".head").hide();
                    }
                }
            }) 
            $(".avatar").on("mouseenter",function(){
                $(".author_list").addClass("hover");
               }) 
              .on("mouseleave",function(){
                    $(".author_list").removeClass("hover");
                })
            $(".author_list>li:last-child").click(function(){
                $.ajax({
                    url:"http://localhost:3000/user/signout",
                    type:"get",
                    success:function(){
                        location.reload();
                    }
                })
            })  
          $.ajax({
              url:"http://localhost:3000/search/type",
              type:"get",
              dataType:"json",
              success:function(res){
                var a=$(".nav_hid").find("ul");
                var first=res.slice(0,3);
                var html1="";
                for(var item of first){
                    var {lid,name}=item;
                html1+=`<li><a href="http://localhost:3000/search.html?lid=${lid}&name=${name}">${name}</a></li>`;
                }
                html1+=`<div class="clear"></div>`;
                $(a[0]).html(html1);
                 var second=res.slice(3,7);
                 var html2="";
                 for(var item of second){
                    var {lid,name}=item;
                    html2+=`<li><a href="http://localhost:3000/search.html?lid=${lid}&name=${name}">${name}</a></li>`;
                 }
                 html2+=`<div class="clear"></div>`;
                 $(a[1]).html(html2);
                var last=res.slice(7,10);
                 var html3="";
                 for(var item of last){
                    var {lid,name}=item;
                    html3+=`<li><a href="http://localhost:3000/search.html?lid=${lid}&name=${name}">${name}</a></li>`;
                 }
                 $(a[2]).html(html3);
              }
          })
         //搜索框
         $(".right_input_btn").on("click",function(){
            var text=$(".right_input>input").val().trim();
            if(text!==""){
                location.href=`http://localhost:3000/search.html?kword=${text}`;
            }
         })
        }
    })
  
})