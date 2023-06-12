const express=require('express');
const bodyparser=require('body-parser');

const app=express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:false}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/html/login.html");
});
app.get("/signup",function(req,res){
    res.sendFile(__dirname+"/html/signup.html");
});
app.post("/login",function(req,res){
    console.log(req.body.mail);
    console.log(req.body.password)
})

app.post("/signup",function(req,res){
    console.log(req.body.mail);
    console.log(req.body.password)
})



app.listen(3000,function(){
    console.log("server is running on port 3000");
})