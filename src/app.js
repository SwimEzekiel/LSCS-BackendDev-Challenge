const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Welcome to Macky Merch Store!");
})

const apiRouter = require("./routes/api")
app.use("/api", apiRouter)

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})