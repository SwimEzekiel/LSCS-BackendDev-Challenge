const express = require("express")
const {validateCreate,validateEdit} = require("./validation.js")
const {insertProduct, retrieveProduct, getAllProducts, deleteProduct} = require("./database.js")

const router = express.Router()

router.post('/products', validateCreate, insertProduct)

router.get('/products', getAllProducts)

router.route('/products/:id')
.get(retrieveProduct)
.put(validateEdit, (req,res)=>{
    try{
        const userId = req.params.id
        const newProduct = req.params.body

        productsArr[userId] = newProduct
        res.status(200).send("Product updated!")
    } catch {
        res.status(500).json({error: error.message})
    }
}).delete(deleteProduct)

module.exports = router