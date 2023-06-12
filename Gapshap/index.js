const express=require('express');


const app=express();

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/html/index.html");
});

app.listen(3000,function(){
    console.log("server is running on port 3000");
})