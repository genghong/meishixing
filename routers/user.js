const express=require('express');
const pool=require('../pool');
const router=express.Router();
//1.完成登录功能 
router.post('/login',(req,res)=>{
  var uname=req.body.uname;
  var upwd=req.body.upwd;  
  var sql='select * from ft_user where uname=? and upwd=?';
  pool.query(sql,[uname,upwd],(err,result)=>{
   if(err) throw err;
   if(result.length>0){
    res.writeHead(200);
      var user=result[0];
       req.session["uid"]=user["uid"]
     res.write(JSON.stringify({ok:1,msg:"登录成功,进入当前页"}));
   }else{
    res.write(JSON.stringify({ok:0,msg:'用户名或密码错误'}));
   }
   res.end();
  })
})
//2.登录成功后
 router.get("/islogin",(req,res)=>{
  res.writeHead(200);
   if(req.session["uid"]==undefined){
     res.write(JSON.stringify({ok:0})) 
     res.end()
   }
   else{
     var uid=req.session.uid;
     var sql="select * from ft_user where uid=?";
     pool.query(sql,[uid],(err,result)=>{
       if(err) throw err;
       var user=result[0];
       res.write(JSON.stringify({ok:1}))
       res.end()
     }) 
   }
 })
//3.注销
router.get("/signout",(req,res)=>{
  req.session["uid"]=undefined;
  res.end();
})
//4.用户注册
router.get('/register',(req,res)=>{
  var  uname=req.query.uname;
  if(!uname){
    res.send('昵称不能为空');
    return;
  }
  var upwd=req.query.upwd;
  if(!upwd){
    res.send('密码不能为空');
	return;
  }
  var email=req.query.email;
  if(!upwd){
    res.send('邮箱不能为空');
	return;
  }
  var phone=req.query.phone;
  if(!phone){
    res.send('电话不能为空');
	return;
  }
  var sql='insert into ft_user values (null,?,?,?,?)';
  pool.query(sql,[uname,upwd,email,phone],(err,result)=>{
     if(err) throw err;
     if(result.affectedRows==1){
       res.write(JSON.stringify({msg:'注册成功'}));
     }  
      res.end();
  })
})
module.exports=router;