$(function(){
    $("input:checkbox").on("click",function(){
        var $chb=$(this);
        $("input:submit").prop("disabled",!$chb.prop("checked"))
    })
    $(".regist").click(function(){
        var uname=$(".uname").val();
        var upwd=$(".upwd").val();
        var email=$(".email").val();
        var phone=$(".phone").val();
        $.ajax({
            url:"http://localhost:3000/user/register",
            type:"get",
            data:{uname,upwd,email,phone},
            dataType:"json",
            success:function(data){
                if(data.msg==="注册成功"){
                    alert("注册成功");
                }else{
                    alert("注册失败");
                }
            }
        })

    })
})