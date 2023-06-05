'use strict';

const express = require("express");
const app = express();

const Port = process.env.Port || 3000;


//默認跟目錄
app.get("/",(req,res)=>{
    console.log("->",req.url)
    res.send("<h1>hello</h1>")
})

// 重定向路徑
app.get("/blog",(req,res)=>{
    res.redirect("/")
})

//返回json格式，API主用
app.get("/json",(req,res)=>{
    res.json({
        result: 'OK'
    })
})

//返回HTTP代碼
app.get("/map",(req,res)=>{
    res.redirect(301,"/")
})

// 返回404
app.get("/adult",(req,res)=>{
    res.status(404).end()
})


//POST請求
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.post("/login",(req, res)=>{
    console.log(req.body)
    res.json({
        post_result : 'ok',
        body : req.body,
    })
})

//中間鍵debug
const debug=(req, res ,next)=>{
    console.log("middelware.debug ->" , req.method, req.url)
    next()
}

app.use(debug)

//認證訊息檢測中間鍵
const auth =(req,res,next)=>{
    console.log("middleware.auth ->",req.method,req.url,req.query)
    if(req.query.uid=="huang")
        next()
    else
        res.status(403).end()
}

app.get("/admin",auth,(req,res)=>{
    res.send("管理員區")
})


//加入cors功能=>跨域資源共享
const cors = require("cors")
app.use(cors())

app.get("/search",(req, res)=>{
    res.send("search is good.")
})

//啟動服務
app.listen(Port,(err)=>{
    if(err){
        console.error("出錯了!")
    }
    console.log("正常服務中...","http://127.0.0.1:"+Port)
})

