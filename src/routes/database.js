const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./schema.db", sqlite3.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err.message)
})


function insertProduct(req,res,next){
    const product = req.body;

    let sql = `INSERT INTO products(productName, price, stock, category, description) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [product.productName, product.price, product.stock, product.category, product.description], (err)=>{
        if (err) return res.status(500).json({error: error.message})
    })

    next()
}

function retrieveProduct(req,res){
    const id = req.params.id
    
    let sql = `SELECT * FROM products WHERE id = ?`;
    db.get(sql, [id], (err, row)=>{
        if (err) 
            return res.status(500).json({error: err.message})
        if (!row)
            return res.status(404).send(`Product not found on id ${id}`)
        return res.status(200).json(row)
    })
}

function getAllProducts(req,res){
    let sql = 'SELECT * FROM products'
    db.all(sql, [], (err, rows)=>{
        if (err) 
            return res.status(500).json({error: err.message})
        return res.status(200).json(rows)
    })
}
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

module.exports = {insertProduct, retrieveProduct, getAllProducts}