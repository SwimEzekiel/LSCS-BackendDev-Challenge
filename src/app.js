/*
Project Name: LSCS Backend Development Challenge 
Programmer Name: Ezekiel S. Alvarez
Tech Stacks Used:
    - Node.js
    - Express
    - SQLite
*/

const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.get('/', (req,res)=>{
    res.send("Welcome to Macky Merch Store!");
})

//More organized routing
const apiRouter = require("./routes/api")
app.use("/api", apiRouter)


app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})