const express=require('express');
const bodyParser=require('body-parser');
const session=require('express-session');
const user=require('./routers/user.js'); 
const index=require('./routers/index.js');
const detail=require('./routers/detail.js');
const search=require('./routers/search.js');
//创建web服务器
var app=express();
app.listen(3000);
//托管静态资源
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({
  extended:false
 }));
//使用路由器，把用户路由user挂载到/user下
app.use(session({
  secret:'128位随机字符串',
  resave:false,
  saveUninitialized:true,
}))
app.use('/user',user);  
app.use('/index',index);
app.use('/detail',detail);
app.use('/search',search);