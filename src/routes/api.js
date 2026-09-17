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

router.post('/products', validate, (req,res)=> {
    try{
        const product = req.body;
        //productsArr.push(product)
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
    const body = req.params.body

    res.json(productsArr[userId])
    console.log(req.userId)
}).put((req,res)=>{
    res.send("wow! edit!")
}).delete((req,res)=>{
    res.send("do you want to delete this?")
})


module.exports = router