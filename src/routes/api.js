const express = require("express")
const {validateCreate,validateEdit} = require("./validation.js")
const {insertProduct, retrieveProduct, getAllProducts} = require("./database.js")

//const sqlite3 = require("./src/sqlite3").verbose();
//let sql;

const router = express.Router()

//---- TEMPORARY DATABASE -----
const productsArr = [{
    "id": 1,
    "productName": "Pin",
    "price": 50,
    "stock": 3,
    "category": "Accessories",
    "description": "A cute pin with cute Macky art!"
}, {
    "id": 1,
    "productName": "wowwwww",
    "price": 50,
    "stock": 3,
    "category": "Accessories",
    "description": "A cute pin with cute Macky art!"
}]
//alfonso:ang cute ni zek zeke:thxxxx
router.post('/products', validateCreate, insertProduct, (req,res)=> {
    try{
        res.send("wow u put the product!")
    } catch (error) {
        res.status(500).json({error: `${error}`})
    }
})

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
}).delete((req,res)=>{
    const userId = req.params.id

    try{
        if (userId < productsArr.length){
            productsArr.splice(userId, 1)
            res.status(200).send("Product successfully deleted!")
        } else{
            res.status(404).send("Product does not exist!")
        }
    } catch{
        res.status(500).json({error: error.message})
    }
})


module.exports = router