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

function editProduct(req,res){
    const productId = req.params.id
    const productBody = req.body
    const fields = ["productName", "price", "stock", "category", "description"]

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

            console.log(sql);
            console.log(updatedValues);
            db.run(sql, updatedValues, (err, row)=>{
                if (err)
                    return res.status(500).json({error: err.message})
            })
        }
    })

    sql = `SELECT * FROM products WHERE id = ?`
    db.get(sql, [productId], (err, row2)=>{
        if (err)
            return res.status(500).json({error: err.message})
        if (!row2)
            return res.status(404).json({error: `Product not found on id ${productId}`})
        return res.status(200).json(row2)
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

module.exports = {insertProduct, retrieveProduct, getAllProducts, editProduct, deleteProduct}