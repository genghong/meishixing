$(function(){
	$(".login").click(function(){
		var uname=$(".uname").val();
		var upwd=$(".upwd").val();
		$.ajax({
			url:"http://localhost:3000/user/login",
			type:"post",
			data:{uname,upwd},
		    dataType:"json",
			success:function(data){
				if(data.ok==0) alert(data.msg);
				else{
					alert(data.msg);
					if(location.search.startsWith("?back=")){
						var url=location.search.slice(6);
					location.href=url;
					}else{
						location.href="index.html";
					}
					
				}
			}
		})
	})
}) 