const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./products.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err)=>{
    if (err) return console.error(err.message)
})


db.run(`CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT,
        productName TEXT NOT NULL,
        price INTEGER NOT NULL,
        stock INTEGER NOT NULL,
        size TEXT NOT NULL,
        weight REAL NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL)`);

//Inserts a product object into the products database. 
function insertProduct(req,res){
    const product = req.body;

    let sql = `INSERT INTO products(productName, price, stock, size, weight, category, description) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.run(sql, [product.productName, product.price, product.stock, product.size, product.weight, product.category, product.description], function(err){
        if (err) 
            return res.status(500).json({error: err.message})

        const productId = this.lastID
        sql = `SELECT * FROM products WHERE id = ?`
        db.get(sql, [productId], (err, row)=>{
            if (err) 
                return res.status(500).json({error: err.message})
            return res.status(201).json(row)
        })
    })
}

//grabs a product in the database given an id then returns it
function retrieveProduct(req,res){
    const id = req.params.id
    
    let sql = `SELECT * FROM products WHERE id = ?`;
    db.get(sql, [id], (err, row)=>{
        if (err) 
            return res.status(500).json({error: err.message})
        if (!row)
            return res.status(404).json({error: `Product not found on id ${id}`})
        return res.status(200).json(row)
    })
}

//edits a product given its id and the parameters given to be edited. returns edited item
function editProduct(req,res){
    const productId = req.params.id
    const productBody = req.body
    const fields = ["productName", "price", "stock", "size", "weight", "category", "description"]

    let sql = `SELECT * FROM products WHERE id = ?`
    db.get(sql, [productId], (err, row)=>{
        if (err)
            return res.status(500).json({error: err.message})
        if (!row)
            return res.status(404).json({error: `Product not found on id ${productId}`})

        const updatedFields = []
        const updatedValues = []
        for (const field of fields){
            if (Object.hasOwn(productBody, field)){
                updatedFields.push(`${field} = ?`)
                updatedValues.push(productBody[field])
            }
        }

        if (updatedFields.length !== 0){
            sql = `UPDATE products SET ${updatedFields.join(', ')} WHERE id = ?`
            updatedValues.push(productId)

            db.run(sql, updatedValues, (err)=>{
                if (err)
                    return res.status(500).json({error: err.message})

                db.get(`SELECT * FROM products WHERE id = ?`, [productId], (err, row2) => {
                    if (err)
                        return res.status(500).json({error: err.message})
                    return res.status(200).json(row2)
                })
            })
        }
    })
}

//returns a list of all the products available
function getAllProducts(req,res){
    let sql = 'SELECT * FROM products'
    db.all(sql, [], (err, rows)=>{
        if (err) 
            return res.status(500).json({error: err.message})
        return res.status(200).json(rows)
    })
}

//deletes a product given its id 
function deleteProduct(req,res){
    const productId = req.params.id
    let sql = `DELETE FROM products WHERE id = ?`;
    db.run(sql, (productId), function(err){
        if (this.changes === 0)
            return res.status(404).json({error: `Product doesn't exist in id ${productId}`})
        return res.status(200).json({Message: "Product deleted successfully!"})
    })
}

module.exports = {insertProduct, retrieveProduct, getAllProducts, editProduct, deleteProduct}