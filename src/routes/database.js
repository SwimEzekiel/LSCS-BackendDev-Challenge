const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./schema.db", sqlite3.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err.message)
})

//function productExists(productId) - will implement later to declutter code

function insertProduct(req,res){
    const product = req.body;

    let sql = `INSERT INTO products(productName, price, stock, category, description) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [product.productName, product.price, product.stock, product.category, product.description], function(err){
        if (err) 
            return res.status(500).json({error: error.message})

        const productId = this.lastID
        sql = `SELECT * FROM products WHERE id = ?`
        db.get(sql, [productId], (err, row)=>{
            if (err) 
                return res.status(500).json({error: error.message})
            return res.status(200).json(row)
        })
    })
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

function deleteProduct(req,res){
    const productId = req.params.id
    let sql = `DELETE FROM products WHERE id = ?`;
    db.run(sql, (productId), function(err){
        if (this.changes === 0)
            return res.status(404).json({error: `Product doesn't exist in id ${productId}`})
        return res.status(200).json({Message: "Product deleted successfully!"})
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
// sql = `SELECT * FROM products`;
// db.all(sql, [], (err, rows) =>{
//     if (err) return console.error(err.message);
//     rows.forEach((row) =>
//     console.log(row))
// })

module.exports = {insertProduct, retrieveProduct, getAllProducts, deleteProduct}