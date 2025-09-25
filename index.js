const express=require("express");

const app=express();
const path=require("path");

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server started on port ${port}`);
});

app.use(express.static(path.join(__dirname,"public")));
app.set("views",path.join(__dirname,"/views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { v4: uuidv4 } = require("uuid");

var methodOverride = require('method-override')
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))








app.set("view engine","ejs");



let posts = [
    { id:uuidv4(), user: "abhishek", content: "hey i am single" },
    {  id:uuidv4(), user: "mota", content: "hey i have messed up big time" },
    { id:uuidv4(), user: "abhi", content: "hey i am bored" }
];

// Route
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new",(req,res)=>{
    res.render("form.ejs");
})

app.post("/posts", (req, res) => {
    const { user, content } = req.body; 
    let id= uuidv4();  
    posts.push({ id,user, content });
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((q)=>id===q.id)
    res.render("new.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    console.log(id);
    console.log(newcontent);
    let post=posts.find((q)=>id===q.id)
    post.content=newcontent;
    res.redirect("/posts")
   

})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((q)=>id===q.id)
    res.render("edit.ejs",{ post })
})

app.delete("/posts/:id",(req,res)=>{
     let {id}=req.params;
     posts=posts.filter((q)=>id!==q.id)
     res.redirect("/posts")
})

// Start server
// app.listen(port, () => {
//     console.log(`server started on port ${port}`);
// });








