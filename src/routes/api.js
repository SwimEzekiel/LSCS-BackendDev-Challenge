const express = require("express")
const validate = require("./validation.js")
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
router.post('/products', validate, (req,res)=> {
    try{
        const product = req.body;
        productsArr.push(product)
        console.log(`product id ${product.id}, ${product.productName}`)
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({error: `${error}`})
    }
})

router.get('/products', (req,res)=>{
    try{
        res.write(productsArr[0])
        res.write(productsArr[1])
        res.sendStatus(200)
    } catch{
        res.status(500).json({error: error.message})
    }
})

router.route('/products/:id').get((req, res)=>{
    const userId = req.params.id
    try{
        if (userId < productsArr.length){
            res.status(200).json(productsArr[userId])
        } else {
            res.status(404).send("Product not found!")
        }
    } catch {
        res.status(500).json({error: error.message})
    }
}).put(validate, (req,res)=>{
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