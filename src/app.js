const express = require("express");
const app = express();
const port = 3000;

app.get('/',(req,res)=>{
    res.send("wowww!");
})

app.use(logger)

//makes routing cleaner
const userRouter = require("./routes/users")
app.use('/users', userRouter)

function logger(req, res, next){
    console.log(req.originalUrl)
    next()
}



app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})

