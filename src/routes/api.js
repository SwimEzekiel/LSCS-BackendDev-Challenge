const express = require("express")
const validate = require("./validation.js")
const router = express.Router()


router.post('/products', validate, (req,res)=> {
    try{
        const product = req.body;

        console.log(`product id ${product.id}, ${product.productName}`)
        res.status(201).json({product})
    } catch{
        res.status(500).json({error: error.message})
        
    }
})

router.get('/products', (req,res)=>{
    res.status(404).send(
        "error: product not found"
    )
})

router.route('/products/:id').get((req, res)=>{
    const userId = req.params.id
    const body = req.params.body

    res.json({userId, body})
    console.log(req.userId)
}).put((req,res)=>{
    res.send("wow! edit!")
}).delete((req,res)=>{
    res.send("do you want to delete this?")
})


module.exports = router