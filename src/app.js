const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
let sql;

const port = 3000;

const db = new sqlite3.Database("./schema.db", sqlite3.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err.message)
})

// create table
//sql = `CREATE TABLE products(id INTEGER PRIMARY KEY, productName, price, stock, category, description)`;
//db.run(sql)

//delete db
//db.run("DROP TABLE products")

//insert int table
//sql = `INSERT INTO products(productName, price, stock, category, description) VALUES (?, ?, ?, ?, ?)`
//db.run(sql, ["Macky T-Shirt", 750, 10, "Clothing", "A print of Macky with aesthetic shirt designs!"], (err)=>{
//    if (err) return console.error(err.message)
//})

//update data
// sql = `UPDATE products SET productName = ? WHERE id = ?`;
// db.run(sql, ["Wowww PIN!!!", 2], (err)=>{
//     if (err) return console.error(err.message)
// })

//delete data 
// sql = `DELETE FROM products WHERE id=?`;
// db.run(sql, [2], (err)=>{
//     if (err) return console.error(err.message);
// }) 

//query the data
sql = `SELECT * FROM products`;
db.all(sql, [], (err, rows) =>{
    if (err) return console.error(err.message);
    rows.forEach((row) =>
    console.log(row))
})


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