const express=require('express');
const pool=require('../pool');
const router=express.Router();
router.get("/type",(req,res)=>{
    var sql="select * from ft_type";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
            })
         res.write(JSON.stringify(result));
         res.end();
    })
})
router.get("/list",(req,res)=>{
    var uid=req.query.uid;
    var output={
        pageSize:9,
        count:0,
        pno:0,
        pageCount:0,
        product:[]
    }
     output.pno=req.query.pno;
    var sql="select * from ft_detail where uid=?"
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        output.count=result.length;
        output.pageCount=Math.ceil(output.count/output.pageSize);
        output.product=result.slice(output.pno*9,output.pno*9+9);
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
        })
        res.write(JSON.stringify(output));
        res.end();
    })
})
router.get("/data",(req,res)=>{
    var kword=req.query.kword;
    var output={
        pageSize:9,
        count:0,
        pno:0,
        pageCount:0,
        product:[]
    }
    output.pno=req.query.pno;
    var sql=`select * from ft_detail where name like '%${kword}%'`;
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output.count=result.length;
        output.pageCount=Math.ceil(output.count/output.pageSize);
        output.product=result.slice(output.pno*9,output.pno*9+9);
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
         })
        res.write(JSON.stringify(output));
        res.end();
    })
})
module.exports=router;