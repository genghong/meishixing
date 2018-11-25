const express=require('express');
const pool=require('../pool');
const router=express.Router();
//查询精品菜谱
router.get("/menu",(req,res)=>{
      var output={
          pageSize:12,
      };
      output.pno=req.query.pno;
    var sql='SELECT * FROM ft_menu';
    pool.query(sql,[],(err,result)=>{
        if(err) throw err;
          output.count=result.length;
          output.pageCount=Math.ceil(output.count/output.pageSize);
          output.menus=result.slice(output.pno*12,output.pno*12+12);
          res.writeHead(200,{
              "Content-Type":"application/json;charset=utf-8",
              "Access-Control-Allow-Origin":"*"
          })
        res.write(JSON.stringify(output));
           res.end();
    })
})
// 查询时令蔬菜
router.get("/veg",(req,res)=>{
    var output={
        pageSize:7,
    }
    output.pno=req.query.pno1;
   var sql="SELECT * FROM ft_veg";
   pool.query(sql,[],(err,result)=>{
       if(err) throw err;
       output.count=result.length;
       output.pageCount=Math.ceil(output.count/output.pageSize);
       output.vegs=result.slice(output.pno*7,output.pno*7+7);
       res.writeHead(200,{
        "Content-Type":"application/json;charset=utf-8",
        "Access-Control-Allow-Origin":"*"
        })
       res.write(JSON.stringify(output));
       res.end();
   })
})
module.exports=router;