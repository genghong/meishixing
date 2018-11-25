$(function(){
    $(".center>.center-left>ul").on("click","a",function(e){
        e.preventDefault();
         var $a=$(this);
         $a.parent().css("border-left","3px solid #2663b9")
           .siblings().css("border-left","none");
              var id=$a.attr("href");
                $(id).removeClass("active")
                .siblings().addClass("active");
    })
}) 