const express=require('express');
const pool=require('../pool');
const router=express.Router();
//菜谱详情
router.get("/detail",(req,res)=>{
    var uid=req.query.uid;
    var out={
        product:[],
        step:[],
        flavour:[],
        fot:[]
    }
    var sql1="SELECT * from ft_menu where uid=?";
    var sql2="SELECT *  from ft_step where uid=(select uid from ft_menu where uid=?)";
    var sql3="SELECT * from ft_fla where uid=(select uid from ft_menu where uid=?)";
    var sql4="SELECT * FROM ft_fot where uid=(select uid from ft_menu where uid=?)";
    Promise.all([
        new Promise(function(open){
            pool.query(sql1,[uid],(err,result)=>{
                if(err) throw err;
                out.product=result; 
                open();
            })
        }),
        new Promise(function(open){
            pool.query(sql2,[uid],(err,result)=>{
               if(err) throw err;
                out.step=result;
                open();
             })
        }),
        new Promise(function(open){
            pool.query(sql3,[uid],(err,result)=>{
                if(err) throw err;
                out.flavour=result;
                open();
            })
        }),
        new Promise(function(open){
             pool.query(sql4,[uid],(err,result)=>{
                 if(err) throw err;
                 out.fot=result;
                 open();
             })
        })
    ]).then(function(){
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
            })
         res.write(JSON.stringify(out));
         res.end();
    })       
})
//时令蔬菜
router.get("/details",(req,res)=>{
    var uid=req.query.uid;
    var out={
      product:[],
      type:[]
    }
    var sql="select * from ft_veg where uid=?";
    var sql1="select * from vg_det where uid=(select uid from ft_veg where uid=?)";
    Promise.all([
        new Promise(function(open){
            pool.query(sql,[uid],(err,result)=>{
                if(err) throw err;
                out.product=result;
                open();
            })   
        }),
        new Promise(function(open){
            pool.query(sql1,[uid],(err,result)=>{
                if(err) throw err;
                out.type=result;
                open();
            })   
        }),

    ]).then(function(){
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
            })
         res.write(JSON.stringify(out));
         res.end();
    })
})

module.exports=router;