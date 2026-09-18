const express = require("express")
const {validateCreate,validateEdit} = require("../validation.js")
const {insertProduct, retrieveProduct, getAllProducts, editProduct, deleteProduct} = require("../database.js")

const router = express.Router()

router.post('/products', validateCreate, insertProduct)

router.get('/products', getAllProducts)

router.route('/products/:id')
.get(retrieveProduct)
.put(validateEdit, editProduct)
.delete(deleteProduct)

module.exports = router