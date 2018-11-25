$(function(){
$(".main_title>ul").on("click","li",function(){
	$(this).css("border-bottom","4px solid #f6a200").siblings().css("border-bottom","none");
	var li=$(this).index();
    var a=$(".main_content>div")[li];
	$(a).css("z-index","1").siblings().css("z-index","0");
})
})
