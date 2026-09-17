const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
let sql;

const port = 3000;

const db = new sqlite3.Database("./schema.db", sqlite3.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err.message)
})

//create table
sql = `CREATE TABLE products(id INTEGER PRIMARY KEY, productName, price, stock, category, description)`;
db.run(sql)

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